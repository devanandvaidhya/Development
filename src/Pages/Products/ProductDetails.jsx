// import { ExpandMore } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from "@mui/material";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { ProductComment } from "./ProductComment";
import { ProductFeature } from "./ProductFeture";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export function ProductDetails()
{

    const [expanded, setExpanded] = useState(false);
    const [Product, setProduct] = useState({description:'',productFile:'',productId:0, productName:'',productPrice:''});
    const [anchorEl, setAnchorEl] = useState(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const MyOptions = [
    "Share via Whatsapp",
    "Send Email",
    "Download",
    "Save as PDF",
];
const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

const open = Boolean(anchorEl);

const handleClose = () => {
    setAnchorEl(null);
};


    let param = useParams();
    

    function GetProductById()
    {   
        debugger;
        axios.get(`http://localhost:11939/api/Student/GetProductById/${param.productId}`).
                then(response=>{
                    setProduct(response.data.entity);
                    debugger;
                })
    }

    useEffect(()=>{
        GetProductById();
    },[])


    return(
        <>
        {/* <h3>Produt Details</h3> */}
        <div className="container">
        <div
            style={{
                marginLeft: "40%",
            }}
        >
            {/* <IconButton
                aria-label="more"
                onClick={handleClick}
                aria-haspopup="true"
                aria-controls="long-menu"
            >
                <MoreVertIcon />
            </IconButton> */}
            <Menu
                anchorEl={anchorEl}
                keepMounted
                onClose={handleClose}
                open={open}
            >
                {MyOptions.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={handleClose}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
         <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {Product.productName.substring(0, 1)}
          </Avatar>
        }
        action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        <IconButton
        aria-label="more"
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="long-menu"
    >
        <MoreVertIcon />
    </IconButton>
          
        }
        title={Product.productName}
        subheader="September 14, 2016"
      />
      
        
            <CardMedia
                component="img"
                height="194"
                image={`data:image/png;base64,${Product.productFile}`}
                alt="Paella dish"
            />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {Product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ThumbUpAltOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ThumbDownOutlinedIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {/* <SendOutlinedIcon /> */}
          <ChatOutlinedIcon/>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>You can leave your comment:
          </Typography>

          <Typography >
          <ProductComment ProductId={param.productId}/>
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>
    </div>

        </>
    )
}