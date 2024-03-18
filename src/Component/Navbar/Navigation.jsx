import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { AuthNavbar } from "./AuthNavbar";
import { Navbar } from "./Navbar";


export function Navigation()
{
     const {state,dispatch} = useContext(UserContext);
    let Emp = JSON.parse(localStorage.getItem('Users'));
    // useEffect(()=>{
    //     alert(Emp)
    //     console.log(Emp)
    // },[])

   
    if(state)
    {
        return <AuthNavbar/>
    }
    else
    {
        return <Navbar/>
    }


}