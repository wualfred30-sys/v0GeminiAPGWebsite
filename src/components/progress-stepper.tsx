import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

type StepStatus = "complete" | "current" | "upcoming"

export interface ProgressStep {
  title: string
  description?: string
  icon?: ReactNode
}

export interface ProgressStepperProps {
  steps: ProgressStep[]
  currentIndex: number
  className?: string
  showProgressBar?: boolean
}

export function ProgressStepper({ steps, currentIndex, className, showProgressBar = true }: ProgressStepperProps) {
  const total = steps.length
  const clampedIndex = Math.min(Math.max(currentIndex, 0), total - 1)
  const progress = ((clampedIndex + 1) / total) * 100

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between gap-3">
        {steps.map((step, idx) => {
          const status: StepStatus = idx < clampedIndex ? "complete" : idx === clampedIndex ? "current" : "upcoming"

          return (
            <div key={step.title} className={cn("flex flex-1 items-center gap-3", idx === 0 ? "" : "pl-2")}>
              {idx > 0 ? (
                <div
                  className={cn(
                    "h-px flex-1 rounded-full",
                    status === "complete" ? "bg-aviation-red/70" : "bg-white/15",
                  )}
                  aria-hidden="true"
                />
              ) : null}

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-full border text-sm font-semibold transition",
                    status === "complete"
                      ? "border-aviation-red/60 bg-aviation-red text-white shadow-card-soft"
                      : status === "current"
                      ? "border-white/40 bg-white/10 text-white ring-4 ring-white/10"
                      : "border-white/20 bg-white/5 text-white/60",
                  )}
                  aria-current={status === "current" ? "step" : undefined}
                >
                  {step.icon ? step.icon : idx + 1}
                </span>

                <div className="space-y-1">
                  <p
                    className={cn(
                      "font-semibold tracking-tight",
                      status === "complete" || status === "current" ? "text-white" : "text-white/60",
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description ? (
                    <p className="text-xs text-sky-light/70">{step.description}</p>
                  ) : null}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {showProgressBar ? (
        <div className="relative h-2 overflow-hidden rounded-full bg-white/15">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-aviation-red transition-all duration-300"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
      ) : null}
    </div>
  )
}