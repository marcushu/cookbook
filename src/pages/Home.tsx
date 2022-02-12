import { Backdrop, Box, Button, CircularProgress, styled } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import HomeWelcome from "../components/HomeWelcome";
import RecipeList from "../components/RecipeList";
import { search, selectLoading, selectSearchResults } from "../redux/searchResultState";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
    dispatch(search());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchAgain = () => {
    dispatch(search());

    window.scrollTo({ top: 600, behavior: 'smooth' })
  }


  return (
    <BoxMain>
      <Header />
      <HomeWelcome />
      <Box pb={3}>
        <RecipeList recipes={recipes} />
        <Box sx={{ textAlign: 'end' }}>
          <Button onClick={searchAgain}>
            <ArrowUpwardIcon fontSize="large" />
          </Button>
        </Box>
        <Backdrop open={isLoading}>
          <CircularProgress />
        </Backdrop>
      </Box>
    </BoxMain>
  );
}

export default Home;