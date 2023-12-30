import React from 'react';
import { Link } from 'react-router-dom';
const CartItem = ({ item, deleteCartItem }) => {
    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <Link to={`/product/${item.product}`}>
                <img src={item.image.url} className='h-[200px] w-auto object-cover rounded-[8%] hover:scale-110 hover:transform hover:transition-transform' alt="Item image" />
            </Link>

            <div className='flex flex-col justify-center items-center gap-3'>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <span className='text-black font-bold md:text-base text-sm'>{item.name}</span>
                    <span className='text-sm font-bold'>{`Price: ${item.price}`}</span>
                    <span className='text-sm block sm:hidden'>Quantity: {item.quantity}</span>
                    <span className='text-sm block sm:hidden'>Subtotal: {item.price * item.quantity}</span>
                </div>
                <div className='flex justify-start'>
                    <button className='bg-indigo-700 text-white text-bold py-1 px-2 rounded-[5%] hover:text-indigo-700 hover:bg-white hover:shadow-md' onClick={()=>deleteCartItem(item.product)}>Remove</button>
                </div>
            </div>
        </div>
    )
};

export default CartItem;
