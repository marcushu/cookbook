import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { FunctionComponent } from "react";
import splashImage from '../images/marvin-binnig-0zqT55YuPn8-unsplash.jpg';

const ImagePanel = styled(Grid)({
  display: 'flex',
  backgroundImage: `url(${splashImage})`,
  opacity: '77%',
  minHeight: '70px'
});

const TitleImage: FunctionComponent = () => {
  return (
    <ImagePanel />
  );
}

export default TitleImage;