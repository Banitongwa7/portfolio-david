import type * as Party from "partykit/server";

// room ID is the hash of the poll (questions and options)
// We store a tally of option/votes against each room

type Votes = {
  [option: string]: number;
};

type PollData = {
  question: string;
  options: string[];
  createdAt: number;
};

type VoterSet = Set<string>;

export default class PollParty implements Party.Server {
  votes: Votes = {};
  pollData: PollData | null = null;
  voters: VoterSet = new Set();

  constructor(public party: Party.Party) {}

  async onStart() {
    this.votes = (await this.party.storage.get("votes")) || {};
    this.pollData = (await this.party.storage.get("pollData")) || null;
    const votersArray =
      (await this.party.storage.get<string[]>("voters")) || [];
    this.voters = new Set(votersArray);
  }

  async onConnect(connection: Party.Connection) {
    const msg = {
      type: "sync",
      votes: this.votes,
      pollData: this.pollData,
    };
    connection.send(JSON.stringify(msg));
  }

  async onMessage(message: string, connection: Party.Connection) {
    const msg = JSON.parse(message);

    if (msg.type === "vote") {
      const { option, voterId } = msg;

      // Check if this voter has already voted
      if (this.voters.has(voterId)) {
        connection.send(
          JSON.stringify({
            type: "error",
            message: "You have already voted in this poll",
          })
        );
        return;
      }

      // Record the vote
      this.votes[option] = (parseInt(`${this.votes[option]}`) || 0) + 1;
      this.voters.add(voterId);

      // Persist to storage
      await this.party.storage.put("votes", this.votes);
      await this.party.storage.put("voters", Array.from(this.voters));

      // Broadcast updated results
      this.party.broadcast(
        JSON.stringify({
          type: "sync",
          votes: this.votes,
          pollData: this.pollData,
        })
      );

      // Send success confirmation to voter
      connection.send(
        JSON.stringify({
          type: "voteSuccess",
          message: "Your vote has been recorded",
        })
      );
    } else if (msg.type === "createPoll") {
      // Store poll data when first created
      const { question, options } = msg;
      this.pollData = {
        question,
        options,
        createdAt: Date.now(),
      };
      // Initialize votes for all options
      const initialVotes: Votes = {};
      options.forEach((option: string) => {
        initialVotes[option] = 0;
      });
      this.votes = initialVotes;
      this.voters = new Set(); // Reset voters for new poll

      await this.party.storage.put("pollData", this.pollData);
      await this.party.storage.put("votes", this.votes);
      await this.party.storage.put("voters", []);

      this.party.broadcast(
        JSON.stringify({
          type: "sync",
          votes: this.votes,
          pollData: this.pollData,
        })
      );
    } else if (msg.type === "checkVoter") {
      const { voterId } = msg;
      const hasVoted = this.voters.has(voterId);
      connection.send(
        JSON.stringify({
          type: "voterStatus",
          hasVoted,
        })
      );
    }
  }
}
