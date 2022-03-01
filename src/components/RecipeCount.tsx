import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";
import rectangle from '../images/greyRectangle.png';

interface RecipeCountProps {
  numRecipes: Number
}

const UserInfo = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${rectangle})`,
  backgroundRepeat: 'no-repeat',
  width: '480px',
  height: '116px',
  [theme.breakpoints.down('sm')]: {
    width: 'unset',
  }
}));

const UserInfoText = styled(Typography)(({ theme }) => ({
  color: 'white',
  textAlign: 'center',
  fontSize: '20px',
  padding: '63px 166px 0px 0px',
  fontWeight: '300',
  [theme.breakpoints.down('sm')]: {
    padding: '63px 75px 0px 0px',
  }
}));

const RecipeCount: FunctionComponent<RecipeCountProps> = ({ numRecipes }: RecipeCountProps) => {
  return (
    <UserInfo>
      <UserInfoText>
        You currently have {numRecipes} recipes.
      </UserInfoText>
    </UserInfo>
  );
}

export default RecipeCount;