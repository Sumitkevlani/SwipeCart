import React, { useEffect, useState } from 'react';
import CartItem from './CartItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../../action/cartAction.js';
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData.jsx';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);
    console.log(cartItems);

    const [totalPrice, setTotalPrice] = useState(0);

    const deleteCartItems = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    };

    useEffect(() => {
        let amount = 0;

        cartItems?.map((item) => {
            amount += (item.price * item.quantity)
        });

        setTotalPrice(amount);

    }, [dispatch, deleteCartItems]);

    return (
        <div className='min-h-[70vh] bg-gray-200'>
            <MetaData title="Cart" />
            <div className='w-[70%] py-20 mx-auto'>
                {(cartItems.length === 0) ? 
                <>
                    <div className='flex flex-col justify-center items-center gap-10'>
                        <div className='flex justify-center items-center'><MdRemoveShoppingCart size={50} color='indigo'/></div>
                        <div className='flex justify-center items-center'>
                            <span className='text-xl font-bold text-indigo-700'>NO ITEMS TO DISPLAY</span>
                        </div>
                        <Link to='/products' className='flex justify-center items-center'>
                                <button className='text-lg bg-indigo-700 text-white text-bold py-1 px-20 rounded-full border-t border-b hover:text-indigo-700 hover:bg-white hover:shadow-md hover:font-bold'>View Products</button>
                        </Link>
                    </div>
                </> : 
                <div className='flex flex-col gap-10'>
                    <div className='flex sm:flex-row justify-center items-center'>
                        <div className='sm:w-[60%] w-[100%] self-center flex justify-evenly items-center'>
                            <span className='font-bold text-indigo-700 text-lg'>Products</span>
                        </div>
                        <div className='sm:flex hidden w-[40%] flex-row justify-evenly items-center'>
                            <div>
                                <span className='font-bold text-indigo-700 text-lg'>Quantity</span>
                            </div>
                            <div>
                                <span className='font-bold text-indigo-700 text-lg'>Subtotal</span>
                            </div>
                        </div>
                    </div>

                    {
                        cartItems && cartItems.map((item) => (
                            <div key={item.product} className='flex sm:flex-row justify-center items-center'>
                                <div className='sm:w-[60%] w-[100%] flex justify-center items-center self-center'>
                                    <CartItem item={item} deleteCartItem={deleteCartItems} />
                                </div>
                                <div className='sm:flex hidden w-[40%] flex-row justify-evenly items-center'>
                                    <div>
                                        {item.quantity}
                                    </div>
                                    <div className='font-bold'>
                                        ₹{item.quantity * item.price}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className='w-[100%] h-[2px] bg-indigo-700'></div>
                    <div className='flex flex-col justify-center gap-2'>
                        <div className='flex justify-center items-center'>
                            <span className='text-lg font-bold text-indigo-700'>Total : ₹{totalPrice}</span>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className='text-lg bg-indigo-700 text-white text-bold py-1 px-20 rounded-full border-t border-b hover:text-indigo-700 hover:bg-white hover:shadow-md hover:font-bold' onClick={checkoutHandler}>Checkout</button>
                        </div>

                    </div>
                </div>
                }
            </div>
        </div>
    )
};

export default Cart;
