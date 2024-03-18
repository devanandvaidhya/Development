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
import { ProductList } from './Pages/Products/ProductList';
import { UserProfile } from './Pages/Users/UserProfile';
import { ProductDetails } from './Pages/Products/ProductDetails';
import { AdminRole } from './Pages/Roles/AdminRole';
import { EmpRole } from './Pages/Roles/EmpRole';
import { Routers } from './Pages/Router/Routers';
import { Provider } from 'react-redux';
import store from './ReduxContiner/Store';
import { CardProvider } from './Context/cardContext';

export const UserContext  = createContext();

function App() {

    const [state, dispatch] = useReducer(reducer,initialState);

    useEffect(()=>{
        debugger;
    //     alert();
    //    if(studecookies.UserName !=null && studecookies.UserName != undefined)
    //    {
    //     IsLoggedIn=true;

    //    } 
    },[])




  return (
    // <Provider store={store}>
    <div className="App">
        <UserContext.Provider value={{state,dispatch}}>
        {/* <CardProvider> */}
     <Routers/>
     {/* </CardProvider> */}
     </UserContext.Provider>
    </div>
    // </Provider>
  );
}

export default App;
