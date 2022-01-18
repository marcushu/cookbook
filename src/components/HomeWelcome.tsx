import { styled } from '@mui/material/styles';
import { Grid, Typography } from "@mui/material";
import { FunctionComponent, useRef } from "react";
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import splashImage from '../images/marvin-binnig-0zqT55YuPn8-unsplash.jpg';
import SearchButton from '../buttons/SearchButton';

const MainContent = styled(Grid)({
  minHeight: '375px',
  maxWidth: '902px',
  marginBottom: '25px',
  backgroundColor: 'white'
});

const ImagePanel = styled(Grid)({
  display: 'flex',
  backgroundImage: `url(${splashImage})`,
  opacity: '77%',
  minHeight: '315px'
});

const Titles = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  fontSize: theme.typography.h4.fontSize
}));

const TitleButton = styled(Titles)({
  textDecoration: 'underline',
  ":hover": {
    cursor: 'pointer'
  }
});


const HomeWelcome: FunctionComponent = () => {
  const searchBarRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const callSearch = () => {
    if (searchBarRef && searchBarRef.current)
      searchBarRef.current.click();
  }

  return (
    <MainContent container>
      <ImagePanel item xs={12} md={4}>
        <SearchButton searchFunction={callSearch} />
      </ImagePanel>
      <Grid item xs={12} md={8} p={3}>
        <Titles>Just recipes</Titles>
        <Typography color='textPrimary'>Cooking sites are great, but they can be wordy.  No stories, or long descriptions here, just the ingredients, and what to do with them.</Typography>
        <TitleButton
          onClick={() => navigate('/signin')}>Log in
        </TitleButton>
        <Typography color='textPrimary'>log in to add your own recipes, collect favorites, and create shopping lists.</Typography>
        <Typography color='textPrimary'>create an account with just a username: I hate passwords, and what are we trying to hide here anyway?</Typography>
        <Titles>Browse</Titles>
        <Typography color='textPrimary'>search by name, meal time, or just hit the random button and see what turns up.</Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchBar ref={searchBarRef} />
      </Grid>
    </MainContent>
  );
}

export default HomeWelcome;