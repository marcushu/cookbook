import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hooks";
import FavoritesBtn from "../buttons/FavoritesBtn";
import ShoppingListBtn from "../buttons/ShoppingListBtn";
import Header from "../components/Header";
import LoginErrorModal from "../components/LoginErrorModal";
import MyPageWelcome from "../components/MyPageWelcome";
import RecipeList from "../components/RecipeList";
import { selectRecipes, selectUserName } from "../redux/userState";


const MyPage: FunctionComponent = () => {
  const userName = useAppSelector(selectUserName);
  const navigate = useNavigate();
  const recipes = useAppSelector(selectRecipes);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userName) setShowModal(true);
  }, [userName]);


  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/signin');
  }


  return (
    <>
      <Header 
        leftButton={<FavoritesBtn />}
        rightButton={<ShoppingListBtn />} />
      <MyPageWelcome />
      <RecipeList recipes={recipes} />
      <LoginErrorModal hideMe={handleCloseModal} showMe={showModal} />
    </>
  );
}

export default MyPage;