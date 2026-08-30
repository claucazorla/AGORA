import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { type FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PortraitMark from "../components/portraits/PortraitMark";
import { getCharacter } from "../lib/characters";

export default function CharacterPage() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const character = characterId ? getCharacter(characterId) : undefined;
  const [thesis, setThesis] = useState("");
  const [error, setError] = useState(false);

  if (!character || character.status !== "available") {
    navigate("/", { replace: true });
    return null;
  }

  function startOpen() {
    navigate("/dialogue", { state: { characterId: character!.id, mode: "open" } });
  }

  function startThesis(e: FormEvent) {
    e.preventDefault();
    const trimmed = thesis.trim();
    if (trimmed.length < 8) {
      setError(true);
      return;
    }
    navigate("/dialogue", { state: { characterId: character!.id, mode: "thesis", thesis: trimmed } });
  }

  return (
    <main className="min-h-[100dvh] bg-basalt-950 text-parchment-100">
      <div className="mx-auto max-w-[1400px] px-6 pt-8 pb-20 sm:px-10 sm:pt-10">
        <header>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-mono text-[12px] tracking-[0.1em] text-parchment-300 uppercase transition-colors hover:text-verdigris-400"
          >
            <ArrowLeftIcon size={14} weight="bold" />
            The roster
          </button>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <PortraitMark id="socrates" className="w-40 sm:w-56" />
            <h1 className="mt-6 font-display text-7xl leading-[0.88] tracking-tight sm:text-8xl">
              {character.name}
            </h1>
            <p className="mt-3 font-serif text-xl text-parchment-300 italic">{character.epithet}</p>
            <p className="mt-1 font-mono text-[12px] text-parchment-500">{character.years}</p>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-parchment-300">
              {character.grounding}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <button
              type="button"
              onClick={startOpen}
              className="group flex flex-col items-start rounded-[2px] border border-basalt-700 bg-basalt-900 p-7 text-left transition-colors hover:border-verdigris-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verdigris-500"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-parchment-500 uppercase">
                Open dialogue
              </span>
              <span className="mt-3 font-serif text-2xl leading-snug">
                He opens with a question of his own choosing.
              </span>
              <span className="mt-5 flex items-center gap-2 text-sm font-medium text-verdigris-400">
                Begin
                <ArrowRightIcon size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>

            <form
              onSubmit={startThesis}
              className="flex flex-col items-start rounded-[2px] border border-basalt-700 bg-basalt-900 p-7 text-left"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-parchment-500 uppercase">
                Defend a thesis
              </span>
              <span className="mt-3 font-serif text-2xl leading-snug">
                State a position. He restates it fairly, then interrogates it.
              </span>
              <label htmlFor="thesis" className="mt-5 w-full">
                <span className="mb-2 block text-sm font-medium text-parchment-300">Your thesis</span>
                <input
                  id="thesis"
                  name="thesis"
                  type="text"
                  value={thesis}
                  onChange={(e) => {
                    setThesis(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Justice is the advantage of the stronger"
                  className="w-full rounded-[2px] border border-basalt-600 bg-basalt-950 px-3.5 py-2.5 text-base text-parchment-100 placeholder:text-parchment-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verdigris-500"
                />
                {error && (
                  <span className="mt-2 block text-sm text-verdigris-300">
                    Give him a full claim to work with, not a single word.
                  </span>
                )}
              </label>
              <button
                type="submit"
                className="mt-5 flex items-center gap-2 rounded-[2px] bg-verdigris-500 px-4 py-2.5 text-sm font-medium text-basalt-950 transition-transform active:scale-[0.98]"
              >
                Defend it
                <ArrowRightIcon size={16} weight="bold" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
