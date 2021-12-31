import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import HomeIcon from '@mui/icons-material/Home';

const StyledButton = styled(Button)({
  color: 'white',
  paddingTop: '0px'
});

const HomeBtn: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <StyledButton
      startIcon={<HomeIcon />}
      onClick={() => navigate('/mypage')}>
      My page
    </StyledButton>
  );
}

export default HomeBtn;