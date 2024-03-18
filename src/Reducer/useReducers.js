import { AddItemToCard, IsLoggedIn } from "../Constant/emp_constant"


// export const initialState=null;
export const initialState={
    items:[]
};

export const reducer =(state,action)=>{
    debugger;
    // if(action.type===IsLoggedIn)
    // {
    //     return action.payload;
    // }
    // if(action.type===AddItemToCard)
    // {
    //     debugger;
    //     // return {
    //     //     ...state,
    //     //     items: [...state.items, action.payload]
    //     //   };
        
    //       return { ...state, items: action.payload };
    // }
    switch (action.type) {
        case IsLoggedIn:return action.payload;
        case AddItemToCard:
          return {
            ...state,
            items: [...state.items, action.payload],
          };
        default:
          return state;
      }

    //return state;
}