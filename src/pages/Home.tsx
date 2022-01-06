import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import Header from "../components/Header";
import HomeWelcome from "../components/HomeWelcome";
import RecipeList from "../components/RecipeList";

const Home: FunctionComponent = () => {
  const [recipes, setRecipes] = useState([]);
  const NUMRANDOMRECIPES = 4;

  useEffect(() => {
    const dbApi = process.env.REACT_APP_API_URL

    const loadRecipes = async () => {
      
      const response = await fetch(`${dbApi}/recipes/${NUMRANDOMRECIPES}`);
      const { randomRecipes } = await response.json() ;

      setRecipes(randomRecipes);
    }

    loadRecipes();
  }, []);


  return (
    <>
      <Header />
      <HomeWelcome />
      <Box>
        <RecipeList recipes={recipes} />
      </Box>
    </>
  );
}

export default Home;