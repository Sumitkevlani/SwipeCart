import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './NewProduct.css';
import MetaData from '../layout/MetaData.jsx';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import { clearErrors, createProduct } from '../../action/productAction.js';
import { MdAccountTree } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { GrStorage } from "react-icons/gr";
import { BsSpellcheck } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { NEW_PRODUCT_RESET } from '../../constants/productConstants.js';

const NewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Men",
        "Women",
        "Kids",
        "Smartphone"
    ];

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((data) => [...data, reader.result]);
                    setImages((data) => [...data, reader.result]);
                    console.log(images);
                    console.log(imagesPreview);
                }
            };
            reader.readAsDataURL(file);
        });

        

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('stock', stock);

        images.forEach((image) => {
            myForm.append('images', image);
        });

        dispatch(createProduct(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error('Error while creating the product.', {
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
            toast.success('Product created successfully.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/admin/dashboard');
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success, navigate]);

    return (
        <div className='bg-gray-200 h-auto py-10'>
            <MetaData title="Create New product" />
            <div className='bg-white sm:w-[35%] w-[80%] mx-auto py-10 rounded-[1%] shadow-md'>
                <div className='w-[80%] mx-auto'>
                    <div className='flex justify-center items-center indigo-900 text-indigo-900'><img src={SwipeCartIndigo} alt="SwipeCartIndigo" className='h-[25%] w-[25%] rounded-full' /></div>
                    <div className='text-2xl flex justify-center items-center font-bold mb-10 text-center'>Create Product</div>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className='flex flex-col gap-7'>
                            <div className='flex flex-row w-[100%] gap-2'>
                                <div className='flex justify-center items-center'>
                                    <BsSpellcheck size={25} />
                                </div>
                                <div className='flex-1'>
                                    <input type="text" className='border border-gray-400 shadow p-3 rounded-[1.5%] w-[100%] outline-indigo-900' name="name" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                            </div>
                            <div className='flex flex-row w-[100%] gap-2'>
                                <div className='flex justify-center items-center'>
                                    <MdAttachMoney size={25} />
                                </div>
                                <div className='flex-1'>
                                    <input type="number" className='border border-gray-400 shadow p-3 rounded-[1.5%] w-[100%] outline-indigo-900' name="price" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </div>
                            </div>
                            <div className='flex flex-row w-[100%] gap-2'>
                                <div className='flex justify-center items-center'>
                                    <MdDescription size={25} />
                                </div>
                                <div className='flex-1'>
                                    <textarea placeholder='Product Description' name="description" id="description" className='border border-gray-400 shadow p-3 rounded-[1.5%] w-[100%] outline-indigo-900' cols="30" rows="2" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                </div>
                            </div>
                            <div className='flex flex-row w-[100%] gap-2'>
                                <div className='flex justify-center items-center'>
                                    <MdAccountTree size={25} />
                                </div>
                                <div className='flex-1'>
                                    <select name="category" id="category" value={category} className='border border-gray-400 shadow p-3 rounded-[1.5%] w-[100%] outline-indigo-900' onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Choose Category</option>
                                        {
                                            categories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className='flex flex-row w-[100%] gap-2'>
                                <div className='flex justify-center items-center'>
                                    <GrStorage size={25} />
                                </div>
                                <div className='flex-1'>
                                    <input type="number" className='border border-gray-400 shadow p-3 rounded-[1.5%] w-[100%] outline-indigo-900' name="stock" placeholder='Stock' value={stock} onChange={(e) => setStock(e.target.value)} required />
                                </div>
                            </div>

                            <div className='flex flex-row w-[100%] gap-2'>
                                <div className='flex justify-center items-center'>
                                    <FaImages size={25} />
                                </div>
                                <div className='custom-input w-[100%] flex-1 flex justify-center items-center'>
                                    <input type="file" accept='image/*' multiple className='w-[100%] flex items-center justify-center border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="images" placeholder='Upload product images' onChange={createProductImagesChange} required />
                                </div>
                            </div>

                            <div>
                                {
                                    imagesPreview.map((image, index) => (
                                        <img key={index} src={image} alt="Avatar Preview Image" />
                                    ))
                                }
                            </div>
                            <div className='flex flex-row justify-between w-[100%]'>
                                <input type="submit" value="Submit" className='flex-1 border border-b border-t bg-indigo-700 p-3 text-white rounded-full cursor-pointer hover:shadow' disabled={loading ? true : false} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default NewProduct;
