import { useEffect, useState } from 'react';
import './sass/main.scss';
import {Header} from './components/HeaderComponents/Header';
import {Home} from './components/Pages/Home';
import {About} from './components/Pages/About';
import { Products } from './components/Pages/Products/Products';
import {Contact} from './components/Pages/Contact';
import {Footer} from './components/Footer';
import { Checkout } from './components/Pages/Checkout';

export interface CartItem {
  id: string;
  imgUrl: string;
  name: string;
  quantity: number;
  price: number;
  color: string;
  availableStock: number;
}

export let checkoutPage: Checkout;

export const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[] | []>([]);

  const [selectedNavEl, setSelectedNavEl] = useState<string>('home');

  const [checkoutDisplayed, setCheckoutDisplayed] = useState<boolean>(false);

  checkoutPage = new Checkout({cartItems, setCartItems, display: checkoutDisplayed, setDisplay: setCheckoutDisplayed});

  const checkoutPageRender = checkoutPage.render();

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
        selectedNavEl === 'contact' ?
        <Contact />
        :
        selectedNavEl === 'products' ?
        <Products setCartItems={setCartItems} cartItems={cartItems} />
        :
        ''}
      </div>

      {checkoutPageRender}

      <Footer />
    </>
  )
}
