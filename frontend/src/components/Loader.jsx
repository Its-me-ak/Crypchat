import React from 'react'
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <FiLoader className='animate-spin size-10 text-primary'/>
    </div>
  )
}

export default Loader