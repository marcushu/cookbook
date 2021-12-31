import { Box, styled } from "@mui/material";
import { FunctionComponent } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface SearchButtonProps {
  searchFunction: () => void
}

const MySearchButton = styled(Box)({
  backgroundColor: '#333741e6',
  color: '#e9e9e9e6',
  fontFamily: "'Quicksand', sans-serif",
  fontWeight: '400',
  width: 'fit-content',
  height: 'fit-content',
  padding: '20px',
  borderRadius: '7px',
  textAlign: 'center',
  margin: 'auto',
  boxShadow: '0 0 20px rgba(0,0,0,0.8)',
  transition: 'transform 0.5s',
  ":hover": {
    cursor: 'pointer',
    transform: 'scale(1.04)'
  }
});

const SearchButton: FunctionComponent<SearchButtonProps> = ({ searchFunction }) => {
  return (
    <MySearchButton onClick={searchFunction}>
      <p>Random search.</p>
      <SearchIcon sx={{ transform: 'scale(2.0)', color: '#7aadb4' }} /> 
      <p>Or enter a search</p>
      <p>tearm below.</p>
    </MySearchButton>
  );
}

export default SearchButton;