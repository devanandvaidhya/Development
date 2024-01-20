import { BackHand, LockOpen, PasswordOutlined } from "@mui/icons-material";
import { Input, InputAdornment } from "@mui/material";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export function ForgotPassword()
{
    const[frgtPwd,setFrgtPwd,rmvFrgtPwd]= useCookies(['pwdEmail'])

    function handleCreatePassword()
    {
        
    }

    useEffect(()=>{
        //alert(frgtPwd.pwdEmail);
    },[]);

    return(
        <>
       
       <div className="container w-75 ">
         
          <div className="row justify-content-center mt-5">
            
              <div className="col-md-6">
                
             
                  <div className="login-wrap py-5">
                    <div className="justify-content-start">
                    <Link to="/pwdchange">Back</Link>
                    </div>

                  <div class="text-center">
                  <h3><i class="fa fa-lock fa-4x"></i></h3>
                  <h2 class="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  </div>
                     
                      <form className="mt-4">
                          <div className="form-group">
                              
                              <div className="row ps-4 pe-4 justify-content-center">
                              <Input id="input-with-icon-adornment"  className="w-75 mb-4" placeholder="New Password"
                                      startAdornment={
                                          <InputAdornment position="start">
                                          <LockOpen />
                                          </InputAdornment>
                                      }
                                      />

                                  <Input id="input-with-icon-adornment"  className="w-75 mt-4" placeholder="Confirm Password"
                                      startAdornment={
                                          <InputAdornment position="start">
                                          <LockOpen />
                                          </InputAdornment>
                                      }
                                      />
                              </div>
                              
                              <div className="row form-group mt-5 justify-content-center text-center">
                                  <Button type='button' variant="outlined" className="w-50" onClick={handleCreatePassword} style={{background: 'skyblue'}}>Next</Button>
                                 
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