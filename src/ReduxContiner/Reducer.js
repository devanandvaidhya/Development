import { AddItemToCard } from "./Types"

const initialState = {
    NumberOfItem:10
}

const AddCardReducer=(state=initialState, action)=>{

        switch(action.type)
        {
            case AddItemToCard : return{
                                            ...state, NumberOfItem : state.initialState + 1 
                                    }

            default :return state
        }

}

export default AddCardReducer;