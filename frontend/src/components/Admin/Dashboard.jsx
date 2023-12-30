import React,{ useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';
import Metadata from '../layout/MetaData.jsx';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import { getProductsByAdmin } from '../../action/productAction.js';

const Dashboard = () => {

    const dispatch = useDispatch();
    
    Chart.register(...registerables);

    const { loading, product: products } = useSelector((state) => state.products);

    let outOfStockProducts = 0;
    let inStockProducts = 0;

    products && products.forEach((product) => {
        if (product.Stock <= 0) {
            outOfStockProducts = outOfStockProducts + 1;
        }
        else {
            inStockProducts = inStockProducts + 1;
        }
    });

    const lineState = {
        labels: ["0-5000", "5000-10000","10000-20000","20000-50000","Above 50000"],
        datasets: [
            {
                label: "NO OF ORDERS",
                data:[50,26,30,21,5],
                backgroundColor: [
                    'rgb(255,255,255)'
                ],
                borderColor: [
                    'rgb(67,56,202)'
                ],
                borderWidth: 2

            }
        ]
    };

    const doughnutState = {
        labels: [
            'Out of Stock',
            'In Stock',
        ],
        datasets: [{
            label: 'Products',
            data: [outOfStockProducts,inStockProducts],
            backgroundColor: [
                'rgb(220,38,38)',
                'rgb(22,163,74)',
            ],
            hoverOffset: 4
        }]
    };

    

    useEffect(()=>{ 
        dispatch(getProductsByAdmin());
    }, [dispatch]);

    return (
        <div className='py-10 pl-10 custom-container'>
            <Metadata title = "Admin Dashboard" />
            <div className='custom-sidebar'>
                <Sidebar />
            </div>
            <div className='flex flex-col gap-10 border-l-2 border-indigo-700 custom-border custom-dashboard'>
                <div className='flex flex-col items-center font-bold text-2xl text-indigo-700'>Dashboard</div>
                <div className='flex justify-center'>
                    <div className='flex flex-col gap-2 items-center h-[150px] w-[150px] bg-indigo-700 text-white rounded-full justify-center font-bold hover:shadow-md'>
                        <div>Total Amount</div>
                        <div>4200</div>
                    </div>
                </div>
                <div className='flex justify-center h-auto'>
                    <div className='flex justify-around gap-3 custom-layout'>
                        <div className='bg-red-600 w-[150px] h-[150px] flex rounded-full hover:shadow-md'>
                            <Link to='/admin/products' className='flex flex-1 flex-col items-center justify-center text-xl text-white font-bold gap-2'>
                                <div>Products</div>
                                <div>50</div>
                            </Link>
                        </div>
                        <div className='bg-green-600 w-[150px] h-[150px] flex rounded-full hover:shadow-md'>
                            <Link to='/admin/orders' className='flex flex-1 flex-col items-center justify-center text-xl text-white font-bold gap-2'>
                                <div>Orders</div>
                                <div>40</div>
                            </Link>
                        </div>
                        <div className='bg-yellow-400 w-[150px] h-[150px] flex rounded-full hover:shadow-md'>
                            <Link to='/admin/users' className='flex flex-1 flex-col items-center justify-center text-xl text-white font-bold gap-2 '>
                                <div>Users</div>
                                <div>9</div>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className={`flex flex-col justify-center items-center`}>
                    <div className='flex justify-center items-center text-xl font-bold text-indigo-700'>Orders</div>
                    <Line data={lineState} className='custom-line-chart'/>
                </div>
                <div className='flex justify-evenly mt-5 items-center'>
                    <div className='flex justify-center items-center text-xl font-bold text-indigo-700'>Products</div>
                    <Doughnut data={doughnutState} className='custom-doughnut-chart'/>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;
