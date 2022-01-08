import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import SearchSwitch from '../buttons/SearchSwitch';
import { selectUserName } from '../redux/userState';
import SearchBar from './SearchBar';

const MainContent = styled(Grid)({
  minHeight: '375px',
  maxWidth: '902px',
  marginBottom: '25px',
  backgroundColor: 'white',
  border: 'solid',
  borderWidth: '1px',
  borderColor: '#dbdbdb',
  padding: '30px 8px 15px 8px'
});

const Titles = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  fontSize: theme.typography.h4.fontSize
}));

const MyPageWelcome: FunctionComponent = () => {
  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const userName = useAppSelector(selectUserName);

  return (
    <MainContent container>
      <Grid item xs={12} md={4}>
      </Grid>
      <Grid item xs={12} md={8}>
        <Titles>Hello {userName}</Titles>
        <Typography color='textPrimary'>
          You have 5 recipes.
        </Typography>
        <button onClick={() => navigate('/createrecipe')}>New Recipe</button>
      </Grid>
      <Grid item xs={12} display='flex' flexDirection='column' justifyContent='flex-end'>
        <SearchSwitch />
        <SearchBar ref={searchBarRef} />
      </Grid>
    </MainContent>
  );
}

export default MyPageWelcome;