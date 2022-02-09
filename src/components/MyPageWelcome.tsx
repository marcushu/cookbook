import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useRef } from "react";
import { useAppSelector } from '../app/hooks';
import SearchSwitch from '../buttons/SearchSwitch';
import SearchBar from './SearchBar';
import splashImage from '../images/foodBoard.png';
import { selectNumOfRecipes, selectUserName } from '../redux/userState';
import { selectOwner, setOwner } from '../redux/searchResultState';
import { useDispatch } from 'react-redux';
import CreateRecipeBtn from '../buttons/CreateRecipeBtn';
import SearchButtonSmall from '../buttons/SearchButtonSmall';

const MainContent = styled(Box)({
  minHeight: '375px',
  maxWidth: '902px',
  marginBottom: '25px',
  backgroundColor: 'white',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
});

const ImagePanel = styled(Box)({
  backgroundImage: `url(${splashImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '315px'
});

const Titles = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
  fontSize: theme.typography.h3.fontSize,
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
    <MainContent>
      <ImagePanel sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <Box display='flex' justifyContent='flex-end'>
          <SearchSwitch />
        </Box>
        <Titles>
          Hello {userName}
        </Titles>
        <Typography color='textPrimary' textAlign='center' pb={4}>
          You currently have {recipeCount} recipes.
        </Typography>
        <CreateRecipeBtn />
        <Box alignSelf='start'>
          <SearchButtonSmall searchFunction={callSearch} />
        </Box>
      </ImagePanel>
      <Box>
        <SearchBar ref={searchBarRef} />
      </Box>
    </MainContent>
  );
}

export default MyPageWelcome;