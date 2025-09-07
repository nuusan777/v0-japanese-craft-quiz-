import React from "react";

interface PointCircleProps {
  point: number;
  label?: string;
}

export const PointCircle: React.FC<PointCircleProps> = ({ point, label = "総獲得ポイント" }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-1 text-base font-semibold text-black leading-tight text-center">{label}</span>
    <div className="relative w-36 h-36 flex items-center justify-center">
  <svg width={124} height={144} viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" fill="#fff" stroke="#7c5a56" strokeWidth={8} />
        </svg>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-[#7c5a56]">
          {point}
        </span>
      </div>
    </div>
  );
};
