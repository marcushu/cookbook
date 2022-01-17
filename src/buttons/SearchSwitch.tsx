import { Box, Switch, Typography } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectOwner, setOwner } from "../redux/searchResultState";
import { selectUserName } from "../redux/userState";

/**
 * This component is used to toggle between universal search 
 * and owner-specific searches 
 */
const SearchSwitch: FunctionComponent = () => {
  const owner = useAppSelector(selectOwner);
  const userName = useAppSelector(selectUserName);  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOwner(userName));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwitch = () => {
    const switchTo = !!owner.length ? "" : userName;
    
    dispatch(setOwner(switchTo));
  }

  return (
    <Box px={3} py={1} sx={{ borderRadius: '5px', backgroundColor: '#e3e3e3' }}>
      <Typography component='span' variant='h6' color='textPrimary'>
        My recipes
        <Switch 
          checked={!owner.length}
          onChange={handleSwitch} />
        Search all recipes
      </Typography>
    </Box>
  );
}

export default SearchSwitch;