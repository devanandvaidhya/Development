import { Avatar, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { red } from "@mui/material/colors";


export function ProductComment()
{

    const [Comment, setComment] = useState();
    const [Commentlist, setCommentlist] = useState([]);
    const [EmpComment, SetEmpComment] = useState({ProductId:0,Comments:'',EmpId:0});
    const [EmployeDetails,setEmployeeDetails] = useState({id:0,firstName:''});
    const param = useParams();

    function handleSendComment()
    {
        let Emp = JSON.parse(localStorage.getItem('Users'));
        EmpComment.Comments = Comment;
        EmpComment.ProductId = param.productId;
        EmpComment.EmpId = Emp.id;


        axios.post('http://localhost:11939/api/Student/SaveProductComment',EmpComment).
              then(response=>{
                setComment('');
                getProductComments();
              })
    }

    function handleComment(e)
    {
        setComment(e.target.value);
    }

    function getProductComments()
    {
        debugger;
        axios.get(`http://localhost:11939/api/Student/GetProductComment/${param.productId}`).
        then(response=>{
            setCommentlist(response.data.entity)
            console.log(Commentlist)
            debugger;
        })
        
    }
    function GetEmpDetails()
    {
      let Emp = JSON.parse(localStorage.getItem('Users'));
      setEmployeeDetails(Emp);
    debugger;
    }
    useEffect(()=>{
      GetEmpDetails();
    getProductComments()
    },[]);

    return(
        <>
        <h4>Welocme to comment</h4>

          {
              Commentlist.map(item=>
                
                    //  if(EmployeDetails.id==item.userId)
                    //  {

                    //  }
                    <div>
                        <div className="d-flex mt-3">
                          <Avatar className="ms-3" sx={{ bgcolor: red[500] }} aria-label="recipe">
                              {item.firstName.substring(0, 1) +""+ item.lastName.substring(0, 1)} 
                            </Avatar>
                              <label className="ms-3 mt-2">{item.comments}</label>
                        </div>
                        
                    </div>
               
                
                )
          }
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Leave comment</InputLabel>
          <Input
            id="standard-adornment-password"
            type='text'
            onChange={handleComment}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleSendComment}
                  value ={Comment}
                >
                <SendOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        </>
    )
}