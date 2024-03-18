import { useEffect, useState } from "react";
import { Paginations } from "../../Component/Share/Pagination";
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ApprovalIcon from '@mui/icons-material/Approval';
import { FaTimes } from 'react-icons/fa';
import UserModal from "../Modal/Users/UserModal";
import { UserStatus, UserStatusNUmber } from "../../Constant/common";

import './Users.css';

export function UserList()
{

    const [Users,setUsers]= useState([]);
    const [PageSize,setPageSize] = useState(5);
    const [TotalCount,setTotalCount]=useState(0);
    const [PageNumber,setPageNumber]= useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedId,setSelectedId] = useState(null);

    const [userDetails,setUserDetails]=useState({UserId:0,StatusId:0,Action:''});
   
    function handlePageClick(event, newPage)
    {
        getUsersList(newPage,PageSize)
 
    }
    function getUsersList(PageNumber,PageSize)
    {
        debugger;
        axios.get(`http://localhost:11939/api/Student/GetUserByPagination/${PageNumber}/${PageSize}`).
                then(response=>{
                    setUsers(response.data.entity.users);
                    setTotalCount(response.data.entity.totalCount)
                    debugger;
                })

    }

    function handleAction(userId,statusId,action)
    {
        debugger;
        setUserDetails({
            UserId:userId,
            StatusId:statusId,
            Action:action
        })
        if(action==='Delete')
        {
            setSelectedId(userId)
        }
        setModalOpen(true);
       // <UserModal  />
    }
    

    const closeModal = () => {
        setModalOpen(false);
      };

    useEffect(()=>{
        getUsersList(PageNumber,PageSize);
    },[])

    return(
        <>
                <div className="container product-container p-4 mt-4">
                <table class="table table-hover table-responsive tbl-bg-clr">

                    <thead>
                    <tr>
                        <th>Profile</th>
                       <th>First Name</th>
                       <th>Last Name</th>
                       <th>Email Id</th>
                       <th>Status</th>
                       <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                        {
                        Users.map(item=>
                                
                        <tr>
                            <td>  
                                {/* <Avatar /><img src= {`data:image/png;base64,${item.profileFile}`} /> */}
                                <Avatar
                                alt={item.firstName.charAt(0).toUpperCase() }
                                src={`data:image/png;base64,${item.profileFile}`}
                                sx={{ width: 45, height: 45 }}
                                />
                            </td>
                            <td>{item.firstName}</td>
                            <td> {item.lastName}</td>
                            <td> {item.emailId}</td>
                            <td> {item.statusName}</td>
                            <td>
                                {UserStatus.Deleted===item.statusName?
                                  <IconButton aria-label="delete" id={"Delete-d-"+item.id} className="delete-icon delete-icon-dis" disabled={true} onClick={() => handleAction(item.id,UserStatusNUmber.Deleted,'Delete')}  >
                                  <DeleteIcon />
                              </IconButton>
                                :
                                <IconButton aria-label="delete" id={"Delete-"+item.id} className="delete-icon"  onClick={() => handleAction(item.id,UserStatusNUmber.Deleted,'Delete')}  >
                                <DeleteIcon />
                                </IconButton>
                                // <IconButton aria-label="delete" id={"Delete-"+item.id} className={selectedId===item.id?'delete-icon-dis delete-icon' : 'delete-icon'}  onClick={() => handleAction(item.id,UserStatusNUmber.Deleted,'Delete')}  >
                                // <DeleteIcon />
                                // </IconButton>
                                }
                            

                            {UserStatus.Approved===item.statusName?
                                   <IconButton aria-label="delete" className="approve-icon approve-icon-dis" disabled={true} onClick={() => handleAction(item.id,UserStatusNUmber.Approved,'Approve')} >
                                   <ApprovalIcon />
                               </IconButton>
                                :
                                <IconButton aria-label="delete" className="approve-icon" onClick={() => handleAction(item.id,UserStatusNUmber.Approved,'Approve')} >
                                <ApprovalIcon />
                            </IconButton>
                                }

                           
                            {UserStatus.Rejected===item.statusName?
                                      <IconButton aria-label="delete" className="reject-icon reject-icon-dis"  disabled={true} onClick={() => handleAction(item.id,UserStatusNUmber.Rejected,'Reject')} >
                                      <FaTimes />
                                      </IconButton>
                                :
                                <IconButton aria-label="delete" className="reject-icon"  onClick={() => handleAction(item.id,UserStatusNUmber.Rejected,'Reject')} >
                            <FaTimes />
                            </IconButton>
                                }

                         
                            
                            </td>
                        </tr>
                            
                            )
                        }
                    </tbody>
                 </table>
                </div>

                <div className="d-flex justify-content-center mb-5 mt-3">
                    <Paginations TotalCount={Math.ceil(TotalCount/PageSize)}
                                Change={handlePageClick}
                    />
                </div>


                <UserModal  onOpen={modalOpen}  onClose={closeModal}  userDetails={userDetails} />
               
        </>
    )
}