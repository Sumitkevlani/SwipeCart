import React from 'react';
import Header from './components/layout/Header/Header.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from 'webfontloader';
import { useEffect, useState } from 'react';
import Footer from './components/layout/Footer/Footer.jsx';
import Home from './components/Home/Home.jsx';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Products from './components/Product/Products.jsx';
import Search from './components/Product/Search.jsx';
import './App.css';
import './index.css';
import Login from './components/User/Login.jsx';
import Register from './components/User/Register.jsx';
import UserOptions from './components/layout/Header/UserOptions.jsx';
import Profile from './components/User/Profile.jsx'; 
import UpdateProfile from './components/User/UpdateProfile.jsx';
import UpdatePassword from './components/User/UpdatePassword.jsx';
import ForgotPassword from './components/User/ForgotPassword.jsx';
import ResetPassword from './components/User/ResetPassword.jsx';
import Cart from './components/Cart/Cart.jsx';
import Shipping from './components/Cart/Shipping.jsx';
import ConfirmOrder from './components/Cart/ConfirmOrder.jsx';
import Payment from './components/Cart/Payment.jsx';
import OrderSuccess from './components/Cart/OrderSuccess.jsx';
import MyOrders from './components/Orders/MyOrders.jsx';
import OrderDetails from './components/Orders/OrderDetails.jsx';
import Contact from './components/Contact/Contact.jsx';
import AboutMe from './components/About/AboutMe.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import { useDispatch,useSelector } from 'react-redux';
import { loadUser } from './action/userAction.js';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/Routes/ProtectedRoute.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { generateStripeKey } from './action/stripeKeyAction.js';


const App = () => {

  axios.defaults.baseURL = "https://swipe-cart-backend-routes.vercel.app";
  
  const dispatch = useDispatch();
  const {loading, isAuthenticated, user} = useSelector(state => state.user);
  const { stripeApiKey } = useSelector(state=>state.stripeApiKey);

  useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto","Brold Sans","Chilanka"]
      }
    });
    dispatch(loadUser());
    isAuthenticated && (stripeApiKey === undefined) && dispatch(generateStripeKey());
  },[dispatch]);



  return (
    <Router basename='/'>
        <Header></Header>
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
        <Route exact path = "/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route path = "/products/:keyword" element={<Products />}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/accounts" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route exact path="/profile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route exact path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/resetpassword/:token" element={<ResetPassword />}/>
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />  
        <Route exact path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} /> 
        <Route exact path="/process/payment" element={<ProtectedRoute>{stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>}</ProtectedRoute>} />
        <Route exact path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}/>
        <Route exact path="/orders/me" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
        <Route exact path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route exact path = "/contact" element={<Contact />}/>
        <Route exact path = "/about" element={<AboutMe/>}/>
        <Route path="*" element={<NotFound />} />
        </Routes>


        <ToastContainer />
        <Footer></Footer>
    </Router>
  )
};

export default App;
