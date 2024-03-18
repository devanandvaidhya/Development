import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ProductFeatureDetails({buyProduct,addProduct})
{
    const [Features, setFeatures] = useState([]);
    let param= useParams();

    function GetFeaturesById()
    {   
        debugger;
        axios.get(`http://localhost:11939/api/Student/GetProdutFeatureById/${param.productId}`).
                then(response=>{
                    setFeatures(response.data.entity);
                    debugger;
                })
    }

  
    useEffect(()=>{
        GetFeaturesById();
        // alert(param.productId)
        
    },[])
    return(
        <>
         <div className="container feature-container bxsh">
                
                <table>
                    <tbody>

                    

                        {
                            
                        Features.map(item=>
                            <tr key={item.id}>
                            <label key={item.id} className="mt-3">{item.name}</label>
                            </tr>
                            )
                        }
                </tbody>
            </table>
            
        </div>

        <div className="container feature-container bxsh mt-3 p-1">
                    <div className="m-4">
                        <button className="prod-add-to-cart-btn" onClick={addProduct} >Add to Cart</button>
                        {/* <button className="prod-add-to-cart-btn" onClick={handleAddCartProduct}>Add to Cart</button> */}
                    </div>
                    <div className="m-4">
                    <button className="prod-buy-btn" onClick={buyProduct}>BUY</button>
                    {/* <button className="prod-buy-btn" onClick={handleBuyProduct}>BUY</button> */}
                    </div>
        </div>
        </>
    )

}