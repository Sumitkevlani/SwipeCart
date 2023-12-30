import React from 'react';
import {ClockLoader} from 'react-spinners';
const Loader = () => {
  return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
          <ClockLoader 
              radius="9"
              color="indigo"
            />
      </div>
  )
};

export default Loader;
