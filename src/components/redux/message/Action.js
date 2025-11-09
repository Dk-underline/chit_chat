import { BASE_API_URL } from "../../config/Api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGES } from "./ActionType";

export const createNewMessage = (messageData) => async (dispatch)=>{
          try {
               const res = await fetch(`${BASE_API_URL}/api/message/create` ,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${messageData.token}` 
                },
                body : JSON.stringify(messageData.data) 
               })
              const resData = await res.json();
              dispatch({type : CREATE_NEW_MESSAGE , payload : resData})
            
          } catch (error) {
            console.log(error)
          }
}

export const getALLMessages = (req) => async (dispatch)=>{
  // console.log(req.chatId+" "+req.token);
    try {
         const res = await fetch(`${BASE_API_URL}/api/message/chat/${req.chatId}` ,{
          method:"GET",
          headers:{
              "Content-Type" : "application/json",
              Authorization : `Bearer ${req.token}` 
          }, 
         })
        const resData = await res.json();
        // console.log("All messages" , resData)
        dispatch({type : GET_ALL_MESSAGES,payload : resData})
      
    } catch (error) {
      console.log(error)
    }
}
