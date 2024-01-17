import React from 'react'
import { useNavigate } from 'react-router-dom'

const StatusCard = () => {
    const navigate = useNavigate();
    const handleNavigation = ()=>{
        navigate("/status/{userId}")
    }
  return (
    <div className='flex items-center p-3 cursor-pointer' onClick={handleNavigation}>
        <div>
            <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full' src ="https://wallpapers.com/images/high/demon-slayer-pictures-aif0dh40d6m5srs6.webp" alt=""/>
        </div>
        <div className='ml-2 text-white'>
           <p>Nazuko</p>
        </div>
    </div>
  )
}

export default StatusCard