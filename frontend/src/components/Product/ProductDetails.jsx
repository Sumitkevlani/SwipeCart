import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import { clearErrors, getProductDetails } from '../../action/productAction.js';
import { useParams } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductDetails.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from 'react-rating-stars-component';
import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/layout/Loader/Loader.jsx';
import { addItemToCart } from '../../action/cartAction.js';
import { newReview } from '../../action/productAction.js';
import MetaData from '../layout/MetaData.jsx';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js';

const ProductDetails = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("Write your comment.");

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);
  const { cartItems } = useSelector((state) => state.cart);

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    const qty = quantity + 1;
    if (product.Stock < qty) return;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    const qty = quantity - 1;
    if (qty <= 0) return;
    setQuantity(qty);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplaySpeed: 5000,
    slidesToScroll: 1
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(product._id, quantity));
    return toast.success('Item added to cart.', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const submitReviewHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", value);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  const cancelReviewHandler = () => {
    setOpen(false);
    setComment("Write Your comment");
    setValue(0);
  };

  useEffect(() => {
    if (error) {
      toast.error('Error while retreiving the details', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (reviewError) {
      toast.error('Error while adding the review.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearErrors());
    }
    if (success) {
      toast.success('Review submitted successfully.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    else {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, error, reviewError, success]);

  if (error) {
    return (
      <div className='w-100 h-[60vh]'>
        <ToastContainer />
      </div>
    )
  }
  return (
    <div>
      <MetaData title="SwipeCart -Products" />
      {
        loading ? <Loader /> :
          (<div className=' h-auto'>
            <div className='bg-gray-200'>
              <div className=" w-[70%] mx-auto py-10 flex sm:flex-row justify-center flex-col gap-5">
                <div className={`sm:w-[50%] w-[100%] flex justify-center ${window.innerWidth >= 1200 ? `items-start` : `items-center`}`}>


                  {product.images && product.images.length > 0 ?
                    (
                      <div className="w-[70%] h-[70%] pt-[10%] object-contain cursor-pointer">
                        <Slider {...settings}>
                          {product.images.map((item) => (
                            <img className='w-[100%] h-[100%] object-contain rounded-[2%]' src={item.url} key={item._id} alt="Product images" />
                          ))
                          }
                        </Slider>
                      </div>
                    )
                    :
                    (
                      <p>No images available for the product</p>
                    )
                  }
                </div>
                <div className='sm:w-[50%] w-[100%] flex flex-col justify-center sm:items-start items-center'>
                  <div className='mb-10'>
                    <div className='sm:text-4xl text-xl font-bold text-black flex sm:justify-start justify-center my-10'>
                      {product.name && product.name.toUpperCase()}
                    </div>
                    <div className=' text-black text-sm flex sm:justify-start justify-center'>{product.description}</div>
                    <div>
                      <span className='text-black text-sm flex sm:justify-start justify-center'>Product #{product._id}</span>
                    </div>
                  </div>
                  <div>
                    <ReactStars count={5} edit={false} color={"rgba(20,20,20,0.1)"} activeColor={"#0000FF"} value={product.ratings} isHalf={true} size={window.innerWidth < 600 ? 20 : 30} />
                  </div>
                  <div>
                    {product.numOfReviews === 0 && "No Reviews Yet."}
                  </div>
                  <div className='flex flex-row pt-10 items-center justify-center gap-2'>
                    <span className='text-black text-2xl font-bold'>₹{product.price}</span>
                    <span className={`${product.Stock && product.Stock > 0 ? "text-green-700" : "text-red-600"} font-bold`}>{product.Stock && product.Stock > 0 ? "IN STOCK" : "OUT OF STOCK"}</span>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <button className='font-bold h-[30px] w-[30px] bg-gray-400 rounded-full hover:shadow-md hover:bg-white hover:text-indigo-900 hover:font-bold' onClick={increaseQuantity}>+</button>
                    <input type="number" value={quantity} readOnly className='bg-white' />
                    <button className='font-bold h-[30px] w-[30px] bg-gray-400 rounded-full hover:shadow-md hover:bg-white hover:text-indigo-900 hover:font-bold' onClick={decreaseQuantity}>-</button>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <div className='flex justify-center items-center'>
                      <button className={`h-auto w-auto p-3 rounded-[3%] text-white bg-indigo-600 mt-3 flex justify-center items-center hover:shadow-md hover:bg-white hover:text-indigo-900 hover:font-bold ${product.Stock < 1 ? 'pointer-events-none' : ''}`} onClick={addToCartHandler} disabled={product.Stock < 1}>Add to Cart</button>
                    </div>
                    <div className='flex justify-center items-center'>
                      <button className='h-auto w-auto p-3 rounded-[3%] text-white bg-indigo-600 mt-3 flex justify-center items-center hover:shadow-md hover:bg-white hover:text-indigo-900 hover:font-bold' onClick={submitReviewToggle}>Submit a review</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit a Review</DialogTitle>
              <DialogContent className='flex flex-row items-center justify-center gap-2'>
                <Rating name="half-rating" defaultValue={0} precision={0.5} value={value} onChange={(event, newValue) => {
                  setValue(newValue);
                }} />
                <textarea className='p-3 text-sm' cols="30" rows="2" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
              </DialogContent>

              <DialogActions className='flex flex-row justify-between'>
                <button onClick={submitReviewHandler} className='hover:text-green-600'>SUBMIT</button>
                <button onClick={cancelReviewHandler} className='hover:text-red-600'>CANCEL</button>
              </DialogActions>
            </Dialog>
            {product.numOfReviews > 0 && product.reviews && product.reviews.length > 0 &&
              <div className='my-5'>
                <h1 className='text-3xl my-5 flex justify-center items-center font-bold'>Reviews</h1>

                <div className='flex flex-col'>
                  {
                    product.reviews.map((review) => <ReviewCard review={review} />)
                  }
                </div>
              </div>
            }
          </div>
          )
      }
    </div>
  )
};

export default ProductDetails;
