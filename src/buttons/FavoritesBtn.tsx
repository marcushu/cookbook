import styled from "@emotion/styled";
import { Badge, Button } from "@mui/material";
import { FunctionComponent } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectNumOfFavorites } from "../redux/userState";

const StyledButton = styled(Button)({
  color: 'white',
  paddingTop: '0px'
})

const FavoritesBtn: FunctionComponent = () => {
  const navigate = useNavigate();
  const numberOfRecipes = useAppSelector(selectNumOfFavorites);

  return (
    <StyledButton
      startIcon={
        <Badge badgeContent={numberOfRecipes} color="secondary">
          <FavoriteIcon />
        </Badge>}
      onClick={() => navigate('/favorites')}>
      My favorites
    </StyledButton>
  );
}

export default FavoritesBtn;