import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { stories } from './DummyStorage';
import ProgressBar from './ProgressBar';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

const StatusViwer = () => {
    const [currInd , setCurrInd] = useState(0);
    const navigate  = useNavigate();
    const handleNavigation = ()=>{
        navigate(-1);
    }
    const hanldeStories = ()=>{
        if(currInd === stories?.length){
             navigate(-1);
        }
        else{
            setCurrInd(currInd+1);
        }
    } 
   useEffect(()=>{
   const interId =  setInterval(()=>{
       hanldeStories();
    },2000)
    return ()=>clearInterval(interId);
   } ,[currInd]);
  return (
    <div>
        <div className='relative flex justify-center items-center h-[100vh] bg-slate-500'>
            <div className='relative'>
                <img className='max-h-[96vh] object-contain' src={stories?.[currInd]} alt=""/>
                <div className='absolute top-0 flex w-full'>
                   {stories?.map((items , index)=><ProgressBar key={index} index={index} activeIndex={currInd} duration={2000} />)}
                </div>
            </div>
            <div>
            <BsArrowLeft className='cursor-pointer text-white  absolute text-2xl top-5 left-10 font-bold' onClick={handleNavigation}/>
            <AiOutlineClose onClick={handleNavigation} className='text-white absolute cursor-pointer right-10 top-5 text-2xl'/>
            </div>
        </div>
    </div>
  )
}

export default StatusViwer