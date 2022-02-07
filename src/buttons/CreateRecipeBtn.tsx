import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { Box, styled } from "@mui/material";

const CreateButton = styled(Box)({
  backgroundColor: '#67686e',
  color: '#e9e9e9e6',
  borderRadius: '8px',
  fontFamily: "'Quicksand', sans-serif",
  fontWeight: 'bold',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  padding: '0px 40px 0px 40px',
  margin: '5px auto 10px auto',
  transition: 'transform 0.5s',
  ':hover': {
    cursor: 'pointer',
    transform: 'scale(1.04)'
  }
})

const CreateRecipeBtn: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <CreateButton component='span' onClick={() => navigate('/createrecipe')}>
      <p>New Recipe</p> 
      <DinnerDiningIcon fontSize="large" sx={{transform: 'scale(1.2)', color: '#7aadb4', paddingLeft: '10px'}} />
    </CreateButton>
  );
}

export default CreateRecipeBtn;