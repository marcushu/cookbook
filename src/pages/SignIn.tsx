import { Button, Grid, styled, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { createUser, fetchUser } from "../redux/userState";
import { useNavigate } from "react-router";
import Header from "../components/Header";

const LoginContent = styled('div')({
  backgroundColor: 'white',
  border: 'solid', 
  borderWidth: '1px',
  borderColor: '#dbdbdb',
  paddingTop: '8px', 
  paddingBottom: '30px'
})

const SignIn: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const login = async () => {
    await dispatch(fetchUser(username));

    navigate("/mypage");
  }

  const signUp = async () => {
    await dispatch(createUser(username));

    navigate("/mypage");
  }

  return (
    <>
      <Header />
      <LoginContent sx={{width: ['100%', '900px']}}>
        <Grid container sx={{ maxWidth: ['100%', '420px'] }} m='auto'>
          <Grid item xs={12} mt={3} p={1} display='flex' flexDirection='column'>
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
            <Button variant='contained' color='primary' onClick={login} sx={{ alignSelf: 'center', width: '135px' }} >
              Log in
            </Button>
          </Grid>
          <Grid item xs={12} mt={4} display='flex' flexDirection='column'
            p={1} sx={{ backgroundColor: grey[100], borderRadius: '8px' }}>
            <Typography color='textPrimary' variant="h4">
              Sign up
            </Typography>
            <TextField
              sx={{ marginTop: '15px', marginBottom: '15px' }}
              id="outlined-basic"
              placeholder='New user name'
              variant='outlined'
              fullWidth={true}
              helperText='User name must be unique'
              value={username}
              onChange={e => setUsername(e.target.value)} />
            <Typography color='primary' variant='h6' textAlign='center'>
              No Password!
            </Typography>
            <Typography color='textPrimary'>
              No secrets here, so keep grandmas secret pecan pie recipe in the kitchen drawer.
            </Typography>
            <Button variant='outlined' onClick={signUp} color='primary' sx={{ alignSelf: 'center', width: '135px', marginTop: '10px' }}>
              sign up
            </Button>
          </Grid>
          <Grid py={2}>
            <Button color='secondary' onClick={() => navigate('/')}>&lt; Cancel</Button>
          </Grid>
        </Grid >
      </LoginContent>
    </>
  );
}

export default SignIn;