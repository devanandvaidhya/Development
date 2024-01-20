
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { useContext, useState } from 'react';
import * as IoIcons from 'react-icons/io';
import { SidebarData } from './SidebarData';
import { UserContext } from '../../App';
import { IsLoggedIn } from '../../Constant/emp_constant';



export function AuthNavbar()
{
  const {state,dispatch} = useContext(UserContext);
    const [sidebar, setSidebar] = useState(false);

  let navigate = useNavigate();

  function showSidebar()
  {
    
    setSidebar(!sidebar);
  }

  function handleLogout()
  {
    dispatch({type:IsLoggedIn, payload:false});
    navigate('/login');
  }

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
            <button onClick={handleLogout} className='btn btn-info'>Logout</button>
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
            {SidebarData.map((item, index) => {
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