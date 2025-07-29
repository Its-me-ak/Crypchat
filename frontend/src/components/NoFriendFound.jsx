import React from 'react'

const NoFriendFound = () => {
  return (
    <div className='card bg-base-200 p-5 text-center'>
        <h3 className='font-semibold text-lg mb-2'>No Friend Yet</h3>
        <p className='text-base-content opacity-75'>
            You can find friends by sending friend requests to users you know.
        </p>
    </div>
  )
}

export default NoFriendFound