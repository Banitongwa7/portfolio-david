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

export default class PollParty implements Party.Server {
  votes: Votes = {};
  pollData: PollData | null = null;

  constructor(public party: Party.Party) {}

  async onStart() {
    this.votes = (await this.party.storage.get("votes")) || {};
    this.pollData = (await this.party.storage.get("pollData")) || null;
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
      const { option } = msg;
      this.votes[option] = (parseInt(`${this.votes[option]}`) || 0) + 1;
      this.party.broadcast(JSON.stringify({ type: "sync", votes: this.votes, pollData: this.pollData }));
      await this.party.storage.put("votes", this.votes);
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
      
      await this.party.storage.put("pollData", this.pollData);
      await this.party.storage.put("votes", this.votes);
      
      this.party.broadcast(JSON.stringify({ type: "sync", votes: this.votes, pollData: this.pollData }));
    }
  }
}
