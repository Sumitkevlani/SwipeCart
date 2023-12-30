import React from 'react';
import { Link } from  'react-router-dom';
import ReactStars from 'react-rating-stars-component';


const ProductCard = ({ product }) => {
  return (
    <Link className="flex flex-col m-5 items-start h-auto w-[250px] hover:bg-slate-200 hover:shadow-lg hover:transform hover:scale-110 transition-transform" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} className="h-auto w-[100%] object-contain" />
        <div>
        <p className="font-bold">{product.name}</p>
          <div className="">
          <ReactStars count={5} edit={false} color={"rgba(20,20,20,0.1)"} activeColor={"#0000FF"} value={product.ratings} isHalf={true} size={window.innerWidth<600?20:30}/>
              <span className="font-bold">{`${product.numOfReviews>0?product.numOfReviews:"No"} reviews`}</span>
          </div>
          <span className="text-indigo-700 font-bold">{`₹${product.price}`}</span>
        </div>
    </Link>
  )
}

export default ProductCard;
