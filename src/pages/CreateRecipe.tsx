import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUserName, addRecipe } from "../redux/userState";
import Header from "../components/Header";
import ShoppingListBtn from "../buttons/ShoppingListBtn";
import FavoritesBtn from "../buttons/FavoritesBtn";
import { showUploadWidget } from "../js/uploadWidget";
import bgImage from '../images/clean.jpg'

const dbApi = process.env.REACT_APP_API_URL

const BoxMain = styled(Box)({
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center'
});

const CreateRecipeCard = styled(Typography)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.text.primary,
  padding: '8px 8px 30px 8px',
  backgroundImage: `url(${bgImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
}));


const CreateRecipe: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [foodImages, setFoodImages] = useState({ fullSize: "", foodThumbnail: "" });
  const userName = useAppSelector(selectUserName);
  const [formValues, setFormValues] = useState({
    ingredients: "",
    description: "",
    breakfast: false,
    lunch: true,
    dinner: true,
    glutenFree: false,
    vegan: false,
    vegetarian: false,
    name: "",
    instructions: "",
    // TODO: replace with generic looking placeholder
    imageUrl: ""
  });


  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setFormValues({
      ...formValues,
      [name]: value
    })
  }


  const handleCheckboxes = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = evt.target;

    setFormValues({
      ...formValues,
      [name]: checked
    })
  }


  const addImage = () => {
    showUploadWidget((err: any, result: any) => {
      if (err) console.log(err);

      if (result.event === 'success') {
        setFoodImages({
          fullSize: result.info.secure_url,
          foodThumbnail: result.info.thumbnail_url
        });
      }
    })
  }


  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const ingredientsAr = formValues.ingredients.split('\n');

    let newRecipe = {
      ...formValues,
      owner: userName,
      ingredients: ingredientsAr,
      imageUrl: foodImages.fullSize
    }

    try {
      const response = await fetch(`${dbApi}/recipe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRecipe)
        });

      const { acknowledged } = await response.json();

      if (acknowledged) {
        dispatch(addRecipe(newRecipe));
        navigate('/mypage')
      } else {
        alert("something went wrong...")
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <BoxMain>
      <Header
        leftButton={<FavoritesBtn />}
        rightButton={<ShoppingListBtn />} />
      <CreateRecipeCard sx={{ width: ['100%', '875px'] }}>
        <Box sx={{ width: ['auto', 850] }} m='auto'>
          <Typography color='primary' variant='h4' py={2}>Create a new recipe</Typography>
          <form action="" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField id="name" label="Recipe Name" name='name'
                  required={true} fullWidth onChange={handleInputChange}
                  sx={{backgroundColor: '#ffffff61'}} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField id='description' label='short description'
                  name='description' fullWidth onChange={handleInputChange}
                  sx={{backgroundColor: '#ffffff61'}} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField id='ingredients' label='ingredients' name='ingredients' required={true}
                  helperText='one ingredient per line' fullWidth multiline={true} rows='10' onChange={handleInputChange}
                  sx={{backgroundColor: '#ffffff61'}} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField id='instructions' label='instructions' name='instructions'
                  required={true} fullWidth rows='10' multiline={true} onChange={handleInputChange}
                  sx={{backgroundColor: '#ffffff61'}} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  value='breakfast' id='breakfast' name='breakfast'
                  control={<Checkbox checked={formValues.breakfast} onChange={handleCheckboxes} />}
                  label='breakfast' labelPlacement='end' />
                <FormControlLabel
                  value='lunch' id='lunch' name='lunch'
                  control={<Checkbox checked={formValues.lunch} onChange={handleCheckboxes} />}
                  label='lunch' labelPlacement='end' />
                <FormControlLabel
                  value='dinner' id='dinner' name='dinner'
                  control={<Checkbox checked={formValues.dinner} onChange={handleCheckboxes} />}
                  label='dinner' labelPlacement='end' />
                <FormControlLabel
                  value='GF' id='GF' name='glutenFree'
                  control={<Checkbox checked={formValues.glutenFree} onChange={handleCheckboxes} />}
                  label='gluten free' labelPlacement='end' />
                <FormControlLabel
                  value='vegan' id='vegan' name='vegan'
                  control={<Checkbox checked={formValues.vegan} onChange={handleCheckboxes} />}
                  label='vegan' labelPlacement='end' />
                <FormControlLabel
                  value='vegetarian' id='vegetarian' name='vegetarian'
                  control={<Checkbox checked={formValues.vegetarian} onChange={handleCheckboxes} />}
                  label='vegetarian' labelPlacement='end' />
              </Grid>
              <Grid item xs={12} display='flex'>
                <Button 
                  variant='contained' 
                  color='primary' 
                  onClick={addImage}
                  startIcon={<InsertPhotoIcon />} 
                  size='large'>
                    Add Image
                </Button>
                {!!foodImages.foodThumbnail.length &&
                  <img src={foodImages.foodThumbnail} alt="food" style={{marginLeft: '10px', borderRadius: '5px'}} />}
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button type='submit' value='Submit' variant='contained'>Submit!</Button> &nbsp;
                <Button variant='outlined' color='secondary' onClick={() => navigate('/mypage')}>&lt; Cancel</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CreateRecipeCard>
    </BoxMain>
  );
}

export default CreateRecipe;