import { MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import './product.css'
import axios from "axios";
export function Product()
{
    const [category, seCategory] = useState([]);

    const GetProductList = ()=>{

        axios.get('http://localhost:11939/api/Student/GetCategories').
            then(response=>{
                seCategory(response.data.entity);
                debugger;
            })
    }

    const formik = useFormik({

    });

    useEffect(()=>{
        GetProductList();
    },[])
    return(
        <>
        <h4>Welcome to Product</h4>
        <div className="container d-flex justify-content-center">

        <form onSubmit={formik.handleSubmit}>
        <div className="row mt-3"> 
        <select className="form-select bgcolr" name="Category" style={{background:'#216683'}} >
            {
                category.map(item=>
                    <option key={item.categoryId}> {item.categoryName}</option>
                    )
            }
            {/* <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
            </select>
        </div>

        
        <div className="row mt-3"> 
        
        <TextField sx={{m: 0.5, width: '25ch' }} name='ProductName' onChange={formik.handleChange} size='small' id="outlined-basic" label="Product Name" variant="outlined" />
        </div>
        

       <div className="row mt-3"> 
        <TextField sx={{m: 0.5, width: '25ch' }} name='Price' onChange={formik.handleChange} size='small' id="outlined-basic" label="Price" variant="outlined" />
        </div>
        <div className="row mt-3"> 
        <TextField sx={{m: 0.5, width: '25ch' }} name='Description' onChange={formik.handleChange} size='small' id="outlined-basic" label="Description" variant="outlined" />
        </div>
        </form>
        </div>
        </>
    )
}