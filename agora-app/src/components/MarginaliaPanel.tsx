import { NotebookIcon } from "@phosphor-icons/react";
import type { Citation, ConfidenceTag } from "../lib/types";

const TAG_LABEL: Record<ConfidenceTag, string> = {
  attested: "Attested",
  "method-new-terrain": "Demonstrated Method on New Terrain",
  "consistent-extrapolation": "Consistent Extrapolation",
};

const TAG_HINT: Record<ConfidenceTag, string> = {
  attested: "A passage in the source text supports this directly.",
  "method-new-terrain": "His method, applied somewhere the text does not directly cover.",
  "consistent-extrapolation": "In character, but not directly evidenced in the source.",
};

function TagBadge({ tag }: { tag: ConfidenceTag }) {
  const filled = tag === "attested";
  const outlined = tag === "method-new-terrain";
  return (
    <span
      title={TAG_HINT[tag]}
      className={[
        "inline-flex w-fit items-center rounded-full px-2.5 py-1 font-mono text-[11px] tracking-[0.04em]",
        filled
          ? "bg-verdigris-600 text-stone-50 dark:bg-verdigris-500"
          : outlined
            ? "border border-verdigris-500 text-verdigris-700 dark:border-verdigris-400 dark:text-verdigris-400"
            : "border border-stone-300 text-stone-600 dark:border-stone-600 dark:text-stone-400",
      ].join(" ")}
    >
      {TAG_LABEL[tag]}
    </span>
  );
}

export function MarginaliaContent({ citation }: { citation?: Citation }) {
  if (!citation) {
    return (
      <p className="text-sm text-stone-400 dark:text-stone-600">
        Citations for Socrates' turns will appear here as the dialogue proceeds.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[13px] text-stone-800 dark:text-parchment-100">{citation.work}</span>
        <span className="font-mono text-[12px] text-stone-500 dark:text-stone-400">{citation.locator}</span>
      </div>
      <TagBadge tag={citation.tag} />
      <p className="font-serif text-[15px] leading-relaxed text-stone-600 italic dark:text-parchment-300">
        {citation.gloss}
      </p>
    </div>
  );
}

export default function MarginaliaPanel({ citation }: { citation?: Citation }) {
  return (
    <aside className="hidden w-[320px] shrink-0 border-l border-stone-200 bg-stone-100/60 px-7 py-8 lg:block dark:border-basalt-800 dark:bg-basalt-900/40">
      <div className="sticky top-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
          <NotebookIcon size={16} weight="light" />
          <span className="font-mono text-[12px] tracking-[0.1em] uppercase">Marginalia</span>
        </div>
        <MarginaliaContent citation={citation} />
      </div>
    </aside>
  );
}
