import Link from "next/link"
import { type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RibbonAction {
  label: string
  href: string
  variant?: "default" | "outline" | "ghost"
  icon?: ReactNode
}

export interface CtaRibbonProps {
  eyebrow?: string
  title: string
  description?: string
  primaryAction?: RibbonAction
  secondaryAction?: RibbonAction
  className?: string
  children?: ReactNode
}

export function CtaRibbon({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  children,
}: CtaRibbonProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-r from-aviation-red/92 via-aviation-red/80 to-slate-navy/88 p-10 text-white shadow-card-lift",
        "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_top_left,rgba(248,250,252,0.25),transparent_60%)]",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{eyebrow}</p>
        ) : null}

        <div className="space-y-4">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {description ? <p className="text-base sm:text-lg text-white/80">{description}</p> : null}
          {children ? <div className="text-white/85">{children}</div> : null}
        </div>

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            {primaryAction ? (
              <Button size="lg" asChild>
                <Link href={primaryAction.href}>
                  <span className="flex items-center gap-2">
                    {primaryAction.icon}
                    {primaryAction.label}
                  </span>
                </Link>
              </Button>
            ) : null}

            {secondaryAction ? (
              <Button size="lg" variant={secondaryAction.variant ?? "outline"} asChild>
                <Link href={secondaryAction.href}>
                  <span className="flex items-center gap-2">
                    {secondaryAction.icon}
                    {secondaryAction.label}
                  </span>
                </Link>
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}