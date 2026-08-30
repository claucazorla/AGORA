import { ArrowCounterClockwiseIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TranscriptTurn } from "../lib/types";
import DialogueTranscript from "./DialogueTranscript";

export default function AporiaScreen({
  reflection,
  transcript,
  characterId,
}: {
  reflection: string;
  transcript: TranscriptTurn[];
  characterId: string;
}) {
  const navigate = useNavigate();
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <main className="min-h-[100dvh] bg-basalt-950 text-parchment-100">
      <div className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col px-6 py-16 sm:px-10">
        <span className="font-mono text-[12px] tracking-[0.14em] text-verdigris-400 uppercase">
          The dialogue has reached
        </span>
        <h1 className="mt-2 font-display text-8xl leading-[0.85] tracking-tight sm:text-9xl">Aporia.</h1>
        <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-parchment-300">
          Neither side has secured the truth. In the early dialogues, this is not where the
          conversation failed. It is where honest inquiry tends to arrive.
        </p>

        <div className="mt-10 border-t border-basalt-800 pt-8">
          <span className="font-mono text-[12px] tracking-[0.1em] text-parchment-500 uppercase">
            Where the impasse lies
          </span>
          <p className="mt-4 font-serif text-xl leading-relaxed text-parchment-100">{reflection}</p>
        </div>

        <div className="mt-10 border-t border-basalt-800 pt-6">
          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            className="flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-parchment-300 uppercase transition-colors hover:text-verdigris-400"
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
            <div className="mt-6 border-l-2 border-basalt-800 pl-5">
              <DialogueTranscript turns={transcript} />
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-14 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(`/${characterId}`)}
            className="flex items-center justify-center gap-2 rounded-[2px] bg-verdigris-500 px-5 py-2.5 text-sm font-medium text-basalt-950 transition-transform active:scale-[0.98]"
          >
            <ArrowCounterClockwiseIcon size={16} weight="bold" />
            Argue again
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 rounded-[2px] border border-basalt-700 px-5 py-2.5 text-sm font-medium text-parchment-100 transition-colors hover:border-verdigris-500"
          >
            Return to the roster
          </button>
        </div>
      </div>
    </main>
  );
}
