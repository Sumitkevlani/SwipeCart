import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../action/cartAction.js';
import MetaData from '../layout/MetaData.jsx';
import { Country, State, City } from 'country-state-city';
import { ToastContainer, toast } from 'react-toastify';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import CheckoutSteps from './CheckoutSteps.jsx';
import { useNavigate } from 'react-router-dom';
import { generateStripeKey } from '../../action/stripeKeyAction.js';

const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingInfo } = useSelector((state) => state.cart);
    const { stripeApiKey } = useSelector((state)=>state.stripeApiKey);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length > 10 || phoneNo.length < 10) {
            toast.error('Phone number cannot be more than 10 digits.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (pinCode.length > 6 || pinCode.length < 6) {
            toast.error('Pin code cannot be more than 10 digits.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
        if(stripeApiKey===undefined){
            dispatch(generateStripeKey());
        }
        navigate('/order/confirm');
    };

    return (
        <div className='bg-gray-200 h-auto py-10'>
            <MetaData title="Shipping Details" />
            <div className='mb-10'>
                <CheckoutSteps activeStep={0} />
            </div>
            <div>

                <div className='bg-white md:w-[50%] w-[80%] mx-auto py-10 rounded-[1%] shadow-md'>
                    <div className='w-[80%] mx-auto'>
                        <div className='flex justify-center items-center indigo-900 text-indigo-900'><img src={SwipeCartIndigo} alt="SwipeCartIndigo" className='h-[25%] w-[25%] rounded-full' /></div>
                        <div className='text-2xl flex justify-center items-center font-bold mb-10 text-center'>Shipping Details</div>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-7'>
                                <div className='flex flex-col'>
                                    <label htmlFor="address" className='text-lg font-bold'>Address</label>
                                    <input type="text" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="address" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="city" className='text-lg font-bold'>City</label>
                                    <input type="text" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="city" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} required />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="phoneNo" className='text-lg font-bold'>Contact No</label>
                                    <input type="number" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="phoneNo" placeholder='1234567890' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="pinCode" className='text-lg font-bold'>Pin Code</label>
                                    <input type="number" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="pinCode" placeholder='123456' value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="country" className='text-lg font-bold'>Country</label>
                                    <select className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' value={country} required onChange={(e) => setCountry(e.target.value)}>
                                        <option className='text-sm' value="">Country</option>
                                        {
                                            Country && Country.getAllCountries().map((item) => (

                                                <option className='text-sm' value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {
                                    country && (<div className='flex flex-col'>
                                        <label htmlFor="state" className='text-lg font-bold'>State</label>
                                        <select className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' value={state} required onChange={(e) => setState(e.target.value)}>
                                            <option className='text-sm' value="">State</option>
                                            {
                                                State && State.getStatesOfCountry(country).map((item) => (

                                                    <option className='text-sm' value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>)
                                }

                                <div className='flex flex-row justify-between'>
                                    <input type="submit" value="Continue" className='bg-indigo-700 p-3 text-white rounded-full border-t border-b px-[10%] ml-[30%] cursor-pointer hover:shadow' disabled={state ? false : true} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </div>
    )
};

export default Shipping;
