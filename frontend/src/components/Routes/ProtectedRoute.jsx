import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../layout/Loader/Loader.jsx';
import { toast } from 'react-toastify';
import { loadUser } from '../../action/userAction.js';


const ProtectedRoute = ({ children, isAdmin }) => {
    let location = useLocation();
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(()=>{
        console.log(isAuthenticated, user, loading);
        if(loading===undefined){
            dispatch(loadUser());
        }
        if(isAuthenticated===false){   
            navigate('/login');
        }
        if (isAdmin === true && user!==undefined && user!=null && user.role!==undefined && user.role !== "admin") {
            console.log(user);
            toast.error('Only admins can access the route.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/login');
        }

    },[dispatch, user, navigate, isAuthenticated, loading]);
    

    if(loading){
        return <Loader />;
    }
    else{
        return children;
    }   
};

export default ProtectedRoute;