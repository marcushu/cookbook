import { Box, Chip } from "@mui/material";
import { FunctionComponent } from "react";
import { Recipe } from "../interfaces/types";
import CheckIcon from '@mui/icons-material/Check';

interface MealtimeTagsProps {
  recipe: Recipe
}

const MealtimeTags: FunctionComponent<MealtimeTagsProps> = ({ recipe }) => {
  const { breakfast, lunch, dinner } = recipe;

  return (
    <Box component='div' py={2}>
      {breakfast &&
        <Chip label='Breakfast' sx={{ marginRight: '5px' }} icon={<CheckIcon />} />}
      {lunch &&
        <Chip label='Lunch' sx={{ marginRight: '5px' }} icon={< CheckIcon />} />}
      {dinner &&
        <Chip label='Dinner' sx={{ marginRight: '5px' }} icon={< CheckIcon />} />}
    </Box>
  );
}

export default MealtimeTags;