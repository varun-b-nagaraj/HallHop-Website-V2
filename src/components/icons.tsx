type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none">
      <path d="M5 4h12v32H5z" fill="currentColor" />
      <path d="M23 4h12v32H23z" fill="currentColor" />
      <path d="M14 17h12v7H14z" fill="currentColor" />
      <path d="M26 10h9v20h-9z" fill="var(--paper)" />
      <path d="M27.5 10 35 7v23l-7.5-3.5z" fill="var(--signal)" />
      <circle cx="29.6" cy="18.8" r="1" fill="var(--ink)" />
    </svg>
  );
}

export function IconArrow({ className }: IconProps) {
  return <svg {...base} className={className}><path d="M4 12h15M14 6l6 6-6 6" /></svg>;
}

export function IconArrowUpRight({ className }: IconProps) {
  return <svg {...base} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>;
}

export function IconMenu({ className }: IconProps) {
  return <svg {...base} className={className}><path d="M4 8h16M4 16h16" /></svg>;
}

export function IconClose({ className }: IconProps) {
  return <svg {...base} className={className}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function IconCheck({ className }: IconProps) {
  return <svg {...base} className={className}><path d="m4 12 5 5L20 6" /></svg>;
}

export function IconPass({ className }: IconProps) {
  return <svg {...base} className={className}><path d="M4 6h16v12H4zM4 10h16M8 14h4" /><circle cx="16.5" cy="14" r="1.2" /></svg>;
}

export function IconRadar({ className }: IconProps) {
  return <svg {...base} className={className}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4" /><path d="m12 12 6-6" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>;
}

export function IconPattern({ className }: IconProps) {
  return <svg {...base} className={className}><path d="M4 17 9 9l4 4 7-9M4 20h16" /></svg>;
}

export function IconShield({ className }: IconProps) {
  return <svg {...base} className={className}><path d="M12 3 19 6v5c0 4.4-2.8 7.5-7 9.5C7.8 18.5 5 15.4 5 11V6z" /><path d="m9 12 2 2 4-5" /></svg>;
}

export function IconSchedule({ className }: IconProps) {
  return <svg {...base} className={className}><rect x="4" y="5" width="16" height="15" rx="1" /><path d="M4 9h16M8 3v4M16 3v4M8 13h3M8 16h6" /></svg>;
}

export function IconCommand({ className }: IconProps) {
  return <svg {...base} className={className}><rect x="3" y="4" width="18" height="14" rx="1" /><path d="M8 21h8M12 18v3M7 9h4M7 13h7" /></svg>;
}

export function IconInsight({ className }: IconProps) {
  return <svg {...base} className={className}><path d="M5 20V10M12 20V4M19 20v-7" /></svg>;
}

export function IconReport({ className }: IconProps) {
  return <svg {...base} className={className}><path d="M6 3h9l4 4v14H6zM15 3v5h4M9 12h7M9 16h7" /></svg>;
}

export function IconChrome({ className }: IconProps) {
  return <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 9h8M9.5 10.5 6 5M14 14.5 10 21" /></svg>;
}

export function IconClock({ className }: IconProps) {
  return <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>;
}

export function IconLock({ className }: IconProps) {
  return <svg {...base} className={className}><rect x="5" y="10" width="14" height="11" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
}

export function IconApi({ className }: IconProps) {
  return <svg {...base} className={className}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" /></svg>;
}

export function IconPaper({ className }: IconProps) {
  return <svg {...base} className={className}><path d="M6 3h9l4 4v14H6zM15 3v5h4M9 12h7M9 16h5" /></svg>;
}
