import { useState } from "react";
import {CartItem} from '../../App';

interface SmallCartProps {
  cartItems?: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

export function SmallCart(props: SmallCartProps) {
  const [smallCartOpen, setSmallCartOpen] = useState<boolean>(false); // false default
  
  function smallCartClick() {
    setSmallCartOpen(prev => !prev);
  }

  function smallCartRemove(id: string) {
    // Remove item from cart based on id
    if(!props.cartItems) return;

    const newCartItems = props.cartItems.filter(item => item.id !== id);

    props.setCartItems(newCartItems)
  }

  return (
    <div className="small-cart">
      <button onClick={smallCartClick} className="small-cart__btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
        </svg>
      </button>

      <div className={`small-cart__open ${!smallCartOpen ? 'hidden' : ''}`}>
        {props.cartItems?.map(item => (
          <div key={item.id} className="small-cart__open-item">
            <img className="small-cart__open-item--img" src={item.imgUrl} alt="product" />

            <div className="small-cart__open-item--data">
              <p className="small-cart__open-item--data__name">{item.name}</p>

              <p className="small-cart__open-item--data__color">Color: {item.color.split('-').join(' ')}</p>
              
              <p className="small-cart__open-item--data__price">${item.price}</p>

              <p className="small-cart__open-item--data__quantity">x{item.quantity}</p>
            </div>

            <button onClick={() => smallCartRemove(item.id)} className="small-cart__open-item--remove-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
          </div>
        ))}

        {props.cartItems && props.cartItems.length < 1 ? (
          <p className="small-cart__open--no-items">No items in cart</p>
        ) : ''}
      </div>
    </div>
  )
}
