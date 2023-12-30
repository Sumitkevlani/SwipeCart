import React from 'react';
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='bg-gray-200 min-h-[70vh] flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center gap-5'>
            <FaExclamationCircle size={50} color='#303f9f' className='flex justify-center items-center'/>
            <div className='text-3xl font-bold text-black'>Page Not Found</div>
            <Link to="/" className='flex justify-center items-center text-white font-bold bg-indigo-700 hover:shadow-md hover:bg-indigo-700 hover:text-white px-10 py-3'>Home</Link>
        </div>
    </div>
  )
};

export default NotFound;
