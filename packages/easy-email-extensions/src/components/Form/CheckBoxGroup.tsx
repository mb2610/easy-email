import React from 'react';
import {Checkbox, FormGroup, FormControlLabel} from '@mui/material';
import { xor } from 'lodash';

export interface CheckboxGroupProps {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (e: any[]) => void;
  value?: string[];
  vertical?: boolean;
  name: string;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { vertical, value, onChange, name, ...rest } = props;
  const [values, setValues] = React.useState(value ?? [] );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = [...values];
    if(event.target.checked)
      val.push(event.target.value);
    else
    val = xor(val, [event.target.value]);

    setValues(val);
    onChange?.(val);
  };

  return <FormGroup row={!vertical}>
    {rest.options.map((item, index) => {
      const checked = values.findIndex(x => x == item.value) >= 0;
      return (<FormControlLabel key={index} value={item.value} control={<Checkbox name={name} defaultChecked={checked} onChange={handleChange} />} label={item.label} />);
    })}
  </FormGroup>
}
