import { BASE_API_URL } from "../../config/Api";
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";

export const register = (data)=>async(dispatch)=>{
    try{
        const res = await fetch(`${BASE_API_URL}/auth/signup`,{
            method : "POST",
            headers: {
                "Content-Type" : 'application/json'
            }, 
            body: JSON.stringify(data) 
        });
        const resData = await res.json()
        if(resData.jwt) localStorage.setItem("token" , resData.jwt)
        // console.log("response Data " + resData)
        dispatch({type:REGISTER , payload: resData})
    }
    catch(e){
        console.log(e);
    }
}

export const login = (data)=>async(dispatch)=>{
    try{
        const res = await fetch(`${BASE_API_URL}/auth/signin`,{
            method : "POST",
            headers: {
                "Content-Type" : 'application/json'
            }, 
            body: JSON.stringify(data) 
        });
        const resData = await res.json()
        if(resData.jwt) localStorage.setItem("token" , resData.jwt)
        // console.log("response Data " + resData)
        dispatch({type:LOGIN , payload: resData})
    }
    catch(e){
        console.log(e);
    }
}

export const currentUser = (token)=>async(dispatch)=>{
    console.log("current user "+ token);
    try{
        const res = await fetch(`${BASE_API_URL}/api/users/profile`,{
            method : "GET",
            headers: {
                "Content-Type" : 'application/json',
                Authorization : `Bearer ${token}`
            }, 
            
        });
        const resData = await res.json()
        console.log(res)
        dispatch({type:REQ_USER , payload: resData})
    }
    catch(e){
        console.log(e);
    }
}

export const searchUser = (data)=>async(dispatch)=>{
    // console.log("Search User " + data.keyword)
    try{
        const res = await fetch(`${BASE_API_URL}/api/users/search?name=${data.keyword}`,{
            method : "GET",
            headers: {
                "Content-Type" : 'application/json',
                Authorization : `Bearer ${data.token}`
            }, 
             
        });
        const resData = await res.json()
        console.log("response Data ", resData)
        dispatch({type:SEARCH_USER , payload:resData})
    }
    catch(e){
        console.log(e);
    }
}


export const updateUser = (data)=>async(dispatch)=>{
    try{
        const res = await fetch(`${BASE_API_URL}/api/users/update/${data.id}`,{
            method : "PUT",
            headers: {
                "Content-Type" : 'application/json',
                Authorization : `Bearer ${data.token}`
            }, 
             body : JSON.stringify(data.data)
        });
        const resData = await res.json()
        // console.log("response Data " + resData)
        dispatch({type:UPDATE_USER,payload: resData})
    }
    catch(e){
        console.log(e);
    }
}

export const logoutUser = ()=>(dispatch)=>{
    localStorage.removeItem("token");
    dispatch({type:LOGOUT,payload:null})
    dispatch({type:REQ_USER,payload:null})

}