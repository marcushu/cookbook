import { FunctionComponent } from "react";
import { addToShoppingList, selectShoppingList, selectUserName } from "../redux/userState";
import FavoritesBtn from "../buttons/FavoritesBtn";
import HomeBtn from "../buttons/HomeBtn";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const ShoppingList: FunctionComponent = () => {
  const userName = useAppSelector(selectUserName);
  const listIngredients = useAppSelector(selectShoppingList);
  const dispatch = useAppDispatch();

  const submitIngredient = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(addToShoppingList(
      { userName, 
        ingredient: {recipe: '', ingredient: evt.currentTarget.newIngredientTXT.value}
      }
    ));
  }

  return (
    <>
      <Header
        leftButton={<FavoritesBtn />}
        rightButton={<HomeBtn />} />

        <form  onSubmit={ e => submitIngredient(e)}>

          Add ingredient: 
          <input type="text" name="newIngredientTXT" id="newIngredientTXT" />
          <button type="submit">submit</button>

        </form>
      
      {listIngredients.map( ingredient => 
        <p key={ingredient.ingredient}>
          {ingredient.ingredient} - {ingredient.recipe}
        </p> )}
    </>
  );
}

export default ShoppingList;