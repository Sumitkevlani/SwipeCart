import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { BiSolidContact } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData.jsx';
import './Contact.css';

const Contact = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Form submitted successfully. We will contact you soon.', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className='bg-gray-200 min-h-[70vh] py-20'>
      <MetaData title="SwipeCart - Contacts"/>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='flex justify-center items-center text-indigo-700 text-xl font-bold'>CONTACT</h1>
        <h1 className='text-5xl flex justify-center items-center text-black font-bold'>Get in touch</h1>
        <h3 className='mt-3 text-gray-500 text-xl'>Reach Out, Swipe In</h3>
      </div>
      <div className='h-[10vh] w-[100%] flex justify-center items-center'></div>
      <div className='custom-layout'>
        <div>
          <div className='custom-text mb-20'>
            Welcome to SwipeCart, your all-in-one destination for seamless online shopping!Have questions, feedback, or just want to say hello? Our team is here for you. Your satisfaction is our priority, and your input drives our innovation. Get in touch, and let's elevate your shopping journey together!
          </div>
          <div className='custom-cards w-[100%] mx-auto'>
            <div className='flex flex-row gap-5 items-center py-4 pl-5'>
              <div className='h-[50px] w-[50px] bg-indigo-700 rounded-full flex justify-center items-center'><CiLocationOn size={25} color='white' /></div>
              <div>
                <div className='flex justify-start items-center font-bold text-xl mb-3'>Our Address</div>
                <div className='text-sm text-gray-500'>Sindhi Colony, Sojat City</div>
                <div className='text-sm text-gray-500'>Pali,India</div>
              </div>
            </div>
            <div className='flex flex-row gap-5 items-center py-4 pl-5'>
              <div className='h-[50px] w-[50px] bg-indigo-700 rounded-full flex justify-center items-center'><BiSolidContact size={25} color='white' /></div>
              <div>
                <div className='flex justify-start items-center font-bold text-xl mb-3'>Contact</div>
                <div className='text-sm text-gray-500'>Mobile: +91 90012-39094</div>
                <div className='text-sm text-gray-500'>Email: kevlanisumit2004@gmail.com</div>
              </div>
            </div>
            <div className='flex flex-row gap-5 items-center py-4 pl-5'>
              <div className='h-[50px] w-[50px] bg-indigo-700 rounded-full flex justify-center items-center'><FaRegClock size={25} color='white' /></div>
              <div>
                <div className='flex justify-start items-center font-bold text-xl mb-3'>Working Hours</div>
                <div className='text-sm text-gray-500'>Monday - Friday: 09:00 - 19:00</div>
                <div className='text-sm text-gray-500'>Saturday & Sunday: 09:00 - 13:00</div>
              </div>
            </div>
          </div>
        </div>
        <div className='py-10'>
          <h1 className='flex items-center justify-center font-bold text-black text-3xl'>Ready to get Started?</h1>
          <form action="" className='flex flex-col justify-center py-10 gap-3' onSubmit={handleSubmit}>
            <input type="text" placeholder='Your name' className='h-[7vh] p-3 shadow-md border-2 border-indigo-700' />
            <input type="text" placeholder='Your email' className='h-[7vh] p-3 shadow-md border-2 border-indigo-700' />
            <textarea name="message" placeholder='Write your message' id="" cols="30" rows="4" className='p-3 shadow-md border-2 border-indigo-700'></textarea>
            <input type="submit" value="Submit" className='bg-indigo-700 text-white text-xl flex justify-center items-center p-2 cursor-pointer hover:shadow-md'/>
          </form>
        </div>

        <div></div>
      </div>
    </div>
  )
};

export default Contact;
