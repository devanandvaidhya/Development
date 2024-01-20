import { IsLoggedIn } from "../Constant/emp_constant"

export const initialState=null;

export const reducer =(state,action)=>{
    if(action.type===IsLoggedIn)
    {
        return action.payload;
    }
    return state;
}