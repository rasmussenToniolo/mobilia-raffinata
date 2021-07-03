import { useEffect, useState } from 'react';
import {ProductType} from './Products';
import {getAvgRating} from './Products';

interface ProductProps {
  layout: "row" | "grid";
  data: ProductType;
}

export function Product(props: ProductProps) {
  const stockMsg = props.data.stock > 0 ? 'in' : props.data.stock < 0 ? 'back' : 'out';
  
  const [imgPos, setImgPos] = useState<number>(0);

  const [imgEls, setImgEls] = useState<HTMLElement[] | null>(null);

  const [leftBtnEnabled, setLeftBtnEnabled] = useState<boolean>(false);

  const [rightBtnEnabled, setRightBtnEnabled] = useState<boolean>(props.data.images.length > 1);

  function imgNext() {
    setImgPos(prev => {
      if (prev >= props.data.images.length-1) {
        return prev;
      };
      if(prev >= 0) return prev+1;
      return 0;
    });
  }
  
  function imgPrev() {
    setImgPos(prev => {
      if (prev <= 0) return prev;
      if(prev > 0) return prev-1;
      return 0;
    });
  }

  useEffect(() => {
    if(!imgEls) return;

    // Update img buttons
    if(imgPos === 0) setLeftBtnEnabled(false);
    if(imgPos > 0) setLeftBtnEnabled(true);
    if(imgPos === props.data.images.length-1) setRightBtnEnabled(false);
    if(imgPos < props.data.images.length-1) setRightBtnEnabled(true);


    // Move img
    imgEls.forEach(el => {
      el.style.transform = `translateX(-${imgPos}00%)`;
    });

    return () => {
      // Reset img pos
      imgEls.forEach(el => {
        el.style.transform = 'translateX(0)';
      });
    }
  }, [imgPos]);

  useEffect(() => {
    setImgEls(Array.from(document.getElementsByClassName(`img-${props.data.id}`)) as HTMLElement[]);

    return () => {
      setImgEls(null);
    }
  }, [])

  return (
    <div className={`product ${props.layout}`}>
      <div className="product__img">
        {props.data.images.map((imgSrc, i) => (
          <img key={`img-${imgSrc}-${i}`} src={imgSrc} alt="product image" className={`product__img--img img-${props.data.id}`} />
        ))}

        <div className="product__img--controls img-controls">
          <button onClick={imgPrev} className={`product__img--controls__left img-control-btn ${!leftBtnEnabled ? 'disabled' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
            </svg>
          </button>
          <button onClick={imgNext} className={`product__img--controls__right img-control-btn ${!rightBtnEnabled ? 'disabled' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="product__data">
        <h2 className="product__data--title">{props.data.name}</h2>

        <p className="product__data--price">${props.data.price}</p>

        <p className="product__data--rating">{getAvgRating(props.data).toFixed(1) || 0} &#11088;</p>

        <p className={`product__data--stock ${stockMsg}`}>{stockMsg === 'in' ? 'in stock' : stockMsg === 'back' ? 'on back order' : stockMsg === 'out' ? 'out of stock' : ''}</p>
      </div>
    </div>
  )
}
