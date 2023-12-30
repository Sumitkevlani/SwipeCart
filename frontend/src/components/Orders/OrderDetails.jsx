import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData.jsx';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader.jsx';
import { toast } from 'react-toastify';
import { getOrderDetails, clearErrors } from '../../action/orderAction.js';
import './OrderDetails.css';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { error, loading, order } = useSelector((state) => state.orderDetails);
    console.log(order);

    useEffect(() => {
        if (error) {
            toast.error('Order could not be fetched.', {
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
        dispatch(getOrderDetails(id));

    }, [dispatch, error, id]);

    return (
        <div>
            <MetaData data = "Order Details"/>
            {
                (loading===true)?<Loader />:(
                    <div className='bg-gray-200 h-auto py-10'>
                        <div className='w-[70%] mx-auto'>
                            <div className='confirmOrderContainer'>
                                <div className='flex flex-col gap-10'>
                                    <div className='flex flex-col gap-5'>
                                        <h1 className='text-2xl font-bold text-indigo-700'>Shipping Info</h1>
                                        <div className='p-2 flex flex-col gap-2'>
                                            <div className='flex flex-row gap-3 items-center'>
                                                <span><b>Name:</b></span>
                                                <span className='text-sm sm:text-base'>{order && order.user && order.user.name}</span>
                                            </div>
                                            <div className='flex flex-row gap-3 items-center'>
                                                <span><b>Email:</b></span>
                                                <span className='text-sm sm:text-base'>{order && order.user && order.user.email}</span>
                                            </div>
                                            <div className='flex flex-row gap-3 items-center'>
                                                <span><b>Phone:</b></span>
                                                <span className='text-sm sm:text-base'>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                            </div>
                                            <div className='flex flex-row gap-3 items-center'>
                                                <span><b>Address:</b></span>
                                                <span className='text-sm sm:text-base'>{order && order.shippingInfo && order.shippingInfo.address}</span>
                                            </div>
                                            <div className='flex flex-row gap-3 items-center'>
                                                <span><b>Location:</b></span>
                                                <span className='text-sm sm:text-base'>{order && order.shippingInfo && order.shippingInfo.city}, {order && order.shippingInfo && order.shippingInfo.state}, {order && order.shippingInfo && order.shippingInfo.country}, {order && order.shippingInfo && order.shippingInfo.pinCode}</span>
                                            </div>
                                            <div className='flex flex-row gap-3 items-center'>
                                                <span><b>Order Status:</b></span>
                                                <span className={`text-sm sm:text-base ${order && order.orderStatus === "Deilvered" ? `text-green-600`:`text-red-600`}`}>{order && order.orderStatus}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-5'>
                                        <h1 className='text-2xl font-bold text-indigo-700'>Purchased Items</h1>
                                        <div className={`flex flex-col ${window.innerWidth <= 420 ? `gap-7` : `gap-5`} pl-2`}>
                                            {
                                                order && order.orderItems && order.orderItems.map((item) => (

                                                        <Link key={item.product} to={`/product/${item.product}`}>
                                                            <img src={item.image} alt="" className='h-[150px] object-cover rounded-[5%] custom-img hover:shadow-md mb-2' />
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
                                            <span>{order && order.itemsPrice}</span>
                                        </div>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <span><b>Shipping Charges:</b></span>
                                            <span>₹{order && order.shippingPrice}</span>
                                        </div>
                                        <div className='flex flex-row gap-3 items-center'>
                                            <span><b>GST:</b></span>
                                            <span>₹{order && order.taxPrice}</span>
                                        </div>
                                        <div className='border border-solid border-black my-5'></div>
                                        <div className='flex flex-row gap-3 items-center'>
                                            <span><b>Total:</b></span>
                                            <span><b>₹{order && order.totalPrice}</b></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default OrderDetails;
