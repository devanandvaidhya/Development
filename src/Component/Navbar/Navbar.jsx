
import { Link } from 'react-router-dom'
import './Navbar.css'
export function Navbar()
{

    return(
        <>
        <header className='nvbgcolr'>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        Company Name
                    </div>
                    <div className="col-md-8">
                        <ul className='menu'>
                            <li><Link  to="/">Home</Link></li>
                            <li><Link  to="/gallary">Gallary</Link></li>
                            <li><Link  to="/about">About Us</Link></li>
                            <li><Link  to="/contact">Contact</Link></li>
                            <li><Link  to="/signup">Sign Up</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}