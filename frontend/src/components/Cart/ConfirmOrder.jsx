import React from 'react';
import CheckoutSteps from './CheckoutSteps.jsx';
import MetaData from '../layout/MetaData.jsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import './ConfirmOrder.css';

const ConfirmOrder = () => {

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    let amount = 0;
    
    cartItems?.map((item) => {
        amount += Number(item.price * item.quantity)
    });

    let shippingCharges = (amount>=2000)?0:200;

    let gstCharges = 0.18*amount;

    let totalCharges = amount + shippingCharges + gstCharges;

    const proceedToPayment = (e) => {
        e.preventDefault();
        const orderInfo  = {
            amount: amount,
            shippingCharges: shippingCharges,
            gstCharges: gstCharges,
            totalCharges: totalCharges
        };
        sessionStorage.setItem("orderInfo",JSON.stringify(orderInfo));
        navigate('/process/payment');
    }

    return (
        <div className='bg-gray-200 h-auto py-10'>
            <div className='mb-10'>
                <CheckoutSteps activeStep={1} />
            </div>            
            <div className='w-[70%] mx-auto'>
                <MetaData title ="Confirm Order" />

                <div className='confirmOrderContainer'>
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-2xl font-bold text-indigo-700'>Shipping Info</h1>
                            <div className='p-2 flex flex-col gap-2'>
                                <div className='flex flex-row gap-3 items-center'>
                                    <span><b>Name:</b></span>
                                    <span className='text-sm sm:text-base'>{user && user.name}</span>
                                </div>
                                <div className='flex flex-row gap-3 items-center'>
                                    <span><b>Phone:</b></span>
                                    <span className='text-sm sm:text-base'>{shippingInfo.phoneNo}</span>
                                </div>
                                <div className='flex flex-row gap-3 items-center'>
                                    <span><b>Address:</b></span>
                                    <span className='text-sm sm:text-base'>{shippingInfo.address}</span>
                                </div>
                                <div className='flex flex-row gap-3 items-center'>
                                    <span><b>Location:</b></span>
                                    <span className='text-sm sm:text-base'>{shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}, {shippingInfo.pinCode}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-2xl font-bold text-indigo-700'>Your Cart Items</h1>
                            <div className={`flex flex-col ${window.innerWidth <= 420 ? `gap-7` : `gap-3`}`}>
                                {
                                    cartItems.map((item)=>(
                                        <Link key={item.product} to={`/product/${item.product}`} className='grid grid-cols-3 custom-layout p-2'>
                                            <img src={item.image.url} alt="" className='h-[150px] object-cover rounded-[5%] custom-img hover:shadow-md'/>
                                            <div className='flex items-center'><b>{item.name}</b></div>
                                            <div className='flex items-center'><b>₹{item.quantity * item.price}</b></div>
                                        </Link>

                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col gap-5`}>
                        <h1 className='text-2xl font-bold text-indigo-700'>Order Summary</h1>
                        <div className='flex flex-col gap-2 p-2'>
                            <div className='flex flex-row gap-3 items-center'>
                                <span><b>Subtotal:</b></span>
                                <span>{amount}</span>
                            </div>
                            <div className='flex flex-row gap-2 items-center'>
                                <span><b>Shipping Charges:</b></span>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <span><b>GST:</b></span>
                                <span>₹{gstCharges}</span>
                            </div>  
                            <div className='border border-solid border-black my-5'></div>
                            <div className='flex flex-row gap-3 items-center'>
                                <span><b>Total:</b></span>
                                <span><b>₹{totalCharges}</b></span>
                            </div> 
                            <div>
                                <button className='bg-indigo-700 text-white text-bold py-1 px-10 rounded-full border-t border-b hover:text-indigo-700 hover:bg-white hover:shadow-md hover:font-bold' onClick={proceedToPayment}>Proceed to payment</button>
                            </div>                                                                                 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ConfirmOrder;
