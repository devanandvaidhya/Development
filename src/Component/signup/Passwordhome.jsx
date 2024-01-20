import { Alert, Input, InputAdornment, Snackbar } from "@mui/material";
import { ForgotPassword } from "./forgotpwd";
import { Button } from "react-bootstrap";
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Alerts } from "../Share/Alerts";

export function Passwordhome()
{

    let navigate =  useNavigate();
    const[frgtPwd,setFrgtPwd,rmvFrgtPwd]= useCookies(['pwdEmail'])
    const[pwdemail,setpwdemail] = useState('');
    const[Student,setStudent] = useState({});
    const [showAlert, setshowAlert] = useState(false);
  

    function handleFogotpwd(e)
    {
        setFrgtPwd('pwdEmail',pwdemail);

        axios.get(`http://localhost:11939/api/Student/IsStudentExists/${pwdemail}`).
        then(response=>{
            const stud = response.data.entity;

            if(stud.isAuthenticate)
            {
                navigate('/forgotpassword');
            }
            else
            {
                setshowAlert(true)
            }
            console.log(stud);
        });
        
    }

    function handleemail(e)
    {
        setpwdemail(e.target.value);
    }

    // setTimeout(handleClose, 10000);

    // function handleClose()
    // {
    //   setshowAlert(false);
    // }
    return(
        <>
        {/* <div className="">
        <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="success">OOP's student is not exists..!</Alert>
            </Snackbar>
        </div> */}
        
    <Alerts showvalue={showAlert} title='OOPs student is not exists..!'></Alerts>

        <div className="container w-75 ">
          
          <div className="row justify-content-center mt-5">
              <div className="col-md-6">
                  <div className="login-wrap py-5">
                  <div className="text-center">
                  <h3><i className="fa fa-lock fa-4x"></i></h3>
                  <h2 className="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  </div>
                     
                      <form className="mt-4">
                          <div className="form-group">
                              
                              <div className="row ps-4 pe-4 justify-content-center">
                                  <Input id="input-with-icon-adornment" onChange={handleemail}  className="w-75" placeholder="Enter email"
                                      startAdornment={
                                          <InputAdornment position="start">
                                          <MailIcon />
                                          </InputAdornment>
                                      }
                                      />
                              </div>
                              
                              <div className="row form-group mt-5 justify-content-center text-center">
                                  <Button type='button' variant="outlined" className="w-50" onClick={handleFogotpwd} style={{background: 'skyblue'}}>Next</Button>
                                 
                              </div>
                             

                              


       
     
                          </div>
                      </form>
                  </div>
              </div>

          </div>
          
      </div>
        </>
    )
}