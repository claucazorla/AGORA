import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[100dvh] bg-basalt-950 text-parchment-100">
      <div className="mx-auto max-w-[1400px] px-6 pt-8 pb-24 sm:px-10 sm:pt-10">
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

        <h1 className="mt-10 font-display text-[16vw] leading-[0.82] tracking-tight sm:mt-14 sm:text-[9rem] lg:text-[11rem]">
          ABOUT
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-16 sm:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-20">
          <div className="lg:sticky lg:top-16 lg:self-start">
            <p className="font-serif text-3xl leading-snug italic sm:text-4xl">
              Not agreeable chatbots. <em className="not-italic">Real friction.</em>
            </p>
          </div>

          <div className="flex flex-col gap-16">
            <section>
              <span className="font-mono text-[12px] tracking-[0.12em] text-verdigris-400 uppercase">
                What Agora is
              </span>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-parchment-100">
                Agora is an app for having real philosophical arguments with AI personas of
                historical thinkers. You argue a position, or explore an open question, and the
                thinker argues back, grounded in their actual primary texts rather than a
                generic composite of "what a philosopher might say."
              </p>
            </section>

            <section>
              <span className="font-mono text-[12px] tracking-[0.12em] text-verdigris-400 uppercase">
                Why it's different
              </span>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-parchment-100">
                Most conversational AI is built to agree with you, or to hedge until an exchange
                feels comfortable. Agora's characters do neither. Each one argues consistently
                with their real historical positions, pushes back genuinely, and will not
                concede a point that has not actually been earned in the conversation. When a
                conversation reaches a genuine impasse, neither side having secured the truth,
                that is treated as a legitimate, valuable outcome, not a failure to reach
                agreement.
              </p>
            </section>

            <section>
              <span className="font-mono text-[12px] tracking-[0.12em] text-verdigris-400 uppercase">
                How it works
              </span>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-parchment-100">
                Pick a thinker from the roster, then choose Open Dialogue, where they open with a
                question of their own choosing, or Defend a Thesis, where you state a position
                first and they restate it accurately before interrogating it point by point.
                Alongside the conversation, a running margin of citations shows what each
                response is grounded in, so you can see what comes directly from the source text
                versus what is a reasoned extrapolation in character.
              </p>
            </section>

            <section>
              <span className="font-mono text-[12px] tracking-[0.12em] text-verdigris-400 uppercase">
                The vision
              </span>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-parchment-100">
                This prototype starts with one thinker, Socrates, grounded in Plato's early
                dialogues. The roster is built to grow: Aquinas, Kierkegaard, and Hume are next.
                Further out, the goal is a room rather than a one-on-one exchange, multiple
                historical figures arguing with each other and with you in the same
                conversation, plus accounts to save and revisit dialogues, and a shared space to
                read exchanges other people have had.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
