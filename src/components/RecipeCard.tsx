import { FunctionComponent, useState } from "react";
import { addFavorite, selectUserName } from "../redux/userState";
import { Recipe } from "../interfaces/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Box, Button, Grid, IconButton, Paper, styled, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from "@mui/material/colors";
import FullRecipe from "./FullRecipe";
import RestrictionTags from "./RestrictionTags";
import MealtimeTags from "./MealtimeTags";

interface RecipeCardProps {
  recipe: Recipe
}

const RecipePaper = styled(Paper)({
  margin: '8px auto 8px auto',
  width: '900px'
});

const RecipeFooter = styled('div')({
  borderTop: 'solid',
  borderColor: grey[400],
  borderWidth: '1px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '15px'
});

const ImageGridItem = styled(Grid)({
  width: '300px',
  height: '300px',
  overflow: 'hidden',
  textAlign: 'center'
});

const TextGridItem = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
})

const RecipeCard: FunctionComponent<RecipeCardProps> = ({ recipe }) => {
  const { name, imageUrl, owner, description } = recipe;
  const userName = useAppSelector(selectUserName);
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const dispatch = useAppDispatch();
  
  const addToFavorites = () => {
    dispatch(addFavorite({recipe, userName}));
  }

  return (
    <RecipePaper variant='outlined'>
      <Grid container>
        <ImageGridItem item xs={12} sm={4} >
          <img style={{ maxWidth: '100%' }} src={imageUrl} alt="food" />
        </ImageGridItem>
        <TextGridItem item xs={12} sm={8}>
          <Box component='div' pl={2}>
            <Typography pt={2} display='flex' justifyContent='space-between' variant='h4'>
              {name}
              {userName &&
                <Tooltip title='Add to favorites'>
                  <IconButton onClick={addToFavorites}>
                    <FavoriteIcon color='primary' />
                  </IconButton>
                </Tooltip>}
            </Typography>
            <Typography variant='subtitle2'>{owner}</Typography>
            <Typography pt={2}>{description}</Typography>
            <MealtimeTags recipe={recipe} />
          </Box>
          <RecipeFooter>
            <RestrictionTags recipe={recipe} />
            <Box component='div'>
              {!showFullRecipe &&
                <Button
                  onClick={() => setShowFullRecipe(!showFullRecipe)}
                  startIcon={<ExpandMoreIcon fontSize='large' />} >
                  more
                </Button>}
            </Box>
          </RecipeFooter>
        </TextGridItem>
        {showFullRecipe &&
          <FullRecipe
            hideMe={() => setShowFullRecipe(!showFullRecipe)}
            recipe={recipe} />}
      </Grid>
    </RecipePaper >
  );
}

export default RecipeCard;