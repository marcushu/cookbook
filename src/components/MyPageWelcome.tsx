import { Box, Divider, Grid, Typography } from '@mui/material';
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
  padding: '25px 25px 2px 25px'
})

const Titles = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  fontSize: theme.typography.h4.fontSize,
  display: 'contents'
}));

const TitleLine = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})


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
      <ImagePanel item xs={12} md={4} order={{ xs: 2, md: 1 }}>
        <SearchButton searchFunction={callSearch} />
      </ImagePanel>
      <MainPanel
        item xs={12}
        md={8}
        sx={{ backgroundColor: '#3fa8b538' }}
        order={{ xs: 1, md: 2 }} >
        <Box>
          <TitleLine>
            <Titles>
              Hello {userName}
            </Titles>
            <SearchSwitch />
          </TitleLine>
          <Divider />
          <Box>
            <Typography variant='h6' py={1} color='textPrimary'>
              You have {recipeCount} recipes in your cookbook.
            </Typography>
          </Box>
        </Box>
        <Box>
          <CreateRecipeBtn />
        </Box>
      </MainPanel>
      <Grid item xs={12} order={{ xs: 3, md: 3 }}>
        <SearchBar ref={searchBarRef} />
      </Grid>
    </MainContent>
  );
}

export default MyPageWelcome;