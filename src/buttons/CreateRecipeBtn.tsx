import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { Box, styled } from "@mui/material";

const CreateButton = styled(Box)({
  backgroundColor: '#dadada70',
  color: '#404040d1',
  border: 'solid',
  borderColor: '#ffffff8a',
  borderWidth: '1px',
  fontFamily: "'Quicksand', sans-serif",
  fontWeight: 'bold',
  fontSize: '20px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  padding: '0px 40px 0px 40px',
  margin: '5px auto 20px auto',
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
      <p>Add a New Recipe</p> 
      <DinnerDiningIcon fontSize="large" sx={{transform: 'scale(1.2)', color: '#7aadb4', paddingLeft: '10px'}} />
    </CreateButton>
  );
}

export default CreateRecipeBtn;