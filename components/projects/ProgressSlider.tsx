'use client'

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

type ProgressSliderProps = {
  value: number
  onChange: (v: number) => void
}

export default function ProgressSlider({ value, onChange }: ProgressSliderProps) {
  return (
    <div className="space-y-1">
      <Label>Progress</Label>
      <div className="flex items-center gap-2">
        <Slider
          min={0}
          max={100}
          step={1}
          value={[value]}
          onValueChange={(val) => onChange(val[0])}
          className="flex-1"
        />
        <span className="text-sm text-muted-foreground w-10 text-right">
          {value}%
        </span>
      </div>
    </div>
  )
}
