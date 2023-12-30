import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../action/userAction.js';

const Profile = () => {

    const { user } = useSelector(state => state.user);


    return (
        <div className='bg-gray-200'>
            <div>
                <MetaData title={`User- Profile`} />

                <div className='flex flex-col justify-center w-[70%] mx-auto'>
                    <h1 className='self-center text-3xl my-5 font-bold text-indigo-700'>My Profile</h1>
                </div>
                <div className='w-[70%] mx-auto flex sm:flex-row flex-col sm:justify-evenly justify-center gap-10'>
                    <div className='flex flex-col justify-center items-center sm:justify-start gap-10'>
                        <img className='flex justify-center items-center sm:w-[25vw] sm:h-[25vw] w-[50vw] h-[50vw] object-cover rounded-full' src={user && user.avatar && user.avatar.url} alt={user && user.name} />
                        <Link to="/profile/update" className='mb-10 p-2 flex justify-center items-center bg-indigo-700 text-white font-bold rounded-full border-t border-b px-5 hover:shadow-md hover:bg-white hover:text-indigo-700'>Edit Profile</Link>
                    </div>
                    <div className='flex flex-col justify-evenly items-start gap-5'>
                        <div className='flex flex-col justify-start gap-2 items-start'>
                            <h1 className='text-xl font-bold'>Full Name</h1>
                            <p className='text-sm text-gray-500'>{user && user.name}</p>
                        </div>
                        <div className='flex flex-col justify-start gap-2 items-start'>
                            <h1 className='text-xl font-bold'>Email</h1>
                            <p className='text-sm text-gray-500'>{user && user.email}</p>
                        </div>
                        <div className='flex flex-col justify-start gap-2 items-start'>
                            <h4 className='text-xl font-bold'>Joined On </h4>
                            <p className='text-sm text-gray-500'>{String(user && user.createdAt).substring(0, 10)}</p>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-5 mb-5'>
                            <Link to="/orders/me" className='sm:text-base text-sm p-2 flex justify-center items-center bg-white text-indigo-700 font-bold rounded-full border-t border-b px-5 hover:shadow-md hover:bg-indigo-700 hover:text-white'>My orders</Link>
                            <Link to="/password/update" className='text-sm p-2 flex justify-center items-center bg-white text-indigo-700 font-bold rounded-full border-t border-b px-5 hover:shadow-md hover:bg-indigo-700 hover:text-white'>Change password</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
