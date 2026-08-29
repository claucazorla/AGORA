import type { BranchKind, DialogueNode, DialogueTree, SessionState } from "./types";

const CONCEDE_WORDS = [
  "you're right",
  "youre right",
  "you are right",
  "i concede",
  "i suppose not",
  "i suppose you're right",
  "maybe not",
  "perhaps not",
  "i was wrong",
  "let me revise",
  "i take that back",
  "fair point",
  "fair enough",
  "that's fair",
  "thats fair",
  "true",
  "i guess so",
  "i don't think that anymore",
  "i dont think that anymore",
  "good point",
  "i see your point",
  "i hadn't considered",
  "i hadnt considered",
  "okay yes",
  "ok yes",
];

const DEFEND_WORDS = [
  "no,",
  "no ",
  "i disagree",
  "that's not",
  "thats not",
  "still,",
  "still ",
  "i maintain",
  "not exactly",
  "but ",
  "however",
  "not necessarily",
  "i don't agree",
  "i dont agree",
  "on the contrary",
  "not quite",
];

const CLARIFY_WORDS = [
  "why",
  "what do you mean",
  "how so",
  "explain",
  "i don't understand",
  "i dont understand",
  "unclear",
  "not sure what you",
  "?",
];

function classify(userText: string): BranchKind {
  const s = userText.toLowerCase().trim();
  if (s.length === 0) return "clarify";
  for (const w of CONCEDE_WORDS) if (s.includes(w)) return "concede";
  for (const w of DEFEND_WORDS) if (s.startsWith(w) || s.includes(` ${w}`)) return "defend";
  for (const w of CLARIFY_WORDS) if (s.includes(w)) return "clarify";
  // Default: a substantive reply that doesn't clearly concede or resist reads
  // as holding the position, which keeps Socrates pressing rather than
  // assuming agreement.
  return "defend";
}

function pickLine(node: DialogueNode, loopIndexForNode: number) {
  const idx = loopIndexForNode % node.lines.length;
  return node.lines[idx];
}

export function initSession(tree: DialogueTree, mode: SessionState["mode"], thesis?: string): SessionState {
  const entry = tree.nodes[tree.entry];
  const line = pickLine(entry, 0);
  return {
    mode,
    treeId: tree.id,
    currentNodeId: entry.id,
    transcript: [{ speaker: "socrates", text: line.text, citation: line.citation }],
    loopCount: 0,
    turnCount: 1,
    status: "active",
    thesis,
  };
}

const MAX_TURNS = 8;

export function advanceSession(tree: DialogueTree, session: SessionState, userText: string): SessionState {
  if (session.status === "aporia") return session;

  const transcript = [...session.transcript, { speaker: "user" as const, text: userText }];
  const currentNode = tree.nodes[session.currentNodeId];
  const kind = classify(userText);

  let nextId = currentNode.branches[kind];
  let loopCount = session.loopCount;

  if (!nextId) {
    // No branch defined for this reply type on this node: loop once with an
    // alternate phrasing if available, then fall through to keep the
    // dialogue moving rather than stalling indefinitely.
    if (loopCount === 0 && currentNode.lines.length > 1) {
      nextId = currentNode.id;
      loopCount += 1;
    } else {
      nextId = currentNode.fallthrough ?? currentNode.id;
      loopCount = 0;
    }
  } else {
    loopCount = 0;
  }

  const turnCount = session.turnCount + 1;
  const forcedAporia = turnCount >= MAX_TURNS && tree.nodes[nextId] && !tree.nodes[nextId].isAporia;

  const nextNode = forcedAporia ? findAnyAporiaNode(tree) ?? tree.nodes[nextId] : tree.nodes[nextId];
  const line = pickLine(nextNode, session.currentNodeId === nextNode.id ? loopCount : 0);

  transcript.push({ speaker: "socrates", text: line.text, citation: line.citation });

  const status = nextNode.isAporia ? "aporia" : "active";

  return {
    ...session,
    currentNodeId: nextNode.id,
    transcript,
    loopCount,
    turnCount,
    status,
    reflection: nextNode.isAporia ? nextNode.reflection : undefined,
  };
}

function findAnyAporiaNode(tree: DialogueTree): DialogueNode | undefined {
  return Object.values(tree.nodes).find((n) => n.isAporia);
}

export function forceAporia(tree: DialogueTree, session: SessionState): SessionState {
  const node = findAnyAporiaNode(tree);
  if (!node) return session;
  return {
    ...session,
    currentNodeId: node.id,
    status: "aporia",
    reflection: node.reflection,
  };
}
