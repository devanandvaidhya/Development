import { useContext } from "react";
import { UserContext } from "../../App";
import { AuthNavbar } from "./AuthNavbar";
import { Navbar } from "./Navbar";


export function Navigation()
{
    const {state,dispatch} = useContext(UserContext);
    if(state)
    {
        return <AuthNavbar/>
    }
    else
    {
        return <Navbar/>
    }
}