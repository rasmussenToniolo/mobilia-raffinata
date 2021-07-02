import {ProductType} from './Products';

interface ProductProps {
  layout: "row" | "grid";
  data: ProductType;
}

export function Product(props: ProductProps) {
  const avgRating = props.data.ratings ? props.data.ratings.map(rating => rating.rating).reduce((a, b) => a+b, 0) / props.data.ratings.length : undefined;

  const stockMsg = props.data.stock > 0 ? 'in' : props.data.stock < 0 ? 'back' : 'out';

  return (
    <div className={`product ${props.layout}`}>
      <div className="product__img">
        <img src={props.data.images[0]} alt="product image" className="product__img--img" />
        <div className="product__img--controls">
          <button className="product__img--controls__left img-control-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
            </svg>
          </button>
          <button className="product__img--controls__right img-control-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="product__data">
        <h2 className="product__data--title">{props.data.name}</h2>

        <p className="product__data--price">${props.data.price}</p>

        <p className="product__data--rating">{avgRating || 0} &#11088;</p>

        <p className={`product__data--stock ${stockMsg}`}>{stockMsg === 'in' ? 'in stock' : stockMsg === 'back' ? 'on back order' : stockMsg === 'out' ? 'out of stock' : ''}</p>
      </div>
    </div>
  )
}
