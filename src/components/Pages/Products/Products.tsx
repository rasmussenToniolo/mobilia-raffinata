const productsData = require('../../../products.json');
import { useState } from "react";
import { CartItem } from "../../../App";
import { Filters } from "./Filters";
import { TopBar } from './TopBar';
console.log(productsData.data[0])

interface ProductRating {
  dateTime: string;
  description: string;
  name: string;
  rating: number;
  title: string;
}

export interface Product {
  category: string;
  colors: string[];
  description: string;
  id: string;
  images: string[];
  name: string;
  price: number;
  ratings?: ProductRating[];
  stock: number;
}

export function Products(props: {setCartItems: (items: CartItem[]) => void;}) {

  const [data, setData] = useState<Product[]>(productsData.data);

  return (
    <main className="products">
      <h2 className="products__title page-title">Products</h2>

      <section className="products__store">
        <Filters setData={setData} data={data} />

        <TopBar />
      </section>
    </main>
  )
}
