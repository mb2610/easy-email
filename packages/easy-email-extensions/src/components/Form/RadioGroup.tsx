import React from 'react';
import {Radio, RadioGroup as MuiRadioGroup, FormControlLabel, ButtonGroup, Button} from '@mui/material';

export interface RadioGroupProps {
  options: Array<{ value: string; label: React.ReactNode }>;
  onChange?: (value: string) => void;
  value?: string;
  type?: 'radio' | 'button';
  vertical?: boolean;
}

export function RadioGroup(props: RadioGroupProps) {
  const { type, vertical, value, onChange, ...rest } = props;
  if(type == 'radio')
    return <MuiRadioGroup
    row={!vertical}
    defaultValue={value ?? ''}
    onChange={(e) => onChange?.(e.target.value)}
  >
    {rest.options.map((item, index) => (<FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} />))}
  </MuiRadioGroup>

  return (
    <ButtonGroup variant="contained">
      {rest.options.map((item, index) => (<Button key={index}  onClick={() => onChange?.(item.value)}>{item.label}</Button>))}
    </ButtonGroup>
  );
}
