// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useStore } from '../store/GameStore';

export default function ComboBox() {
  const { nameOfTheSongs } = useStore();

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={nameOfTheSongs}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Songs" />}
    />
  );
}
