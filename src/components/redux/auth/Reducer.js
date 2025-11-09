
import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType"

const intialValue = {
    signin : null,
    signup : null,
    reqUser:null,
    updateUser:null,
    searchUser:null
}
export const authReducer = (store=intialValue , {type , payload})=>{
    if(type===REGISTER){
        return  {...store,signup:payload}
    }
    else if(type===LOGIN){
        return  {...store,signin:payload}
    }
   else if(type===REQ_USER){
        return  {...store,reqUser:payload}
    }
    else if(type===SEARCH_USER){
        return  {...store,searchUser:payload}
    }
    else if(type===UPDATE_USER){
        return  {...store,updateUser:payload}
    }
    else{
        return store;
    }

}