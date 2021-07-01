import { useEffect, useState } from 'react';
import './sass/main.scss';
import {Header} from './components/HeaderComponents/Header';
import {Home} from './components/Pages/Home';
import {About} from './components/Pages/About';
import {Footer} from './components/Footer';
const productsData = require('./products.json');

export interface CartItem {
  id: number;
  imgUrl: string;
  name: string;
  quantity: number;
  price: number;
  priceCents: number;
}

export const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();

  const [selectedNavEl, setSelectedNavEl] = useState<string>('home'); // Also change hash and scroll to top

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedNavEl])

  return (
    <>
      <Header
      selectedNavEl={selectedNavEl}
      setSelectedNavEl={setSelectedNavEl}
      cartItems={cartItems}
      setCartItems={setCartItems}
      />

      <div className="body">
        {selectedNavEl === 'home' ?
        <Home
        setSelectedNavEl={setSelectedNavEl} />
        :
        selectedNavEl === 'about' ?
        <About />
        :
        ''}
      </div>

      <Footer />
    </>
  )
}