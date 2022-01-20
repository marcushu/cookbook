import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useRef } from "react";
import { useAppSelector } from '../app/hooks';
import SearchButton from '../buttons/SearchButton';
import SearchSwitch from '../buttons/SearchSwitch';
import SearchBar from './SearchBar';
import splashImage from '../images/marvin-binnig-0zqT55YuPn8-unsplash.jpg';
import { selectNumOfRecipes, selectUserName } from '../redux/userState';
import { selectOwner, setOwner } from '../redux/searchResultState';
import { useDispatch } from 'react-redux';
import CreateRecipeBtn from '../buttons/CreateRecipeBtn';

const MainContent = styled(Grid)({
  minHeight: '375px',
  maxWidth: '902px',
  marginBottom: '25px',
  backgroundColor: 'white',
});

const ImagePanel = styled(Grid)({
  display: 'flex',
  backgroundImage: `url(${splashImage})`,
  opacity: '77%',
  minHeight: '315px'
});

const MainPanel = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '25px 25px 2px 25px'
})

const Titles = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  fontSize: theme.typography.h4.fontSize,
  display: 'contents'
}));

const Recipecounter = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontStyle: 'italic',
  fontSize: '20px',
  padding: '5px',
  verticalAlign: 'super'
}));

const MyPageWelcome: FunctionComponent = () => {
  const searchBarRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const userName = useAppSelector(selectUserName);
  const owner = useAppSelector(selectOwner);
  const recipeCount = useAppSelector(selectNumOfRecipes);

  const callSearch = () => {
    if (owner.length)
      // clear out the 'owner' of this search to search all recipes
      dispatch(setOwner(""));

    if (searchBarRef && searchBarRef.current)
      searchBarRef.current.click();
  }

  return (
    <MainContent container>
      <ImagePanel item xs={12} md={4}>
        <SearchButton searchFunction={callSearch} />
      </ImagePanel>
      <MainPanel item xs={12} md={8}>
        <Box>
          <Box>
            <Titles>
              Hello {userName}
            </Titles>
            <Box component='span'>
              <Recipecounter>
                {recipeCount}
              </Recipecounter>
            </Box>
            <Typography color='textPrimary' variant='subtitle2'>
              Ingredients for recipes added to your favorites will be added to your shopping list
            </Typography>
          </Box>
        </Box>
        <Box>
          <CreateRecipeBtn />
        </Box>
        <SearchSwitch />
      </MainPanel>
      <Grid item xs={12}>
        <SearchBar ref={searchBarRef} />
      </Grid>
    </MainContent>
  );
}

export default MyPageWelcome;