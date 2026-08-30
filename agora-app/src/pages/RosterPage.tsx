import { ArrowRightIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import PortraitMark from "../components/portraits/PortraitMark";
import { characters } from "../lib/characters";

export default function RosterPage() {
  const navigate = useNavigate();
  const socrates = characters.find((c) => c.id === "socrates")!;
  const comingSoon = characters.filter((c) => c.status === "coming-soon");
  const offsets = ["sm:translate-y-6", "sm:translate-y-16", "sm:translate-y-2"];

  return (
    <main className="min-h-[100dvh] bg-basalt-950 text-parchment-100">
      <div className="mx-auto max-w-[1400px] px-6 pt-8 pb-20 sm:px-10 sm:pt-10">
        <header className="flex items-center justify-between">
          <span className="font-mono text-[12px] tracking-[0.14em] text-parchment-300 uppercase">
            Agora
          </span>
          <button
            type="button"
            onClick={() => navigate("/about")}
            className="font-mono text-[12px] tracking-[0.1em] text-parchment-300 uppercase transition-colors hover:text-verdigris-400"
          >
            About Agora
          </button>
        </header>

        <section className="mt-10 sm:mt-16">
          <h1 className="font-display text-[19vw] leading-[0.82] tracking-tight sm:text-[13rem] lg:text-[15rem]">
            AGORA
          </h1>
          <div className="mt-6 flex max-w-3xl flex-col gap-3 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <p className="font-serif text-2xl leading-snug italic sm:text-3xl">
              Argue with <em className="not-italic">the dead.</em>
            </p>
            <p className="max-w-[38ch] text-[15px] leading-relaxed text-parchment-300">
              Real philosophical arguments with AI personas of historical thinkers, grounded in
              their actual primary texts. They do not agree with you by default.
            </p>
          </div>
        </section>

        <section className="mt-20 sm:mt-28">
          <span className="font-mono text-[12px] tracking-[0.12em] text-parchment-500 uppercase">
            Choose a thinker
          </span>

          <div className="mt-8 flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-24">
            <button
              type="button"
              onClick={() => navigate(`/${socrates.id}`)}
              className="group flex w-full max-w-md flex-col items-start gap-6 text-left lg:w-auto lg:shrink-0"
            >
              <PortraitMark id="socrates" className="w-40 transition-transform group-hover:scale-[1.03] sm:w-52" />
              <div>
                <h2 className="font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl">
                  {socrates.name}
                </h2>
                <p className="mt-2 font-serif text-lg text-parchment-300 italic">{socrates.epithet}</p>
                <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-parchment-500">
                  {socrates.grounding}
                </p>
                <span className="mt-5 flex items-center gap-2 text-sm font-medium text-verdigris-400">
                  Begin
                  <ArrowRightIcon
                    size={16}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </button>

            <div className="flex flex-wrap items-start gap-x-10 gap-y-12 pt-2">
              {comingSoon.map((c, i) => (
                <div
                  key={c.id}
                  className={`flex w-32 flex-col items-start gap-3 opacity-60 sm:w-36 ${offsets[i % offsets.length]}`}
                >
                  <PortraitMark id={c.id as "aquinas" | "kierkegaard" | "hume"} muted className="w-full" />
                  <div>
                    <h3 className="font-display text-2xl leading-none tracking-tight text-parchment-300">
                      {c.name}
                    </h3>
                    <span className="mt-2 block font-mono text-[10px] tracking-[0.12em] text-mute-500 uppercase">
                      Coming soon
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
