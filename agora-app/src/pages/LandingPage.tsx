import { ArrowRight, ScrollIcon } from "@phosphor-icons/react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [thesis, setThesis] = useState("");
  const [error, setError] = useState(false);

  function startOpen() {
    navigate("/dialogue", { state: { mode: "open" } });
  }

  function startThesis(e: FormEvent) {
    e.preventDefault();
    const trimmed = thesis.trim();
    if (trimmed.length < 8) {
      setError(true);
      return;
    }
    navigate("/dialogue", { state: { mode: "thesis", thesis: trimmed } });
  }

  return (
    <main className="min-h-[100dvh] bg-stone-50 text-ink-900 dark:bg-basalt-950 dark:text-parchment-100">
      <div className="mx-auto flex min-h-[100dvh] max-w-5xl flex-col px-6 pt-16 pb-12 sm:px-10">
        <header className="flex items-center justify-between">
          <span className="font-mono text-[13px] tracking-[0.14em] text-stone-600 uppercase dark:text-parchment-300">
            Agora
          </span>
          <a
            href="#about"
            className="font-mono text-[13px] tracking-[0.1em] text-stone-600 uppercase transition-colors hover:text-verdigris-600 dark:text-parchment-300 dark:hover:text-verdigris-400"
          >
            The method
          </a>
        </header>

        <section className="mt-16 max-w-2xl sm:mt-20">
          <h1 className="font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl">
            Argue with{" "}
            <em className="pb-1 leading-[1.1] italic">the dead.</em>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-stone-600 dark:text-parchment-300">
            Take a position. Socrates will take it apart, in character, grounded in Plato's
            early dialogues, and he will not let you off easy.
          </p>
        </section>

        <section className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2">
          <button
            type="button"
            onClick={startOpen}
            className="group flex flex-col items-start rounded-[4px] border border-stone-200 bg-stone-50 p-7 text-left transition-colors hover:border-verdigris-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verdigris-500 dark:border-basalt-800 dark:bg-basalt-900"
          >
            <span className="font-mono text-[12px] tracking-[0.1em] text-stone-600 uppercase dark:text-parchment-300">
              Open dialogue
            </span>
            <span className="mt-3 font-serif text-2xl leading-snug">
              Socrates opens with a question of his own choosing.
            </span>
            <span className="mt-4 flex items-center gap-2 text-sm font-medium text-verdigris-600 dark:text-verdigris-400">
              Begin
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </button>

          <form
            onSubmit={startThesis}
            className="flex flex-col items-start rounded-[4px] border border-stone-200 bg-stone-50 p-7 text-left dark:border-basalt-800 dark:bg-basalt-900"
          >
            <span className="font-mono text-[12px] tracking-[0.1em] text-stone-600 uppercase dark:text-parchment-300">
              Defend a thesis
            </span>
            <span className="mt-3 font-serif text-2xl leading-snug">
              State a position. He restates it fairly, then interrogates it.
            </span>
            <label htmlFor="thesis" className="mt-5 w-full">
              <span className="mb-2 block text-sm font-medium text-stone-600 dark:text-parchment-300">
                Your thesis
              </span>
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
                className="w-full rounded-[4px] border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-base text-ink-900 placeholder:text-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verdigris-500 dark:border-basalt-800 dark:bg-basalt-950 dark:text-parchment-100 dark:placeholder:text-stone-600"
              />
              {error && (
                <span className="mt-2 block text-sm text-verdigris-700 dark:text-verdigris-400">
                  Give him a full claim to work with, not a single word.
                </span>
              )}
            </label>
            <button
              type="submit"
              className="mt-5 flex items-center gap-2 rounded-[4px] bg-verdigris-600 px-4 py-2.5 text-sm font-medium text-stone-50 transition-transform active:scale-[0.98] dark:bg-verdigris-500"
            >
              Defend it
              <ArrowRight size={16} weight="bold" />
            </button>
          </form>
        </section>

        <section id="about" className="mt-20 max-w-2xl border-t border-stone-200 pt-10 sm:mt-24 dark:border-basalt-800">
          <div className="flex items-start gap-3">
            <ScrollIcon size={20} weight="light" className="mt-1 shrink-0 text-verdigris-600 dark:text-verdigris-400" />
            <p className="text-[15px] leading-relaxed text-stone-600 dark:text-parchment-300">
              Every claim Socrates makes is tagged in the margin by how well evidenced it
              actually is: drawn directly from Plato's Apology, Crito, Euthyphro, Laches,
              Charmides, the opening of Meno, and Republic Book I, or his method applied
              honestly to ground the text never covers. When neither side secures the truth,
              the session ends in aporia, and that is treated as the point, not a failure to
              reach one.
            </p>
          </div>
        </section>

        <footer className="mt-auto pt-16">
          <p className="font-mono text-[12px] tracking-[0.08em] text-stone-400 uppercase dark:text-stone-600">
            A first draft.
          </p>
        </footer>
      </div>
    </main>
  );
}
