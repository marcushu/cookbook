import { Box, Button, Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Recipe } from "../interfaces/types";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface FullRecipeProps {
  hideMe: () => void
  recipe: Recipe
}

const FullRecipe: FunctionComponent<FullRecipeProps> = ({ hideMe, recipe }) => {
  const { ingredients, instructions } = recipe;

  return (
    <Grid container py={2}>
      <Grid item xs={12} sm={4} pl={2} pb={2}>
        {ingredients.map(ingredient => 
          <Typography variant='body2' component='div' key={ingredient + recipe.name}>
            <li>
              {ingredient}
            </li>
          </Typography>)}
      </Grid>
      <Grid item xs={12} sm={8} display='flex' flexDirection='column' justifyContent='space-between'>
        <Box pl={3} pr={3}>
          {instructions.split('\n').map((sentence, index) => <Typography sx={{fontStyle: 'italic'}} key={index}>
            ~  {sentence} <br /> <br />
          </Typography>)}
        </Box>
        <Box alignSelf='end'>
          <Button onClick={hideMe} startIcon={<ExpandLessIcon fontSize='large' />} >
            less
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default FullRecipe;