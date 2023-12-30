import React, { useState, useEffect } from 'react';
import MetaData from '../layout/MetaData.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { resetPassword, clearErrors } from '../../action/forgotPasswordAction.js';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import Loader from '../layout/Loader/Loader.jsx';

const ResetPassword = () => {

    console.log(useParams());
    const { token } = useParams();
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector((state)=>state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const navigate = useNavigate();

    const updateDataChange = (e) => {
        if(e.target.name==="resetPassword"){
            setPassword(e.target.value);
        }
        if(e.target.name==="confirmPassword"){
            setconfirmPassword(e.target.value);
        }
    };

    const resetData = (e) => {
        setPassword("");
        setconfirmPassword("");
    }

    const handleSubmit = async(e) => {

        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword);
        dispatch(resetPassword(token, myForm));
    };

    useEffect(()=>{
        if(error){
            toast.error('Password could not be updated.', {
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

        if (success) {
            toast.success('Password updated successfully.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/login');
        }
    },[dispatch, error, navigate, success]);

    return (
        <div className='bg-gray-200 h-auto py-10'>
            <MetaData title="Reset Password" />
            {loading ? <Loader /> :
                <div>
                    <div className='bg-white sm:w-[35%] w-[80%] mx-auto py-10 rounded-[1%] shadow-md'>
                        <div className='w-[80%] mx-auto'>
                            <div className='flex justify-center items-center indigo-900 text-indigo-900'><img src={SwipeCartIndigo} alt="SwipeCartIndigo" className='h-[25%] w-[25%] rounded-full' /></div>
                            <div className='text-2xl flex justify-center items-center font-bold mb-10 text-center'>Reset Password</div>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-7'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="resetPassword" className='text-lg font-bold'>Enter new Password</label>
                                        <input type="password" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="resetPassword" placeholder="••••••••" value={password} onChange={updateDataChange} required />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="confirmPassword" className='text-lg font-bold'>Confirm Password</label>
                                        <input type="password" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="confirmPassword" placeholder="••••••••" value={confirmPassword} onChange={updateDataChange} required />
                                    </div>
                                    <div className='flex flex-row justify-between'>
                                        <input type="submit" value="Submit" className='bg-indigo-700 p-3 text-white rounded-[7%] cursor-pointer hover:shadow' />
                                        <input type="reset" onClick={resetData} value="Reset" className='bg-indigo-700 p-3 text-white rounded-[7%] cursor-pointer hover:shadow' />
                                    </div>
                                </div>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </div>}
        </div>
    )
};

export default ResetPassword;
