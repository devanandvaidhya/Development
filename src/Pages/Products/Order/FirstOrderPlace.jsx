import { useLocation } from 'react-router-dom';
import './Order.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
export function FirstOrderPlaced()
{
    //const {state} = useLocation();
    const[order,setOrder] =useState({address:'',cityName:'',districtName:'',fullName:'',pincode:'',productFile:'',productName:'',productPrice:'',stateName:''});

    const location = useLocation();
    const { state } = location;
    const OrderId =state?state.Orderid:'';


    const GetOrderDetailsById = ()=>
    {
       // let OrderId ='ORDA32024118'
        axios.get(`http://localhost:11939/api/Student/GetOrderByOrderId/${OrderId}`).
            then(response=>{
                setOrder(response.data.entity);
            });
        

    }

    useEffect(()=>{
        GetOrderDetailsById();
       
    },[])

    return(
        <>
        
        <h3>Thank you for purchasing</h3>
        <div className="container user-order-container pt-4 pb-4 mt-4 ">
            <div className='place-order'>
                <h5>Dear {order.fullName}</h5>

               
            </div>
            <div className='content-box'>
            <div className='del-address p-3'>
                    {/* <div><lable>Delivery address</lable></div> */}
                    <div style={{display: 'flex'}}>Delivery address</div>
                    <div className='d-flex ms-3'>To,</div>
                    <div className='d-flex ms-5'>{order.fullName}, {order.address},{order.cityName},{order.districtName},{order.stateName},{order.pincode}</div>
                </div>
                <div className='order-details p-3'>
                    {/* <div><lable>Delivery address</lable></div> */}
                    <div style={{display: 'flex'}}>Order Number:<label  className='order-number'>{order.orderId}</label></div>
                    <div className="card w-75 mt-3">
                            <div className="card-body">
                                <h5 className="card-title"><CurrencyRupeeIcon/>{order.productPrice}</h5>
                                <div className="card-text prd-det">
                                <img src={`data:image/png;base64,${order.productFile}`} className='img-thumnail'/>
                                  <label>  {order.productName}</label>
                                </div>
                                {/* <p className="card-text">
                                  
                                </p> */}
                            </div>
                            </div>
                </div>
                </div>
                

        </div>
        </>
    )
}