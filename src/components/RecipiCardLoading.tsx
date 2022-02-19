import { Grid, Paper, Skeleton, styled } from "@mui/material";
import { FunctionComponent } from "react";

const RecipePaper = styled(Paper)(({ theme }) => ({
  margin: '8px auto 8px auto',
  width: '300px',
  [theme.breakpoints.up('sm')]: {
    width: '900px'
  }
}));

const ImageGridItem = styled(Grid)({
  width: '300px',
  height: '300px',
  overflow: 'hidden',
  textAlign: 'center'
});


const RecipeCardLoading: FunctionComponent = () => {
  return (
    <RecipePaper variant='outlined'>
      <Grid container>
        <ImageGridItem item xs={12} sm={4} >
          <Skeleton variant="rectangular"
            sx={{ bgcolor: 'grey.300' }}
            animation="wave"
            width={300} height={300} />
        </ImageGridItem>
        <Grid item xs={12} sm={8} p={2}>
          <Skeleton variant="rectangular"
            height={50} width={250}
            animation="wave"
            sx={{ marginBottom: '15px', bgcolor: 'grey.300' }} />
          <Skeleton variant="rectangular"
            height={20} width={200}
            animation="wave"
            sx={{ bgcolor: 'grey.300' }} />
          <Skeleton variant="rectangular"
            height={50}
            animation="wave"
            sx={{ marginTop: '15px', bgcolor: 'grey.300', width: ['200px', '300px'] }} />
        </Grid>
      </Grid>
    </RecipePaper >
  );
}

export default RecipeCardLoading;