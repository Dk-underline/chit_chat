import React, { useState } from 'react';
import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../redux/auth/Action";

export const Profile = ({ handleNavigation }) => {
  const [flag, setFlag] = useState(true);
  const [tempPic, setTempPic] = useState();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const handelFlag = () => {
    setFlag(!flag);
  }
  const [username, setUserName] = useState(null);
  const handelClickChange = (e) => {
    setUserName(e.target.value);
    const userData = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: { full_name : username}
    };
    dispatch(updateUser(userData));
  }
  const uploadToCloudnary = (pic) => {
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "zg5zkmir")
    data.append("cloud_name", "dg6perzk3")
    fetch("https://api.cloudinary.com/v1_1/dg6perzk3/image/upload", {
      method: "POST",
      body: data
    }).then((res) => (res.json())).then((data) => {
      console.log(data)
      setTempPic(data.url.toString());
      const userData = {
        id: auth.reqUser?.id,
        token: localStorage.getItem("token"),
        data: { profile_picture: data.url.toString() }
      };
      dispatch(updateUser(userData));
    })

  }
  return (
    <div className='w-full h-full'>
      <div className='flex itmes-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
        <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleNavigation} />
        <p className='font-semibold cursor-pointer'>Profile</p>
      </div>
      {/* Profile Pic Section */}
      <div className='flex flex-col justify-center items-center my-12'>
        <label htmlFor='imgInput'>
          <img className='rounded-full cursor-pointer w-[12vw] h-[12vw] ' src={auth.reqUser?.profile_picture || tempPic || "https://images5.alphacoders.com/131/thumbbig-1317019.webp "} alt='' />
        </label>
        <input onChange={(e) => uploadToCloudnary(e.target.files[0])} type='file' id='imgInput' className='hidden' />
      </div>
      {/* name Section */}
      <div className='bg-white px-3'>
        <p className='py-1 text-center'> Your Name</p>
        {flag && <div className='w-full flex justify-between items-center'>
          <p className='py-1'>{username || "UserName"}</p>
          <BsPencil onClick={handelFlag} className='cursor-pointer' />
        </div>}
        {!flag && <div className='w-full flex justify-between items-center py-2'>
          <input className='outline-none border-b-2 p-2 w-[80%] border-blue-700' type='text' placeholder='Enter Your Name' onChange={handelClickChange} />
          <BsCheck2 onClick={handelFlag} className='cursor-pointer text-2xl' />
        </div>}
        <div className='px-3 my-5'>
          <p className='py-10'> This is not your user name.This is visible to your WhatsUp contects.</p>
        </div>
      </div>
    </div>
  )
}
export default Profile;
