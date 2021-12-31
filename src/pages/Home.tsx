import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import Header from "../components/Header";
import HomeWelcome from "../components/HomeWelcome";
import RecipeList from "../components/RecipeList";

const Home: FunctionComponent = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      //TODO: this will eventually load a fixed number of random recipes
      const response = await fetch('http://localhost:5000/');
      const allRecipes = await response.json();

      setRecipes(allRecipes);
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