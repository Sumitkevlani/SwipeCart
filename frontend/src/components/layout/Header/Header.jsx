import React,{useState} from 'react';
import SwipeCart from '../../../assets/SwipeCart.svg';
import { BiSolidUser } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {


  const { isAuthenticated, user } = useSelector(state => state.user);
  const {cartItems} = useSelector(state=>state.cart);
  const [showMenu,setShowMenu] = useState(false);

  function showMainMenu(){
    setShowMenu(!showMenu);
  }

  return (
    <nav className="bg-indigo-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center">
            
            <Link to="/" className="flex flex-shrink-0 items-center cursor-pointer transform hover:scale-150 transition-transform">
              <img src={SwipeCart} alt="SwipeCart logo" className="h-14 w-13" />
            </Link>

            <div className="flex flex-1 items-center space-x-4">
              <div className="hidden sm:ml-6 sm:block">
                <Link to="/" className="text-gray-300 hover:bg-indigo-950 hover:text-white rounded-md px-3 py-2 text-sm font-medium self-center" aria-current="page">Home</Link>
                <Link to="/products" className="text-gray-300 hover:bg-indigo-950 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Products</Link>
                <Link to="/contact" className="text-gray-300 hover:bg-indigo-950 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Contact</Link>
                <Link to="/about" className="text-gray-300 hover:bg-indigo-950 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end">
            {cartItems.length>0 && <div className='w-[15px] h-[15px] bg-red-600 rounded-full relative left-7 bottom-2 z-10'></div>}
            <Link to="/cart" className="mr-10 cursor-pointer transform hover:scale-150 transition-transform">
              <AiOutlineShoppingCart size={22} color="white" />
            </Link>
            <Link to="/search" className="mr-10 cursor-pointer transform hover:scale-150 transition-transform">
              <BsSearch size={22} color="white" />
            </Link>
            <Link to="/login" className="mr-10 cursor-pointer transform hover:scale-150 transition-transform">
              {/* {isAuthenticated?<UserOptions user={user} />:<BiSolidUser size={22} color="white" />} */}
              {!isAuthenticated && <BiSolidUser size={22} color="white" />}
            </Link>
            
          </div>

          <div className="justify-end flex items-center sm:hidden">

            <button type="button" onClick={showMainMenu} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg className={`${showMenu === true?`hidden`:`block`} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              <svg className={`${showMenu === false ? `hidden` : `block`} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        
        <div className="sm:hidden" id="mobile-menu">
          <div className={`${showMenu === false ? `hidden` : `block`} space-y-1 px-2 pb-3 pt-2`}>
            <Link to="/" className="bg-indigo-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</Link>
            <Link to="/products" className="text-gray-300 hover:bg-indigo-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Products</Link>
            <Link to="/contact" className="text-gray-300 hover:bg-indigo-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Contact</Link>
            <Link to="/about" className="text-gray-300 hover:bg-indigo-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
