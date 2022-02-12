import { Backdrop, Box, Button, CircularProgress, styled } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hooks";
import FavoritesBtn from "../buttons/FavoritesBtn";
import ShoppingListBtn from "../buttons/ShoppingListBtn";
import Header from "../components/Header";
import LoginErrorModal from "../components/LoginErrorModal";
import MyPageWelcome from "../components/MyPageWelcome";
import RecipeList from "../components/RecipeList";
import ReplayIcon from '@mui/icons-material/Replay';
import { Recipe } from "../interfaces/types";
import { search, selectLoading, selectOwner, selectSearchResults } from "../redux/searchResultState";
import { selectRecipes, selectUserName } from "../redux/userState";
import { useDispatch } from "react-redux";

const BoxMain = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const MyPage: FunctionComponent = () => {
  const userName = useAppSelector(selectUserName);
  const isLoading = useAppSelector(selectLoading);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const myRecipes = useAppSelector(selectRecipes);
  const [showModal, setShowModal] = useState(false);
  const searchRecipeResults = useAppSelector(selectSearchResults);
  // this component will either show this users recipes, or search recipes based on the following variable
  const recipeOwner = useAppSelector(selectOwner);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!userName) setShowModal(true);

    if (recipeOwner.length) {
      setRecipes(myRecipes);
    } else {
      setRecipes(searchRecipeResults);
    }
  }, [myRecipes, recipeOwner, searchRecipeResults, userName]);


  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/signin');
  }

  const searchAgain = () => {
    dispatch(search());

    window.scrollTo({ top: 500, behavior: 'smooth' })
  }


  return (
    <BoxMain>
      <Header
        leftButton={<FavoritesBtn />}
        rightButton={<ShoppingListBtn />} />
      <MyPageWelcome recipeCount={myRecipes.length} userName={userName} />
      <RecipeList recipes={recipes} />
      <Box sx={{ textAlign: 'center' }}>
        <Button onClick={searchAgain}>
          <ReplayIcon fontSize="large" />
        </Button>
      </Box>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
      <LoginErrorModal hideMe={handleCloseModal} showMe={showModal} />
    </BoxMain>
  );
}

export default MyPage;