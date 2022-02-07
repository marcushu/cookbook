import { Backdrop, CircularProgress, styled, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useAppSelector } from "../app/hooks";
import HomeBtn from "../buttons/HomeBtn";
import ShoppingListBtn from "../buttons/ShoppingListBtn";
import Header from "../components/Header";
import RecipeList from "../components/RecipeList";
import { selectFavorites, selectNumOfFavorites, selectUserName } from "../redux/userState";
import { Box } from "@mui/material/node_modules/@mui/system";
import { selectLoading } from "../redux/searchResultState";
import foodImage from '../images/foodAtTop.png';


const TextBox = styled(Box)({
  backgroundImage: `url(${foodImage})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '15px 10px 40px 10px',
  marginBottom: '25px',
  height: '256px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
});

const BigText = styled(Typography)(({ theme }) => ({
  backgroundColor: '#ffffff73',
  color: theme.palette.text.primary,
  padding: '11px',
  width: 'fit-content'
}));

const Counter = styled('span')({
  fontSize: '20px',
  verticalAlign: 'top'
});

const Subtitle = styled(Typography)({
  paddingLeft: '10px',
  fontStyle: 'italic',
  color: '#383838'
});

const Favorites: FunctionComponent = () => {
  const recipes = useAppSelector(selectFavorites);
  const numOfFavorites = useAppSelector(selectNumOfFavorites);
  const userName = useAppSelector(selectUserName);
  const isLoading = useAppSelector(selectLoading);

  const greeting = () => (userName.endsWith('s') || userName.endsWith('S'))
    ? userName + "'"
    : userName + "'s"

  return (
    <>
      <Header leftButton={<HomeBtn />} rightButton={<ShoppingListBtn />} />
      <TextBox>
        <BigText variant='h3'>{greeting()}
          Favorites
          <Counter>{numOfFavorites}</Counter>
        </BigText>
        <Subtitle variant='subtitle1'>
          Ingredients for these recipes are in your shopping list
        </Subtitle>
      </TextBox>
      <RecipeList recipes={recipes} />
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}

export default Favorites;