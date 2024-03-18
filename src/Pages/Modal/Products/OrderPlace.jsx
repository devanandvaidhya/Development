import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import './Orderplace.css'
import { FaSync } from 'react-icons/fa';
import { Height } from "@mui/icons-material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function OrderPlace({ onOpen,onClose  })
{
    
    useEffect(()=>{

    },[])
    return(
        <>
        <div>
           

           <Modal
               open={onOpen}
               onClose={onClose}
               aria-labelledby="modal-title"
               aria-describedby="modal-description"
           >
               <Box>
               
               <div className="modalBackground modal-bg">
           <div className="">
               
               <div className="title">
               <h3> Plesae do not refresh</h3>
               </div>
               <div className="body img-rotate"> <img src="/assets/refresh2.PNG" alt="Rotating Image" className="rotating-image" style={{height:'100px'}}/>
               </div>
               
           </div>
           </div>
               </Box>
           </Modal>
           </div>
        </>
    )
}