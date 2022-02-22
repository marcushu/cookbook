import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from "@mui/material";
import { FunctionComponent, useRef } from "react";
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/lukas-blazek-f-TWhXOrLiU-unsplashS.jpg'
import SearchButton from '../buttons/SearchButton';

const MainContent = styled(Grid)({
  minHeight: '375px',
  maxWidth: '902px',
  marginBottom: '25px',
  backgroundColor: '#3fa8b538',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
});

const TextContent = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  padding: '50px 30px'
})

const TextBox = styled(Box)({
  maxWidth: '500px'
});

const Titles = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  fontSize: theme.typography.h3.fontSize,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  }
}));

const BodyText = styled(Typography)(({theme}) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.h5.fontSize,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.body1.fontSize,
  }
}));

const TitleButton = styled(Titles)({
  textDecoration: 'underline',
  transition: 'transform 0.5s',
  ":hover": {
    cursor: 'pointer',
    transform: 'scale(1.04)'
  }
});


const HomeWelcome: FunctionComponent = () => {
  const searchBarRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const callSearch = () => {
    if (searchBarRef?.current)
      searchBarRef.current.click();
  }

  return (
    <MainContent container>
      <TextContent item xs={12}>
        <TextBox>
          <Titles>
            Just recipes
          </Titles>
          <BodyText>Cooking sites are great, but they can be wordy.  No stories, or long
            descriptions here, just the ingredients, and what to do with them.
          </BodyText>
        </TextBox>
        <TextBox>
          <TitleButton
            onClick={() => navigate('/signin')}>Log in
          </TitleButton>
          <BodyText>
            Log in to add your own recipes, collect favorites, and create shopping lists.
          </BodyText>
        </TextBox>
        <SearchButton searchFunction={callSearch} />
      </TextContent>
      <Grid item xs={12}>
        <SearchBar ref={searchBarRef} />
      </Grid>
    </MainContent>
  );
}

export default HomeWelcome;