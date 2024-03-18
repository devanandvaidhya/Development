
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import * as IoIcons from 'react-icons/io';
import { SidebarData } from './SidebarData';
import { UserContext } from '../../App';

import { Avatar} from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { UserRoles } from '../../Constant/Roles';
import { UserStatus } from '../../Constant/common';
import { UserProfileMenu } from './UserProfileMenu';



export function AuthNavbar({ManageWidth})
{

    const [sidebar, setSidebar] = useState(false);
    const [sideMenu, setsideMenu] = useState([]);
    let Emp = JSON.parse(localStorage.getItem('Users'));

    const AdminLink = ['Home','Dashboard','Products','Team','Messages','Support','ProductList','User List'];
    const EmpLink = ['Home','Dashboard',,'Team','Messages','Support','ProductList'];

  let navigate = useNavigate();

  function showSidebar()
  {
    
    setSidebar(!sidebar);
    ManageWidth(sidebar);
  }

 



function getSideMenuLink()
{
  let filterLink =[{}];
  if(Emp.roleName===UserRoles.ADMIN)
  {
    filterLink = SidebarData.filter(item => AdminLink.indexOf(item.title) !== -1);
  }
  else
  {
    filterLink = SidebarData.filter(item => EmpLink.indexOf(item.title) !== -1);
    debugger;
    if(Emp.statusName!=UserStatus.Approved)
    {
      filterLink = filterLink.filter((data)=> data.title != 'ProductList' )
    }

  }
  setsideMenu(filterLink)
}




  useEffect(()=>{
    getSideMenuLink();
  },[])
    return(
        <>
        {/* <header className='nvbgcolr'>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        Company Name
                    </div>
                    <div className="col-md-8">
                        <ul className='menu'>
                           
                            <li><Link  to="/signup">Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header> */}

         <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          
          <div className=''>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          </div>
          <div>
          <div className=" drp-user-logout" role="group">
            <UserProfileMenu/>
            {/* <button type="button" className="btn drp-bgcolr dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> */}
            {/* <Avatar  sx={{ bgcolor: deepOrange[500] ,width: 24, height: 24 }}>DV</Avatar>   USER   */}
            {/* USER
            </button> */}
            {/* <ul className="dropdown-menu drp-width">
              <li><a className="dropdown-item" onClick={handleUserProfile}>User Profile</a></li>
              <li><a className="dropdown-item" onClick={handleLogout} >Logout</a></li>
            </ul> */}
                
          </div>

            {/* <button onClick={handleLogout} className='btn btn-info'>Logout</button> */}
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          {/* <ul className='nav-menu-items' onClick={showSidebar}> */}
          <ul className='nav-menu-items' >
            <li className='navbar-toggle' onClick={showSidebar}>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {sideMenu.map((item, index) => {
              return (
            
            
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
                
             
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
        </>
    )
}