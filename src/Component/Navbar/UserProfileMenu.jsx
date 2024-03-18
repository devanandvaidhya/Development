import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { IsLoggedIn } from '../../Constant/emp_constant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { initialState, reducer } from '../../Reducer/useReducers';

export function UserProfileMenu()
{
  const initialState = {
    items: [],
  };

  //const [state, dispatch] = useReducer(reducer,initialState);
    const [anchorEl, setAnchorEl] = useState(null);
     const {state,dispatch} = useContext(UserContext);
    const open = Boolean(anchorEl);
    let Emp = JSON.parse(localStorage.getItem('Users'));
    let navigate =  useNavigate();
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    const handleUserProfile=()=>{
        navigate('/user-profile');
      }

      function handleLogout()
      {
         dispatch({type:IsLoggedIn, payload:false});
        localStorage.removeItem('Users');
        navigate('/login');
      }

      useEffect(()=>{
        //alert(state)
       // console.log(state);
      },[])


    return(
        <>
        <div style={{display:'inline-flex'}}>
          <ShoppingCartIcon className='card-item' />{state.items}
          
          
        
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
            {Emp.firstName.charAt(0).toUpperCase() + Emp.lastName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
            <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleUserProfile}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </div>
        </>
    )
}
