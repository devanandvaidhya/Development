
import Pagination from '@mui/material/Pagination';

export function Paginations(props)
{

    return(
        <>
         <Pagination count={props.TotalCount} variant="outlined" 
            onChange={props.Change}
            
         />
        </>
    )
}