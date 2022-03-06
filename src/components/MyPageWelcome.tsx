import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent } from "react";
import CreateRecipeBtn from '../buttons/CreateRecipeBtn';
import SearchSwitch from '../buttons/SearchSwitch';
import splashImage from '../images/curveWimage.png';
import splashImgSm from '../images/phoneBG.png';
import RecipeCount from './RecipeCount';
import SearchBarComplete from './SearchBarComplete';

interface MyPageWelcomProps {
  userName: String
  recipeCount: Number
}

const MainContent = styled(Box)({
  minHeight: '375px',
  maxWidth: '902px',
  width: '100%',
  marginBottom: '25px'
});

const ImagePanel = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${splashImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '315px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    backgroundImage: `url(${splashImgSm})`,
    backgroundSize: 'cover',
    backgroundPositionY: 'bottom',
    minHeight: '600px',
  }
}));

const Username = styled(Box)({
  textAlign: 'end',
  color: '#B2F7FF',
  fontFamily: "'Playfair Display', serif",
  fontStyle: 'italic',
  fontWeight: '600',
  fontSize: '48px',
  marginRight: '45px',
  position: 'relative',
  top: '-20px'
});

const Titles = styled(Box)({
  fontFamily: '"Roboto", sand-serif',
  color: 'white',
  fontWeight: '100',
  fontSize: '64px',
  textAlign: 'end',
  margin: '40px 45px 0px 0px'
});

const CountInfo = styled(Box)(({ theme }) => ({
  alignSelf: 'end',
  width: 'unset',
  marginTop: '24px',
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center',
    width: '100%'
  }
}));


const MyPageWelcome: FunctionComponent<MyPageWelcomProps> = ({ userName, recipeCount }) => {
  return (
    <MainContent>
      <ImagePanel>
        <Titles>
          Hello
        </Titles>
        <Username>
          {userName}
        </Username>
        <CountInfo>
          <RecipeCount 
            numRecipes={recipeCount} 
            recipeOrFave={"recipes"} />
        </CountInfo>
        <Box py={4} display='flex' justifyContent='flex-end'>
          <CreateRecipeBtn />
        </Box>
      </ImagePanel>
      <Box>
        <SearchBarComplete />
      </Box>
      <Box p={2}>
        <SearchSwitch />
      </Box>
    </MainContent>
  );
}

export default MyPageWelcome;