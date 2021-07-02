import { useState } from "react"

interface SliderProps {
  minNum: number;
  maxNum: number;
  title: string;
  valPrefix?: string;
  optional?: boolean;
  step: number;
}

export function Slider(props: SliderProps) {
  const [val, setVal] = useState(props.maxNum)

  return (
    <div className="slider">
      <p className="slider__title">{props.title}</p>

      <div className="slider__range">
        <input step={props.step} id="price-range" max={props.maxNum} min={props.minNum} value={val} onChange={(e: any) => {setVal(e.target.value)}} type="range" className="slider__range--input" />
        <label htmlFor="price-range" className="slider__range--label">{props.valPrefix || ""}{val}</label>
      </div>
    </div>
  )
}
