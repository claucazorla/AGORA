import { NotebookIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { type FormEvent, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AporiaScreen from "../components/AporiaScreen";
import DialogueTranscript from "../components/DialogueTranscript";
import { MarginaliaContent } from "../components/MarginaliaPanel";
import MarginaliaPanel from "../components/MarginaliaPanel";
import { euthyphroTree } from "../lib/dialogues/euthyphro";
import { advanceSession, forceAporia, initSession } from "../lib/engine";
import { selectThesisTree } from "../lib/selectTree";
import type { DialogueTree, SessionMode, SessionState } from "../lib/types";

interface LocationState {
  characterId?: string;
  mode?: SessionMode;
  thesis?: string;
}

function resolveTree(mode: SessionMode, thesis?: string): DialogueTree {
  if (mode === "thesis" && thesis) return selectThesisTree(thesis);
  return euthyphroTree;
}

export default function DialoguePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state ?? {}) as LocationState;
  const mode: SessionMode = state.mode === "thesis" ? "thesis" : "open";
  const characterId = state.characterId ?? "socrates";

  const tree = useMemo(() => resolveTree(mode, state.thesis), [mode, state.thesis]);
  const [session, setSession] = useState<SessionState>(() => initSession(tree, mode, state.thesis));
  const [input, setInput] = useState("");
  const [marginaliaOpen, setMarginaliaOpen] = useState(false);

  if (!state.mode) {
    navigate("/", { replace: true });
    return null;
  }

  const lastSocratesCitation = [...session.transcript].reverse().find((t) => t.speaker === "socrates")?.citation;

  function submit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || session.status === "aporia") return;
    setSession((s) => advanceSession(tree, s, text));
    setInput("");
  }

  function endInAporia() {
    setSession((s) => forceAporia(tree, s));
  }

  if (session.status === "aporia" && session.reflection) {
    return <AporiaScreen reflection={session.reflection} transcript={session.transcript} characterId={characterId} />;
  }

  return (
    <main className="min-h-[100dvh] bg-basalt-950 text-parchment-100">
      <div className="flex min-h-[100dvh] flex-col lg:flex-row">
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-basalt-800 px-6 sm:px-10">
            <button
              type="button"
              onClick={() => navigate(`/${characterId}`)}
              className="font-mono text-[13px] tracking-[0.14em] text-parchment-300 uppercase transition-colors hover:text-verdigris-400"
            >
              Agora
            </button>
            <div className="flex items-center gap-4">
              <span className="hidden font-mono text-[12px] text-parchment-500 sm:inline">{tree.title}</span>
              <span className="font-mono text-[12px] text-basalt-600">Turn {session.turnCount}</span>
              <button
                type="button"
                onClick={() => setMarginaliaOpen((v) => !v)}
                className="flex items-center gap-1.5 text-parchment-300 lg:hidden"
                aria-expanded={marginaliaOpen}
                aria-label="Toggle marginalia"
              >
                <NotebookIcon size={20} weight="light" />
              </button>
            </div>
          </header>

          {marginaliaOpen && (
            <div className="border-b border-basalt-800 bg-basalt-900/60 px-6 py-6 lg:hidden">
              <MarginaliaContent citation={lastSocratesCitation} />
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
            <DialogueTranscript turns={session.transcript} />
          </div>

          <form
            onSubmit={submit}
            className="flex shrink-0 flex-col gap-3 border-t border-basalt-800 px-6 py-5 sm:flex-row sm:items-end sm:px-10"
          >
            <label htmlFor="reply" className="flex-1">
              <span className="sr-only">Your reply</span>
              <textarea
                id="reply"
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(e);
                  }
                }}
                placeholder="Answer him directly."
                className="w-full resize-none rounded-[2px] border border-basalt-700 bg-basalt-900 px-3.5 py-2.5 text-[15px] leading-relaxed text-parchment-100 placeholder:text-parchment-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verdigris-500"
              />
            </label>
            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-2">
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex items-center gap-2 rounded-[2px] bg-verdigris-500 px-4 py-2.5 text-sm font-medium text-basalt-950 transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Reply
                <PaperPlaneTiltIcon size={15} weight="fill" />
              </button>
              <button
                type="button"
                onClick={endInAporia}
                className="font-mono text-[11px] tracking-[0.06em] text-parchment-500 uppercase transition-colors hover:text-verdigris-400"
              >
                I have no further defense
              </button>
            </div>
          </form>
        </div>

        <MarginaliaPanel citation={lastSocratesCitation} />
      </div>
    </main>
  );
}
