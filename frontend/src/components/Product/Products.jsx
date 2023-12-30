import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../action/productAction';
import Loader from '../layout/Loader/Loader.jsx';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import './Products.css';
import MetaData from '../layout/MetaData.jsx';

const Products = () => {

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Men",
    "Women",
    "Kids",
    "Smartphone"
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");

  console.log(category);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    const range = [newPrice[0],newPrice[1]];
    setCurrentPage(1);
    setPrice(range);
  }

  const dispatch = useDispatch();

  const { keyword } = useParams();
  const { loading, error, product, productCount, filteredProductsCount } = useSelector((state) => (state.products));

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
    else{
      dispatch(getProduct(keyword, currentPage, price, category, rating));
    }
  }, [dispatch, keyword, currentPage, price, category, rating, error]);


  return (
    <div className='bg-gray-200'>
      <MetaData title = "SwipeCart -Products" />
      {
        loading ? <Loader /> :
          (
            <div className='flex flex-col gap-5 p-10'>
              <div className='flex flex-col gap-5'>
                <div className='text-3xl flex justify-center items-center font-semibold text-indigo-700'>Products</div>
                <div className='flex sm:flex-row flex-col'>
                  <div className='w-[30vw] mx-auto'>
                    <h1 className='flex justify-center items-center font-bold text-xl'>Price</h1>
                    <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay='auto'
                      aria-labelledby='range-slider'
                      min={0}
                      max={100000}
                    />
                  </div>
                  <div className='w-[30vw] mx-auto'>
                    <h1 className='flex justify-center items-center font-bold text-xl'>Ratings Above</h1>
                    <Slider 
                      value={rating}
                      onChange={(e, newRating)=>(setRating(newRating))}
                      valueLabelDisplay='auto'
                      aria-labelledby='continuous-slider'
                      min={0}
                      max={5}
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='hidden md:block w-[1/7] flex-col mt-5'>
                  <div className='font-bold text-xl'>Categories</div>
                  <div className='mt-3'>
                    <ul className=' rounded-[2%]'>
                      {
                        categories.map((item)=>(
                          <li key={item} className=' hover:text-white hover:bg-indigo-700 hover:shadow-md pr-7 pb-3 cursor-pointer' onClick={()=>setCategory(item)}>{item}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <div className='w-[70vw] mx-auto flex md:justify-start justify-center items-center flex-row flex-wrap m-3'>
                  {
                    product && product.map((item) => <ProductCard product={item} />)
                  }
                </div>
              </div>


              {
                filteredProductsCount > 8 &&
                (<div className="flex justify-center items-center my-5">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={8}
                    totalItemsCount={productCount}
                    onChange={setCurrentPageNo}
                    nextPageText="next"
                    prevPageText="prev"
                    itemClass=""
                    linkClass="border border-solid border-black font-sans hover:bg-gray-400 hover:text-white sm:p-4 p-3"
                    activeClass=""
                    activeLinkClass="bg-indigo-700 text-white"
                  />
                </div>)
              }

            </div>
          )
      }
    </div>
  )
}

export default Products
