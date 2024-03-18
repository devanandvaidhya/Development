
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export function AddToCart({BackToFeature})
{
  


    return(
        <>
       <ArrowBackIcon  className='prod-back' onClick={BackToFeature}/>

       <div className="container feature-container m-3">
        Welcome to add to cart
       </div>
        </>
    )
}