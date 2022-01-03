import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)({
  color: 'white',
  paddingTop: '0px'
})

const FavoritesBtn: FunctionComponent = () => {
  const navigate = useNavigate();
  
  return (
    <StyledButton 
      startIcon={<FavoriteIcon />}
      onClick={() => navigate('/favorites')}>
      My favorites
    </StyledButton>
  );
}

export default FavoritesBtn;