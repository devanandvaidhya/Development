
import { useNavigate } from 'react-router-dom';
import { UserStatus } from '../../Constant/common';
import { Notallowed } from '../Permission/Notallowed';
import { Login } from '../../Component/signup/Login';
import { UserRoles } from '../../Constant/Roles';
// import userstaimport { UserStatus } from '../../Constant/common';

export function EmpRole({children})
{
    let Emp = JSON.parse(localStorage.getItem('Users'));
    let navigate = useNavigate();
    if(Emp!=null)
    {
   
        if(Emp.statusName===UserStatus.Approved || Emp.roleName===UserRoles.ADMIN)
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
      
        return <><Login/></>
    }
}