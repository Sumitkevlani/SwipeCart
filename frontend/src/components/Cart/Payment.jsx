import React, { useEffect } from 'react';
import CheckoutSteps from './CheckoutSteps.jsx';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import { clearErrors, createOrder } from '../../action/orderAction.js';
import { removeAllItems } from '../../action/cartAction.js';

const Payment = () => {

    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));


    const { user } = useSelector((state)=>state.user);
    const { cartItems, shippingInfo } = useSelector((state)=>state.cart);
    const { error } = useSelector((state)=>state.newOrder);

    let orderItems = [];
    cartItems.map((item)=>{
        let orderItem = {
            name: item.name,
            product: item.product,
            image: item.image.url,
            quantity: item.quantity,
            price: item.price
        };
        orderItems.push(orderItem);
    });

    const order = {
        shippingInfo,
        orderItems: orderItems,
        itemsPrice: orderInfo.amount,
        taxPrice: orderInfo.gstCharges,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalCharges
    };

    console.log(order);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        payBtn.current.disabled = true;

        
        try{
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
                withCredentials: true
            };

            const paymentData = {
                amount: Math.round(orderInfo.totalCharges*100), 
            };

            const { data } = await axios.post(
                "http://127.0.0.1:5000/api/payment/process-payment",
                paymentData,
                config
            );
            
            const client_secret = data.client_secret;
            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.postal_code,
                            country: shippingInfo.country,
                        }
                    },
                },
            });
            if(result.error){
                payBtn.current.disabled = false;
                toast.error('Payment could not succeed.', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }else{
                if(result.paymentIntent.status === "succeeded"){
                    console.log(result.paymentIntent);
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    };
                    dispatch(createOrder(order));
                    navigate('/success');
                    dispatch(removeAllItems());
                }
                else{
                    toast.error('Payment could not succeed.', {
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
            }

        }catch(error){
            payBtn.current.disabled = false;
            toast.error('Payment could not succeed.', {
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
    };


    useEffect(()=>{
        if(error){
            toast.error(error.message, {
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
    },[dispatch, error]);



    const payBtn = useRef(null);

    return (
        <div className='bg-gray-200 h-auto py-10'>
            <MetaData title="Payment" />
            <div className='mb-10'>
                <CheckoutSteps activeStep={2} />
            </div>
            <div>

                <div className='bg-white md:w-[50%] w-[80%] mx-auto py-10 rounded-[1%] shadow-md'>
                    <div className='w-[80%] mx-auto'>
                        <div className='flex justify-center items-center indigo-900 text-indigo-900'><img src={SwipeCartIndigo} alt="SwipeCartIndigo" className='h-[25%] w-[25%] rounded-full' /></div>
                        <div className='text-2xl flex justify-center items-center font-bold mb-10 text-center'>Payment Info</div>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-7'>
                                <div className='flex flex-col'>
                                    <label className='text-lg font-bold'>Credit Card</label>
                                    <CardNumberElement className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-lg font-bold'>Expiry Date</label>
                                    <CardExpiryElement className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-lg font-bold'>CVV Number</label>
                                    <CardCvcElement className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' />
                                </div>
                                

                                <div className='flex flex-row justify-between'>
                                    <input type="submit" ref={payBtn} value={`Pay- ₹${orderInfo && orderInfo.totalCharges}`} className='bg-indigo-700 p-3 text-white rounded-full border-t border-b px-[10%] cursor-pointer hover:shadow' />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Payment;
