import { Backdrop, CircularProgress, styled, Typography, Box } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppSelector } from "../app/hooks";
import HomeBtn from "../buttons/HomeBtn";
import ShoppingListBtn from "../buttons/ShoppingListBtn";
import Header from "../components/Header";
import RecipeList from "../components/RecipeList";
import { selectFavorites, selectNumOfFavorites, selectUserName } from "../redux/userState";
import { selectLoading } from "../redux/searchResultState";
import splashImage from '../images/curveWimage.png';
import splashImgSm from '../images/phoneBG.png';
import RecipeCount from "../components/RecipeCount";

const BoxMain = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const ImagePanel = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${splashImage})`,
  backgroundSize: 'cover',
  maxWidth: '902px',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '315px',
  marginBottom: '20px',
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
  margin: '30px 45px 0px 0px',
});

const Titles = styled(Typography)({
  fontFamily: '"Roboto", sand-serif',
  color: 'white',
  fontWeight: '100',
  fontSize: '64px',
  textAlign: 'end',
  marginRight: '45px',
  position: 'relative',
  top: '-20px'
});

const HighlightedText = styled(Typography)(({ theme }) => ({
  color: '#CDCBCB',
  fontStyle: 'italic',
  fontSize: '16px',
  alignSelf: 'end',
  padding: '15px 20px 55px 5px',
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center',
    padding: '25px 20px 55px 25px',
    textAlign: 'center',
  }
}));

const CountInfo = styled(Box)(({ theme }) => ({
  alignSelf: 'end',
  width: 'unset',
  marginTop: '24px',
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center',
    width: '100%'
  }
}));

const Favorites: FunctionComponent = () => {
  const recipes = useAppSelector(selectFavorites);
  const numOfFavorites = useAppSelector(selectNumOfFavorites);
  const userName = useAppSelector(selectUserName);
  const isLoading = useAppSelector(selectLoading);

  const greeting = () => (userName.toUpperCase().endsWith('S'))
    ? userName + "' "
    : userName + "'s "

  return (
    <BoxMain>
      <Header leftButton={<HomeBtn />} rightButton={<ShoppingListBtn />} />
      <ImagePanel>
        <Username>
          {greeting()}
        </Username>
        <Titles>
          Favorites
        </Titles>
        <CountInfo>
          <RecipeCount 
            numRecipes={numOfFavorites} 
            recipeOrFave={"favorites"} />
        </CountInfo>
        <HighlightedText>
          Ingredients for these recipes are in your shopping list.
        </HighlightedText>
      </ImagePanel>
      <RecipeList recipes={recipes} />
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </BoxMain>
  );
}

export default Favorites;