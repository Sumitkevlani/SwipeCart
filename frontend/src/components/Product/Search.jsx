import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
const Search = () => {
    
    const [keyword, setKeyWord] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword.trim()}`);
        }
        else{
            navigate('/products');
        }
    }

    function handleChnage(e){
        setKeyWord(e.target.value);
    }

    return (
        <>
            <MetaData title="SwipeCart -Search"/>
            <div className='h-[70vh] flex justify-center items-center bg-gray-200'>
                <form onSubmit={handleSubmit}>
                    <input type="text focus:outline-none focus:border-b border-b" className='h-auto w-[30vw] p-3 outline-none mr-3' placeholder="Search a product" onChange={handleChnage} />
                    <input type="submit" className='h-auto w-auto p-3 bg-indigo-700 text-white cursor-pointer rounded-[5%] hover:shadow-md hover:text-indigo-700 hover:bg-white font-bold' value="Search" />
                </form>
            </div>
        </>
    );
};

export default Search;
