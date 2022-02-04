import { FormControlLabel, FormGroup, Grid, Switch, TextField } from "@mui/material";
import React, { useState, LegacyRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  search, selectFindBreakfast, selectFindDinner, selectFindGF, selectFindLunch,
  selectFindVegan, selectFindVegetarian, setFindMealSettings
} from "../redux/searchResultState";

const SearchBar = React.forwardRef((props, buttonRef: LegacyRef<HTMLButtonElement>) => {
  const [recipeToFind, setRecipeToFind] = useState("");
  const findBreakfast = useAppSelector(selectFindBreakfast);
  const findLunch = useAppSelector(selectFindLunch);
  const findDinner = useAppSelector(selectFindDinner);
  const findGF = useAppSelector(selectFindGF);
  const findVegan = useAppSelector(selectFindVegan);
  const findVegetarian = useAppSelector(selectFindVegetarian);
  const dispatch = useAppDispatch();


  // This will be called from parent.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startSearch = () => {
    dispatch(search(recipeToFind))
  }


  return (
    <Grid container
      sx={{backgroundColor: '#67686e', padding: '5px 10px 5px 10px', justifyContent: 'center'}} >
      <Grid item px={1} pb={1} xs={12} sm={4}>
        <TextField
          focused
          variant='standard'
          fullWidth={true}
          id="searchText"
          label="find something"
          color="primary"
          inputProps={{ style: { color: '#e9fcff', fontWeight: 'lighter', fontSize: '20px'}}}
          value={recipeToFind}
          onChange={e => setRecipeToFind(e.target.value)} />
        <button
          style={{ display: 'none' }}
          onClick={startSearch}
          ref={buttonRef} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormGroup row sx={{ justifyContent: 'space-around' }}>
          <FormControlLabel
            value="Breakfast"
            sx={{ color: '#e5e5e5' }}
            control={
              <Switch
                name="breakfast"
                checked={findBreakfast}
                onChange={() => dispatch(setFindMealSettings(
                  { searchType: 'findBreakfast', trueFalse: !findBreakfast }
                ))} />}
            label="Breakfast"
            labelPlacement="top" />
          <FormControlLabel
            value="Lunch"
            sx={{ color: '#e5e5e5' }}
            control={
              <Switch
                name="lunch"
                checked={findLunch}
                onChange={() => dispatch(setFindMealSettings(
                  { searchType: 'findLunch', trueFalse: !findLunch }
                ))} />}
            label="Lunch"
            labelPlacement="top" />
          <FormControlLabel
            value="Dinner"
            sx={{ color: '#e5e5e5' }}
            control={
              <Switch
                name="dinner"
                checked={findDinner}
                onChange={() => dispatch(setFindMealSettings(
                  { searchType: 'findDinner', trueFalse: !findDinner }
                ))} />}
            label="Dinner"
            labelPlacement="top" />
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormGroup row sx={{ justifyContent: 'space-around' }}>
          <FormControlLabel
            value="glutenFree"
            sx={{ color: '#e5e5e5' }}
            control={
              <Switch
                name="glutenFree"
                color='secondary'
                checked={findGF}
                onChange={() => dispatch(setFindMealSettings(
                  { searchType: 'GF', trueFalse: !findGF }
                ))} />
            }
            label="GF"
            labelPlacement="top" />
          <FormControlLabel
            value="Vegetarian"
            sx={{ color: '#e5e5e5' }}
            control={
              <Switch
                name="vegetarian"
                color='secondary'
                checked={findVegetarian}
                onChange={() => dispatch(setFindMealSettings(
                  { searchType: 'vegetarian', trueFalse: !findVegetarian }
                ))} />
            }
            label="Vegetarian"
            labelPlacement="top" />
          <FormControlLabel
            value="Vegan"
            sx={{ color: '#e5e5e5' }}
            control={
              <Switch
                name="vegan"
                color='secondary'
                checked={findVegan}
                onChange={() => dispatch(setFindMealSettings(
                  { searchType: 'vegan', trueFalse: !findVegan }
                ))} />
            }
            label="Vegan"
            labelPlacement="top" />
        </FormGroup>
      </Grid>
    </Grid>
  );
});

export default SearchBar;