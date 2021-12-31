import { Box, Chip } from "@mui/material";
import { FunctionComponent } from "react";
import { Recipe } from "../interfaces/types";

interface RestrictionTagsProps {
  recipe: Recipe
}

const RestrictionTags: FunctionComponent<RestrictionTagsProps> = ({ recipe }) => {
  const { glutenFree, vegan, vegetarian } = recipe;

  return (
    <Box component='div' py={1}>
      {glutenFree &&
        <Chip sx={{ marginRight: '4px' }} label='GF' size='small' color='secondary' />}
      {vegan &&
        <Chip sx={{ marginRight: '4px' }} label='vegan' size='small' color='secondary' />}
      {vegetarian &&
        <Chip label='vegetarian' size='small' color='secondary' />}
    </Box>
  );
}

export default RestrictionTags;