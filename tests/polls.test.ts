import { beforeEach, describe, expect, it } from "vitest";
import PollParty from "@/partykit/polls";

// In-memory stand-ins for a PartyKit room and its sockets.
function fakeRoom() {
  const store = new Map<string, unknown>();
  const broadcasts: unknown[] = [];
  return {
    storage: {
      get: async (key: string) => store.get(key),
      put: async (key: string, value: unknown) => void store.set(key, value),
    },
    broadcast: (message: string) => void broadcasts.push(JSON.parse(message)),
    broadcasts,
  };
}

type Message = { type: string; message?: string; hasVoted?: boolean; votes?: Record<string, number>; pollData?: { question: string } };

function fakeSocket() {
  const inbox: Message[] = [];
  let state: unknown = null;
  return {
    inbox,
    last: (type: string) => [...inbox].reverse().find((m) => m.type === type),
    send: (message: string) => void inbox.push(JSON.parse(message)),
    get state() {
      return state;
    },
    setState(next: unknown) {
      state = next;
      return state;
    },
  };
}

let room: ReturnType<typeof fakeRoom>;
let server: PollParty;
const say = (socket: ReturnType<typeof fakeSocket>, message: unknown) =>
  server.onMessage(typeof message === "string" ? message : JSON.stringify(message), socket as never);

beforeEach(async () => {
  room = fakeRoom();
  server = new PollParty(room as never);
  await server.onStart();
});

const create = (socket = fakeSocket()) =>
  say(socket, { type: "createPoll", question: "Best language?", options: ["TS", "Python", "TS"] });

describe("PollParty", () => {
  it("creates a poll once, with unique options", async () => {
    await create();
    expect(server.pollData?.options).toEqual(["TS", "Python"]);
    expect(server.votes).toEqual({ TS: 0, Python: 0 });
  });

  it("refuses an invalid poll", async () => {
    const socket = fakeSocket();
    await say(socket, { type: "createPoll", question: "Only one?", options: ["A", "A"] });
    expect(server.pollData).toBeNull();
    expect(socket.last("error")).toBeTruthy();
  });

  it("never lets a second createPoll wipe the votes", async () => {
    await create();
    await say(fakeSocket(), { type: "vote", option: "TS", voterId: "a" });
    const attacker = fakeSocket();
    await say(attacker, { type: "createPoll", question: "Hijacked", options: ["X", "Y"] });
    expect(server.pollData?.question).toBe("Best language?");
    expect(server.votes).toEqual({ TS: 1, Python: 0 });
    expect(attacker.last("sync")?.pollData?.question).toBe("Best language?");
  });

  it("counts one vote per voter and per socket", async () => {
    await create();
    const socket = fakeSocket();
    await say(socket, { type: "vote", option: "TS", voterId: "a" });
    expect(socket.last("voteSuccess")).toBeTruthy();

    await say(fakeSocket(), { type: "vote", option: "TS", voterId: "a" });
    await say(socket, { type: "vote", option: "Python", voterId: "a-new-id" });
    expect(server.votes).toEqual({ TS: 1, Python: 0 });
  });

  it("rejects options that are not in the poll", async () => {
    await create();
    const socket = fakeSocket();
    await say(socket, { type: "vote", option: "Rust", voterId: "b" });
    expect(socket.last("error")).toBeTruthy();
    expect(server.votes).toEqual({ TS: 0, Python: 0 });
  });

  it("rejects a vote before the poll exists", async () => {
    const socket = fakeSocket();
    await say(socket, { type: "vote", option: "TS", voterId: "a" });
    expect(socket.last("error")?.message).toMatch(/doesn't exist/);
  });

  it("ignores malformed messages", async () => {
    await create();
    await expect(say(fakeSocket(), "{not json")).resolves.toBeUndefined();
    await expect(say(fakeSocket(), "42")).resolves.toBeUndefined();
  });

  it("tells a browser whether it already voted", async () => {
    await create();
    await say(fakeSocket(), { type: "vote", option: "TS", voterId: "a" });
    const socket = fakeSocket();
    await say(socket, { type: "checkVoter", voterId: "a" });
    expect(socket.last("voterStatus")?.hasVoted).toBe(true);
  });

  it("keeps the poll across restarts", async () => {
    await create();
    await say(fakeSocket(), { type: "vote", option: "Python", voterId: "a" });
    const restarted = new PollParty(room as never);
    await restarted.onStart();
    expect(restarted.votes).toEqual({ TS: 0, Python: 1 });
    expect(restarted.voters.has("a")).toBe(true);
  });
});
