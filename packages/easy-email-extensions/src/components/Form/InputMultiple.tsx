import React from 'react';
import { Input } from './Input';
import { TextFieldProps } from '@mui/material';

export interface InputMultipleProps extends Omit<TextFieldProps, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
  rows?: number;
}

export function InputMultiple(props: InputMultipleProps) {
  const {
    value = '',
    onKeyDown: onPropsKeyDown,
    rows = 25,
    ...restProps
  } = props;

  return (
    <Input
      multiline
      rows={rows}
      value={value}
      {...restProps}
      quickchange
    />
  );
}
