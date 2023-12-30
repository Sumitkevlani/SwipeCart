import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData.jsx';
import './Home.css';
import ProductCard from './ProductCard.jsx';
import { clearErrors, getProduct } from '../../action/productAction.js';
import { useSelector, useDispatch } from 'react-redux';
import Swipecart from '../../assets/Swipecart.avif';
import Loader from '../layout/Loader/Loader.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const product = {
  name: "Blue T-shirt",
  price: "₹3000",
  _id: "Sumit",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }]
};

const Home = () => {

  const dispatch = useDispatch();

  const { loading, error, product: featuredProducts, productCount } = useSelector((state) => state.products);

  const product = featuredProducts && featuredProducts.slice(0,8);

  useEffect(() => {
    if(error){
      return toast.error('Error while retreiving the products', {
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
    else{
      dispatch(getProduct());
    }
  }, [dispatch,error]);


  return (
    <>
    {
      loading?
        <Loader />
      :
        <>
          <MetaData title="SwipeCart" />
          <div className="flex flex-col">
            <div className="flex sm:flex-row flex-col bg-gray-200 banner p-4">
              <div className="flex flex-col justify-center items-start custom-height sm:w-[50%]">
                <h1 className="text-6xl mb-10 text-indigo-800 leading-25">Your Style,<br /> Your <br /> SwipeCart.</h1>
                <span className="text-3xl text-black leading-10">SwipeCart - Here Fashion Meets Functionality, and Every Cart Tells a Story.</span>
              </div>
              <div className="flex flex-col justify-center items-center sm:w-[50%] p-2">
                <img src={Swipecart} alt="Swipecart Hero Image" className="rounded-[50%] sm:w-[100%] max-w-full" />
              </div>
            </div>

            <div className="flex text-indigo-700 text-5xl justify-center items-center my-10 text-center">Featured Products</div>
            <ToastContainer />
            <div className="flex flex-wrap justify-center mb-10">
              {
                product && product.map((p) => (<ProductCard key={p._id} product={p} />))
              }
            </div>
            <div>

            </div>
          </div>

        </>
    }
    </>
  )
}

export default Home;
