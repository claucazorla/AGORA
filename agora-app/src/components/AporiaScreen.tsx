import { ArrowCounterClockwiseIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TranscriptTurn } from "../lib/types";
import DialogueTranscript from "./DialogueTranscript";

export default function AporiaScreen({
  reflection,
  transcript,
}: {
  reflection: string;
  transcript: TranscriptTurn[];
}) {
  const navigate = useNavigate();
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <main className="min-h-[100dvh] bg-stone-50 text-ink-900 dark:bg-basalt-950 dark:text-parchment-100">
      <div className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col px-6 py-16 sm:px-10">
        <span className="font-mono text-[12px] tracking-[0.14em] text-verdigris-600 uppercase dark:text-verdigris-400">
          The dialogue has reached
        </span>
        <h1 className="mt-3 font-serif text-5xl leading-[1.1] italic sm:text-6xl">Aporia.</h1>
        <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-stone-600 dark:text-parchment-300">
          Neither side has secured the truth. In the early dialogues, this is not where the
          conversation failed. It is where honest inquiry tends to arrive.
        </p>

        <div className="mt-10 border-t border-stone-200 pt-8 dark:border-basalt-800">
          <span className="font-mono text-[12px] tracking-[0.1em] text-stone-500 uppercase dark:text-stone-400">
            Where the impasse lies
          </span>
          <p className="mt-4 font-serif text-xl leading-relaxed text-ink-900 dark:text-parchment-100">
            {reflection}
          </p>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6 dark:border-basalt-800">
          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            className="flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-stone-600 uppercase transition-colors hover:text-verdigris-600 dark:text-parchment-300 dark:hover:text-verdigris-400"
            aria-expanded={showTranscript}
          >
            <CaretDownIcon
              size={14}
              weight="bold"
              className={`transition-transform ${showTranscript ? "rotate-180" : ""}`}
            />
            {showTranscript ? "Hide the exchange" : "Review the exchange"}
          </button>
          {showTranscript && (
            <div className="mt-6 border-l-2 border-stone-200 pl-5 dark:border-basalt-800">
              <DialogueTranscript turns={transcript} />
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-14 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 rounded-[4px] bg-verdigris-600 px-5 py-2.5 text-sm font-medium text-stone-50 transition-transform active:scale-[0.98] dark:bg-verdigris-500"
          >
            <ArrowCounterClockwiseIcon size={16} weight="bold" />
            Return to the Agora
          </button>
        </div>
      </div>
    </main>
  );
}
