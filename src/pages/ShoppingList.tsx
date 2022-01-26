import { FunctionComponent } from "react";
import { addToShoppingList, deleteFromShoppingList, selectShoppingList, selectUserName } from "../redux/userState";
import FavoritesBtn from "../buttons/FavoritesBtn";
import HomeBtn from "../buttons/HomeBtn";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ShoppinglistIngredient } from "../interfaces/types";
import ListIngredients from "../components/ListIngredients";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TitleImaage from "../components/TitleImage";

const ShoppingList: FunctionComponent = () => {
  const userName = useAppSelector(selectUserName);
  const listIngredients = useAppSelector(selectShoppingList);
  const dispatch = useAppDispatch();

  const submitIngredient = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(addToShoppingList(
      {
        userName,
        ingredient: { recipe: '', ingredient: evt.currentTarget.newIngredientTXT.value }
      }
    ));

    evt.currentTarget.newIngredientTXT.value = "";
  }

  const handleDelete = (ingredient: ShoppinglistIngredient) => {
    dispatch(deleteFromShoppingList({ ingredient, userName }));
  }

  return (
    <>
      <Header
        leftButton={<FavoritesBtn />}
        rightButton={<HomeBtn />} />
      <TitleImaage />
      <Box sx={{backgroundColor: 'white'}}>
        <form onSubmit={e => submitIngredient(e)}>
          <Box display='flex' p={2}>
            <TextField
              sx={{color: 'white'}}
              variant='standard'
              required={true}
              placeholder="2 tbs. new ingredient"
              label="New ingredient"
              name="newIngredientTXT"
              id="newIngredientTXT"
              fullWidth={true} />
            <IconButton aria-label="newitem"
              type='submit'>
              <AddIcon fontSize="large" color="primary" />
            </IconButton>
          </Box>
        </form>
      </Box>
      <ListIngredients
        handleClick={handleDelete}
        listItems={listIngredients} />
    </>
  );
}

export default ShoppingList;