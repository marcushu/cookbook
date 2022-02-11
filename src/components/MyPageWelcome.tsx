import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent } from "react";
import { useAppSelector } from '../app/hooks';
import SearchSwitch from '../buttons/SearchSwitch';
import splashImage from '../images/foodBoard.png';
import { selectNumOfRecipes, selectUserName } from '../redux/userState';
import CreateRecipeBtn from '../buttons/CreateRecipeBtn';
import SearchBarComplete from './SearchBarComplete';

const MainContent = styled(Box)({
  minHeight: '375px',
  maxWidth: '902px',
  width: '100%',
  marginBottom: '25px',
  backgroundColor: 'white',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
});

const ImagePanel = styled(Box)({
  backgroundImage: `url(${splashImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'flex', 
  flexDirection: 'column', 
  minHeight: '315px',
  width: '100%'
});

const Titles = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
  fontSize: theme.typography.h3.fontSize,
}));


const MyPageWelcome: FunctionComponent = () => {
  const userName = useAppSelector(selectUserName);
  const recipeCount = useAppSelector(selectNumOfRecipes);

  return (
    <MainContent>
      <ImagePanel>
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
      </ImagePanel>
      <Box>
        <SearchBarComplete />
      </Box>
    </MainContent>
  );
}

export default MyPageWelcome;