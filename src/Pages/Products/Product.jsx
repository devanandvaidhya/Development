import { MenuItem, Select, TextField,Button, Input, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import './product.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { ProductFeaature } from "../Modal/Products/ProductFeature";
// import { Button } from "bootstrap";


export function Product()
{
    const [category, seCategory] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCategory, setselectedCategory] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [productFeature,setProductFeature]=useState([]);

    const handleOpen = () => {
    
      setModalOpen(true);
    };
 


    const closeModal = () => {
        setModalOpen(false);
      };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // You can perform the file upload logic here
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // Add your file upload logic (e.g., using FormData and an API endpoint)
    } else {
      console.log('No file selected');
    }
  };
  
    const GetProductList = ()=>{

        axios.get('http://localhost:11939/api/Student/GetCategories').
            then(response=>{
                seCategory(response.data.entity);
                debugger;
            })
    }

    const handleCategory =(e)=>{
        setselectedCategory(e.target.value);
    }
    const formik = useFormik({
          initialValues:{
                          CategoryId:0,
                          ProductName:'',
                          ProductPrice: 0,
                          Description : '',
                        },
          onSubmit:   (Product)=>{
                        ProductSubmit(Product)
                      }
    });

    function ProductSubmit(Product)
    {
      debugger;
      const formData = new FormData();
      formData.append('File',selectedFile);
      formData.append('CategoryId',selectedCategory);
      formData.append('ProductName',Product.ProductName);
      formData.append('ProductPrice',Product.ProductPrice);
      formData.append('Description',Product.Description);
      //formData.append('ProductFeature',productFeature);
      formData.append("ProductFeature", JSON.stringify(productFeature));



      axios.post('http://localhost:11939/api/Student/SaveProduct',formData).
            then(response =>{
              alert('Product added successfuly..!');
            })
    }

    function HandleAddFeature(feature)
    {
      alert(feature);
      debugger;
      const newObject = {
        id: productFeature.length + 1, // You can use a more sophisticated ID generation logic
        name: feature,
      };

      // let NewFeature = feature;
      // setProductFeature([...productFeature,NewFeature]);
      setProductFeature(prevList => [...prevList, newObject]);
    }

    useEffect(()=>{
        GetProductList();
    },[])
    return(
        <>
        <h4>Welcome to Product</h4>
        {/* {
          productFeature.map(item=>
            <div>{item.name}</div>
            )
        } */}
        <div className="container  product-cls">
        <form onSubmit={formik.handleSubmit}>
        <div className="row mt-5"> 
            <div className="col-md-6">
                <select className="form-select bgcolr" value={selectedCategory} name="CategoryId" onChange={handleCategory}  sx={{m: 0.5, width: '57ch' }} >
                    {
                        category.map(item=>
                            <option key={item.categoryId} value={item.categoryId}> {item.categoryName}</option>
                            )
                    }
                
                    </select>
            </div>
            <div className="col-md-6">
            <TextField sx={{m: 0.5, width: '57ch' }} name='ProductName' onChange={formik.handleChange} size='small' id="outlined-basic" label="Product Name" variant="outlined" />
            </div>
        </div>

        
        <div className="row mt-5"> 
            <div className="col-md-6">
        <TextField sx={{m: 0.5, width: '57ch'}} name='ProductPrice' onChange={formik.handleChange} size='small' id="outlined-basic" label="Price" variant="outlined" />
            </div>
            <div className="col-md-6">
        <TextField sx={{m: 0.5, width: '57ch' }} name='Description' onChange={formik.handleChange} size='small' id="outlined-basic" label="Description" variant="outlined" />

            </div>
        </div>
        

       
            <div className="row mt-5">
              <div className="col-md-6">
              <input type="file" onChange={handleFileChange}></input>
              </div>
              <div className="col-md-6">
              <Link className="add-feature" onClick={handleOpen}>Add Features</Link>
              </div>
            </div>
            
            <div className="row m-5 d-flex justify-content-end align-items-ceter w-50">
            <Button  type='submit' style={{ width:'40%'}} variant="outlined" className='ms-10'>Add Product</Button>
            </div>
        </form>
        </div>

        <ProductFeaature  onOpen={modalOpen}  onClose={closeModal}  onFeatureAdd={HandleAddFeature} />
       

        </>
    )
}