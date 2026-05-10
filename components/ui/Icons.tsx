import { SVGProps } from "react";

type IconProps = { size?: number; color?: string; stroke?: number };

const Icon = ({
  d,
  size = 16,
  color = "currentColor",
  stroke = 1.6,
  fill = "none",
  children,
  vb = 24,
}: IconProps & {
  d?: string;
  fill?: string;
  children?: React.ReactNode;
  vb?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={`0 0 ${vb} ${vb}`}
    fill={fill}
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {d ? <path d={d} /> : children}
  </svg>
);

export const Logo = ({ size = 22, color = "#0D9488" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2.5 L21 7 V17 L12 21.5 L3 17 V7 Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M15.2 9.4c-.5-1-1.7-1.6-3-1.6-1.7 0-3 .9-3 2.2 0 1.4 1.3 1.9 3 2.2 1.7.3 3 .8 3 2.2 0 1.3-1.3 2.2-3 2.2-1.4 0-2.5-.6-3-1.7"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export const Search = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p} d="M5 12.5 10 17 19 7" />
);

export const ArrowR = (p: IconProps) => (
  <Icon {...p} d="M5 12h14M13 6l6 6-6 6" />
);

export const Copy = (p: IconProps) => (
  <Icon {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Icon>
);

export const Tag = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 12V4h8l10 10-8 8L3 12z" />
    <circle cx="7.5" cy="7.5" r="1.2" />
  </Icon>
);

export const Heading = (p: IconProps) => (
  <Icon {...p} d="M5 4v16M19 4v16M5 12h14" />
);

export const Link = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.5 14.5 14.5 9.5" />
    <path d="M11 6.5l1.5-1.5a4 4 0 0 1 5.7 5.7L16.5 12" />
    <path d="M13 17.5 11.5 19a4 4 0 0 1-5.7-5.7L7.5 12" />
  </Icon>
);

export const Image = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="1.5" />
    <path d="m21 16-5-5L7 20" />
  </Icon>
);

export const Key = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="8" cy="14" r="4" />
    <path d="m11 11 9-9" />
    <path d="m18 4 2 2M16 6l2 2" />
  </Icon>
);

export const Speed = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 18a8 8 0 1 1 16 0" />
    <path d="M12 14l4-4" />
    <circle cx="12" cy="14" r="1.2" fill="currentColor" />
  </Icon>
);

export const Home = (p: IconProps) => (
  <Icon {...p} d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />
);
export const Chart = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
  </Icon>
);
export const Card = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18M7 15h4" />
  </Icon>
);
export const Doc = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </Icon>
);
export const Down = (p: IconProps) => <Icon {...p} d="M6 9l6 6 6-6" />;
export const Down2 = (p: IconProps) => <Icon {...p} d="M8 10l4 4 4-4" />;
export const Lightning = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M13 3 4 14h6l-1 7 9-11h-6z" />
  </svg>
);
export const Plus = (p: IconProps) => <Icon {...p} d="M12 5v14M5 12h14" />;
export const X = (p: IconProps) => <Icon {...p} d="M6 6l12 12M18 6L6 18" />;
export const Refresh = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12a8 8 0 0 1 14-5.3L21 9" />
    <path d="M21 4v5h-5" />
    <path d="M20 12a8 8 0 0 1-14 5.3L3 15" />
    <path d="M3 20v-5h5" />
  </Icon>
);
export const Eye = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
export const EyeOff = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 3l18 18" />
    <path d="M10.6 6.1A10.5 10.5 0 0 1 12 6c6.5 0 10 6 10 6a17.7 17.7 0 0 1-3.3 4M6.6 6.6C3.6 8.5 2 12 2 12s3.5 7 10 7c1.6 0 3-.3 4.3-.8" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </Icon>
);
export const Alert = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 22 20H2L12 3z" />
    <path d="M12 10v5" />
    <circle cx="12" cy="17.5" r=".6" fill="currentColor" />
  </Icon>
);
export const Google = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M22 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.7z" fill="#4285F4" />
    <path d="M12 22c2.8 0 5.2-1 7-2.5l-3.4-2.6c-1 .6-2.2 1-3.6 1-2.8 0-5.1-1.9-5.9-4.4H2.5v2.7A10 10 0 0 0 12 22z" fill="#34A853" />
    <path d="M6.1 13.5a6 6 0 0 1 0-3.8V7H2.5a10 10 0 0 0 0 9l3.6-2.5z" fill="#FBBC04" />
    <path d="M12 5.6c1.5 0 2.9.5 4 1.5l3-3A10 10 0 0 0 2.5 7l3.6 2.7c.8-2.5 3.1-4.1 5.9-4.1z" fill="#EA4335" />
  </svg>
);

export const Github = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
  </svg>
);
