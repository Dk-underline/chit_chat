import React from 'react'

const MessageCard = ({isReqUser , content}) => {
  return (
    <div className={`px-2 py-2 rounded-md max-w-[50%] ${isReqUser ? "self-start bg-white" : "self-end bg-[#d9fdd3]"}`}>
    <p>{content}</p>
    </div>
  )
}
export default MessageCard;
