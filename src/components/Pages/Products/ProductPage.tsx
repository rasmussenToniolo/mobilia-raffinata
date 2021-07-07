import { useEffect, useState } from "react";
import { ProductType } from "./Products";
import { getAvgRating } from "./Products";
import {CartItem} from '../../../App';

interface ProductPageProps {
  data: ProductType | undefined;
  pageEl: HTMLElement | null;
  cartItems: CartItem[] | [];
  setCartItems: (items: CartItem[]) => void;
}

export function ProductPage(props: ProductPageProps) {

  const [quantity, setQuantity] = useState<number>(1);

  const [imgSource, setImgSource] = useState<number>(0);

  const [selectedColor, setSelectedColor] = useState<string>('');

  const [stockMsg, setStockMsg] = useState<string>('');

  const [confirmationMsg, setConfirmationMsg] = useState<string>('');

  function handleBackBtn() {
    if(!props.pageEl) return;

    props.pageEl.style.transform = 'translateX(100vw)';
  }


  function handleMoreBtn() {
    // Cant exceed stock quantity
    if(!props.data) return;

    if(props.data.stock <= 0) {
      return;
    }

    if(quantity === props.data.stock) {
      // Show message of no more stock left
      setStockMsg(`Only ${props.data.stock} unit${props.data.stock === 1 ? ' is' : 's are'} available`)
      return;
    };

    setQuantity(prev => ++prev);
  }

  function handleLessBtn() {
    // Cant be less than 0
    if(!props.data) return;

    if(props.data.stock <= 0) {
      return;
    }

    if(quantity === 1) return;

    setQuantity(prev => --prev);
  }

  function handleAddToCart() {
    // Display message that it has been added to cart
    setStockMsg('');
    setConfirmationMsg('');
    if(!props.data) return;

    if(props.data.stock < 1) {
      // show message of 'no stock'
      setStockMsg("Can't add to cart because there is no stock left");
      return;
    }

    if(props.cartItems.map(item => item.id).includes(`${props.data.id}-${selectedColor}`)) {
      // show message of item already on cart
      setStockMsg('Item already in cart');
      return;
    }

    if(selectedColor === '') {
      // show message of 'select color'
      setStockMsg('Please select a color')
      return;
    }

    const newItem: CartItem = {
      id: `${props.data.id}-${selectedColor}`,
      imgUrl: props.data.images[0],
      name: props.data.name,
      quantity: quantity,
      price: props.data.price,
      color: selectedColor,
      availableStock: props.data.stock
    }

    props.setCartItems([...props.cartItems, newItem] as CartItem[]);

    setConfirmationMsg('Added to cart');
  }

  useEffect(() => {
    if(!props.data) return;
    setQuantity(1);
    setSelectedColor('');
    setStockMsg('');
    setConfirmationMsg('');

  }, [props.data]);

  useEffect(() => {
    setStockMsg('');

    if(!props.data) return;

    if(!props.cartItems.map(item => item.id).includes(`${props.data.id}-${selectedColor}`)) {
      setConfirmationMsg('');
    }
    
  }, [quantity, selectedColor, props.cartItems])

  function getRatingStars(stars: number) {
    const starsArr: JSX.Element[] = [];

    for(let i = 0; i < stars; i++) {
      starsArr.push(<>&#11088;</>);
    }

    return starsArr;
  }

  function getDateStr(dateTime: string) {
    const date = new Date(dateTime);
    return date.toDateString();
  }
  

  return (
    <section className="product__page">
      <div className="product-page">
        <button onClick={handleBackBtn} className="product-page__back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
        </button>

        <div className="product-page__product">
          <div className="product-page__images">
            <div className="product-page__images--image">
              <img src={props.data?.images[imgSource]} alt={props.data?.name || 'prod'} className='product-page__images--image--content' />
            </div>

            <div className="product-page__images--options">
              {props.data?.images.map((imgSrc, i) => (
                <button onClick={() => setImgSource(i)} key={`small-img-${imgSrc}-${i}`} className={`product-page__images--options__option ${imgSource === i ? 'selected' : ''}`}>
                  <img src={imgSrc} alt={'prod img'} className="product-page__images--options__option--img" />
                </button>
              ))}
            </div>
          </div>

          <div className="product-page__data">
            <h2 className="product-page__data--title">{props.data?.name}</h2>
            <p className="product-page__data--rating">&#11088; {props.data ? getAvgRating(props.data).toFixed(1) : 0}</p>
            <p className="product-page__data--price">${props.data?.price}</p>

            <div className="product-page__color-selector">
              <p className="product-page__color-selector--text">Color:</p>

              {props.data?.colors.map((color, i) => (
                <div key={`${props.data?.id}-page-${color}-${i}`}>
                  <input checked={selectedColor === color} onChange={(e: any) => setSelectedColor(e.target.value)} name={props.data?.id || 'color'} type="radio" value={color} id={`${props.data?.id || ''}-${color}`} className="product-page__color-selector--option-btn" />
                  <label htmlFor={`${props.data?.id || ''}-${color}`} className="product-page__color-selector--option-text">{color.split('-').join(' ')}</label>
                </div>
              ))}
            </div>

            <div className="product-page__cart-controls">
              <button onClick={handleAddToCart} className="product-page__cart-controls--add-btn">Add to Cart</button>

              <button onClick={handleLessBtn} className="product-page__cart-controls--less">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                </svg>
              </button>

              <p className="product-page__cart-controls--quantity">{props.data && props.data.stock >= 1 ? quantity : 0}</p>

              <button onClick={handleMoreBtn} className="product-page__cart-controls--more">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </button>

              <p className="product-page__data--confirmation-msg">{confirmationMsg}</p>
            </div>

            <p className="product-page__data--error-msg">{stockMsg}</p>

            <p className={`product-page__data--stock ${props.data?.stockMessage || ''}`}>{props.data?.stockMessage?.split('-').join(' ')}</p>
          </div>
        </div>

        <div className="product-page__reviews">
          <h3 className="product-page__reviews--title">Reviews</h3>

          <ul className="product-page__reviews--content">
            {props.data?.ratings?.map((rating, i) => 
              // React throws the 'unique key' error, but i dont get why 

              <li key={`review-${rating.dateTime}-${rating.title}-${i}`} className="review">
                <p className="review__date">{getDateStr(rating.dateTime)}</p>
                <p className="review__name">{rating.name}</p>
                <p className="review__rating">{getRatingStars(rating.rating)}<span className="review__title">{rating.title}</span></p>
                <p className="review__description">{rating.description}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
