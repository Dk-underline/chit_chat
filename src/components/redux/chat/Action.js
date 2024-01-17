import { BASE_API_URL } from "../../config/Api";
import { CREATE_CHAT, CREATE_GROUP, GET_USER_CHAT } from "./ActionType";

export const createChat = (chatData)=>async(dispatch)=>{
    try{
        const res = await fetch(`${BASE_API_URL}/api/chats/single`,{
            method : "POST",
            headers: {
                "Content-Type" : 'application/json',
                Authorization : `Bearer ${chatData.token}`
            }, 
            body: JSON.stringify(chatData.data) 
        });
        const resData = await res.json()
        // if(resData.jwt) localStorage.setItem("token" , resData.jwt)
        console.log(resData)
        dispatch({type:CREATE_CHAT, payload: resData})
    }
    catch(e){
        console.log(e);
    }
}

export const createGroupChat = (chatData)=>async(dispatch)=>{
    try{
        const res = await fetch(`${BASE_API_URL}/api/chats/group`,{
            method : "POST",
            headers: {
                "Content-Type" : 'application/json',
                Authorization : `Bearer ${chatData.token}`
            }, 
            body: JSON.stringify(chatData.group) 
        });
        const resData = await res.json()
        // if(resData.jwt) localStorage.setItem("token" , resData.jwt)
        console.log("Created Chat")
        console.log(resData)
        dispatch({type:CREATE_GROUP, payload: resData})
    }
    catch(e){
        console.log(e);
    }
}

export const getUserChat = (chatData)=>async(dispatch)=>{
    // console.log("GET USER TOKEN" +" "+chatData.token);
    try{
        const res = await fetch(`${BASE_API_URL}/api/chats/user`,{
            method : "GET",
            headers: {
                "Content-Type" : 'application/json',
                Authorization : `Bearer ${chatData.token}`
            }, 
        });
        const resData = await res.json()
        // if(resData.jwt) localStorage.setItem("token" , resData.jwt)
        console.log("GET Users Chat" , resData)
        // console.log(resData)
        dispatch({type:GET_USER_CHAT, payload:resData})
    }
    catch(e){
        console.log(e);
    }
}
