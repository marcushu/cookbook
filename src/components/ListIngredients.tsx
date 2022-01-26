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

const ListIngredients: FunctionComponent<ListIngredientsProps> = ({ listItems, handleClick }) => {
  return (
    <Box sx={{ backgroundColor: 'white', width: '800px', padding: '15px' }}>
      {listItems.map(ingredient =>
        <Box key={ingredient.ingredient}>
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
    </Box>
  );
}

export default ListIngredients;