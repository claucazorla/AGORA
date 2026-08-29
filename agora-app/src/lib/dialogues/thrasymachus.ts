import type { DialogueTree } from "../types";

/**
 * "Defend a Thesis" default tree, engaged when the user's thesis resembles
 * Thrasymachus's position in Republic Book I: that justice is the advantage
 * of the stronger. All dialogue below is original writing that follows the
 * argumentative shape of that exchange; it is not a quotation of any
 * translation. Stephanus locators are the standard scholarly page references
 * for the Republic and are cited as pointers to the source argument, not as
 * verbatim text.
 */
export const thrasymachusTree: DialogueTree = {
  id: "thrasymachus",
  title: "On justice as the advantage of the stronger",
  entry: "restate",
  nodes: {
    restate: {
      id: "restate",
      lines: [
        {
          text: "So your claim, unless I have recast it unfairly, is that justice is nothing else than the advantage of the stronger. Before I test it, answer me this: when a ruler misjudges his own advantage and commands something that in fact harms him, is obedience to that command still just, on your account?",
          citation: {
            work: "Republic",
            locator: "338c-339b",
            tag: "attested",
            gloss: "Thrasymachus's definition and Socrates' first counter-move, that rulers can be mistaken about their own advantage, both occur in this stretch of Book I.",
          },
        },
      ],
      branches: { concede: "craft", defend: "defend-obedience", clarify: "restate-clarify" },
      fallthrough: "craft",
    },
    "restate-clarify": {
      id: "restate-clarify",
      lines: [
        {
          text: "I press the point because if justice bends to whatever the ruler happens to command, even his own errors, then justice could sometimes work against the very advantage you tied it to. That seems a strange shape for 'advantage' to take. So: is justice obedience to the command, or is it whatever truly serves the stronger, whether or not he sees it correctly?",
          citation: {
            work: "Republic",
            locator: "339b-c",
            tag: "attested",
            gloss: "Socrates sharpens the ambiguity between 'what the ruler commands' and 'what actually benefits the ruler' that Thrasymachus's original definition leaves unresolved.",
          },
        },
      ],
      branches: { concede: "craft", defend: "defend-obedience" },
      fallthrough: "craft",
    },
    "defend-obedience": {
      id: "defend-obedience",
      lines: [
        {
          text: "Hold that ground, then, for a moment. You say obedience is just even when it happens to injure the ruler himself. But you named justice 'the advantage of the stronger' precisely because you took the stronger to benefit from it. If obedience can, on occasion, harm the one it is meant to serve, on what ground do you still call it justice rather than an accident that merely resembles justice?",
          citation: {
            work: "Republic",
            locator: "339d-340a",
            tag: "attested",
            gloss: "This is the horn of the dilemma Thrasymachus's associate Polemarchus presses in the text: strict obedience and 'the ruler's real advantage' can pull apart.",
          },
        },
      ],
      branches: { concede: "craft", clarify: "restate-clarify" },
      fallthrough: "craft",
    },
    craft: {
      id: "craft",
      lines: [
        {
          text: "Very well, suppose you drop obedience and mean instead whatever truly serves the stronger, mistakes aside. Then tell me: does ruling, taken strictly as ruling, function the way a craft does, the way medicine or navigation does? Does the doctor, insofar as he practices medicine and not something else, aim at his own advantage, or at the patient's?",
          citation: {
            work: "Republic",
            locator: "341c-342e",
            tag: "attested",
            gloss: "Socrates introduces the craft analogy: every genuine techne, examined strictly, serves the thing it governs rather than the practitioner.",
          },
        },
      ],
      branches: { concede: "collapse", defend: "craft-defend", clarify: "craft-clarify" },
      fallthrough: "collapse",
    },
    "craft-clarify": {
      id: "craft-clarify",
      lines: [
        {
          text: "Consider the doctor apart from his fee. As a doctor, strictly, his skill is aimed at the patient's body, not his own. The wage he earns is a second thing, added on by a separate craft of wage-earning. If ruling is a craft in the same sense, what does it aim at, strictly, once you subtract whatever the ruler separately gains from ruling?",
          citation: {
            work: "Republic",
            locator: "341c-342a",
            tag: "attested",
            gloss: "Socrates isolates 'the craft itself' from the wage-earning that typically accompanies it, a distinction central to the craft analogy.",
          },
        },
      ],
      branches: { concede: "collapse", defend: "craft-defend" },
      fallthrough: "collapse",
    },
    "craft-defend": {
      id: "craft-defend",
      lines: [
        {
          text: "You want ruling to be the one exception, a craft that, unlike the others, serves itself. But then it is a strange sort of craft: medicine strengthens the sick, navigation preserves the sailors, and on your account ruling alone battens on the ruled. Either show me what makes ruling exempt from the pattern every other craft follows, or admit the analogy holds and see where that leaves your definition.",
          citation: {
            work: "Republic",
            locator: "342d-343a",
            tag: "attested",
            gloss: "Socrates presses the disanalogy Thrasymachus needs and does not supply, that ruling would have to be the sole exception among the crafts.",
          },
        },
      ],
      branches: { concede: "collapse", clarify: "craft-clarify" },
      fallthrough: "collapse",
    },
    collapse: {
      id: "collapse",
      lines: [
        {
          text: "Then look at where this has taken us. If ruling, strictly practiced, aims at the good of the ruled rather than the ruler, then justice, on your own route to it, turns out to serve the weaker, not the stronger, which is the very opposite of where you started. I do not say I have found what justice is. I have only shown that 'the advantage of the stronger' cannot be it, not without folding into its own reverse.",
          citation: {
            work: "Republic",
            locator: "343a-b, 354a-c",
            tag: "attested",
            gloss: "This mirrors the actual shape of Book I's ending: the definition is driven into self-reversal, and Socrates explicitly denies having replaced it with a positive account.",
          },
        },
      ],
      branches: {},
      isAporia: true,
      reflection:
        "The impasse sits exactly where the craft analogy left it. You granted that a genuine craft serves what it governs, not the practitioner, and once ruling was measured against that pattern, 'the advantage of the stronger' folded into its own opposite. But notice what was not settled: whether ruling really is a craft like medicine or navigation in the first place, or something else wearing a craft's shape. Neither of us secured that. The definition is gone; nothing yet stands in its place.",
    },
  },
};
