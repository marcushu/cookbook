import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { Box, styled, Typography } from "@mui/material";

const CreateButton = styled(Box)({
  color: 'grey',
  borderStyle: 'solid',
  borderRadius: '8px',
  borderWidth: '1px',
  borderColor: 'gray',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  padding: '10px',
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