export interface Character {
  id: string;
  name: string;
  epithet: string;
  years: string;
  grounding: string;
  status: "available" | "coming-soon";
}

export const characters: Character[] = [
  {
    id: "socrates",
    name: "Socrates",
    epithet: "The gadfly of Athens",
    years: "c. 470-399 BCE",
    grounding:
      "Grounded in Plato's early dialogues, the ones that end in a question rather than a doctrine: Apology, Crito, Euthyphro, Laches, Charmides, the opening of Meno, and Republic Book I.",
    status: "available",
  },
  {
    id: "aquinas",
    name: "Aquinas",
    epithet: "The Angelic Doctor",
    years: "1225-1274",
    grounding: "Grounded in the Summa Theologiae. Not yet available.",
    status: "coming-soon",
  },
  {
    id: "kierkegaard",
    name: "Kierkegaard",
    epithet: "The melancholy Dane",
    years: "1813-1855",
    grounding: "Grounded in Fear and Trembling and the pseudonymous works. Not yet available.",
    status: "coming-soon",
  },
  {
    id: "hume",
    name: "Hume",
    epithet: "Le Bon David",
    years: "1711-1776",
    grounding: "Grounded in the Treatise and the first Enquiry. Not yet available.",
    status: "coming-soon",
  },
];

export function getCharacter(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}
