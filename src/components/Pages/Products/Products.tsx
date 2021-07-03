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

export type SortOptions = 'price-desc' | 'price-asc' | 'rating-desc' | 'rating-asc';

export const getAvgRating = (product: ProductType) => product.ratings ? product.ratings.map(rating => rating.rating).reduce((a, b) => a+b, 0) / product.ratings.length : 0;

export function Products(props: {setCartItems: (items: CartItem[]) => void;}) {

  const [data, setData] = useState<ProductType[] | []>(productsData.data);
  const [layout, setLayout] = useState<"row" | "grid">('grid');

  const [query, setQuery] = useState<string>('');

  const [sort, setSort] = useState<SortOptions>('price-desc');


  useEffect(() => {
    // filter data based on query
    if(query === '') {
      setData(productsData.data);
      return;
    }

    setData(productsData.data.filter((product: ProductType) => product.name.toLowerCase().trim().includes(query.toLowerCase().trim())));
  }, [query]);

  useEffect(() => {
    console.log(sort);
    switch(sort) {
      case 'price-desc':
        setData(data.sort((a: ProductType, b: ProductType) => a.price > b.price ? 1 : 0));
        break;
      case 'price-asc':
        setData(data.sort((a: ProductType, b: ProductType) => a.price < b.price ? 1 : 0));
        break;
      case 'rating-desc':
        setData(data.sort((a: ProductType, b: ProductType) => getAvgRating(a) > getAvgRating(b) ? 1 : 0));
        break;
      case 'rating-asc':
        setData(data.sort((a: ProductType, b: ProductType) => getAvgRating(a) > getAvgRating(b) ? 1 : 0));
        break;
      default:
        break;
    }
  }, [sort])

  return (
    <main className="products">
      <h2 className="products__title page-title">Products</h2>

      <section className="products__store">
        <Filters setData={setData} data={data} />

        <TopBar
        productsFound={data.length}
        handleSearch={setQuery}
        query={query}
        setLayout={setLayout}
        layout={layout}
        sortVal={sort}
        setSortVal={setSort}
        />

        <div className="products__store--products">
          {data.map(product => (
            <Product key={product.id} data={product} layout={layout} />
          ))}
        </div>
      </section>
    </main>
  )
}
