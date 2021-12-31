import { FormControlLabel, FormGroup, Grid, Switch, TextField } from "@mui/material";
import React, { useState, ChangeEvent, LegacyRef } from "react";

const SearchBar = React.forwardRef((props, buttonRef: LegacyRef<HTMLButtonElement>) => {
  const [formValues, setFormValues] = useState({
    breakfast: true,
    lunch: true,
    dinner: true,
    glutenFree: false,
    vegan: false,
    vegetarian: false,
    name: " "
  });

  // This will be called from parent.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const search = () => {
    alert('called');
  }

  const handleSwitch = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = evt.target;

    setFormValues({
      ...formValues,
      [name]: checked
    });
  }

  const handleText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      name: evt.target.value
    })
  }

  return (
    <Grid container py={2} sx={{backgroundColor: '#f7f7f7'}}>
      <Grid item xs={12} sm={4}>
        <FormGroup row sx={{ justifyContent: 'center' }}>
          <TextField 
            id="searchText" 
            label="find something" 
            variant="standard"
            sx={{ borderRadius: '10px' }}
            onChange={e => handleText(e as ChangeEvent<HTMLTextAreaElement>)} />
          <button
            style={{display: 'none'}}
            onClick={search}
            ref={buttonRef}>
          search
          </button>
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormGroup row sx={{ justifyContent: 'center' }}>
          <FormControlLabel
            value="Breakfast"
            sx={{ color: 'gray' }}
            control={
              <Switch
                name="breakfast"
                checked={formValues.breakfast}
                onChange={handleSwitch} />}
            label="Breakfast"
            labelPlacement="top" />
          <FormControlLabel
            value="Lunch"
            sx={{ color: 'gray' }}
            control={
              <Switch
                name="lunch"
                checked={formValues.lunch}
                onChange={handleSwitch} />}
            label="Lunch"
            labelPlacement="top" />
          <FormControlLabel
            value="Dinner"
            sx={{ color: 'gray' }}
            control={
              <Switch
                name="dinner"
                checked={formValues.dinner}
                onChange={handleSwitch} />}
            label="Dinner"
            labelPlacement="top" />
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormGroup row sx={{ justifyContent: 'center' }}>
          <FormControlLabel
            value="glutenFree"
            sx={{ color: 'gray' }}
            control={
              <Switch
                name="glutenFree"
                color='secondary'
                checked={formValues.glutenFree}
                onChange={handleSwitch} />
            }
            label="GF"
            labelPlacement="top" />
          <FormControlLabel
            value="Vegetarian"
            sx={{ color: 'gray' }}
            control={
              <Switch
                name="vegetarian"
                color='secondary'
                checked={formValues.vegetarian}
                onChange={handleSwitch} />
            }
            label="Vegetarian"
            labelPlacement="top" />
          <FormControlLabel
            value="Vegan"
            sx={{ color: 'gray' }}
            control={
              <Switch
                name="vegan"
                color='secondary'
                checked={formValues.vegan}
                onChange={handleSwitch} />
            }
            label="Vegan"
            labelPlacement="top" />
        </FormGroup>
      </Grid>
    </Grid>
  );
});

export default SearchBar;