import { Box, Switch, Tooltip, Typography } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { search, selectOwner, setOwner } from "../redux/searchResultState";
import { selectUserName } from "../redux/userState";
import FaceIcon from '@mui/icons-material/Face';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

/**
 * Toggle between universal search 
 * and this owner's recipes
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
    dispatch(search());
  }

  return (
    <Box>
      <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}  >
        <Tooltip title="My Recipes">
          <FaceIcon color={owner.length ? 'primary' : 'info'} fontSize="large" />
        </Tooltip>
        <Switch
          color="default"
          checked={!owner.length}
          onChange={handleSwitch} />
        <Tooltip title="Search all recipes">
          <PeopleAltIcon color={!owner.length ? 'primary' : 'info'} fontSize="large" />
        </Tooltip>
      </Typography>
    </Box>
  );
}

export default SearchSwitch;