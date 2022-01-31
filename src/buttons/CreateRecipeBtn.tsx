import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { Box, styled, Typography } from "@mui/material";

const CreateButton = styled(Box)({
  color: 'white',
  backgroundColor: '#67686ed6',
  borderRadius: '8px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  padding: '25px 10px 25px 10px',
  margin: '25px auto 10px auto',
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
      <Typography pr={1} variant="h5">
        Add a new recipe 
      </Typography>
      <DinnerDiningIcon fontSize="large" />
    </CreateButton>
  );
}

export default CreateRecipeBtn;