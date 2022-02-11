import { Backdrop, Box, CircularProgress, styled } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import HomeWelcome from "../components/HomeWelcome";
import RecipeList from "../components/RecipeList";
import { search, selectLoading, selectSearchResults } from "../redux/searchResultState";

const BoxMain = styled(Box)({
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center'
});

const Home: FunctionComponent = () => {
  const isLoading = useAppSelector(selectLoading);
  const recipes = useAppSelector(selectSearchResults);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(search(""));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <BoxMain>
      <Header />
      <HomeWelcome />
      <Box>
        <RecipeList recipes={recipes} />
        <Backdrop open={isLoading}>
          <CircularProgress />
        </Backdrop>
      </Box>
    </BoxMain>
  );
}

export default Home;