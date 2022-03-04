import { FunctionComponent } from "react";
import { addToShoppingList, deleteFromShoppingList, selectShoppingList, selectUserLoading, selectUserName } from "../redux/userState";
import FavoritesBtn from "../buttons/FavoritesBtn";
import HomeBtn from "../buttons/HomeBtn";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ShoppinglistIngredient } from "../interfaces/types";
import ListIngredients from "../components/ListIngredients";
import { Backdrop, Box, CircularProgress, IconButton, styled, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Topper from "../components/Topper";


const BoxMain = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const TopPanel = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  width: '100%',
  maxWidth: '873px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '90px',
  padding: '0px 15px 15px 15px',
  [theme.breakpoints.down('sm')]: {
    padding: '0px'
  }
}));


const IngredientTxtField = styled(TextField)({
  height: '53px',
  justifyContent: 'flex-end',
  fontSize: '44px'
});


const ShoppingList: FunctionComponent = () => {
  const userName = useAppSelector(selectUserName);
  const listIngredients = useAppSelector(selectShoppingList);
  const isLoading = useAppSelector(selectUserLoading);
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
        rightButton={<HomeBtn />} />
      <Topper />
      <TopPanel>
        <Box sx={{ width: '90%' }}>
          <form onSubmit={e => submitIngredient(e)}>
            <Box p={2} display='flex' alignItems='center'>
              <IngredientTxtField
                variant='standard'
                fullWidth={true}
                required={true}
                label='Add an ingredient'
                focused={true}
                name="newIngredientTXT"
                id="newIngredientTXT" />
              <Box ml={1}>
                <IconButton 
                  aria-label="newitem"
                  type='submit' 
                  color='primary'>
                  <AddIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </form>
        </Box>
      </TopPanel>
      <ListIngredients
        handleClick={handleDelete}
        listItems={listIngredients} />
      <Backdrop open={isLoading!}>
        <CircularProgress />
      </Backdrop>

    </BoxMain>
  );
}

export default ShoppingList;