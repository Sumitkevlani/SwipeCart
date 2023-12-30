import React, { useState, useEffect } from 'react';
import MetaData from '../layout/MetaData.jsx';
import { useDispatch, useSelector } from 'react-redux';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader.jsx';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, clearErrors } from '../../action/forgotPasswordAction.js';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const { error,message,loading } = useSelector((state) => state.forgotPassword);


    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email',email);
        dispatch(forgotPassword(myForm));
    };

    const resetData = (e) => {
        setEmail("");
    };

    const updateDataChange = (e) => {
        setEmail(e.target.value);
    }

    useEffect(() => {
        console.log("Use effect called");
        if (error) {
            toast.error('E-mail could not be sent.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(response?.error);
            dispatch(clearErrors());
        }
        if (message) {
            navigate("/");
            toast.success('E-mail sent successfully.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            
            console.log("Here");
        }

    }, [dispatch, error, loading, message]);


    return (
        <div className='bg-gray-200 h-auto py-10'>
            <MetaData title="Forgot Password" />
            {loading ? <Loader /> :
                <div>
                    <div className='bg-white sm:w-[35%] w-[80%] mx-auto py-10 rounded-[1%] shadow-md'>
                        <div className='w-[80%] mx-auto'>
                            <div className='flex justify-center items-center indigo-900 text-indigo-900'><img src={SwipeCartIndigo} alt="SwipeCartIndigo" className='h-[25%] w-[25%] rounded-full' /></div>
                            <div className='text-2xl flex justify-center items-center font-bold mb-10 text-center'>Forgot Password</div>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-7'>
                                 
                                    <div className='flex flex-col'>
                                        <label htmlFor="email" className='text-lg font-bold'>Your email</label>
                                        <input type="email" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="email" placeholder="name@example.com" value={email} onChange={updateDataChange} required />
                                    </div>
                                    <div className='flex flex-row justify-between'>
                                        <input type="submit" value="Send mail" className='bg-indigo-700 p-3 text-white rounded-[7%] cursor-pointer hover:shadow' />
                                        <input type="reset" onClick={resetData} value="Reset" className='bg-indigo-700 p-3 text-white rounded-[7%] cursor-pointer hover:shadow' />
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>}
            <ToastContainer />
        </div>
    )
};

export default ForgotPassword;
