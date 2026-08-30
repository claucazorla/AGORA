import { useEffect, useRef } from "react";
import type { TranscriptTurn } from "../lib/types";

export default function DialogueTranscript({ turns }: { turns: TranscriptTurn[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [turns.length]);

  return (
    <div className="flex flex-col gap-8">
      {turns.map((turn, i) =>
        turn.speaker === "socrates" ? (
          <div key={i} className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] tracking-[0.1em] text-parchment-500 uppercase">Socrates</span>
            <p className="max-w-[62ch] font-serif text-[19px] leading-[1.55] text-parchment-100 italic">
              {turn.text}
            </p>
          </div>
        ) : (
          <div key={i} className="flex flex-col items-end gap-1.5">
            <span className="font-mono text-[11px] tracking-[0.1em] text-parchment-500 uppercase">You</span>
            <p className="max-w-[56ch] rounded-[2px] bg-basalt-900 px-4 py-3 text-[16px] leading-relaxed text-parchment-100">
              {turn.text}
            </p>
          </div>
        ),
      )}
      <div ref={bottomRef} />
    </div>
  );
}
