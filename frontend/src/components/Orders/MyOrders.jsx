import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../action/orderAction.js';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../layout/Loader/Loader.jsx';
import { toast } from 'react-toastify';
import { MdLaunch } from "react-icons/md";
import { MdRemoveShoppingCart } from "react-icons/md";
import './MyOrders.css';

const MyOrders = () => {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { loading, error, orders } = useSelector((state) => state.myOrders);


    let rows = [];
    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 200, flex: 0.7 },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 250,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status;
            }
        },
        {
            field: 'itemQty',
            headerName: 'Items Qty',
            type: 'number',
            minWidth: 200,
            flex: 0.3
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            minWidth: 250,
            flex: 0.5
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.3,
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.row.id}`} className='hover:text-indigo-700'>
                        <MdLaunch size={22} />
                    </Link>
                )
            }
        }

    ];

    orders && orders.forEach((item, index) => {
        rows.push({
            itemQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        });
    });

    useEffect(() => {
        if (error) {
            toast.error('Orders could not be fetched.', {
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
        dispatch(myOrders());
    }, [dispatch, error, user]);

    return (
        <div className='bg-gray-200 min-h-[70vh] flex flex-col justify-center py-10 gap-10'>
            <div className='flex justify-center items-center text-3xl text-indigo-700 font-bold'>{user && user.name}'s Orders</div>
            <MetaData title="My Orders" />
            <div className='w-[100%] flex justify-center items-center'>
                {
                    (loading === true) ? <Loader /> :
                        (
                            <div>
                                {
                                    (orders && orders.length === 0) ?
                                        <>
                                            <div className='flex flex-col justify-center items-center gap-10'>
                                                <div className='flex justify-center items-center'><MdRemoveShoppingCart size={50} color='indigo' /></div>
                                                <div className='flex justify-center items-center'>
                                                    <span className='text-xl font-bold text-indigo-700'>NO ORDERS TO DISPLAY</span>
                                                </div>
                                                <Link to='/products' className='flex justify-center items-center'>
                                                    <button className='text-lg bg-indigo-700 text-white text-bold py-1 px-20 rounded-full border-t border-b hover:text-indigo-700 hover:bg-white hover:shadow-md hover:font-bold'>View Products</button>
                                                </Link>
                                            </div>
                                        </> :
                                        <div className='custom-layout'>

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
                                }
                            </div>
                        )
                }
            </div>
        </div>
    )
};

export default MyOrders;
