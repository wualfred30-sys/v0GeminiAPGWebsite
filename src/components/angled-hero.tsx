import Link from "next/link"
import Image from "next/image"
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
  backgroundImage?: string
  backgroundStyle?: "contained" | "fullWidth"
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
  backgroundImage,
  backgroundStyle = "contained",
  children,
  className,
}: AngledHeroProps) {
  const isCentered = align === "center"
  const isFullWidth = backgroundStyle === "fullWidth"

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-b-[2.5rem] py-16 shadow-card-soft",
        "mask-angled",
        isFullWidth ? "bg-beige-tan text-slate-navy before-diagonal-beige" : "bg-slate-navy/95 text-sky-light before-diagonal",
        className,
      )}
    >
      {isFullWidth && backgroundImage ? (
        <div className="absolute inset-0 -z-20">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover object-[center_30%] sm:object-[center_40%] lg:object-center"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
      ) : null}

      <div 
        className={cn(
          "absolute inset-0 z-0",
          isFullWidth 
            ? "bg-gradient-to-r from-[#f5f5dc]/60 via-[#f5f5dc]/50 to-[#f5f5dc]/40" 
            : "bg-gradient-to-r from-slate-navy/85 via-slate-navy/78 to-aviation-red/65"
        )} 
      />
      
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:px-12",
          isCentered ? "items-center text-center" : "items-start text-left lg:flex-row lg:items-center lg:justify-between",
        )}
      >
        <div className={cn("max-w-2xl space-y-6", isCentered ? "items-center text-center" : "lg:text-left")}>
          {eyebrow?.label ? (
            <Badge 
              className={cn(
                "inline-flex items-center gap-2 backdrop-blur",
                isFullWidth 
                  ? "bg-aviation-red/20 text-aviation-red" 
                  : "bg-aviation-red/15 text-aviation-red"
              )}
            >
              {eyebrow.icon && <span className="grid place-items-center text-aviation-red">{eyebrow.icon}</span>}
              <span className="tracking-[0.14em] uppercase text-xs font-semibold">{eyebrow.label}</span>
            </Badge>
          ) : null}

          <h1 
            className={cn(
              "font-serif text-4xl sm:text-5xl tracking-tight lg:text-6xl",
              isFullWidth ? "text-slate-navy" : "text-white"
            )}
          >
            {title}
          </h1>

          {description ? (
            <p 
              className={cn(
                "max-w-3xl text-lg sm:text-xl",
                isFullWidth ? "text-slate-navy/80" : "text-sky-light/85"
              )}
            >
              {description}
            </p>
          ) : null}

          {children ? (
            <div 
              className={cn(
                "space-y-4",
                isFullWidth ? "text-slate-navy/85" : "text-sky-light/90"
              )}
            >
              {children}
            </div>
          ) : null}

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
                    isFullWidth
                      ? "border-slate-navy/20 bg-transparent text-slate-navy hover:bg-slate-navy/5"
                      : "border-white/35 bg-transparent text-white hover:bg-white/10"
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

        {!isFullWidth && media ? (
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
