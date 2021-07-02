import { Product } from "./Products"
import { DropDown } from "./DropDown";
import { Slider } from "./Slider";

export function Filters(props: {data: Product[]; setData: (data: Product[]) => void;}) {
  
  return (
    <div className="products__filters">
      <DropDown title="category" data={['sofa', 'chair', 'table', 'sets']} />

      <Slider step={51} minNum={293} maxNum={3990} valPrefix="$" title="price" />

      <DropDown title="availability" data={['in stock', 'out of stock', 'back order']} />

      <Slider step={0.1} minNum={1} maxNum={5} title="rating" />
    </div>
  )
}
