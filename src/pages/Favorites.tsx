import { FunctionComponent } from "react";
import { useAppSelector } from "../app/hooks";
import HomeBtn from "../buttons/HomeBtn";
import ShoppingListBtn from "../buttons/ShoppingListBtn";
import Header from "../components/Header";
import RecipeList from "../components/RecipeList";
import { selectFavorites } from "../redux/userState";


const Favorites: FunctionComponent = () => {
  const recipes = useAppSelector(selectFavorites);

  return (
    <>
      <Header leftButton={<HomeBtn />} rightButton={<ShoppingListBtn />} />
      <h2>My favorites</h2>
      <RecipeList recipes={recipes} />
    </>
  );
}

export default Favorites;