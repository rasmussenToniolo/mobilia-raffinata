import { useState } from "react"

interface SliderProps {
  minNum: number;
  maxNum: number;
  title: string;
  valPrefix?: string;
  optional?: boolean;
  step?: number;
  state: number;
  setState: (newState: number) => void;
}

export function Slider(props: SliderProps) {

  return (
    <div className="slider">
      <p className="slider__title">{props.title}</p>

      <div className="slider__range">
        <input value={props.state} onChange={(e: any) => props.setState(+e.target.value)} step={props.step || 1} id="price-range" max={props.maxNum} min={props.minNum} type="range" className="slider__range--input" />
        <label htmlFor="price-range" className="slider__range--label">{props.valPrefix || ""}{props.state}</label>
      </div>
    </div>
  )
}
