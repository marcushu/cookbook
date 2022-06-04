import { FormControlLabel, FormGroup, Grid, styled, Switch, TextField } from "@mui/material";
import React, { useState, LegacyRef, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SearchButtonSmall from "../buttons/SearchButtonSmall";
import {
  search, selectFindBreakfast, selectFindDinner, selectFindGF, selectFindLunch,
  selectFindVegan, selectFindVegetarian, setFindMealSettings, setSearchTearm
} from "../redux/searchResultState";


const MainContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: '#67686e',
  padding: '5px 10px 5px 10px',
  justifyContent: 'center',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    padding: '20px 8px 20px 8px'
  }
}));

const SearchBar = React.forwardRef((props, buttonRef: LegacyRef<HTMLButtonElement>) => {
  const [recipeToFind, setRecipeToFind] = useState("");
  const findBreakfast = useAppSelector(selectFindBreakfast);
  const findLunch = useAppSelector(selectFindLunch);
  const findDinner = useAppSelector(selectFindDinner);
  const findGF = useAppSelector(selectFindGF);
  const findVegan = useAppSelector(selectFindVegan);
  const findVegetarian = useAppSelector(selectFindVegetarian);
  const dispatch = useAppDispatch();
  const searchbarRef = useRef<HTMLDivElement>(null)


  // This will be either called locally or from parent.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startSearch = () => {
    // set this in state to allow consistent search from elsewhere
    dispatch(setSearchTearm(recipeToFind));

    dispatch(search());

    searchbarRef?.current?.scrollIntoView({ behavior: "smooth" });
  }


  return (
    <MainContainer container ref={searchbarRef}>
      <Grid
        item
        px={1}
        pb={1}
        xs={12}
        sm={4}
        sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchButtonSmall searchFunction={startSearch} />
        <TextField
          focused
          variant='standard'
          fullWidth={true}
          id="searchText"
          inputProps={{ style: { color: '#e9fcff', fontWeight: 'lighter', fontSize: '20px' } }}
          value={recipeToFind}
          onChange={e => setRecipeToFind(e.target.value)} />
        <button
          style={{ display: 'none' }}
          onClick={startSearch}
          ref={buttonRef} />
      </Grid>
      <Grid item xs={12} sm={4} sx={{ marginTop: ['20px', '0px'], marginBottom: ['20px', '0px'] }}>
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
                ))} />}
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
                ))} />}
            label="Vegan"
            labelPlacement="top" />
        </FormGroup>
      </Grid>
    </MainContainer>
  );
});

export default SearchBar;