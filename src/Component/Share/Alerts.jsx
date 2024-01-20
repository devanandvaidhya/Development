import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";


export function Alerts(Props)
{
    const [showAlerts, setshowAlerts] = useState(false);
    
    //setTimeout(handleClose, 80000);

    function handleClose()
    {
        setshowAlerts(false);

    }

    useEffect(()=>{
        setshowAlerts(Props.showvalue);

        setTimeout(() => {
            handleClose();
          }, 6000);
        
    },[Props.showvalue]);

    return(
        <>
        <div className="alerts-cls">
        <Snackbar open={showAlerts} autoHideDuration={6000}>
            <Alert severity="success">{Props.title}</Alert>
            </Snackbar>
        </div>
        </>
    )
}