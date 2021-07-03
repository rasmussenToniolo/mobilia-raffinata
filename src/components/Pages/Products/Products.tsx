const productsData = require('../../../products.json');
import { useEffect, useState } from "react";
import { CartItem } from "../../../App";
import { Filters } from "./Filters";
import { TopBar } from './TopBar';
import { Product } from './Product';

interface ProductRating {
  dateTime: string;
  description: string;
  name: string;
  rating: number;
  title: string;
}

export interface ProductType {
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

  const [data, setData] = useState<ProductType[] | []>(productsData.data);
  const [layout, setLayout] = useState<"row" | "grid">('grid');

  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    // filter data based on query
    if(query === '') {
      setData(productsData.data);
      return;
    }

    setData(productsData.data.filter((product: ProductType) => product.name.toLowerCase().trim().includes(query.toLowerCase().trim())));
    console.log('update query')
    console.log(query);

  }, [query])

  return (
    <main className="products">
      <h2 className="products__title page-title">Products</h2>

      <section className="products__store">
        <Filters setData={setData} data={data} />

        <TopBar productsFound={data.length} handleSearch={setQuery} query={query} setLayout={setLayout} layout={layout} />

        <div className="products__store--products">
          {data.map(product => (
            <Product key={product.id} data={product} layout={layout} />
          ))}
        </div>
      </section>
    </main>
  )
}
