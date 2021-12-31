import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUserName, unsetUser } from "../redux/userState";
import { useNavigate } from "react-router";

interface HeaderProps {
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
}

const Header: FunctionComponent<HeaderProps> = ({ leftButton, rightButton }) => {
  const userName = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(unsetUser());
    navigate('/');
  }

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      sx={{
        backgroundColor: '#3fa8b5',
        color: 'white',
        flexDirection: ['column', 'row']
      }}
      py={3}
      px={1}>
      <Box sx={{ paddingBottom: ['10px', '0px'] }}>
        <Typography variant='h3'>
          Cookbook
        </Typography>
        <Typography variant='body2' pl={2} fontStyle='italic'>
          recipes...no clutter
        </Typography>
      </Box>
      <Box
        display='flex'
        alignItems='flex-start'
        sx={{ placeSelf: 'flex-begin', paddingTop: '5px' }}>
        {userName
          ?
          <>
            {leftButton}  &nbsp;
            {rightButton} &nbsp;
            <Tooltip title='Log out'>
              <IconButton onClick={logout} sx={{ paddingTop: '0px' }}>
                <LogoutIcon fontSize='medium' sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
          </>
          :
          <Tooltip title='Log in'>
            <IconButton onClick={() => navigate('/signin')}>
              <AccountCircleIcon fontSize='large' sx={{ color: 'white', paddingTop: '5px' }} />
            </IconButton>
          </Tooltip>
        }
      </Box>
    </Box>
  );
}

export default Header;