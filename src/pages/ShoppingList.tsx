import { FunctionComponent } from "react";
import { addToShoppingList, deleteFromShoppingList, selectShoppingList, selectUserName } from "../redux/userState";
import FavoritesBtn from "../buttons/FavoritesBtn";
import HomeBtn from "../buttons/HomeBtn";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ShoppinglistIngredient } from "../interfaces/types";

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

  const handleDelete = (ingredient: ShoppinglistIngredient) => {
    dispatch(deleteFromShoppingList({ingredient, userName}));
  }

  return (
    <>
      <Header
        leftButton={<HomeBtn />}
        rightButton={<FavoritesBtn />} />

        <form  onSubmit={ e => submitIngredient(e)}>

          Add ingredient: 
          <input type="text" name="newIngredientTXT" id="newIngredientTXT" />
          <button type="submit">submit</button>

        </form>
      
      {listIngredients.map( ingredient => 
        <p key={ingredient.ingredient}>
          {ingredient.ingredient} - {ingredient.recipe} - 
            {!ingredient.recipe && <button onClick={() => handleDelete(ingredient)}>delete</button>} 
        </p> )}
    </>
  );
}

export default ShoppingList;