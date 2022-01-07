import { FunctionComponent } from "react";
import { ShoppinglistIngredient } from "../interfaces/types";
import { Box, IconButton, styled, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface ListIngredientsProps {
  listItems: ShoppinglistIngredient[]
  handleClick: (el: ShoppinglistIngredient) => void
}

const SmallRecipeName = styled(Typography)({
  paddingLeft: '15px',
  fontSize: '10px',
  color: '#BC4282',
  fontStyle: 'italic'
});

const ListIngredients: FunctionComponent<ListIngredientsProps> = ({ listItems, handleClick }) => {
  return (
    <>
      {listItems.map(ingredient =>
        <Box key={ingredient.ingredient}>
          <Box component='span'>
            <Typography color='text.primary' component='span'>{ingredient.ingredient}</Typography>
            {!ingredient.recipe &&
              <IconButton aria-label="delete"
                onClick={() => handleClick(ingredient)}>
                <DeleteIcon color='secondary' />
              </IconButton>}
          </Box>
          <SmallRecipeName>{ingredient.recipe}</SmallRecipeName>
        </Box>)
      }
    </>
  );
}

export default ListIngredients;