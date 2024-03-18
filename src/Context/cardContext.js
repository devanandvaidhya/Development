import { createContext } from "react";

const CardContext = createContext();

const CardProvider= ({childer})=>{

    return <CardContext.Provider>{childer}</CardContext.Provider>
}

export {CardProvider};