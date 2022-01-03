import { Box, Grid } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router';
import CreateRecipe from './pages/CreateRecipe';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import ShoppingList from './pages/ShoppingList';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Grid container>
      <Grid item sm={true} 
        sx={{display: {xs: 'none', md: 'block'}}}>
          <Box sx={{backgroundColor: '#3fa8b5', minHeight: '300px'}}></Box>
        </Grid>
      <Grid>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/shoppinglist' element={<ShoppingList />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/createrecipe' element={<CreateRecipe />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </Grid>
      <Grid item sm={true}
        sx={{display: {xs: 'none', md: 'block'}}}>
          <Box sx={{backgroundColor: '#3fa8b5', minHeight: '300px'}}></Box>
        </Grid>
    </Grid>
  );
}

export default App;
