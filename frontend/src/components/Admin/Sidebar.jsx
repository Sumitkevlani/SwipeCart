import React from 'react';
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@material-ui/lab';
import { MdExpandMore } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdImportExport } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className='flex flex-col gap-7 sidebar '>
            <Link to='/'>
                <span className='text-2xl font-bold'>SwipeCart</span>
            </Link>
            <Link to='/admin/dashboard' className='flex items-center gap-1'>
                <span><MdDashboard /></span> <span>Dashboard</span>
            </Link>
            <Link>
                <TreeView defaultCollapseIcon={<MdExpandMore />} defaultExpandIcon={<MdImportExport/>}>
                    <TreeItem nodeId='1' label="Products">
                        <Link to='/admin/products' className='flex items-center gap-1'>
                            <TreeItem nodeId='2' label='All' icon={<MdOutlinePostAdd />} className='hover:text-indigo-700 hover:font-bold'/>
                        </Link>
                        <Link to='/admin/product/create-product' className='flex items-center gap-1'>
                            <TreeItem nodeId='3' label='Create' icon={<IoMdAdd />} className='hover:text-indigo-700 hover:font-bold' />
                        </Link>
                    </TreeItem>
                    <TreeItem></TreeItem>
                </TreeView>
            </Link>
            <Link to='/admin/orders' className='flex items-center gap-1'>
                <span><FaListAlt /></span>
                <span>Orders</span>
            </Link>
            <Link to='/admin/orders' className='flex items-center gap-1'>
                <span><IoPeople /></span>
                <span>Users</span>
            </Link>
            <Link to='/admin/orders' className='flex items-center gap-1'>
                <span><MdRateReview /></span>
                <span>Reviews</span>
            </Link>
            
        </div>
    );
};

export default Sidebar;
