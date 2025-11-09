import { CREATE_CHAT, CREATE_GROUP, GET_USER_CHAT } from "./ActionType"

const intialValue = {
    chats : [],
    createdGroup : null, 
    createdChat : null
}
export const chatReducer = (store=intialValue , {type , payload})=>{
    if(type===CREATE_CHAT){
        return  {...store,createdChat:payload}
    }
    else if(type===CREATE_GROUP){
        return  {...store,createdGroup:payload}
    }
   else if(type===GET_USER_CHAT){
        return  {...store,chats:payload}
    }
    else{
        return store;
    }

}