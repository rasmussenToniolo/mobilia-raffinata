import {CartItem} from '../../App';
import {SmallCart} from './SmallCart';
import {Navbar} from './Navbar';

interface HeaderProps {
  cartItems?: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  selectedNavEl: string;
  setSelectedNavEl: (el: string) => void;
}

export function Header(props: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">Mobilia Raffinata</h1>

      <Navbar
      selectedEl={props.selectedNavEl}
      setSelectedEl={props.setSelectedNavEl}
      />

      <SmallCart
      cartItems={props.cartItems}
      setCartItems={props.setCartItems}
      />      
    </header>
  )
}
