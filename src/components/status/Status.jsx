import React from 'react'
import StatusCard from '../card/StatusCard'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

export const Status = () => {
    const navigate = useNavigate();
    const handleNavigation = ()=>{
        navigate(-1);
    }
    return (
        <div>
            <div className='flex items-center  px-[14vw] py-[7vh]'>
                {/* Ledt Section */}
                <div className='left h-[85vh] bg-[#1e262c] lg:w-[30%] w-[50%] px-5'>
                    <div className='pt-5 h-[13%] mb-2'>
                      <StatusCard/>
                    </div>
                    <hr/>
                    <div className='overflow-y-scroll h-[86%] pt-2'>
                     { [1,2,3,4,5,6,7,8,8,9,10].map((item)=><StatusCard/>) }
                    </div>
                </div>
                {/* Right Section */}
                <div className='right relative h-[85vh] lg:w-[70%] w-[50%] bg-[#0b141a] '>
                    <AiOutlineClose onClick={handleNavigation} className='text-white cursor-pointer right-10 top-5 text-2xl absolute'/>
                </div>
            </div>
        </div>
    )
}
export default Status
