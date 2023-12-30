import React, { useState, useEffect } from 'react';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import { Link } from 'react-router-dom';
import Profile from '../../assets/Profile.png';
import './Register.css';
import { register, clearErrors } from '../../action/userAction.js';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { error, loading, isAuthenticated } = useSelector(state => state.user);

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(Profile);


    const handleSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", user.name);
        myForm.set("email", user.email);
        myForm.set("password", user.password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    };

    const resetData = (e) => {
        setUser({});
        setAvatar("");
        setAvatarPreview(Profile);  
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const redirect = location.search ? location.search.split("=")[1]:'/accounts';
    console.log(redirect);

    useEffect(() => {
        if (error) {
            toast.error('Error while registering.', {
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
        else{
            if (isAuthenticated) {
                navigate(redirect);
            }
        }
    }, [dispatch, error, isAuthenticated]);

    return (
        <div className='bg-gray-200 h-auto py-10'>
            {loading?<Loader />:
            <div>
                <ToastContainer />
                <div className='bg-white sm:w-[35%] w-[80%] mx-auto py-10 rounded-[1%] shadow-md'>
                    <div className='w-[80%] mx-auto'>
                        <div className='flex justify-center items-center indigo-900 text-indigo-900'><img src={SwipeCartIndigo} alt="SwipeCartIndigo" className='h-[25%] w-[25%] rounded-full' /></div>
                        <div className='text-2xl flex justify-center items-center font-bold mb-10 text-center'>Create an Account</div>
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='flex flex-col gap-7'>
                                <div className='flex flex-col'>
                                    <label htmlFor="username" className='text-lg font-bold'>Your name</label>
                                    <input type="username" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="name" placeholder='Name' onChange={registerDataChange} required />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="email" className='text-lg font-bold'>Your email</label>
                                    <input type="email" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="email" placeholder='name@example.com' onChange={registerDataChange} required />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="password" className='text-lg font-bold'>Password</label>
                                    <input type="password" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="password" placeholder='••••••••' onChange={registerDataChange} required />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="avatar" className='text-lg font-bold'>Avatar</label>
                                    <div className='flex flex-row w-full gap-2'>
                                        <div className='w-[20%]'>
                                            <img className='w-[100%] rounded-full' src={avatarPreview} alt="Avatar Preview" />
                                        </div>
                                        <div className='custom-input w-[80%] flex justify-center items-center'>
                                            <input type="file" accept='image/*' className='w-[100%] flex items-center justify-center border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="avatar" placeholder='Upload avatar' onChange={registerDataChange} required />
                                        </div>

                                    </div>

                                </div>
                                <div className='flex flex-row justify-between'>
                                    <input type="submit" value="Submit" className='bg-indigo-700 p-3 text-white rounded-[7%] cursor-pointer hover:shadow' />
                                    <input type="reset" onClick={resetData} value="Reset" className='bg-indigo-700 p-3 text-white rounded-[7%] cursor-pointer hover:shadow' />
                                </div>
                                <div className='text-sm flex justify-center gap-1 text-center'>Already registered?<Link to="/login" className='text-indigo-700 cursor-pointer font-bold text-center'>Signin</Link></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
};

export default Register;
