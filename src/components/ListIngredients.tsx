import { FunctionComponent } from "react";
import { ShoppinglistIngredient } from "../interfaces/types";
import { Box, IconButton, styled, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

interface ListIngredientsProps {
  listItems: ShoppinglistIngredient[]
  handleClick: (el: ShoppinglistIngredient) => void
}

const SmallRecipeName = styled(Typography)({
  paddingLeft: '15px',
  paddingBottom: '5px',
  fontSize: '14px',
  color: '#BC4282',
  fontStyle: 'italic'
});

const RecipeBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '902px'
  }
}));

const ListIngredients: FunctionComponent<ListIngredientsProps> = ({ listItems, handleClick }) => {
  return (
    <RecipeBox>
      {listItems.map(ingredient =>
        <Box px={2} key={ingredient.ingredient}>
          <Box component='span'>
            {!ingredient.recipe &&
              <IconButton aria-label="delete"
                onClick={() => handleClick(ingredient)}>
                <CheckIcon color='success' />
              </IconButton>}
            <Typography color='text.primary' component='span' variant="h6">{ingredient.ingredient}</Typography>
          </Box>
          <SmallRecipeName>{ingredient.recipe}</SmallRecipeName>
        </Box>)
      }
    </RecipeBox>
  );
}

export default ListIngredients;