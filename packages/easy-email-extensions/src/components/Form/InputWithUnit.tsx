import React from 'react';
import { Input } from './Input';
import { TextFieldProps } from '@mui/material';

export interface InputWithUnitProps extends Omit<TextFieldProps, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
  unitOptions?: Array<{ value: string; label: string }> | 'default' | 'percent';
}

const defaultUnitOptions = [
  {
    value: 'px',
    label: 'px',
  },
];

const percentUnitOptions = [
  {
    value: 'px',
    label: 'px',
  },
  {
    value: '%',
    label: '%',
  },
];

export function InputWithUnit(props: InputWithUnitProps) {
  const {
    value = '',
    onKeyDown: onPropsKeyDown,
    unitOptions: propsUnitOptions,
    ...restProps
  } = props;

  return (
    <Input
      value={value}
      {...restProps}
      quickchange
    />
  );
}
