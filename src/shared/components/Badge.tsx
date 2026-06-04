interface BadgeProps {
  readonly color: string;
  readonly content?: string;
  readonly ariaLabel?: string;
}

export default function Badge({ color, content, ariaLabel }: BadgeProps) {
  return (
    <span
      aria-label={ariaLabel}
      className={
        content
          ? "inline-flex min-h-6 min-w-10 items-center justify-center rounded-full px-2 text-xs font-semibold text-white"
          : "inline-flex h-4 w-4 rounded-full"
      }
      style={{ backgroundColor: color }}
    >
      {content}
    </span>
  );
}
