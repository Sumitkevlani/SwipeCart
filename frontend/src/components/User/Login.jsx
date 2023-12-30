import React, { useState, useEffect } from 'react';
import Loader from '../layout/Loader/Loader.jsx';
import SwipeCartIndigo from '../../assets/SwipeCartIndigo.jpg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../action/userAction.js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : 'accounts';
  
  const redirectURL = `/${redirect}`;

  const {error, loading, user, isAuthenticated} = useSelector(state => state.user);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const resetData = (e) => {
    setLoginEmail("");
    setLoginPassword("");
  };

  useEffect(()=>{
    if(error){
      console.log(error);
      toast.error('Invalid username or password.', {
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
    if(isAuthenticated){
      navigate(redirectURL);
    }
  },[dispatch, error, isAuthenticated]);

  return (
    <div className='bg-gray-200 h-auto py-10'>
      {
        loading? <Loader />:
        <div>
          <div className='bg-white sm:w-[35%] w-[80%] mx-auto py-10 rounded-[1%] shadow-md'>
            <div className='w-[80%] mx-auto'>
              <div className='flex justify-center items-center indigo-900 text-indigo-900'><img src={SwipeCartIndigo} alt="SwipeCartIndigo" className='h-[25%] w-[25%] rounded-full'/></div>
              <div className='text-2xl flex justify-center items-center font-bold mb-10 text-center'>Sign in to your account</div>
              <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-7'>
                  <div className='flex flex-col'>
                    <label htmlFor="username" className='text-lg font-bold'>Your email</label>
                    <input type="email" value={loginEmail} className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="username" placeholder='name@example.com' onChange={(e)=>setLoginEmail(e.target.value)} required/>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex justify-between'>
                      <label htmlFor="password" className='text-lg font-bold'>Password</label>
                      <Link to="/password/forgot" value={loginPassword} className='text-sm text-indigo-900 font-extrabold flex items-center'>Forgot Password?</Link>
                    </div>
                    <input type="password" className='border border-gray-400 shadow p-3 rounded-[1.5%] outline-indigo-900' name="password" placeholder='••••••••' onChange={(e)=>setLoginPassword(e.target.value)} required/>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <input type="submit" value="Submit" className='bg-indigo-700 p-3 text-white rounded-[7%] cursor-pointer hover:shadow-md hover:bg-indigo-900'/>
                    <input type="reset" onClick={resetData} value="Reset" className='bg-indigo-700 p-3 text-white rounded-[7%] cursor-pointer hover:shadow-md hover:bg-indigo-900'/>
                  </div>
                  <div className='text-sm flex justify-center gap-1 text-center'>Haven't registered yet?<Link to="/register" className='text-indigo-700 cursor-pointer font-bold text-center'>Signup</Link></div>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer />
        </div>
      }
    </div>
  )
};

export default Login;
