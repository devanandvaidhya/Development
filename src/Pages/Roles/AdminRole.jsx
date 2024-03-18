
// import UserRoles from '/Cons'
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../Constant/Roles"
import { Notallowed } from "../Permission/Notallowed"
import { Login } from "../../Component/signup/Login";
// import { IsLoggedIn } from "../../Constant/emp_constant"
export function AdminRole({children})
{
    let Emp = JSON.parse(localStorage.getItem('Users'));
    let navigate = useNavigate();
 debugger;
    if(Emp!=null)
    {
   
        if(UserRoles.ADMIN===Emp.roleName)
        {
            return <>{children}</>
        }
        else
        {
            
        return <Notallowed/>
        }
    }
    else
    {
       // debugger;
        //navigate('/login');
        return <><Login/></>
    }
}