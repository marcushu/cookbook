import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";

interface RecipeCountProps {
  numRecipes: Number
  recipeOrFave: string
}

const UserInfo = styled(Box)(({ theme }) => ({
  backgroundColor: 'gray',
  width: '480px',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const UserInfoText = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '18px',
  padding: '15px 10px 15px 44px',
  fontWeight: '300',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    padding: '15px 10px 15px 10px'
  }
}));

const Count = styled('span')({
  color: '#B3F7FF',
  padding: '0px 5px 0px 5px',
  fontSize: '28px',
  verticalAlign: 'middle'
});


const RecipeCount: FunctionComponent<RecipeCountProps> = ({ numRecipes, recipeOrFave }: RecipeCountProps) => {
  return (
    <UserInfo>
      <UserInfoText>
        You currently have
        <Count>{numRecipes}</Count>
        {recipeOrFave}.
      </UserInfoText>
    </UserInfo>
  );
}

export default RecipeCount;