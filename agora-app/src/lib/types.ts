export type ConfidenceTag =
  | "attested"
  | "method-new-terrain"
  | "consistent-extrapolation";

export interface Citation {
  work: string;
  locator: string;
  tag: ConfidenceTag;
  gloss: string;
}

export interface SocratesLine {
  text: string;
  citation: Citation;
}

export type BranchKind = "concede" | "defend" | "clarify";

export interface DialogueNode {
  id: string;
  /** One or more phrasings; the engine cycles through these when a node is revisited (e.g. repeated "clarify" replies). */
  lines: SocratesLine[];
  branches: Partial<Record<BranchKind, string>>;
  /** Node to advance to if the reply is unclassifiable and this node has already looped once. */
  fallthrough?: string;
  isAporia?: boolean;
  /** Only set on aporia nodes: the closing reflection shown on the Aporia screen. */
  reflection?: string;
}

export interface DialogueTree {
  id: string;
  title: string;
  entry: string;
  nodes: Record<string, DialogueNode>;
}

export interface TranscriptTurn {
  speaker: "socrates" | "user";
  text: string;
  citation?: Citation;
}

export type SessionMode = "open" | "thesis";

export interface SessionState {
  mode: SessionMode;
  treeId: string;
  currentNodeId: string;
  transcript: TranscriptTurn[];
  loopCount: number;
  turnCount: number;
  status: "active" | "aporia";
  reflection?: string;
  thesis?: string;
}
