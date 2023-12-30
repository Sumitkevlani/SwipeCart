import React, { useState, useEffect } from 'react';
import Profile from '../../assets/Profile.png';
import { updateProfile, clearErrors } from '../../action/profileAction.js';
import { useDispatch, useSelector } from 'react-redux';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader.jsx';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../action/userAction.js';
import { UPDATE_PROFILE_RESET } from '../../constants/profileConstants.js';
import MetaData from '../layout/MetaData.jsx';

const UpdateProfile = () => {
    const { user } = useSelector(state => state.user);
    const { loading, isUpdated, error } = useSelector((state)=>state.profile);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(Profile);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        console.log(myForm);
        dispatch(updateProfile(myForm));
    };

    const resetData = (e) => {
        setName(user.name);
        setEmail(user.email);
        setAvatar(Profile);
        setAvatarPreview(Profile);
    };

    const updateDataChange = (e) => {
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
        else if(e.target.name==="name") {
            setName(e.target.value);
        }
        else if(e.target.name==="email"){
            setEmail(e.target.value);
        }
    };

    
    useEffect(() => {

        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
        setAvatar(user.avatar.url);

        if(error){
            toast.error('Profile could not be updated.', {
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
        if(isUpdated){

            dispatch(loadUser());

            navigate('/accounts');

            toast.success('Profile updated successfully.', {
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
                type: UPDATE_PROFILE_RESET
            });
        }

    }, [dispatch, loading, error, isUpdated, navigate, user]);

    return (
        <div className='bg-gray-200 h-auto py-10'>
            <MetaData title="Edit Profile"/>
            {loading ? <Loader /> :
                <div>
                    <div className='bg-white sm:w-[35%] w-[80%] mx-auto py-10 rounded-[1%] shadow-md'>
                        <div className='w-[80%] mx-auto'>
                            <div className='flex justify-center items-center indigo-900 text-indigo-900'><img src={SwipeCartIndigo} alt="SwipeCartIndigo" className='h-[25%] w-[25%] rounded-full' /></div>
                            <div className='text-2xl flex justify-center items-center font-bold mb-10 text-center'>Update Profile</div>
                            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className='flex flex-col gap-7'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="username" className='text-lg font-bold'>Your name</label>
                                        <input type="username" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="name" placeholder={name} value={name} onChange={updateDataChange} required />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="email" className='text-lg font-bold'>Your email</label>
                                        <input type="email" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="email" placeholder={email} value={email} onChange={updateDataChange} required />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="avatar" className='text-lg font-bold'>Avatar</label>
                                        <div className='flex flex-row w-full gap-2'>
                                            <div className='w-[20%]'>
                                                <img className='w-[100%] rounded-full' src={avatarPreview} alt="Avatar Preview" />
                                            </div>
                                            <div className='custom-input w-[80%] flex justify-center items-center'>
                                                <input type="file" accept='image/*' className='w-[100%] flex items-center justify-center border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="avatar" placeholder='Upload avatar' onChange={updateDataChange} required />
                                            </div>

                                        </div>

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

export default UpdateProfile;
