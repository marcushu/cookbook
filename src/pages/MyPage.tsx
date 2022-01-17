import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hooks";
import FavoritesBtn from "../buttons/FavoritesBtn";
import ShoppingListBtn from "../buttons/ShoppingListBtn";
import Header from "../components/Header";
import LoginErrorModal from "../components/LoginErrorModal";
import MyPageWelcome from "../components/MyPageWelcome";
import RecipeList from "../components/RecipeList";
import { Recipe } from "../interfaces/types";
import { selectOwner, selectSearchResults } from "../redux/searchResultState";
import { selectRecipes, selectUserName } from "../redux/userState";


const MyPage: FunctionComponent = () => {
  const userName = useAppSelector(selectUserName);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const myRecipes = useAppSelector(selectRecipes);
  const [showModal, setShowModal] = useState(false);
  const searchRecipeResults = useAppSelector(selectSearchResults);
  // this component will either show this users recipes, or search recipes based on the following variable
  const recipeOwner = useAppSelector(selectOwner);
  

  useEffect(() => {
    if (!userName) setShowModal(true);

    if(recipeOwner.length) {
      setRecipes(myRecipes);
    } else {
      setRecipes(searchRecipeResults);
    }
  }, [myRecipes, recipeOwner, searchRecipeResults, userName]);


  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/signin');
  }


  return (
    <>
      <Header 
        leftButton={<FavoritesBtn />}
        rightButton={<ShoppingListBtn />} />
      <MyPageWelcome />
      <RecipeList recipes={recipes} />
      <LoginErrorModal hideMe={handleCloseModal} showMe={showModal} />
    </>
  );
}

export default MyPage;