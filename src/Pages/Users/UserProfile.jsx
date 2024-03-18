import axios from "axios";
import { useEffect, useState } from "react";
import './user-profile.css';
// import { Button } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Icon } from "@mui/material";
// import { makeStyles } from '@material-ui/core/styles';
import { Send } from "@mui/icons-material";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
 

export function UserProfile()
{
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [request,setRequest] = useState('');
    const [enablebtn,setEnablebtn]=useState(false);
    const Emp = JSON.parse(localStorage.getItem('Users'));

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
      };


      function ProfileSubmit(e)
      {
        debugger;
        e.preventDefault();
        const formData = new FormData();
        formData.append('File',selectedFile);
        formData.append('Id',Emp.id);
  
        axios.post('http://localhost:11939/api/Student/UpdateUserProfile',formData).
              then(response =>{
               

                alert('Profile updated successfuly..!');
              })
      }

      function RequestSubmit(e)
      {
        debugger;
        e.preventDefault();
        let Id=Emp.id;

        axios.post(`http://localhost:11939/api/Student/SendRequest/${Id}`).
              then(response =>{
               // setRequest('REQUESTED')
                //RequestValue = 'Requested';
                Emp.statusName='REQUESTED';
               // setRequest(RequestValue);
               setRequest(Emp.statusName);
               setEnablebtn(true);
                //const newItems = JSON.stringify([...items,{Emp}])
                localStorage.setItem('Users',JSON.stringify(Emp)  );
               
                alert('Request send successfuly..!');
              })
      }

      function checkRequested()
      {
       // let Requested =Emp.requested;
       debugger;
        setRequest(Emp.statusName);
        if(Emp.statusName!='NotRequested')
        {
           // RequestValue = 'Requested';
            setEnablebtn(true);
            //setRequest(RequestValue);
        }
        //alert(Requested);
      }
      useEffect(()=>{
        checkRequested();
      },[])
    return(
        <>

<div className="container-fluid mt-4">
            
<div className="row">
                <div className="col-md-2">
                    <div className="left-user-profile">
                        <img className="user-profile-logo"  src={`data:image/png;base64,${Emp.profileFile}`} alt="User Profile"/>
                        
                        <div className="mt-4">
                        <div class="mb-3">
                            <label for="FirstName" class="form-label">First Name: {Emp.firstName}</label>
                            </div>
                            <div class="mb-3">
                            <label for="LastName" class="form-label">Last Name: {Emp.lastName}</label>
                            </div>
                            <div class="mb-3">
                            <label for="Email" class="form-label">Email Id: {Emp.emailId}</label>
                            </div>
                        </div>
                    </div>
                
                </div>
            
            <div className="col-md-10 ">
                <div className="row right-user-profile">
                    <div className="col-md-6">
                    
                            <div className="photo-container">
                                <div className="row mt-3">
                                    <div className="col-md-4">
                                    <input type="file" className="file-prfl-upld" onChange={handleFileChange}></input>
                                    </div>
                                </div>

                                <div className="mt-4">
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    >
                                    Upload file
                                    <VisuallyHiddenInput type="file" 
                                    onClick={ProfileSubmit}/>
                                    </Button>
                                </div>
                               
                                {/* <button type="submit" onClick={ProfileSubmit}>Update</button> */}

                            </div>
                   
                    </div>
                    <div className="col-md-6">
                    <div className="photo-container">
                       <p>Do you want to request for product?</p>
                       <div className="mt-5">
                       <Button
                            variant="contained"
                            color="primary"
                            onClick={RequestSubmit}
                            endIcon={<Send/>}
                            disabled={enablebtn}
                        >
                            {request}
                        </Button>
                       </div>
                     </div>
                    </div>
                </div>
                   
            </div>
        </div>
            </div>

        </>
    )
}