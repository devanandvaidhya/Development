import logo from './logo.svg';
import './App.css';
import { Navbar } from './Component/Navbar/Navbar';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Signup } from './Component/signup/signup';
import { Login } from './Component/signup/Login';
import { Dashboard } from './Pages/Dashboard/StudentDashboard';
import { useCookies } from 'react-cookie';
import { createContext, useEffect, useReducer } from 'react';
import { AuthNavbar } from './Component/Navbar/AuthNavbar';
import { Passwordhome } from './Component/signup/Passwordhome';
import { ForgotPassword } from './Component/signup/forgotpwd';
import { Product } from './Pages/Products/Product';
import { Support } from './Pages/Support/Support';
import { initialState, reducer } from './Reducer/useReducers';
import { Navigation } from './Component/Navbar/Navigation';

export const UserContext  = createContext();

function App() {
    const[studecookies,setstudcookies,removestudcookies] = useCookies(['UserName']);
    let IsLoggedIn =true;
    

    useEffect(()=>{
        debugger;
    //     alert();
    //    if(studecookies.UserName !=null && studecookies.UserName != undefined)
    //    {
    //     IsLoggedIn=true;

    //    } 
    },[])


    const [state, dispatch] = useReducer(reducer,initialState);

  return (
    <div className="App">
        <UserContext.Provider value={{state,dispatch}}>
     <BrowserRouter>
                <div>
                  {/* {(IsLoggedIn==true)?<AuthNavbar/>:<Navbar/>}   */}
                  <Navigation/>
                </div>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<>Home Component</>}
                    />
                    <Route
                        exact
                        path="/gallary"
                        element={<>Gallary Component</>}
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
                    <Route path="/products" element={<Product/>} />
                    <Route path="/support" element={<Support/>} />
                </Routes>
            </BrowserRouter>
     </UserContext.Provider>
    </div>
  );
}

export default App;
