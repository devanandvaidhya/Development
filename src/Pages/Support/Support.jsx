import { useSelector } from "react-redux"

export function Support()
{
   const NumberOf= useSelector(state =>state.NumberOfItem);
    return(
        <>
        <div className="text-white m-4">
        <h4>We can support you...Please dial Number.</h4>
        <h3>000-1234-456</h3>
        <h3>000-2304-523</h3>
        {NumberOf}
        </div>
        </>
    )
}