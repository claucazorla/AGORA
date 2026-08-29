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
    return <AporiaScreen reflection={session.reflection} transcript={session.transcript} />;
  }

  return (
    <main className="min-h-[100dvh] bg-stone-50 text-ink-900 dark:bg-basalt-950 dark:text-parchment-100">
      <div className="flex min-h-[100dvh] flex-col lg:flex-row">
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-stone-200 px-6 sm:px-10 dark:border-basalt-800">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="font-mono text-[13px] tracking-[0.14em] text-stone-600 uppercase transition-colors hover:text-verdigris-600 dark:text-parchment-300 dark:hover:text-verdigris-400"
            >
              Agora
            </button>
            <div className="flex items-center gap-4">
              <span className="hidden font-mono text-[12px] text-stone-500 sm:inline dark:text-stone-400">
                {tree.title}
              </span>
              <span className="font-mono text-[12px] text-stone-400 dark:text-stone-600">
                Turn {session.turnCount}
              </span>
              <button
                type="button"
                onClick={() => setMarginaliaOpen((v) => !v)}
                className="flex items-center gap-1.5 text-stone-600 lg:hidden dark:text-parchment-300"
                aria-expanded={marginaliaOpen}
                aria-label="Toggle marginalia"
              >
                <NotebookIcon size={20} weight="light" />
              </button>
            </div>
          </header>

          {marginaliaOpen && (
            <div className="border-b border-stone-200 bg-stone-100/60 px-6 py-6 lg:hidden dark:border-basalt-800 dark:bg-basalt-900/40">
              <MarginaliaContent citation={lastSocratesCitation} />
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
            <DialogueTranscript turns={session.transcript} />
          </div>

          <form
            onSubmit={submit}
            className="flex shrink-0 flex-col gap-3 border-t border-stone-200 px-6 py-5 sm:flex-row sm:items-end sm:px-10 dark:border-basalt-800"
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
                className="w-full resize-none rounded-[4px] border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-[15px] leading-relaxed text-ink-900 placeholder:text-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verdigris-500 dark:border-basalt-800 dark:bg-basalt-900 dark:text-parchment-100 dark:placeholder:text-stone-600"
              />
            </label>
            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-2">
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex items-center gap-2 rounded-[4px] bg-verdigris-600 px-4 py-2.5 text-sm font-medium text-stone-50 transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-verdigris-500"
              >
                Reply
                <PaperPlaneTiltIcon size={15} weight="fill" />
              </button>
              <button
                type="button"
                onClick={endInAporia}
                className="font-mono text-[11px] tracking-[0.06em] text-stone-500 uppercase transition-colors hover:text-verdigris-600 dark:text-stone-400 dark:hover:text-verdigris-400"
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
