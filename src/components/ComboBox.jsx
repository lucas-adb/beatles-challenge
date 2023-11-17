// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useStore } from '../store/GameStore';

export default function ComboBox() {
  const { nameOfTheSongs, actions } = useStore();
  const { saveAnswer } = actions;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={nameOfTheSongs}
      // sx={{ width: 300 }}
      sx={{ marginBottom: 2 }}
      renderInput={(params) => <TextField {...params} label="Songs" />}
      // value={}
      onChange={(event, newValue) => {
        saveAnswer(newValue);
      }}
      // inputValue={}
      onInputChange={(event, newInputValue) => {
        saveAnswer(newInputValue);
      }}
    />
  );
}
