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
import foodImage from '../images/foodBoardS.jpg';

const BoxMain = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const TextBox = styled(Box)({
  backgroundImage: `url(${foodImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  maxWidth: '880px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '15px 10px 40px 10px',
  marginBottom: '25px',
  minHeight: '315px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
});

const BigText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
  fontSize: theme.typography.h3.fontSize,
  backgroundColor: 'revert',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: '#ffffffd1'
  }
}));

const HighlightedText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderRadius: '5px',
  fontSize: '16px',
  padding: '5px',
  backgroundColor: '#ffffff7a',
  width: 'max-content',
  alignSelf: 'center',
  marginTop: '30px',
  display: 'revert',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const Favorites: FunctionComponent = () => {
  const recipes = useAppSelector(selectFavorites);
  const numOfFavorites = useAppSelector(selectNumOfFavorites);
  const userName = useAppSelector(selectUserName);
  const isLoading = useAppSelector(selectLoading);

  const greeting = () => (userName.toUpperCase().endsWith('S'))
    ? userName + "' Favorites"
    : userName + "'s Favorites"

  return (
    <BoxMain>
      <Header leftButton={<HomeBtn />} rightButton={<ShoppingListBtn />} />
      <TextBox>
        <BigText>
          {greeting()}
        </BigText>
        <Typography color='textPrimary' textAlign='center' pb={1}
          sx={{ backgroundColor: ['#ffffffd1', 'revert']}}>
          You currently have {numOfFavorites} favorites.
        </Typography>
        <HighlightedText>
          Ingredients for these recipes are in your shopping list. 
          <span style={{ fontSize: '20px' }}>
            &#128070;
          </span>
        </HighlightedText>
      </TextBox>
      <RecipeList recipes={recipes} />
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </BoxMain>
  );
}

export default Favorites;