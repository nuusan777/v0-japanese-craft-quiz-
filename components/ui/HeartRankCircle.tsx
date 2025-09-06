import React from "react";

interface HeartRankCircleProps {
  rank: number; // 1〜10
  label?: string;
}

const MAX_RANK = 10;

export const HeartRankCircle: React.FC<HeartRankCircleProps> = ({ rank, label = "伝統品愛着度ランク" }) => {
  const fillPercent = Math.max(0, Math.min(1, rank / MAX_RANK));

  // 波型パス生成（下端→波型→下端→閉じる）
  const waveY = 82 - 60 * fillPercent;
  let wavePath = `M10,82 `;
  for (let x = 10; x <= 90; x += 8) {
    const y = waveY - 4 * Math.sin((x - 10) / 80 * Math.PI * 2);
    wavePath += `L${x},${y} `;
  }
  wavePath += `L90,82 L10,82 Z`;

  return (
    <div className="flex flex-col items-center">
      <span className="mb-1 text-base font-semibold text-black leading-tight text-center">{label}</span>
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg viewBox="0 0 100 90" width={144} height={144}>
          <defs>
            <clipPath id="heart-clip">
              <path d="M50 82
                C20 62, 5 40, 20 25
                C35 10, 50 25, 50 35
                C50 25, 65 10, 80 25
                C95 40, 80 62, 50 82Z" />
            </clipPath>
          </defs>
          {/* 下部ピンク塗りつぶし（波型上端） */}
          <path
            d={wavePath}
            fill="#f8cfd6"
            clipPath="url(#heart-clip)"
            style={{ transition: "d 0.8s" }}
          />
          {/* ハート枠 */}
          <path
            d="M50 82
              C20 62, 5 40, 20 25
              C35 10, 50 25, 50 35
              C50 25, 65 10, 80 25
              C95 40, 80 62, 50 82Z"
            fill="none"
            stroke="#7c5a56"
            strokeWidth={7}
          />
        </svg>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-[#7c5a56]">
          {rank}
        </span>
      </div>
    </div>
  );
};
