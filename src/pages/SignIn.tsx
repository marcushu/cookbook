import { Backdrop, Box, Button, CircularProgress, Grid, styled, TextField, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createUser, fetchUser, selectUserLoading } from "../redux/userState";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import splashImage from '../images/lukas-blazek-f-TWhXOrLiU-unsplashS.jpg'

const BoxMain = styled(Box)({
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center'
});

const LoginContent = styled('div')({
  backgroundImage: `url(${splashImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  paddingTop: '8px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
});

const LoginSignup = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff9c',
  padding: '12px'
});

const SignIn: FunctionComponent = () => {
  const MINUSERNAMELENGTH = 7;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectUserLoading);
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const login = async () => {
    await dispatch(fetchUser(username));

    navigate("/mypage");
  }

  const signUp = async () => {
    if (newUsername.length >= MINUSERNAMELENGTH)
      await dispatch(createUser(newUsername));

    navigate("/mypage");
  }


  return (
    <BoxMain>
      <Header />
      <LoginContent sx={{ width: ['100%', '902px'] }}>
        <Grid container sx={{ maxWidth: ['100%', '420px'] }} m='auto'>
          <LoginSignup item xs={12} mt={3}>
            <Typography color='textPrimary' variant="h4">
              Log In
            </Typography>
            <TextField
              sx={{ marginTop: '15px', marginBottom: '15px', textAlign: 'center' }}
              id="outlined-basic"
              placeholder="User name"
              variant='outlined'
              fullWidth={true}
              value={username}
              onChange={e => setUsername(e.target.value)} />
            <Button
              id="signinbtn"
              variant='contained'
              color='primary'
              onClick={login}
              sx={{ alignSelf: 'center', width: '135px' }} >
              Log in
            </Button>
          </LoginSignup>
          <LoginSignup item xs={12} mt={4}>
            <Typography color='textPrimary' variant="h4">
              Sign up
            </Typography>
            <TextField
              sx={{ marginTop: '15px', marginBottom: '15px' }}
              id="outlined-basic"
              placeholder='New user name'
              variant='outlined'
              fullWidth={true}
              helperText='At least 7 characters'
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)} />
            <Typography color='primary' variant='h6' textAlign='center'>
              No Password!
            </Typography>
            <Typography color='textPrimary'>
              No secrets here, so keep grandmas secret pecan pie recipe in the kitchen drawer.
            </Typography>
            <Button
              variant='outlined'
              id="signupbtn"
              onClick={signUp}
              color='primary'
              sx={{ alignSelf: 'center', width: '135px', marginTop: '10px' }}>
              sign up
            </Button>
          </LoginSignup>
          <Grid py={2}>
            <Button color='secondary' onClick={() => navigate('/')}>&lt; Cancel</Button>
          </Grid>
        </Grid >
      </LoginContent>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </BoxMain>
  );
}

export default SignIn;