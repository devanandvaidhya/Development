import { useParams } from "react-router-dom";
import { ProductDetails } from "./ProductDetails";
import { ProductFeature } from "./ProductFeture";


export function ProductDetailsSummery()
{
    //let param = useParams();
    

    return(
        <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6"><ProductDetails /></div>
                <div className="col-md-6"><ProductFeature/></div>
            </div>
        </div>
        </>
    )
}