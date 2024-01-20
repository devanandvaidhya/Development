import { Alert, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from '@mui/material'
// import AccountCircle from '@mui/icons-material/AccountCircle';


import './signup.css'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useCookies } from 'react-cookie';

// import { AccountCircle } from '@material-ui/icons'
export function Signup()
{

    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setshowAlert] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    let navigate = useNavigate();

    function  handleMouseDownPassword(event) {
        event.preventDefault();
      };
    
      let formik = useFormik({
        initialValues:{
            FirstName : '',
            LastName:'',
            UserName:'',
            Password:'',
            EmailId:'',
            DOB: ''
        },

        onSubmit:(student)=>{
            // add student
            //alert(student.FirstName);
            AddStudent(student);
        }
      })

      function AddStudent(student)
      {
        axios.post('http://localhost:11939/api/Student/SaveStudent',student).
                then(response=>{
                    //alert('Student added successfully..!');
                    //setstudcookies('UserName');
                    setshowAlert(true)
                    navigate('/login');
                })
            
                
      }
      setTimeout(handleClose, 6000);

      function handleClose()
      {
        setshowAlert(false);
      }
    return(
        <>


      <Snackbar open={showAlert} autoHideDuration={6000}>
      <Alert severity="success">Student has been added successfully..!</Alert>
    </Snackbar>
        <div className="container">
            <div className='reg-cls'>
            <h4 style={{marginRight:'30%'}}>Registration</h4>
            <div className='text-center d-flex justify-content-center'>
            <form onSubmit={formik.handleSubmit}>
                
                <div className="row mt-3">
                <TextField sx={{m: 0.5, width: '25ch' }} name='FirstName' onChange={formik.handleChange} size='small' id="outlined-basic" label="First Name" variant="outlined" />
                </div>
                <div className="row mt-3">
                <TextField sx={{m: 0.5, width: '25ch' }} name='LastName' onChange={formik.handleChange} size='small' id="outlined-basic" label="Last Name" variant="outlined" />
                </div>
            

            
                <div className="row mt-3">
                <TextField sx={{m: 0.5, width: '25ch' }} name="UserName" onChange={formik.handleChange} size='small' id="outlined-basic" label="Username" variant="outlined" />
                </div>
                <div className="row mt-3">
               
                    <OutlinedInput placeholder='Password' name="Password" onChange={formik.handleChange} id="outlined-adornment-password" size='small' sx={{m: 0.5, width: '25ch' }}  type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end" >
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton> </InputAdornment> }/>            
                </div>
            

            
                <div className="row mt-3">
               
                <OutlinedInput id="input-with-icon-adornment" name="EmailId" onChange={formik.handleChange} placeholder='Email' size='small' sx={{m: 0.5, width: '25ch' }} startAdornment={
                    <InputAdornment position="start">
                    <EmailIcon />
                    </InputAdornment>
                }
                />

                </div>
                <div className="row mt-3 ">
                <input type="date"  name="DOB" onChange={formik.handleChange} style={{background:'#095989', width:'93%'}} className="dob-cls  form-control"/>
                
                {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']} >
                        <DatePicker label="DOB" size='small' name="DOB" onChange={formik.handleChange} sx={{m: 0, width: '25ch' }}/>
                    </DemoContainer>
                </LocalizationProvider> */}

                </div>
            
            
            <div className='row mt-3 '>
               
                <Button  type='submit' style={{ width:'93%'}} variant="outlined" className='text-white'>Register</Button>
                
                <Link to="/login" className='mt-3 mb-3 text-white'>Already signup?</Link>
            </div>
            </form>
            </div>
       
            </div>
        </div>
        </>
    )
}