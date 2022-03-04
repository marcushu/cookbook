import { Box, styled } from "@mui/material";
import { FunctionComponent } from "react";
import TouchAppIcon from '@mui/icons-material/TouchApp';

interface SearchButtonProps {
  searchFunction: () => void
}

const MySearchButton = styled(Box)({
  width: 'fit-content',
  backgroundColor: '#3FA8B5',
  transition: 'transform 0.5s',
  padding: '10px 80px 10px 80px',
  marginLeft: 'auto',
  ":hover": {
    cursor: 'pointer',
    transform: 'scale(1.02)'
  }
});

const SearchButton: FunctionComponent<SearchButtonProps> = ({ searchFunction }) => {
  return (
    <MySearchButton onClick={searchFunction}>
      <TouchAppIcon sx={{ transform: 'scale(1.6)', color: '#EAEAEA' }} /> 
    </MySearchButton>
  );
}

export default SearchButton;