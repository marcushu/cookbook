import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, styled, Typography } from "@mui/material";


const CreateButton = styled(Box)(({ theme }) => ({
  backgroundColor: '#3fa8b5',
  color: '#404040e0',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  margin: '0px 90px 0px 30px',
  transition: 'transform 0.5s',
  ':hover': {
    cursor: 'pointer',
    transform: 'scale(1.04)'
  },
  [theme.breakpoints.down('sm')]: {
    margin: 'auto'
  }
}));

const ButtonText = styled(Typography)({
  color: 'white',
  padding: '0px 44px 0px 44px',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center'
})

const CreateRecipeBtn: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <CreateButton component='span' onClick={() => navigate('/createrecipe')}>
      <ButtonText>
        <p>NEW RECIPE</p>
      </ButtonText>
    </CreateButton>
  );
}

export default CreateRecipeBtn;