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
          ? "bg-verdigris-500 text-basalt-950"
          : outlined
            ? "border border-verdigris-400 text-verdigris-400"
            : "border border-basalt-600 text-parchment-500",
      ].join(" ")}
    >
      {TAG_LABEL[tag]}
    </span>
  );
}

export function MarginaliaContent({ citation }: { citation?: Citation }) {
  if (!citation) {
    return (
      <p className="text-sm text-basalt-600">Citations for Socrates' turns will appear here as the dialogue proceeds.</p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[13px] text-parchment-100">{citation.work}</span>
        <span className="font-mono text-[12px] text-parchment-500">{citation.locator}</span>
      </div>
      <TagBadge tag={citation.tag} />
      <p className="font-serif text-[15px] leading-relaxed text-parchment-300 italic">{citation.gloss}</p>
    </div>
  );
}

export default function MarginaliaPanel({ citation }: { citation?: Citation }) {
  return (
    <aside className="hidden w-[320px] shrink-0 border-l border-basalt-800 bg-basalt-900/40 px-7 py-8 lg:block">
      <div className="sticky top-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-parchment-500">
          <NotebookIcon size={16} weight="light" />
          <span className="font-mono text-[12px] tracking-[0.1em] uppercase">Marginalia</span>
        </div>
        <MarginaliaContent citation={citation} />
      </div>
    </aside>
  );
}
