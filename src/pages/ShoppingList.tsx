import { FunctionComponent } from "react";
import { addToShoppingList, deleteFromShoppingList, selectShoppingList, selectUserName } from "../redux/userState";
import FavoritesBtn from "../buttons/FavoritesBtn";
import HomeBtn from "../buttons/HomeBtn";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ShoppinglistIngredient } from "../interfaces/types";
import ListIngredients from "../components/ListIngredients";
import { Box, IconButton, styled, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import foodImage from '../images/foodAtTop.png';


const BoxMain = styled(Box)({
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center'
});

const Topper = styled(Box)({
  backgroundImage: `url(${foodImage})`,
  width: '100%',
  maxWidth: '873px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '256px',
  padding: '15px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

const FormElements = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '16px'
});


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
    <BoxMain>
      <Header
        leftButton={<FavoritesBtn />}
        rightButton={<HomeBtn />}
      />
      <Topper>
        <Box sx={{ width: '90%' }}>
          <form onSubmit={e => submitIngredient(e)}>
            <FormElements>
              <TextField
                sx={{ backgroundColor: '#ffffff99', height: '53px', justifyContent: 'flex-end', fontSize: '44px' }}
                variant='standard'
                fullWidth={true}
                required={true}
                label='Add an ingredient'
                focused={true}
                name="newIngredientTXT"
                id="newIngredientTXT" />
              <Box sx={{ backgroundColor: '#ffffff99', marginLeft: '8px' }}>
                <IconButton aria-label="newitem"
                  type='submit' color='primary'>
                  <AddIcon fontSize="large" />
                </IconButton>
              </Box>
            </FormElements>
          </form>
        </Box>
      </Topper>
      <ListIngredients
        handleClick={handleDelete}
        listItems={listIngredients} />
    </BoxMain>
  );
}

export default ShoppingList;