import type * as Party from "partykit/server";

// One room per poll. The room keeps the poll, a tally per option and the IDs
// of the browsers that already voted. Every message comes from an untrusted
// browser, so each one is checked before it changes anything.

type Votes = Record<string, number>;

type PollData = {
  question: string;
  options: string[];
  createdAt: number;
};

// Per-connection state: a socket may vote once, whatever voter ID it sends.
type ConnectionState = { voted?: boolean };

const LIMITS = { question: 200, option: 100, minOptions: 2, maxOptions: 10, voterId: 128 };

const cleanText = (value: unknown, max: number): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= max ? trimmed : null;
};

// Returns the poll's options, trimmed and unique, or null if they are invalid.
const cleanOptions = (value: unknown): string[] | null => {
  if (!Array.isArray(value)) return null;
  const options = value.map((option) => cleanText(option, LIMITS.option));
  if (options.some((option) => option === null)) return null;
  const unique = [...new Set(options as string[])];
  return unique.length >= LIMITS.minOptions && unique.length <= LIMITS.maxOptions ? unique : null;
};

export default class PollParty implements Party.Server {
  votes: Votes = {};
  pollData: PollData | null = null;
  voters: Set<string> = new Set();

  constructor(public party: Party.Party) {}

  async onStart() {
    this.votes = (await this.party.storage.get<Votes>("votes")) || {};
    this.pollData = (await this.party.storage.get<PollData>("pollData")) || null;
    const votersArray = (await this.party.storage.get<string[]>("voters")) || [];
    this.voters = new Set(votersArray);
  }

  syncMessage() {
    return JSON.stringify({ type: "sync", votes: this.votes, pollData: this.pollData });
  }

  async onConnect(connection: Party.Connection) {
    connection.send(this.syncMessage());
  }

  sendError(connection: Party.Connection, message: string) {
    connection.send(JSON.stringify({ type: "error", message }));
  }

  async onMessage(raw: string | ArrayBuffer | ArrayBufferView, connection: Party.Connection<ConnectionState>) {
    if (typeof raw !== "string") return;
    let msg: Record<string, unknown>;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return;
      msg = parsed;
    } catch {
      return;
    }

    if (msg.type === "createPoll") {
      // A poll is created once. Sending createPoll to a room that already
      // has one (the creator again, or anyone else) only returns the poll,
      // so votes can never be wiped from outside.
      if (this.pollData) {
        connection.send(this.syncMessage());
        return;
      }

      const question = cleanText(msg.question, LIMITS.question);
      const options = cleanOptions(msg.options);
      if (!question || !options) {
        this.sendError(connection, "A poll needs a question and 2 to 10 different options.");
        return;
      }

      this.pollData = { question, options, createdAt: Date.now() };
      this.votes = Object.fromEntries(options.map((option) => [option, 0]));
      this.voters = new Set();

      await this.party.storage.put("pollData", this.pollData);
      await this.party.storage.put("votes", this.votes);
      await this.party.storage.put("voters", []);

      this.party.broadcast(this.syncMessage());
      return;
    }

    if (msg.type === "vote") {
      if (!this.pollData) {
        this.sendError(connection, "This poll doesn't exist.");
        return;
      }

      const voterId = cleanText(msg.voterId, LIMITS.voterId);
      const option = typeof msg.option === "string" ? msg.option : "";
      if (!voterId || !this.pollData.options.includes(option)) {
        this.sendError(connection, "This vote isn't valid. Reload the poll and try again.");
        return;
      }

      if (this.voters.has(voterId) || connection.state?.voted) {
        this.sendError(connection, "You have already voted in this poll");
        return;
      }

      this.votes[option] = (this.votes[option] || 0) + 1;
      this.voters.add(voterId);
      connection.setState({ voted: true });

      await this.party.storage.put("votes", this.votes);
      await this.party.storage.put("voters", Array.from(this.voters));

      this.party.broadcast(this.syncMessage());
      connection.send(JSON.stringify({ type: "voteSuccess", message: "Your vote has been recorded" }));
      return;
    }

    if (msg.type === "checkVoter") {
      const voterId = cleanText(msg.voterId, LIMITS.voterId);
      connection.send(
        JSON.stringify({ type: "voterStatus", hasVoted: Boolean(voterId && this.voters.has(voterId)) })
      );
    }
  }
}
