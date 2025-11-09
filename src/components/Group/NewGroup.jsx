import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { createGroupChat } from '../redux/chat/Action';

const NewGroup = ({groupMember , setIsGroup}) => {
    const [imageUploading , setImageUploading] = useState(false);
    const [groupName , setGroupName] = useState("");
    const[groupImage , setGroupImage] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const {auth} = useSelector(store=>store);
    const uploadToCloudnary = (pic) => {
      setImageUploading(true);
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "zg5zkmir")
      data.append("cloud_name", "dg6perzk3")
      fetch("https://api.cloudinary.com/v1_1/dg6perzk3/image/upload", {
        method: "POST",
        body: data
      }).then((res) => (res.json())).then((data) => {
        setGroupImage(data.url.toString());
        setImageUploading(false);
      })
  
    }
     const handleCreateNewGroup = ()=>{
         let userIds = [];
         for(let user of groupMember){
              userIds.push(user.id)
         }
         userIds.push(auth.reqUser?.id);
      const group = {
        userIds : userIds,
        chat_name : groupName,
        chat_image  : groupImage
      }
      const data = {
        group,
        token,
      }
      dispatch(createGroupChat(data));
      setIsGroup(false);
     }
  return (
    <div className='w-full h-full'>
     <div className='flex bg-[#008069] text-white space-x-10 items-center pt-16 pb-5 px-10'>
     <BsArrowLeft
                className="text-2xl cursor-pointer font-bold"
              />
      <p className='text-xl font-semibold'>New Group</p>
      </div>
      <div className='flex flex-col justify-center items-center my-12'>
        <label className='relative' htmlFor='imgInput'>
         <img className='rounded-full cursor-pointer w-[15vw] h-[15vw] ' src={ groupImage || "https://e0.pxfuel.com/wallpapers/706/523/desktop-wallpaper-gojo-satoru-jujutsu-kaisen.jpg"} alt=''/>
         {imageUploading && <CircularProgress className='absolute top-[5rem] left-[6rem]'/>}
        </label>
        <input
            className='hidden'
            id="imgInput"
            type='file'
            onChange={(e)=>{uploadToCloudnary(e.target.files[0])}}
        />
      </div>
      <div className='flex items-center justify-center py-2 px-5'>
        <input
          className='w-full bg-transparent outline-none border-b-2 px-2 border-green-600'
          type ='text'
          placeholder='Group Subject'
          value = {groupName}
          onChange={(e)=>{setGroupName(e.target.value)}}
        />
      </div>
      {groupName && 
       <div className='flex item-center justify-center bg-slate-200 py-10 '>
          <Button onClick={handleCreateNewGroup}>
            <div className='bg-[#0c977e] rounded-full p-4'>
              <BsCheck2 className='text-white font-bold text-3xl'/>
            </div>
          </Button>
       </div>
      }
    </div>
  )
}

export default NewGroup