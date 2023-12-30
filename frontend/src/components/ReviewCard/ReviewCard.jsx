import React from 'react';
import Profile from '../../assets/Profile.png';

const ReviewCard = ({ review }) => {
    return (
        <div className='w-[70%] h-auto mx-auto mb-3 border border-gray-400 p-5'>
            <div className='flex flex-col justify-center items-center ml-[-10px]'>
                <img className='h-[80px] w-[80px] rounded-full ' src={Profile} alt="Profile image" />
                <span className='font-bold text-sm'>{review.name}</span>
                <span className='text-gray-700 text-sm'>{review.comment}</span>
            </div>
        </div>
    );
};

export default ReviewCard;
