import { AccountCircle, LockOpen, PasswordRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { FilledInput, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import axios from "axios";

import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { IsLoggedIn } from "../../Constant/emp_constant";
import './signup.css'

export function Login()
{

    const {state,dispatch} = useContext(UserContext);

    // cookies
    const[studecookies,setstudcookies,removestudcookies] = useCookies(['UserName']);
    let navigate = useNavigate();

  const formik =  useFormik({
                    initialValues:{
                        UserName:'',
                        Password:''
                    },

                    onSubmit:(Student)=>{
                        studentAuthentication(Student);
                    }
                })

            
                function studentAuthentication(student)
                {
                    axios.post('http://localhost:11939/api/Student/StudentAuthentication',student).
                        then(response=>{
                            setstudcookies('UserName',response.data.entity.userName,[{expires:new Date('2024-12-31')}]);
                        if(response.data.entity.isAuthenticate)
                        {
                            dispatch({type:IsLoggedIn, payload:true})
                            navigate('/dashboard');
                        }

                        })
                }
    return(
        <>
        <div className="container w-50 ">
          
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="login-wrap py-5">
                        <div className="img align-items-center justify-content-center" >
                           <img src="/assets/profile-pic.jpeg"  className="profile-logo"/>
                          
                        </div>
                        <h3 className="text-center"> Welcome</h3>
                        <form className="mt-4" onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                
                                <div className="row ps-4 pe-4">
                                    <Input id="input-with-icon-adornment" name="UserName" onChange={formik.handleChange} placeholder="Username"
                                        startAdornment={
                                            <InputAdornment position="start">
                                            <AccountCircle />
                                            </InputAdornment>
                                        }
                                        />
                                </div>
                                <div className="row mt-4 ps-4 pe-4">
                                <Input type="password" placeholder="Password" name="Password" onChange={formik.handleChange}
                                    startAdornment={
                                        <InputAdornment position="start">
                                        <LockOpen />
                                        </InputAdornment>
                                    }
                                    />
                                </div>
                                <div className="row form-group mt-5 d-md-flex">
                                    <Button type='submit' variant="outlined" style={{background: 'skyblue'}}>Login</Button>
                                    <div className="w-100 text-md-center">
                                        <Link to="/pwdchange">Forget Password</Link>
                                    </div>
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