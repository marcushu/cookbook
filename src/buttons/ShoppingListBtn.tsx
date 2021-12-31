import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';

const StyledButton = styled(Button)({
  color: 'white',
  paddingTop: '0px'
})

const ShoppingListBtn: FunctionComponent = () => {
  const navigate = useNavigate();

  return ( 
      <StyledButton
      startIcon={<ListAltIcon />}
      onClick={() => navigate('/shoppinglist')}>
        Shopping list
      </StyledButton>
     );
}

export default ShoppingListBtn;