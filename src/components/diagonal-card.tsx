import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

type Accent = "primary" | "secondary" | "accent" | "neutral"

const accentClassnames: Record<Accent, string> = {
  primary: "before:bg-aviation-red/18 border-aviation-red/25",
  secondary: "before:bg-accent-gold/20 border-accent-gold/25",
  accent: "before:bg-accent/20 border-accent/25",
  neutral: "before:bg-slate-navy/12 border-white/10",
}

export interface DiagonalCardProps {
  title?: string
  icon?: ReactNode
  eyebrow?: string
  children: ReactNode
  className?: string
  accent?: Accent
  footer?: ReactNode
  layout?: "vertical" | "horizontal"
}

export function DiagonalCard({
  title,
  icon,
  eyebrow,
  children,
  className,
  accent = "neutral",
  footer,
  layout = "vertical",
}: DiagonalCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-slate-navy/60 p-8 text-sky-light shadow-card-soft backdrop-blur-lg transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-card-lift",
        "before:absolute before:inset-0 before:-z-10 before:rounded-[2.6rem]",
        accentClassnames[accent],
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full gap-6",
          layout === "horizontal" ? "flex-col lg:flex-row lg:items-start" : "flex-col",
        )}
      >
        {(eyebrow || title || icon) && (
          <header className="space-y-3">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-aviation-red/80">{eyebrow}</p>
            ) : null}
            <div className="flex items-start gap-3 text-left">
              {icon ? (
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-aviation-red shadow-card-soft">
                  {icon}
                </span>
              ) : null}
              {title ? (
                <h3 className="font-serif text-2xl font-semibold tracking-tight text-white">{title}</h3>
              ) : null}
            </div>
          </header>
        )}

        <div className="space-y-4 text-sky-light/90">{children}</div>
      </div>

      {footer ? <footer className="mt-6 border-t border-white/10 pt-6 text-sky-light/80">{footer}</footer> : null}
    </article>
  )
}