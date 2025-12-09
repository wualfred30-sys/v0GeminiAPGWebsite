"use client"

import * as React from "react"
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export interface CalendarProps {
  className?: string
  initialMonth?: Date
  selected?: Date
  onSelect?: (date: Date) => void
  disabledDate?: (date: Date) => boolean
}

function buildCalendarDays(month: Date) {
  const start = startOfWeek(startOfMonth(month))
  const end = endOfWeek(endOfMonth(month))
  const days: Date[] = []

  let current = start
  while (current <= end) {
    days.push(current)
    current = addDays(current, 1)
  }

  return days
}

export function Calendar({
  className,
  initialMonth,
  selected,
  onSelect,
  disabledDate,
}: CalendarProps) {
  const now = React.useMemo(() => startOfMonth(selected ?? initialMonth ?? new Date()), [initialMonth, selected])
  const [visibleMonth, setVisibleMonth] = React.useState(now)
  const [internalSelected, setInternalSelected] = React.useState<Date | undefined>(selected)

  React.useEffect(() => {
    if (selected) {
      setInternalSelected(selected)
      setVisibleMonth(startOfMonth(selected))
    }
  }, [selected])

  const days = React.useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth])
  const highlightedDate = selected ?? internalSelected

  const handleSelect = (date: Date) => {
    if (disabledDate?.(date)) return
    setInternalSelected(date)
    onSelect?.(date)
  }

  return (
    <div className={cn("w-full rounded-2xl border border-border bg-background p-4 shadow-sm", className)}>
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setVisibleMonth((prev) => subMonths(prev, 1))}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-semibold text-foreground">{format(visibleMonth, "MMMM yyyy")}</div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setVisibleMonth((prev) => addMonths(prev, 1))}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase text-muted-foreground">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {days.map((date) => {
          const outsideMonth = !isSameMonth(date, visibleMonth)
          const isSelected = highlightedDate ? isSameDay(date, highlightedDate) : false
          const disabled = disabledDate?.(date) ?? false

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => handleSelect(date)}
              disabled={disabled || outsideMonth}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                outsideMonth && "text-muted-foreground/50",
                disabled && "cursor-not-allowed opacity-40",
                isSelected
                  ? "bg-aviation-red text-white"
                  : "hover:bg-aviation-red/10 text-foreground"
              )}
            >
              {format(date, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}
