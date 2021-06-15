import React from 'react';
import TextField from '@material-ui/core/TextField';

const CustomTextField = ({
  label,
  type = 'text',
  helperText = '',
  required = false,
  autoFocus = true,
  fullWidth = true,
  multiline = false,
  rows = 0,
  rowsMax = 0,
  onChange,
}) => {

  return (
    <TextField
      onChange={onChange}
      variant="outlined"
      required={required}
      fullWidth={fullWidth}
      type={type}
      id="outlined-helperText"
      label={label}
      autoFocus={autoFocus}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
    />
  );
}

export default CustomTextField;
