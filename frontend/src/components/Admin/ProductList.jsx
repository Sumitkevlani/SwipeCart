import React, { useEffect } from 'react';
import { getProductsByAdmin, clearErrors } from '../../action/productAction.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Metadata from '../layout/MetaData.jsx';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../layout/Loader/Loader.jsx';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {

    const dispatch = useDispatch();
    const { loading, error, product: products } = useSelector((state) => state.products);

    useEffect(()=>{
        if(error){
            toast.error('Products could not be fetched.', {
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
        dispatch(getProductsByAdmin());
    },[dispatch, error]);

    const columns = [
        { field: 'id', headerName: 'Product ID', minWidth: 350, type: 'number', flex: 0.5, className: 'flex justify-center items-center' },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 3
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type : 'number',
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 200,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex flex-row justify-center items-center gap-2'>
                        <div className='flex justify-center items-center'>
                            <Link to={`/admin/product/${params.row.id}`} className='hover:text-indigo-700'>
                                <FaEdit size={20} />
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className='hover:text-indigo-700'>
                                <MdDelete size={20} />
                            </button>
                        </div>
                        
                    </div>
                )
            }
        }
    ];

    const rows = [];

    products && products.forEach((item)=>{
        rows.push({
            id: item._id,
            name: item.name,
            stock: item.Stock,
            price: item.price,
        });
    });

    return (
        <div className='py-10 custom-container'>
            <Metadata title="Products List" />
            <div className='w-[100%] flex justify-center items-center px-2'>
                {
                    (loading === true) ? <Loader /> :
                        (
                            <div className='custom-layout'>
                                <div className='flex justify-center items-center text-indigo-700 text-2xl font-bold'>ALL PRODUCTS</div>
                                <div className='table-container'>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { pageSize: 5 }
                                            }
                                        }}
                                        className='table'
                                        pageSizeOptions={[5, 10, 15]}
                                        disableRowSelectionOnClick

                                    />
                                </div>

                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default ProductList;
