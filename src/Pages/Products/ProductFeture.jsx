import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductFeatureDetails } from "./ProductFeatureDetail";
import { ProductBuy } from "./ProductOperation/ProductBuy";
import { AddToCart } from "./ProductOperation/AddtoCart";
import { UserContext } from "../../App";
import { AddItemToCard } from "../../Constant/emp_constant";
import { initialState, reducer } from "../../Reducer/useReducers";
// import { initialState, reducer } from './Reducer/useReducers';


export function ProductFeature()
{

    //const {state,dispatch} = useContext(UserContext);
    
    const [Features, setFeatures] = useState([]);
    const[showBuy,setShowBuy] = useState(false);
    const[showAddCart,setAddCart] = useState(false);
    const[cardDetails,setCardDetails]= useState();
    const [Product, setProduct] = useState({description:'',productFile:'',productId:0, productName:'',productPrice:''});
    let param= useParams();
    const [state, dispatch] = useReducer(reducer,initialState);

    function handleBuyProduct()
    {
        setShowBuy(true);
        setAddCart(false);
    }
    function handleAddCartProduct()
    {
        //alert('Added');
        //alert(param.productId);
        GetProductById();
       // dispatch({type:AddItemToCard, payload:true})
        // setAddCart(true);
        // setShowBuy(false);
    }

    function BackToFeature()
    {
        setShowBuy(false);
        setAddCart(false);
    }

    const GetProductById=async()=>
    {   
      
       await axios.get(`http://localhost:11939/api/Student/GetProductById/${param.productId}`).
                then(response=>{
                    setProduct(response.data.entity);
                    dispatch({type:AddItemToCard, payload:response.data.entity})
                    // console.log(state.items);
                    debugger;
                })
    }

    useEffect(()=>{
      //  GetFeaturesById();
        // alert(param.productId)
        
    },[])
    return(
        <>
        <div>
            {(showBuy)?<ProductBuy BackToFeature={BackToFeature}/>:''}
            {/* {(showAddCart)?<AddToCart BackToFeature={BackToFeature}/>:''} */}
            {/* {showBuy && <ProductBuy />} */}
            {}
            {
            state.items.map(item => (
            <li key={item.productId}>{item.productId}{item.productName}</li>
          ))}
        {(!showBuy&& !showAddCart)?<ProductFeatureDetails buyProduct={handleBuyProduct} addProduct={handleAddCartProduct}/>:''}
       </div>
        </>
    )
}