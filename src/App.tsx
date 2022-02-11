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
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route path='/shoppinglist' element={<ShoppingList />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/createrecipe' element={<CreateRecipe />} />
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  );
}

export default App;
