import React from 'react';
import { Select as MuiSelect, InputLabel, SelectProps as MuiSelectProps, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';

export interface SelectProps extends Omit<MuiSelectProps, 'onChange'> {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (val: string) => void;
  value: string;
}

export function Select(props: SelectProps) {
  const {
    options,
    onChange: propsOnChange,
    ...rest
  } = props;

  const handleChange = (event: SelectChangeEvent<any>) => {
    props.onChange?.(event.target.value ?? '');
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={`select-small-label-${props.label}`}>{props.label}</InputLabel>
      <MuiSelect
        labelId={`select-small-label-${props.label}`}
        id={`select-small-${props.label}`}
        {...rest}
        onChange={handleChange}
      >

        {props.options.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.label}
        </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}