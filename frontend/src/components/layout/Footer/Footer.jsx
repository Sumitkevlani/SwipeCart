import React from 'react';
import Appstore from '../../../assets/Appstore.png';
import playstore from '../../../assets/playstore.png';

import { AiFillInstagram } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { FaTwitterSquare } from "react-icons/fa";

import SwipeCart from '../../../assets/SwipeCart.svg';
const Footer = () => {
  
  return (
    <div className="bg-indigo-800 py-6">
      <div className="max-w-7xl mx-auto flex flex-1 sm:flex-row flex-col justify-around">
        
        <div className="flex flex-col justify-between items-start gap-2 self-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-white text-xl">Download our app</h1>
            <img src={SwipeCart} alt="SwipeCart logo" className="h-12 w-15" />
          </div>
          <div className="flex items-center justify-center gap-5">
            <img src={Appstore} alt="AppStore" className="h-[80px] w-[100px] object-contain cursor-pointer hover:transform hover:scale-125 transition-transform" />
            <img src={playstore} alt="PlayStore" className="h-[80px] w-[100px] object-contain cursor-pointer hover:transform hover:scale-125 transition-transform" />
          </div>
        </div>
        <div className="flex justify-evenly sm:gap-8">
          <div className="flex flex-col justify-center items-start gap-4">
            <span className="text-white text-sm">Solutions</span>
            <span className="text-white text-sm cursor-pointer">Marketing</span>
            <span className="text-white text-sm cursor-pointer">Analytics</span>
            <span className="text-white text-sm cursor-pointer">Commerce</span>
            <span className="text-white text-sm cursor-pointer">Insights</span>
          </div>

          <div className="flex flex-col justify-center items-start gap-4">
            <span className="text-white text-sm">Company</span>
            <span className="text-white text-sm cursor-pointer">About</span>
            <span className="text-white text-sm cursor-pointer">Blog</span>
            <span className="text-white text-sm cursor-pointer">Partners</span>
            <span className="text-white text-sm cursor-pointer">Press</span>
          </div>

          <div className="flex flex-col justify-start items-start gap-4">
            <span className="flex items-center gap-2 text-white text-sm">Contact</span>
            <span className="flex items-center gap-2 text-white text-sm cursor-pointer">Instagram <AiFillInstagram size={20} style={{color: "white"}} /></span>
            <span className="flex items-center gap-2 text-white text-sm cursor-pointer">Facebook <AiFillFacebook size={20} style={{ color: "white" }} /></span>
            <span className="flex items-center gap-2 text-white text-sm cursor-pointer">Linkedin <AiFillLinkedin size={20} style={{ color: "white" }} /></span>
            <span className="flex items-center gap-2 text-white text-sm cursor-pointer">Twitter   <FaTwitterSquare size={20} style={{color:"white"}} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
