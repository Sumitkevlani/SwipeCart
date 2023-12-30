import React from 'react';
import MetaData from '../layout/MetaData.jsx';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className='bg-gray-200 h-[70vh]'>
            <MetaData title='Order Success' />
            <div className='flex flex-col justify-center items-center gap-10 h-[100%]'>
                <div className='flex justify-center items-center'><FaCheckCircle size={50} color='blue' /></div>
                <div className='flex justify-center items-center'>
                    <span className='text-xl font-bold text-indigo-700'>Your Order has been placed successfully.</span>
                </div>
                <Link to='/orders/me' className='flex justify-center items-center'>
                    <button className='text-lg bg-indigo-700 text-white text-bold py-1 px-20 rounded-full border-t border-b hover:text-indigo-700 hover:bg-white hover:shadow-md hover:font-bold'>Your Orders</button>
                </Link>
            </div>
        </div>
    )
};

export default OrderSuccess;
// 4000 0027 6000 3184