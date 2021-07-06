const productsData = require('../../../products.json');
import { useEffect, useState } from "react";
import { CartItem } from "../../../App";
import { TopBar } from './TopBar';
import { Product } from './Product';
import { DropDown } from "./DropDown";
import { Slider } from "./Slider";
import {ProductPage} from './ProductPage';

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
  stockMessage?: string;
}

export type SortOptions = 'price-desc' | 'price-asc' | 'rating-desc' | 'rating-asc';

export const getAvgRating = (product: ProductType) => product.ratings ? product.ratings.map(rating => rating.rating).reduce((a, b) => a+b, 0) / product.ratings.length : 0;

export function Products(props: {setCartItems: (items: CartItem[]) => void;}) {

  const [data, setData] = useState<ProductType[] | []>(productsData.data.sort((a: ProductType, b: ProductType) => b.price - a.price)); // price-desc sort as default
  
  const maxPrice: number = Math.max(...productsData.data.map((product: ProductType) => product.price));
  const minPrice: number = Math.min(...productsData.data.map((product: ProductType) => product.price));
  
  const categories: string[] = productsData.data.map((product: ProductType) => product.category).filter((el: string, i: number, self: string[]) => i === self.indexOf(el));
  
  const colors: string[] = productsData.data.flatMap((product: ProductType) => product.colors).filter((el: string, i: number, self: string[]) => i === self.indexOf(el));
  
  const [layout, setLayout] = useState<"row" | "grid">('grid');

  const [query, setQuery] = useState<string>('');

  const [sort, setSort] = useState<SortOptions>('price-desc');

  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  const [selectedStock, setSelectedStock] = useState<string[]>([]);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [selectedRating, setSelectedRating] = useState<number>(5);

  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(maxPrice);

  const [productData, setProductData] = useState<ProductType | undefined>(undefined);

  const [pageEl, setPageEl] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    // Dynamic data display

    let dataVar: ProductType[] = [...productsData.data];

    // Sorting
    switch(sort) {
      case 'price-desc':
        dataVar.sort((a: ProductType, b: ProductType) => b.price - a.price);
        break;
      
      case 'price-asc':
        dataVar.sort((a: ProductType, b: ProductType) => a.price - b.price);
        break;

      case 'rating-desc':
        dataVar.sort((a: ProductType, b: ProductType) => getAvgRating(b) - getAvgRating(a));
        break;

      case 'rating-asc':
        dataVar.sort((a: ProductType, b: ProductType) => getAvgRating(a) - getAvgRating(b));
        break;
      
      default:
        break;
    }

    // Query filtering
    if(query !== '') dataVar = dataVar.filter((product) => product.name.toLowerCase().trim().includes(query.toLowerCase().trim()));

    // Category filtering
    if(selectedCats.length >= 1) dataVar = dataVar.filter((product) => selectedCats.includes(product.category));

    // Price filtering
    dataVar = dataVar.filter(product => product.price <= selectedMaxPrice);

    // Color filtering
    if(selectedColors.length >= 1) dataVar = dataVar.filter((product) => product.colors.some(color => selectedColors.includes(color)));

    // Rating filtering
    dataVar = dataVar.filter(product => getAvgRating(product) <= selectedRating);

    // Availability filtering
    // // Add stock labels to data for ease of use
    dataVar.forEach(product => {
      if(product.stock === 0) {
        product.stockMessage = 'out-of-stock';
        return;
      } else if(product.stock > 0) {
        product.stockMessage = 'in-stock';
      } else {
        product.stockMessage = 'back-order';
      };
    });

    // // Filter
    if(selectedStock.length >= 1) {
      dataVar = dataVar.filter(product => selectedStock.includes(product.stockMessage || ''));
    }

    setData(dataVar);

  }, [sort, query, selectedCats, selectedMaxPrice, selectedColors, selectedRating, selectedStock]);

  useEffect(() => {
    setPageEl(document.querySelector('.product__page') as HTMLElement);
  }, [])

  return (
    <>
    <main className="products">
      <h2 className="products__title page-title">Products</h2>

      <section className="products__store">
        <div className="products__filters">
          <DropDown state={selectedCats} setState={setSelectedCats} title="category" data={categories} />

          <Slider state={selectedMaxPrice} setState={setSelectedMaxPrice} minNum={minPrice} maxNum={maxPrice} valPrefix="$" title="price" />

          <DropDown state={selectedStock} setState={setSelectedStock} title="availability" data={['in-stock', 'out-of-stock', 'back-order']} />

          <Slider state={selectedRating} setState={setSelectedRating} step={0.1} minNum={1} maxNum={5} title="rating" />

          <DropDown state={selectedColors} setState={setSelectedColors} title="color" data={colors} />

        </div>

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
            <Product
              setProductData={setProductData}
              key={product.id}
              data={product}
              layout={layout}
              pageEl={pageEl}
            />
          ))}
        </div>
      </section>

      <ProductPage
        data={productData}
        pageEl={pageEl}
      />
    </main>
    </>
  )
}
