import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import { Paginations } from "../../Component/Share/Pagination";
import { useNavigate } from "react-router-dom";

export function ProductList()
{

    const [Product,setProduct]= useState([]);
    const [PageNumber,setPageNumber]= useState(1);
    const [PageSize,setPageSize] = useState(5);
    const [TotalCount,setTotalCount]=useState(0);
    let navigate = useNavigate();
    
    function handlePageClick(event, newPage)
    {
        getProductList(newPage,PageSize)
       debugger;

    }

    function handleProductDetails(event, ProductId)
    {
        // debugger;
        //alert(ProductId)
        //console.log('Product Id', ProductId);
       navigate(`/product-details/${ProductId}`)
    }

    const createImageSrc = (byteData) => {
        if (!byteData) return null;
      
        //const blob = new Blob([new Uint8Array(byteData)], { type: 'image/png' });
        const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(byteData)))}`;
       // return URL.createObjectURL(blob);
       return dataUrl;
      };

    

    function getProductList(PageNumber,PageSize)
    {
        axios.get(`http://localhost:11939/api/Student/GetProductByPagination/${PageNumber}/${PageSize}`).
                then(response=>{
                    setProduct(response.data.entity.product);
                    setTotalCount(response.data.entity.totalCount)
                    debugger;
                })
        // axios.get('http://localhost:11939/api/Student/GetProductlist').
        // then(response=>{
        //     setProduct(response.data.entity);
        //     debugger;
        //     //alert(Product[0]);
        // })
    }

    useEffect(()=>{
       getProductList(PageNumber,PageSize);
    },[]);

    return(
        <>
        <div className="container product-container p-4 mt-4">
        <div className="d-flex justify-content-center flex-wrap">
            {
            Product.map(item=>
                    
               
                   <div className="m-3 ">
                    <div className="card ms-3" style={{width: '15rem', height:'21rem', background:'rgb(246 255 252)'}}>
                    <img className="card-img-top" style={{height:'10rem'}} src={`data:image/png;base64,${item.productFile}`} alt="Card image cap"/>
                   
                    <div className="card-body">
                        <h5 className="card-title">{item.productName}</h5>
                        <h5 className="card-title"><lable className="bold">Price:</lable>{item.productPrice}</h5>
                        <p className="card-text">{item.description}</p>
                        {/* <button  className="btn btn-primary" onClick={handleProductDetails(item.productId)} >PROCEED</button> */}
                        <button  className="proc-btn" onClick={event => handleProductDetails(event, item.productId)}>PROCEED</button>
                        {/* <a href="#" className="btn btn-primary"  >PROCEED</a> */}
                      
                    </div>
                    <div className="mb-3">
                    <Rating name="size-small" defaultValue={2} size="medium" />

                    </div>
                    </div>
                    </div>
                )
            }
        </div>
        </div>

        <div className="d-flex justify-content-center mb-5 mt-3">
            <Paginations TotalCount={Math.ceil(TotalCount/PageSize)}
                        Change={handlePageClick}
            />
        </div>

       
        </>
    )
}