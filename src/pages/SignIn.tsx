import { Backdrop, Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, styled, TextField, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createUser, fetchUser, selectUserLoading } from "../redux/userState";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Topper from "../components/Topper";

const BoxMain = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'unset',
  maxWidth: '886px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const Forms = styled(Grid)(({ theme }) => ({
  maxWidth: '420px',
  padding: '0px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: '0px 20px 0px 20px'
  }
}));

const LoginContent = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  width: '902px',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const LoginSignup = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px'
});

const SignIn: FunctionComponent = () => {
  const MINUSERNAMELENGTH = 7;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectUserLoading);
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('loginName');

    storedUser &&
      setUsername(storedUser);
  }, []);

  const login = async () => {
    rememberMe &&
      localStorage.setItem('loginName', username);

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
      <HeaderBox>
        <Header />
      </HeaderBox>
      <Topper />
      <LoginContent>
        <Forms container>
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
              autoFocus={true}
              onChange={e => setUsername(e.target.value)} />
            <FormGroup>
              <FormControlLabel control={
                <Checkbox
                  onChange={() => setRememberMe(!rememberMe)}
                  checked={rememberMe} />}
                label='Remember me'
                sx={{ color: 'gray' }} />
            </FormGroup>
            <Button
              id="signinbtn"
              variant='contained'
              color='primary'
              onClick={login}
              sx={{ alignSelf: 'center', width: '135px', marginTop: '10px' }} >
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
        </Forms >
      </LoginContent>
      <Backdrop open={isLoading!}>
        <CircularProgress />
      </Backdrop>
    </BoxMain>
  );
}

export default SignIn;