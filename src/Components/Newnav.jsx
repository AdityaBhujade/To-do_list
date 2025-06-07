import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import Done from './Done'
function Newnav({ setFilter }) {
  return (
    <>

      <div className='border-b-2 border-gray-200 py-3 px-5'>
        <div className='flex justify-between items-center gap-2'>
          <a href="/"><div className='flex items-center gap-0.5 font-semibold text-xl'>
            <img src="https://user-images.githubusercontent.com/69080584/119517399-c6f10280-bda1-11eb-9af9-4bdc197dcd65.png" className='h-14' alt="" />
            <h1>To-Do</h1>
          </div></a>
          <button onClick={() => { setFilter("completed") }} className=' hover:text-purple-900'>Completed Task</button>
          <button onClick={() => { setFilter("remaining") }} className=' hover:text-purple-900'>Remaining Task</button>
          <button onClick={() => setFilter("all")} className="hover:text-purple-900">All Tasks</button>

          <div>
            <header>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Newnav
