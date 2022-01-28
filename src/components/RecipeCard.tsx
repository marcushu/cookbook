import { FunctionComponent, useEffect, useState } from "react";
import { addFavorite, deleteFavorite, selectFavorites, selectUserName } from "../redux/userState";
import { Recipe } from "../interfaces/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Box, Button, Collapse, Grid, IconButton, Paper, styled, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from "@mui/material/colors";
import FullRecipe from "./FullRecipe";
import RestrictionTags from "./RestrictionTags";
import MealtimeTags from "./MealtimeTags";

interface RecipeCardProps {
  recipe: Recipe
}

const RecipePaper = styled(Paper)(({ theme }) => ({
  margin: '8px auto 8px auto',
  width: '300px',
  [theme.breakpoints.up('sm')]: {
    width: '900px'
  }
}));

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
});

const RecipeName = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '16px',
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'space-between'
  }
}));

const TextBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
  }
}));


const RecipeCard: FunctionComponent<RecipeCardProps> = ({ recipe }) => {
  const { name, imageUrl, owner, description } = recipe;
  const userName = useAppSelector(selectUserName);
  const favorites = useAppSelector(selectFavorites);
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userName) {
      const isFound = favorites.find(faveRecipe =>
        (faveRecipe.name === name && faveRecipe.owner === owner && faveRecipe.description === description));

      setIsFavorite(!!isFound);
    }
  }, [description, favorites, name, owner, recipe, userName]);

  const addToFavorites = () => {
    dispatch(addFavorite({ recipe, userName }));
  }

  const deleteFromFavorites = () => {
    dispatch(deleteFavorite({ recipe, userName }))
  }

  const buttons = () => {
    if (userName) return isFavorite
      ? (<Tooltip title='Remove from favorites' >
        <IconButton onClick={deleteFromFavorites}>
          <FavoriteIcon color='secondary' />
        </IconButton>
      </Tooltip>
      )
      : (<Tooltip title='Add to favorites' >
        <IconButton onClick={addToFavorites}>
          <FavoriteIcon color='primary' />
        </IconButton>
      </Tooltip>
      );
  }

  return (
    <RecipePaper variant='outlined'>
      <Grid container>
        <ImageGridItem item xs={12} sm={4} >
          <img style={{ maxWidth: '100%' }} src={imageUrl} alt="food" />
        </ImageGridItem>
        <TextGridItem item xs={12} sm={8}>
          <Box pl={2}>
            <RecipeName variant="h4">
              {name}
              {buttons()}
            </RecipeName>
            <TextBox>
              <Typography variant='subtitle2'>{owner}</Typography>
              <Typography pt={2}>{description}</Typography>
              <MealtimeTags recipe={recipe} />
            </TextBox>
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
        <Collapse in={showFullRecipe}>
          <FullRecipe
            hideMe={() => setShowFullRecipe(!showFullRecipe)}
            recipe={recipe} />
        </Collapse>
      </Grid>
    </RecipePaper >
  );
}

export default RecipeCard;