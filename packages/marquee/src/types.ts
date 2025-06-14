export interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  speed?: number; // 速度，单位 px/s，默认20
  pauseOnHover?: boolean; // 鼠标悬停时是否暂停，默认 true
  direction?: "left" | "right";
  overflowOnly?: boolean;
}
