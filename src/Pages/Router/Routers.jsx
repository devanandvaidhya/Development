import { BrowserRouter, Route, Routes } from "react-router-dom";


import {  NavLink } from 'react-router-dom';

import { useCookies } from 'react-cookie';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';

// import { initialState, reducer } from './Reducer/useReducers';

// import { UserProfile } from './Pages/Users/UserProfile';
// import { ProductDetails } from './Pages/Products/ProductDetails';
import { EmpRole } from "../Roles/EmpRole";
import { AdminRole } from "../Roles/AdminRole";
import { UserProfile } from "../Users/UserProfile";
import { ProductDetails } from "../Products/ProductDetails";
import { Passwordhome } from "../../Component/signup/Passwordhome";
import { ForgotPassword } from "../../Component/signup/forgotpwd";
import { Product } from "../Products/Product";
import { Support } from "../Support/Support";
import { Dashboard } from "../Dashboard/StudentDashboard";
import { Login } from "../../Component/signup/Login";
import { Signup } from "../../Component/signup/signup";
import { Navigation } from "../../Component/Navbar/Navigation";
import { initialState, reducer } from "../../Reducer/useReducers";
import { ProductList } from "../Products/ProductList";
import { UserContext } from "../../App";
import { AuthNavbar } from "../../Component/Navbar/AuthNavbar";
import { Navbar } from "../../Component/Navbar/Navbar";
// import { AdminRole } from './Pages/Roles/AdminRole';
// import { EmpRole } from './Pages/Roles/EmpRole';
import './router.css';
import { UserList } from "../Users/User-list";
import { Gallery } from "../../Component/General/Gallery";
import { ProductDetailsSummery } from "../Products/ProductDetailsSummery";
import { FirstOrderPlaced } from "../Products/Order/FirstOrderPlace";

export function Routers()
{
    const[studecookies,setstudcookies,removestudcookies] = useCookies(['UserName']);
    const [leftTogglecls,setLeftTogglecls] = useState('');
    const Emp = JSON.parse(localStorage.getItem('Users'));

    const {state,dispatch} = useContext(UserContext);

    function ManageWidth(leftMenuIActive)
    {

        //alert(leftMenuIActive);
        if(!leftMenuIActive)
        {
            setLeftTogglecls('main-container');
        }
        else
        {
            setLeftTogglecls('main-container-full-w')
        }
    }

    // function checkUser()
    // {
    //     const Emp = JSON.parse(localStorage.getItem('Users'));
    // }
    useEffect(()=>{
        //checkUser();
    },[])
    return(
        <>
        <BrowserRouter>
                <div className="left-menu">
                  {/* {(state)?<AuthNavbar ManageWidth={ManageWidth}/>:<Navbar/>}   // Reducer */}
                  {(Emp!=null)?<AuthNavbar ManageWidth={ManageWidth}/>:<Navbar/>}  
                </div>
                <div className={leftTogglecls}>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<>Home Component</>}
                    />
                    <Route
                        exact
                        path="/gallary"
                        element={<Gallery/>}
                    />
                    <Route
                        exact
                        path="/about"
                        element={<>About Compnent</>}
                    />
                    <Route
                        exact
                        path="/contact"
                        element={<>Contact Compnent</>}
                    />

                    <Route
                        exact
                        path="/signup"
                        element={<Signup/>}
                    />
                     <Route
                        exact
                        path="/login"
                        element={<Login/>}
                    />
                     <Route
                        exact
                        path="/dashboard"
                        element={<Dashboard/>}
                    />
                    <Route path="/pwdchange" element={<Passwordhome/>} />
                    <Route path="/forgotpassword" element={<ForgotPassword/>} />
                    <Route path="/products" element={<AdminRole><Product/></AdminRole>} />
                    <Route path="/user-list" element={<AdminRole><UserList/></AdminRole>} />
                    <Route path="/support" element={<Support/>} />
                    <Route path="/productlist" element={<EmpRole><ProductList/></EmpRole>} />
                    <Route path="/user-order" element={<EmpRole><FirstOrderPlaced/></EmpRole>} />
                    <Route path="/user-profile" element={<UserProfile/>} />
                    <Route path="/product-details/:productId" element={<EmpRole><ProductDetailsSummery/></EmpRole>} />
                </Routes>
                </div>

            </BrowserRouter>
        </>
    )
}