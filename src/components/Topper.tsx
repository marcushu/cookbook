import { Box, styled } from "@mui/material";
import { FunctionComponent } from "react";
import foodImage from '../images/topper.png';

const ImagePanel = styled(Box)({
  backgroundImage: `url(${foodImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '138px',
  width: '100%',
  maxWidth: '902px',
})

const Topper: FunctionComponent = () => {
  return (
    <ImagePanel />
  );
}

export default Topper;