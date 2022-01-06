import { Box } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import HomeWelcome from "../components/HomeWelcome";
import RecipeList from "../components/RecipeList";
import { search, selectSearchResults } from "../redux/searchResultState";

const Home: FunctionComponent = () => {
  const recipes = useAppSelector(selectSearchResults);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(search());
  // eslint-disable-next-line react-hooks/exhaustive-deps
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