import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledButton = styled(Button)({
  color: 'white',
  paddingTop: '0px'
})

const FavoritesBtn: FunctionComponent = () => {
  return (
    <StyledButton 
      startIcon={<FavoriteIcon />}
    >
      My favorites
    </StyledButton>
  );
}

export default FavoritesBtn;