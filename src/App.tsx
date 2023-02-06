import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';

// Lazy load
const MyPage = React.lazy(() => import('./pages/MyPage'));
const ShoppingList = React.lazy(() => import('./pages/ShoppingList'));
const Favorites = React.lazy(() => import('./pages/Favorites'));
const CreateRecipe = React.lazy(() => import('./pages/CreateRecipe'));
const SignIn = React.lazy(() => import('./pages/SignIn'));

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>} >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/shoppinglist' element={<ShoppingList />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/createrecipe' element={<CreateRecipe />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </Suspense>
  );
}

export default App;
