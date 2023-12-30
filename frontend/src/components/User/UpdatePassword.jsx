import React, { useState, useEffect } from 'react';
import { updatePassword, clearErrors } from '../../action/passwordAction.js';
import { useDispatch, useSelector } from 'react-redux';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader.jsx';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../action/userAction.js';
import { UPDATE_PASSWORD_RESET } from '../../constants/passwordConstants.js';
import MetaData from '../layout/MetaData.jsx';

const UpdatePassword = () => {
    const { loading, isUpdated, error } = useSelector((state) => state.password);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };

    const resetData = (e) => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const updateDataChange = (e) => {
        if (e.target.name === "oldPassword") {
            setOldPassword(e.target.value);
        }
        else if (e.target.name === "newPassword") {
            setNewPassword(e.target.value);
        }
        else if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
        }
    };

    useEffect(() => {

        if (error) {
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
            console.log(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {

            dispatch(loadUser());

            navigate('/accounts');

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

            dispatch({
                type: UPDATE_PASSWORD_RESET
            });
        }

    }, [dispatch, loading, error, isUpdated, navigate]);

    return (
        <div className='bg-gray-200 h-auto py-10'>
            <MetaData title="Update Password" />
            {loading ? <Loader /> :
                <div>
                    <div className='bg-white sm:w-[35%] w-[80%] mx-auto py-10 rounded-[1%] shadow-md'>
                        <div className='w-[80%] mx-auto'>
                            <div className='flex justify-center items-center indigo-900 text-indigo-900'><img src={SwipeCartIndigo} alt="SwipeCartIndigo" className='h-[25%] w-[25%] rounded-full' /></div>
                            <div className='text-2xl flex justify-center items-center font-bold mb-10 text-center'>Update Password</div>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-7'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="oldPassword" className='text-lg font-bold'>Old Password</label>
                                        <input type="password" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="oldPassword" placeholder="••••••••" value={oldPassword} onChange={updateDataChange} required />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="newPassword" className='text-lg font-bold'>New Password</label>
                                        <input type="password" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="newPassword" placeholder="••••••••" value={newPassword} onChange={updateDataChange} required />
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

export default UpdatePassword;
