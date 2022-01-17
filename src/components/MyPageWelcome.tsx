import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import SearchButton from '../buttons/SearchButton';
import SearchSwitch from '../buttons/SearchSwitch';
import { selectUserName } from '../redux/userState';
import SearchBar from './SearchBar';
import splashImage from '../images/marvin-binnig-0zqT55YuPn8-unsplash.jpg';
import { selectOwner, setOwner } from '../redux/searchResultState';
import { useDispatch } from 'react-redux';

const MainContent = styled(Grid)({
  minHeight: '375px',
  maxWidth: '902px',
  marginBottom: '25px',
  backgroundColor: 'white',
});

const Titles = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  fontSize: theme.typography.h4.fontSize
}));

const MyPageWelcome: FunctionComponent = () => {
  const searchBarRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useAppSelector(selectUserName);
  const owner = useAppSelector(selectOwner);

  const callSearch = () => {
    
    if(owner.length) 
      // clear out the 'owner' of this search to search all recipes
      dispatch(setOwner(""));

    if (searchBarRef && searchBarRef.current)
      searchBarRef.current.click();
  }

  return (
    <MainContent container>
      <Grid 
        item 
        xs={12} 
        md={4}
        display='flex'
        style={{ backgroundImage: `url(${splashImage})`, opacity: '77%', minHeight: '315px' }}>
          <SearchButton searchFunction={callSearch}  />
      </Grid>
      <Grid item xs={12} md={8}>
        <Titles>Hello {userName}</Titles>
        <Typography color='textPrimary'>
          You have 5 recipes. Create a new recipe
        </Typography>
        <button onClick={() => navigate('/createrecipe')}>New Recipe</button>
      </Grid>
      <Grid 
        item 
        xs={12} 
        display='flex' 
        flexDirection='column' 
        justifyContent='flex-end'>
        <SearchSwitch />
        <SearchBar ref={searchBarRef} />
      </Grid>
    </MainContent>
  );
}

export default MyPageWelcome;