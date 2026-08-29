import type { DialogueTree } from "../types";

/**
 * Fallback tree for "Defend a Thesis" when the user's thesis is not one of
 * the pre-authored positions. It applies the elenctic pattern found across
 * the early dialogues (request a definition, test it, press a revision) to
 * material the source texts never address, so its citations point to the
 * pattern being reused, not to specific content being reproduced.
 */
export function buildGenericFallbackTree(thesis: string): DialogueTree {
  const t = thesis.trim().replace(/\.$/, "");
  return {
    id: "generic",
    title: `On the thesis: ${t}`,
    entry: "restate",
    nodes: {
      restate: {
        id: "restate",
        lines: [
          {
            text: `So you hold that ${t}. Before I test that, help me fix its terms. Which single word in it carries the whole weight, the one that, if we got it wrong, would bring the rest down with it?`,
            citation: {
              work: "Laches",
              locator: "190b-e (pattern)",
              tag: "method-new-terrain",
              gloss: "The opening move of nearly every early elenchus: isolate the load-bearing term before testing the claim built on it. Applied here to a thesis outside the primary source material.",
            },
          },
        ],
        branches: { concede: "define", defend: "define", clarify: "restate-clarify" },
        fallthrough: "define",
      },
      "restate-clarify": {
        id: "restate-clarify",
        lines: [
          {
            text: "I ask because most claims like yours turn on one word doing quiet, unexamined work. Name it, and we will see whether it can bear the weight you are putting on it.",
            citation: {
              work: "Charmides",
              locator: "159a (pattern)",
              tag: "method-new-terrain",
              gloss: "Restates the request for the load-bearing term, following the same opening pattern used across the early definitional dialogues.",
            },
          },
        ],
        branches: { concede: "define", defend: "define" },
        fallthrough: "define",
      },
      define: {
        id: "define",
        lines: [
          {
            text: "Good. Now give me your definition of that word, stated as plainly as you would explain it to someone who had never heard it, not as a philosopher would dress it up.",
            citation: {
              work: "Meno",
              locator: "71e-72a (pattern)",
              tag: "method-new-terrain",
              gloss: "Follows the demand-for-a-plain-definition pattern that opens the Meno's inquiry into virtue, applied here to the user's own term.",
            },
          },
        ],
        branches: { concede: "counter-test", defend: "counter-test", clarify: "define-clarify" },
        fallthrough: "counter-test",
      },
      "define-clarify": {
        id: "define-clarify",
        lines: [
          {
            text: "I mean a definition that would let a stranger identify every case that falls under it, and rule out every case that does not, without needing you standing beside them to explain further.",
            citation: {
              work: "Meno",
              locator: "72c-d (pattern)",
              tag: "method-new-terrain",
              gloss: "Sharpens the standard a real definition has to meet, echoing Socrates' insistence in the Meno that a definition must cover every instance, not just the one at hand.",
            },
          },
        ],
        branches: { concede: "counter-test", defend: "counter-test" },
        fallthrough: "counter-test",
      },
      "counter-test": {
        id: "counter-test",
        lines: [
          {
            text: "Then consider a case where your definition, applied exactly as you have stated it, would produce a result you would not actually want to call true, the opposite of what you believe the word ought to require in that case. Does the definition survive that, or does it need another clause to escape it?",
            citation: {
              work: "elenchus",
              locator: "structural pattern, no single locus",
              tag: "consistent-extrapolation",
              gloss: "A counter-example test in the spirit of the method, built for this specific thesis rather than drawn from any one passage, so it is not attributed to a fixed source.",
            },
          },
        ],
        branches: { concede: "aporia", defend: "hold-firm", clarify: "counter-test-clarify" },
        fallthrough: "aporia",
      },
      "counter-test-clarify": {
        id: "counter-test-clarify",
        lines: [
          {
            text: "I press this way because a definition that needs constant exceptions is not yet a definition, it is a description of the usual case with the hard cases quietly excused. If your account only works when nothing unusual happens, it has not told me the essence, only the average.",
            citation: {
              work: "elenchus",
              locator: "structural pattern, no single locus",
              tag: "consistent-extrapolation",
              gloss: "General elenctic reasoning about what a definition owes, not tied to a specific passage.",
            },
          },
        ],
        branches: { concede: "aporia", defend: "hold-firm" },
        fallthrough: "aporia",
      },
      "hold-firm": {
        id: "hold-firm",
        lines: [
          {
            text: "You would rather add a clause than give up the claim, which is a fair instinct, philosophers do it too. But notice what you have already conceded: the bare version of your thesis was not enough on its own, it needed rescue. That is worth sitting with, even if the rescued version survives a while longer than I have time to test tonight.",
            citation: {
              work: "elenchus",
              locator: "structural pattern, no single locus",
              tag: "consistent-extrapolation",
              gloss: "Closing move used when the interlocutor patches rather than abandons a definition; the session ends honestly on an unresolved but weakened claim.",
            },
          },
        ],
        branches: {},
        isAporia: true,
        reflection:
          "This one did not end in refutation, it ended in a stalemate you should notice rather than celebrate. Your thesis survived the counter-test only by adding a clause it did not originally have, which means the thesis you defended at the end of the exchange is not quite the one you opened with. That gap, between the claim as stated and the claim as rescued, is exactly where a second session should begin.",
      },
      aporia: {
        id: "aporia",
        lines: [],
        branches: {},
        isAporia: true,
        reflection:
          "We arrived here by pressure, not agreement. The word your whole thesis leaned on turned out to need a definition sturdier than the one you gave it, and the definition you did give could not survive its own counter-case without further patching. That does not mean the thesis is false. It means neither of us, in this exchange, secured the terms well enough to say whether it is true, and that uncertainty is the honest result, not a failure to reach one.",
      },
    },
  };
}
