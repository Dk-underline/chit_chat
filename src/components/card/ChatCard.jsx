import React from "react";

const ChatCard = ({name , userImg}) => {
    return (
        <>
            <div className="flex items-center justify-center cursor-pointer py-2">
                <div className="w-[20%]">
                    <img className="rounded-full w-14 h-14 " src={ userImg || "https://img.freepik.com/premium-photo/attractive-asian-american-woman-manga-character-design-anime-style_739548-5900.jpg?size=626&ext=jpg&ga=GA1.1.1081587985.1685936815&semt=sph"} alt="" />
                </div>
                <div className="ml-0 pr-2 w-[80%]">
                    <div className="flex justify-between items-center">
                        <p className="text-lg">{name}</p>
                        <p className="text-sm">timeStamp</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p>message..</p>
                        <div className="flex space-x-2 items-center">
                            <p className="text-sm py-1 px-2 text-white bg-green-500 rounded-full">3</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChatCard;