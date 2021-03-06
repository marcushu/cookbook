import { Box, Button, styled } from "@mui/material";
import { FunctionComponent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import HomeWelcome from "../components/HomeWelcome";
import RecipeList from "../components/RecipeList";
import { search, selectLoading, selectSearchResults } from "../redux/searchResultState";
import ReplayIcon from '@mui/icons-material/Replay';
import RecipeCardLoading from "../components/RecipiCardLoading";

const BoxMain = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'unset',
  maxWidth: '886px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const Home: FunctionComponent = () => {
  const isLoading = useAppSelector(selectLoading);
  const recipes = useAppSelector(selectSearchResults);
  const dispatch = useAppDispatch();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(search());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchAgain = () => {
    pageRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // allow time to scroll into position before displaying new recipes
    setTimeout(() => {
      dispatch(search());
    }, 700);
  }


  return (
    <BoxMain>
      <HeaderBox>
        <Header />
      </HeaderBox>
      <HomeWelcome />
      <Box pb={3} ref={pageRef} >
        {isLoading
          ? <>
            <RecipeCardLoading />
            <RecipeCardLoading />
            <RecipeCardLoading />
          </>
          : <RecipeList recipes={recipes} />}
        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={searchAgain}>
            <ReplayIcon fontSize="large" />
          </Button>
        </Box>
      </Box>
    </BoxMain>
  );
}

export default Home;