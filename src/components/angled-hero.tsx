import Link from "next/link"
import { type ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HeroActionVariant = "default" | "outline" | "secondary"

interface HeroAction {
  label: string
  href: string
  variant?: HeroActionVariant
  icon?: ReactNode
}

interface EyebrowProps {
  label: string
  icon?: ReactNode
}

export interface AngledHeroProps {
  eyebrow?: EyebrowProps
  title: string
  description?: string
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  align?: "left" | "center"
  media?: ReactNode
  children?: ReactNode
  className?: string
}

export function AngledHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  align = "left",
  media,
  children,
  className,
}: AngledHeroProps) {
  const isCentered = align === "center"

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-b-[2.5rem] bg-slate-navy/95 py-16 text-sky-light shadow-card-soft",
        "mask-angled before-diagonal",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-navy/85 via-slate-navy/78 to-aviation-red/65" />
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:px-12",
          isCentered ? "items-center text-center" : "items-start text-left lg:flex-row lg:items-center lg:justify-between",
        )}
      >
        <div className={cn("max-w-2xl space-y-6", isCentered ? "items-center text-center" : "lg:text-left")}>
          {eyebrow?.label ? (
            <Badge className="inline-flex items-center gap-2 bg-aviation-red/15 text-aviation-red backdrop-blur">
              {eyebrow.icon && <span className="grid place-items-center text-aviation-red">{eyebrow.icon}</span>}
              <span className="tracking-[0.14em] uppercase text-xs font-semibold">{eyebrow.label}</span>
            </Badge>
          ) : null}

          <h1 className={cn("font-serif text-4xl sm:text-5xl tracking-tight text-white", "lg:text-6xl")}>{title}</h1>

          {description ? (
            <p className="max-w-3xl text-lg sm:text-xl text-sky-light/85">{description}</p>
          ) : null}

          {children ? <div className="space-y-4 text-sky-light/90">{children}</div> : null}

          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                "flex flex-col gap-3",
                isCentered ? "sm:flex-row sm:items-center sm:justify-center" : "sm:flex-row sm:items-center",
              )}
            >
              {primaryAction ? (
                <Button size="lg" asChild className="shadow-lg shadow-aviation-red/25">
                  <Link href={primaryAction.href}>
                    <span className="flex items-center gap-2">
                      {primaryAction.icon}
                      {primaryAction.label}
                    </span>
                  </Link>
                </Button>
              ) : null}

              {secondaryAction ? (
                <Button
                  size="lg"
                  variant={secondaryAction.variant ?? "outline"}
                  asChild
                  className={cn(
                    secondaryAction.variant === "outline"
                      ? "border-white/35 bg-transparent text-white hover:bg-white/10"
                      : "",
                  )}
                >
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

        {media ? (
          <div className="relative isolate flex w-full max-w-xl shrink-0 items-center justify-center">
            <div className="absolute inset-0 -z-10 bg-aviation-red/35 blur-[90px]" />
            <div className="rounded-3xl border border-white/10 bg-white/5 p-1 shadow-card-lift backdrop-blur-lg">
              <div className="overflow-hidden rounded-[1.6rem]">{media}</div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}