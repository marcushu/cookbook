import { styled, Box } from "@mui/material";
import { FunctionComponent } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface SearchButtonSmallProps {
  searchFunction: () => void
}

const SearchButton = styled(Box)({
  backgroundColor: '#67686ede',
  width: 'fit-content',
  height: 'fit-content',
  padding: '10px',
  marginRight: '5px',
  transition: 'transform 0.5s',
  ":hover": {
    cursor: 'pointer',
    transform: 'scale(1.2)'
  }
});

const SearchButtonSmall: FunctionComponent<SearchButtonSmallProps> = ({ searchFunction }) => {
  return ( 
    <SearchButton onClick={searchFunction} data-testid='searchbuttonsmall'>
      <SearchIcon sx={{ transform: 'scale(1.5)', color: '#7aadb4'}} />
    </SearchButton>
     );
}

export default SearchButtonSmall;