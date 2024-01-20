
import './dashboard.css'
import { StudentCount } from './studentCount'


export function Dashboard()
{
    return(
        <>
        <h4>Welcome to Student Dashboard</h4>
        <div className=" dshbr-container">
            <div className=''>
                <div className="row">
                    <div className="col-md-6"><StudentCount/></div>
                    <div className="col-md-6"><StudentCount/></div>
                </div>
            
            
            </div>
            
        </div>
        </>
    )
}