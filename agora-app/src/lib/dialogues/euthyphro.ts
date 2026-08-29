import type { DialogueTree } from "../types";

/**
 * "Open Dialogue" tree. Socrates opens on his own initiative with the
 * question that structures the Euthyphro: what is piety, taken as the single
 * form shared by every pious act. All dialogue is original writing that
 * follows the argument's shape; it is not a quotation of any translation.
 */
export const euthyphroTree: DialogueTree = {
  id: "euthyphro",
  title: "On piety",
  entry: "opening",
  nodes: {
    opening: {
      id: "opening",
      lines: [
        {
          text: "I find myself in want of a teacher, and you seem confident in this matter, so instruct me: what is piety, that single thing which is present alike in every pious act and makes it pious, and whose absence would make an act impious instead?",
          citation: {
            work: "Euthyphro",
            locator: "5c-6e",
            tag: "attested",
            gloss: "Socrates' opening request for a single defining form (eidos) shared by all pious acts, the same request-pattern that structures his search for definitions throughout the early dialogues.",
          },
        },
      ],
      branches: { concede: "gods-quarrel", defend: "gods-quarrel", clarify: "opening-clarify" },
      fallthrough: "gods-quarrel",
    },
    "opening-clarify": {
      id: "opening-clarify",
      lines: [
        {
          text: "I ask for one thing, not a list of examples. If you tell me this act is pious and that one too, I still will not know what piety itself is, the standard by which I could judge any act, including ones neither of us has thought of yet. Give me that standard.",
          citation: {
            work: "Euthyphro",
            locator: "6d-e",
            tag: "attested",
            gloss: "Socrates' recurring complaint that examples are not definitions, made explicit here against Euthyphro's first attempt.",
          },
        },
      ],
      branches: { concede: "gods-quarrel", defend: "gods-quarrel" },
      fallthrough: "gods-quarrel",
    },
    "gods-quarrel": {
      id: "gods-quarrel",
      lines: [
        {
          text: "Suppose, then, that the pious is whatever is approved of, sanctioned, loved by those with rightful authority over it. But it is said that even the gods themselves are at odds over what is just and unjust, honorable and shameful. If that is so, could a single act be approved by one such authority and condemned by another, and would it then have to be both pious and impious at once?",
          citation: {
            work: "Euthyphro",
            locator: "7a-8a",
            tag: "attested",
            gloss: "The dispute-among-the-gods argument: authority-based accounts of piety run into trouble once the authorities themselves are shown to disagree.",
          },
        },
      ],
      branches: { concede: "dilemma", defend: "gods-quarrel-defend", clarify: "gods-quarrel-clarify" },
      fallthrough: "dilemma",
    },
    "gods-quarrel-clarify": {
      id: "gods-quarrel-clarify",
      lines: [
        {
          text: "I mean this: if piety is simply 'what is approved by the highest authority,' then piety has no content of its own, it only borrows whatever content that authority happens to hand it on a given day. And if two authorities disagree, as we are told they do, the same act inherits contradictory properties. That should trouble any definition built on approval alone.",
          citation: {
            work: "Euthyphro",
            locator: "7b-8b",
            tag: "attested",
            gloss: "Restates the consequence of grounding piety in approval when the approving authorities themselves conflict.",
          },
        },
      ],
      branches: { concede: "dilemma", defend: "gods-quarrel-defend" },
      fallthrough: "dilemma",
    },
    "gods-quarrel-defend": {
      id: "gods-quarrel-defend",
      lines: [
        {
          text: "You want to say the disagreement is only about who did what to whom, never about piety itself, so the difficulty passes you by. But look closer: authorities do not merely dispute facts, they dispute what counts as just punishment, fair debt, rightful honor, exactly the questions piety is supposed to settle. If the authority is unsettled on those, its approval cannot be the ground floor you are building on.",
          citation: {
            work: "Euthyphro",
            locator: "7d-8a",
            tag: "attested",
            gloss: "Sharpens the objection: the disagreements concern matters of value, the very domain piety claims to govern, not merely disputed facts.",
          },
        },
      ],
      branches: { concede: "dilemma" },
      fallthrough: "dilemma",
    },
    dilemma: {
      id: "dilemma",
      lines: [
        {
          text: "Then set the quarrel aside and grant, for argument's sake, an authority whose approval never divides. Even so, I want to know this: is a pious act pious because that authority loves it, or does the authority love it because it is, independently, pious? Answer carefully, because the two are not the same claim, and only one of them tells me what piety is rather than merely what is true of it.",
          citation: {
            work: "Euthyphro",
            locator: "9e-11b",
            tag: "attested",
            gloss: "The famous dilemma: whether piety is constituted by divine approval, or divine approval merely tracks an independently existing piety. Being-loved is at most a property of piety, not its essence.",
          },
        },
      ],
      branches: { concede: "aporia", defend: "dilemma-defend", clarify: "dilemma-clarify" },
      fallthrough: "aporia",
    },
    "dilemma-clarify": {
      id: "dilemma-clarify",
      lines: [
        {
          text: "Consider something carried and something carrying. A thing is carried because someone carries it, not carried already and then, separately, picked up. If loved-by-the-gods works the same way, being loved is something that happens to piety, a state it comes to be in, and not the thing itself that makes it pious. So which do you mean: piety as the cause of that love, or piety as nothing more than the state of being loved?",
          citation: {
            work: "Euthyphro",
            locator: "10a-11a",
            tag: "attested",
            gloss: "The carried/carrying analogy Socrates uses to show that a passive state, such as being loved, cannot itself be the active essence it depends on.",
          },
        },
      ],
      branches: { concede: "aporia", defend: "dilemma-defend" },
      fallthrough: "aporia",
    },
    "dilemma-defend": {
      id: "dilemma-defend",
      lines: [
        {
          text: "You would have the two sides of the dilemma collapse into one another, as though 'loved because pious' and 'pious because loved' came to the same thing. They do not: one names a cause, the other names an effect, and a definition needs to give me the cause, the thing itself, not a state that merely follows from it. Until you can say which side you mean, you have described a symptom of piety, not piety.",
          citation: {
            work: "Euthyphro",
            locator: "10e-11b",
            tag: "attested",
            gloss: "Presses the same distinction once more when the interlocutor resists separating the two horns of the dilemma.",
          },
        },
      ],
      branches: { concede: "aporia" },
      fallthrough: "aporia",
    },
    aporia: {
      id: "aporia",
      lines: [
        {
          text: "So we circle back to where we began, no closer to it than before. We have shown that piety cannot simply be what is approved, since approval divides against itself, and that even a settled love cannot be the essence rather than a state that follows one. That is real progress of a kind, but it is not a definition, and I still do not know what piety is, and neither, I think, do you.",
          citation: {
            work: "Euthyphro",
            locator: "11b, 15c-e",
            tag: "attested",
            gloss: "Mirrors the dialogue's actual conclusion: every offered definition is undone, and Euthyphro departs without having supplied one, an ending the text treats as genuinely open rather than resolved.",
          },
        },
      ],
      branches: {},
      isAporia: true,
      reflection:
        "The impasse lands on the difference between a cause and a state that follows from it. You could say what piety is loved for, or approved for, but each time the question just moved one step back: loved for what? The single defining form was never produced, only ruled out in two of its likeliest disguises, being commanded and being approved. What is left unexamined, and would be worth pressing next, is whether piety is even the kind of thing that has one form across every case, or whether that assumption itself is where the trouble starts.",
    },
  },
};
