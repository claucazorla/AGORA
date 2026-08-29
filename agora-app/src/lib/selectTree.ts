import { buildGenericFallbackTree } from "./dialogues/genericFallback";
import { thrasymachusTree } from "./dialogues/thrasymachus";
import type { DialogueTree } from "./types";

const THRASYMACHUS_HINTS = ["justice", "stronger", "advantage", "power", "might makes right"];

export function selectThesisTree(thesis: string): DialogueTree {
  const s = thesis.toLowerCase();
  const hasJustice = s.includes("justice") || s.includes("just");
  const hasStrengthCue = THRASYMACHUS_HINTS.some((h) => s.includes(h));
  if (hasJustice && hasStrengthCue) {
    return thrasymachusTree;
  }
  return buildGenericFallbackTree(thesis);
}
