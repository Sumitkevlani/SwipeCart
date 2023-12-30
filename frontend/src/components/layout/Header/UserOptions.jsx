import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { MdDashboard } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../action/userAction.js';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const UserOptions = ({ user }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const actions = [
        { icon: <IoIosPerson />, tooltipTitle: "Profile", func: account },
        { icon: <MdExitToApp />, tooltipTitle: "Logout", func: logoutUser },
        { icon: <FaListAlt />, tooltipTitle: "Orders", func: orders },
    ];

    if (user.role === "admin") {
        actions.unshift({ icon: <MdDashboard />, tooltipTitle: "Dashboard", func: dashboard });
    }

    function account(){
        navigate("/accounts");
    }

    function dashboard(){
        navigate("/admin/dashboard");
    }

    function orders(){
        navigate("/orders/me");
    }

    function logoutUser(){
        dispatch(logout());
        navigate("/");
        toast.success('Logout Successfully.', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const [open, setOpen] = useState(false);
    return (
        <div>
            <Backdrop open={open} style={{zIndex: "10"}}/>
            <SpeedDial style={{zIndex: "15"}} className='absolute top-[5px] sm:right-[40px] right-[50px]'
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                icon={<img className='sm:h-[50px] h-[30px] sm:w-[50px] w-[30px] rounded-full' src={user.avatar.url} alt="User Profile" />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.tooltipTitle}
                        icon={action.icon}
                        tooltipTitle={action.tooltipTitle}
                        onClick={action.func}
                        tooltipOpen={window.innerWidth<=600?true:false}
                    />
                ))}
            </SpeedDial>
        </div>
    )
};

export default UserOptions;
