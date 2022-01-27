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

const HeaderContent = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#3fa8b5',
  color: 'white',
  padding: '24px 8px 24px 8px'
});

const IconBox = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  placeSelf: 'flex-begin',
  paddingTop: '5px'
})

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
      <Box sx={{ paddingBottom: ['10px', '0px'] }}>
        <Typography variant='h3'>
          Cookbook
        </Typography>
        <Typography variant='body2' pl={2} fontStyle='italic'>
          recipes...no clutter
        </Typography>
      </Box>
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
            <IconButton onClick={() => navigate('/signin')}>
              <AccountCircleIcon fontSize='large' sx={{ color: 'white', paddingTop: '5px' }} />
            </IconButton>
          </Tooltip>
        }
      </IconBox>
    </HeaderContent>
  );
}

export default Header;