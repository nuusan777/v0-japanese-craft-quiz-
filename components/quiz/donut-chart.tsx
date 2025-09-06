import React from "react";

interface DonutChartProps {
  value: number; // 0-100
  size?: number; // px
  strokeWidth?: number; // px
  color?: string;
  bgColor?: string;
  textColor?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  value,
  size = 400,
  strokeWidth = 48,
  color = "#7ec6e7",
  bgColor = "#f3f3f3",
  textColor = "#222",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="butt"
      />
      {/* ゲージ本体（下側端のみ丸） */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="butt"
        style={{ transition: "stroke-dashoffset 1s" }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size / 6}
        fontWeight="bold"
        fill={textColor}
        letterSpacing="0.4em"
        style={{ letterSpacing: '0.4em' }}
      >
        {Math.round(value)}%
      </text>
    </svg>
  );
};
