import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import "./UserModal.css";
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

export default function UserModal({ onOpen,onClose ,userDetails }) {
 

  const [empComment,setEmpComment] = useState('');

  function handleCommentChange(e)
  {
    setEmpComment(e.target.value)
  }
    function handleSubmit()
    {
        debugger;
        let Id=userDetails.UserId;
        let StatusId = userDetails.StatusId;
        let Comment = empComment;
        axios.post(`http://localhost:11939/api/Student/UpdateStatus/${Id}/${StatusId}/${Comment}`).
                then(response=>{
                    alert('Status Updated sucessfully..!');
                })
        // alert(userDetails.UserId);
        // alert(userDetails.StatusId);
        onClose();
    }
  return (
    <div>
      {/* <Button onClick={openModal} variant="contained" color="primary">
        Open Modal
      </Button> */}

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
          <h4>Are You Sure You Want to {userDetails.Action}?</h4>
        </div>
        <div className="body">
         
          <TextField
            placeholder="Enter reason"
            multiline
            rows={2}
            maxRows={4}
            label="Reason"
            className='text-reason'
            onChange={handleCommentChange}
            />
        </div>
        <div className="footer">
          <button onClick={onClose}  id="cancelBtn">Cancel</button>
          <button onClick={handleSubmit}  id="submitBtn">Submit</button>
        
        </div>
      </div>
    </div>
        </Box>
      </Modal>
    </div>
  )
}