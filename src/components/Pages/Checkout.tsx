import React from 'react';
import {CartItem} from '../../App';

interface CheckoutProps {
  cartItems: CartItem[] | [];
  setCartItems: (items: CartItem[]) => void;
  display: boolean;
  setDisplay: (display: boolean) => void;
}

export class Checkout extends React.Component<CheckoutProps> {
  constructor(props: CheckoutProps) {
    super(props);

    this.state = {
      display: props.display,
      setDisplay: props.setDisplay,
      cartItems: props.cartItems,
      setCartItems: props.setCartItems
    }

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay(display: boolean) {
    this.props.setDisplay(display);
  }

  _removeFromCart(id: string) {
    const newCartItems = this.props.cartItems.filter(item => item.id !== id);

    this.props.setCartItems(newCartItems);
  }

  _handleMoreBtn(id: string) {
    // Cant exceed stock quantity
    const newCartItems = this.props.cartItems.map(item => {
      if(item.id === id && item.quantity < item.availableStock) {
        item.quantity++;
        return item;
      } else {
        return item;
      }
    });

    this.props.setCartItems(newCartItems);
  }

  _handleLessBtn(id: string) {
    // Cant be less than 0
    const newCartItems = this.props.cartItems.map(item => {
      if(item.id === id && item.quantity > 1) {
        item.quantity--;
        return item;
      } else {
        return item;
      }
    });

    this.props.setCartItems(newCartItems);
  }

  _getCartTotal() {
    const cartTotal = this.props.cartItems.map(item => item.price * item.quantity).reduce((total, cur) => total + cur, 0);

    return cartTotal;
  }

  render() {
    return (
      <section style={{display: this.props.display ? 'block' : 'none'}} className="checkout">
        <h2 className="checkout__title page-title">Checkout</h2>

        <button onClick={() => this.toggleDisplay(false)} className="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>

        <div className="checkout__cart">
          {this.props.cartItems.map((item, i) => (
            <div key={`${item.id}-${i}`} className="checkout__item">
              <img src={item.imgUrl} alt={item.name} className="checkout__item--img" />

              <div className="checkout__item--data">
                <p className="checkout__item--title">{item.name}</p>

                <p className="checkout__item--color">Color: {item.color.split('-').join(' ')}</p>

                <p className="checkout__item--price">${item.price}</p>

                <div className="checkout__item--quantity">
                  <p className="checkout__item--quantity-text">Quantity:</p>

                  <div className="checkout__item--quantity-controls">
                    <button onClick={() => this._handleLessBtn(item.id)} className="checkout__item--quantity-controls__less">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                      </svg>
                    </button>

                    <p className="checkout__item--quantity-controls__label">{item.quantity}</p>

                    <button onClick={() => this._handleMoreBtn(item.id)} className="checkout__item--quantity-controls__more">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <button onClick={() => this._removeFromCart(item.id)} className="checkout__item--remove-btn">Remove</button>
              </div>

              <p className="checkout__item--total">Sub-total: ${item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="checkout__total">
          <p className="checkout__total--price">Total: ${this._getCartTotal()}</p>
        </div>
      </section>
    )
  }
}
