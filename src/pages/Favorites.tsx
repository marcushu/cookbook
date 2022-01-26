import { Divider, Grid, styled, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppSelector } from "../app/hooks";
import HomeBtn from "../buttons/HomeBtn";
import ShoppingListBtn from "../buttons/ShoppingListBtn";
import Header from "../components/Header";
import RecipeList from "../components/RecipeList";
import { selectFavorites, selectNumOfFavorites, selectUserName } from "../redux/userState";
import splashImage from '../images/marvin-binnig-0zqT55YuPn8-unsplash.jpg';
import { Box } from "@mui/material/node_modules/@mui/system";

const ImagePanel = styled(Grid)({
  display: 'flex',
  backgroundImage: `url(${splashImage})`,
  opacity: '77%',
  minHeight: '70px'
});

const TextBox = styled(Box)({
  backgroundColor: 'white',
  padding: '15px 10px 40px 10px'
});

const Favorites: FunctionComponent = () => {
  const recipes = useAppSelector(selectFavorites);
  const numOfFavorites = useAppSelector(selectNumOfFavorites);
  const userName = useAppSelector(selectUserName);

  const greeting = () => (userName.endsWith('s') || userName.endsWith('S')) 
    ? userName + "'"
    : userName + "'s"

  return (
    <>
      <Header leftButton={<HomeBtn />} rightButton={<ShoppingListBtn />} />
      <ImagePanel />
      <TextBox sx={{backgroundColor: 'white', padding: ''}}>
        <Typography color='textPrimary' variant='h4'>{greeting()} Favorites</Typography>
        <Divider />
        <br />
        <Typography color='textPrimary' variant='h6'>
          You currently have {numOfFavorites} recipes in you favorites.
        </Typography>
        <Typography color='textPrimary' variant='subtitle1' sx={{paddingLeft: '10px', fontStyle: 'italic' }}>
          Ingredients for these recipes are in your shopping list
        </Typography>
      </TextBox>

      <RecipeList recipes={recipes} />
    </>
  );
}

export default Favorites;