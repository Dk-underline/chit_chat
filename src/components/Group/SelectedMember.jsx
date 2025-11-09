import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const SelectedMember = ({ handleremoveMember, member }) => {
    // console.log("selected member "+ member);
    return (
        <div className="flex items-center bg-slate-200 rounded-full">
            <img
                className="w-7 h-7 rounded-full"
                src={member.profile_picture || "https://c4.wallpaperflare.com/wallpaper/742/746/486/demon-slayer-kimetsu-no-yaiba-zenitsu-agatsuma-anime-boys-tanjiro-kamado-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg"}
                alt=""
            />
            <p className='px-2'>{member.full_name}</p>
            <AiOutlineClose
                onClick={handleremoveMember}
                className="pr-1 cursor-pointer"
            />
        </div>
    )
}

export default SelectedMember
