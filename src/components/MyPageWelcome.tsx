import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useRef } from "react";
import { useAppSelector } from '../app/hooks';
import SearchButton from '../buttons/SearchButton';
import SearchSwitch from '../buttons/SearchSwitch';
import SearchBar from './SearchBar';
//import splashImage from '../images/marvin-binnig-0zqT55YuPn8-unsplash.jpg';
import splashImage from '../images/foodBoard.png';
import { selectNumOfRecipes, selectUserName } from '../redux/userState';
import { selectOwner, setOwner } from '../redux/searchResultState';
import { useDispatch } from 'react-redux';
import CreateRecipeBtn from '../buttons/CreateRecipeBtn';

const MainContent = styled(Grid)({
  minHeight: '375px',
  maxWidth: '902px',
  marginBottom: '25px',
  backgroundColor: 'white',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
});

const ImagePanel = styled(Grid)({
  display: 'flex',
  backgroundImage: `url(${splashImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '315px'
});

const Titles = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  fontSize: theme.typography.h3.fontSize,
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
      <ImagePanel item xs={12} sx={{display: 'flex', flexDirection: 'column', padding: '20px'}}> 
        <Box>
          <TitleLine>
            <Titles>
              Hello {userName}
            </Titles> {recipeCount}
            <SearchSwitch />
          </TitleLine>
        </Box>
        <CreateRecipeBtn />
        <SearchButton searchFunction={callSearch} />
      </ImagePanel>
      <Grid item xs={12}>
        <SearchBar ref={searchBarRef} />
      </Grid>
    </MainContent>
  );
}

export default MyPageWelcome;