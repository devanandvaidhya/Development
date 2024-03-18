import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import "./Product.css";
import { TextField } from '@mui/material';
import axios from 'axios';

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

export function ProductFeaature({ onOpen,onClose ,onFeatureAdd })
{

    const[addFeature,setAddFeature]=useState('');
   

    function handleAddFeatures(e)
    {
        setAddFeature(e.target.value);
    }
    const handleSubmit =()=>{
        let featureValue = addFeature;
        setAddFeature('');
        onFeatureAdd(featureValue);
    }

    return(
        <>
                <div>
           

            <Modal
                open={onOpen}
                onClose={onClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                
                >
                
                <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                <button
                    onClick={onClose}
                >
                    X
                </button>
                </div>
                <div className="">
                <h4>Please add the Product features</h4>
                {/* <h4>Are You Sure You Want to {userDetails.Action}?</h4> */}
                </div>
                <div className="body">
                
               <div className="row">
                <div className="col-md-8">
                <TextField id="outlined-uncontrolled" value={addFeature} label="Feature" size="small" onChange={handleAddFeatures} />
                
               </div>
               <div className="col-md-4">
               <button onClick={handleSubmit}  id="submitBtn">Add</button>
               </div>
                </div>
                </div>
                <div className="footer">
                {/* <button onClick={onClose}  id="cancelBtn">Cancel</button> */}
                {/* <button onClick={handleSubmit}  id="submitBtn">Submit</button> */}
                
                </div>
            </div>
            </div>
                </Box>
            </Modal>
            </div>
        </>
    )
}