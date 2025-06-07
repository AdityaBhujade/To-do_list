import React from 'react'
import logo2 from '../Images/3rd.png'
import logo3 from '../Images/2nd.png'

function Outro() {
  return (
    <div>
       <div className='flex justify-center h-[410px] w-full mx-auto mt-10'>
              <img src={logo2} alt="" />
              <img src={logo3} alt="" />
            </div>
            <div className='text-center mt-6'>
              <h1 className='text-3xl font-bold italic'>Manage your Task </h1>
              <p className='text-gray-600 text-lg mt-2'>Stay ahead of your day with our powerful yet simple to-do app.Plan. Prioritize. Progress.</p>
            </div>
        
    </div>
  )
}

export default Outro
