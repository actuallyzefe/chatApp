import React from "react";
import { ArrowDown2, AddCircle } from "iconsax-react";
const MessagesComponent = () => {
  return (
      <div className="messages-component bg-gray-100 w-full h-full shadow-messages border-r border-solid border-gray-200 ">
        <div className="messages-header border-b border-solid border-gray-200 flex py-6 px-4 items-center">
          <p className='font-semibold text-xl ml-3' >Messages</p>
          <ArrowDown2 className='ml-2' size="32" color="black"/> 
          <div className='w-8 h-6 bg-gray-300 rounded-3xl flex justify-center items-center ml-5'>20</div>
          <AddCircle className='ml-auto' size="32" color="black"/>
        </div>
        <AddCircle className="ml-auto" size="32" color="black" />
      </div>
      <div className="messages-global-list">
        <div className="messages-search-part">
          <form className="flex justify-center pt-4">
            <input
              type="text"
              placeholder="Search messages"
              className="w-4/5 rounded-xl h-12 "
            />
          </form>
        </div>
        <div className="messages-list"></div>
      </div>
    </div>
  );
};

export default MessagesComponent;
