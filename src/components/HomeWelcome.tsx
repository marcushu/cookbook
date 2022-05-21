import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from "@mui/material";
import { FunctionComponent, useRef } from "react";
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import SearchButton from '../buttons/SearchButton';
import bgImageLg from '../images/leftBG.png';
import topImgSm from '../images/topImage.png';

const MainContent = styled(Grid)({
  backgroundColor: '#5b5b5b',
  minHeight: '407px',
  maxWidth: '902px'
});

const LeftPanel = styled(Grid)(({ theme }) => ({
  backgroundImage: `url(${bgImageLg})`, 
  backgroundRepeat: 'no-repeat', 
  backgroundSize: 'contain',
  [theme.breakpoints.down('sm')]: {
    backgroundImage: `url(${topImgSm})`,
    backgoundSize: 'cover'
  }
}));

const TextBox = styled(Box)(({ theme }) => ({
  maxWidth: '410px', 
  margin: 'auto', 
  paddingTop: '20px', 
  textAlign: 'left',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    padding: '20px 20px 40px 20px'
  }
}));

const Titles = styled(Typography)(({ theme }) => ({
  color: '#B3F7FF',
  fontFamily: "'Playfair Display', serif",
  fontStyle: 'italic',
  fontSize: '50px',
  marginBottom: '20px',
  marginTop: '10px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '48px',
  }
}));

const BodyText = styled(Typography)({
  color: 'white',
  fontSize: '18px',
  fontWeight: '300',
});

const TitleButton = styled(Titles)(({ theme }) => ({
  textDecoration: 'underline',
  fontSize: '40px',
  transition: 'transform 0.5s',
  ":hover": {
    cursor: 'pointer',
    transform: 'scale(1.02)'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
  }
}));


const HomeWelcome: FunctionComponent = () => {
  const searchBarRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const callSearch = () => {
      searchBarRef?.current?.click();
  }

  return (
    <>
      <MainContent container>
        <LeftPanel item xs={12} sm={5}>
          <Box sx={{textAlign: 'end', margin: ['128px 25px 0px','85px 25px']}}>
            <Typography sx={{fontSize: '22px', color: '#3FA8B5'}}>
              FIND RECIPES
            </Typography>
            <SearchButton searchFunction={callSearch} />
            <Typography sx={{fontStyle: 'italic', fontSize: '16px', color: '#b3b3b3'}}>
              Browse, or enter <br/> a search tearm <br /> below
            </Typography>
          </Box>
        </LeftPanel>
        <Grid item xs={12} sm={7} sx={{ backgroundColor: '#5B5B5B' }}>
          <TextBox>
            <Titles>
              Just recipes
            </Titles>
            <BodyText>
              Cooking sites are great, but they can be wordy. No stories, or long descriptions here, just the ingredients, and what to do with them.
            </BodyText>
            <TitleButton onClick={() => navigate('/signin')}>
              Login
            </TitleButton>
            <BodyText>
              Log in to add your own recipes, collect favorites, and create shopping lists.
            </BodyText>
          </TextBox>
        </Grid>
      </MainContent>
      <Grid container sx={{ maxWidth: '902px', marginBottom: '20px' }}>
        <Grid item xs={12}>
          <SearchBar ref={searchBarRef} />
        </Grid>
      </Grid>

    </>
  )
}

export default HomeWelcome;