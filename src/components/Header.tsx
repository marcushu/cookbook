import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, IconButton, styled, Tooltip, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUserName, unsetUser } from "../redux/userState";
import { useNavigate } from "react-router";
import { setOwner } from '../redux/searchResultState';

interface HeaderProps {
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
}

const HeaderContent = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '886px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  backgroundColor: '#3fa8b5',
  color: 'white',
  padding: '24px 8px 24px 8px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const HeaderTitle = styled(Box)(({ theme }) => ({
  paddingBottom: '10px',
  display: 'unset',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  }
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '10px',
  [theme.breakpoints.up('sm')]: {
    paddingTop: '5px',
  }
}));

const Header: FunctionComponent<HeaderProps> = ({ leftButton, rightButton }) => {
  const userName = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(unsetUser());
    dispatch(setOwner("")); // clear out the user for search
    navigate('/');
  }

  return (
    <HeaderContent>
      <HeaderTitle>
        <Typography variant='h3' sx={{ fontWeight: '100' }}>
          Cookbook
        </Typography>
        <Typography variant='body2' pl={2} fontStyle='italic'>
          recipes...no clutter
        </Typography>
      </HeaderTitle>
      <IconBox>
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
            <IconButton onClick={() => navigate('/signin')} >
              <AccountCircleIcon
                fontSize='large'
                sx={{ color: 'white', paddingTop: '5px', display: ['none', 'revert'] }} />
            </IconButton>
          </Tooltip>
        }
      </IconBox>
    </HeaderContent>
  );
}

export default Header;