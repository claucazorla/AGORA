/**
 * Bold, abstracted profile-silhouette marks in the style of an engraved
 * medallion, one per character. Not photorealistic; each figure is reduced
 * to a head-and-shoulders profile plus a single distinguishing attribute
 * (Socrates' beard, Aquinas' cowl, Kierkegaard's top hat, Hume's tied wig).
 */

import type { CSSProperties, JSX, ReactNode } from "react";

type SilhouetteId = "socrates" | "aquinas" | "kierkegaard" | "hume";

function Base({ children }: { children?: ReactNode }) {
  return (
    <>
      {/* shoulders */}
      <path d="M18 118 Q30 78 62 78 Q94 78 106 118 L106 132 L18 132 Z" />
      {/* head */}
      <circle cx="62" cy="52" r="26" />
      {children}
    </>
  );
}

function SocratesDetail() {
  return (
    <>
      {/* snub nose */}
      <path d="M86 50 Q92 53 87 58 L82 56 Z" />
      {/* full beard, scalloped bottom */}
      <path d="M40 60 Q38 82 46 92 Q52 98 62 98 Q72 98 78 92 Q86 82 84 60 Q80 72 62 72 Q44 72 40 60 Z" />
      <path d="M46 90 Q49 96 53 91 Q56 97 60 91 Q64 97 68 91 Q71 96 74 90" fill="none" strokeWidth="2.5" />
    </>
  );
}

function AquinasDetail() {
  return (
    <>
      {/* cowl enclosing the head, draping to the shoulders */}
      <path d="M36 46 Q36 18 62 18 Q88 18 88 46 Q88 62 86 78 L84 118 L40 118 L38 78 Q36 62 36 46 Z" />
      {/* reveal a sliver of face against the cowl */}
      <circle cx="66" cy="54" r="19" fill="var(--portrait-ground)" />
    </>
  );
}

function KierkegaardDetail() {
  return (
    <>
      {/* top hat: brim + crown */}
      <rect x="42" y="21" width="40" height="6" rx="1" />
      <rect x="48" y="2" width="26" height="21" rx="1" />
    </>
  );
}

function HumeDetail() {
  return (
    <>
      {/* fuller tied wig, puffed at the sides and back */}
      <path d="M34 36 Q30 52 36 66 Q28 68 28 78 Q28 86 36 88 L40 78 Q34 60 40 42 Z" />
      <path d="M90 36 Q94 52 88 66 Q86 78 78 80 L82 90 Q94 88 96 76 Q98 62 90 36 Z" />
      {/* queue at the neck */}
      <path d="M84 80 Q94 84 92 96 Q90 104 82 102 Q86 90 78 82 Z" />
    </>
  );
}

const DETAILS: Record<SilhouetteId, () => JSX.Element> = {
  socrates: SocratesDetail,
  aquinas: AquinasDetail,
  kierkegaard: KierkegaardDetail,
  hume: HumeDetail,
};

export default function PortraitMark({
  id,
  muted = false,
  className,
}: {
  id: SilhouetteId;
  muted?: boolean;
  className?: string;
}) {
  const Detail = DETAILS[id];
  return (
    <svg
      viewBox="0 0 124 140"
      className={className}
      role="img"
      aria-label={`Portrait mark of ${id}`}
      style={
        {
          "--portrait-ground": muted ? "var(--color-basalt-800)" : "var(--color-basalt-900)",
        } as CSSProperties
      }
    >
      <circle
        cx="62"
        cy="68"
        r="61"
        fill="var(--portrait-ground)"
        stroke={muted ? "var(--color-basalt-600)" : "var(--color-verdigris-500)"}
        strokeWidth="1.5"
      />
      <g fill={muted ? "var(--color-mute-500)" : "var(--color-verdigris-400)"} stroke="none">
        <Base>
          <Detail />
        </Base>
      </g>
    </svg>
  );
}
