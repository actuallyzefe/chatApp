import React from 'react';
import { Message, Home2, SearchNormal1, Calendar2, Setting2, ProfileCircle} from 'iconsax-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { auth } from '../firebase';



const LeftBarComponent = () => {
  //const { user } = useSelector(state => state.auth);
  return (
    <div className='sticky leftbar-component bg-gray-100 w-full h-full shadow-leftbar z-10'>
        <div className='leftbar-elements w-full h-98 flex flex-col items-center mt-3'>
          <div className='w-12 h-12 bg-indigo-400 rounded-xl flex justify-center items-center'>
            <Link to="/" className='text-3xl font-semibold text-gray-200 cursor-pointer'>C</Link>
          </div>
          <div className='leftbar-importants mt-11'>
          <Link to="/" ><Home2 className="cursor-pointer" size="32" color="black"/></Link>
          <Message className="mt-7 cursor-pointer" size="32" color="black"/>
          <Calendar2 className="mt-7 cursor-pointer" size="32" color="black"/>
          <Link to="user-profile"><ProfileCircle className='mt-7' size="32" color="black"/></Link>
          </div>
          <div className='leftbar-settings mt-auto mb-8'>
          <Setting2 className='cursor-pointer' size="32" color="black"/>
          </div>
        </div>
    </div>
  )
}

export default LeftBarComponent


/*
className="mt-7 cursor-pointer"
cursor-pointer

{user && <Link to="user-profile"><ProfileCircle className='mt-7' size="32" color="black"/></Link>}
*/