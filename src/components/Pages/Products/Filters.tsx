import { Product } from "./Products"
import { DropDown } from "./DropDown";

export function Filters(props: {data: Product[]; setData: (data: Product[]) => void;}) {
  
  return (
    <div className="products__filters">
      <DropDown title="category" data={['sofa', 'chair', 'table', 'sets']} />
      <DropDown title="availability" data={['in stock', 'out of stock', 'back order']} />
    </div>
  )
}
