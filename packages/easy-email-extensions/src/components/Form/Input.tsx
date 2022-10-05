import React, { useCallback } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface InputProps extends Omit<TextFieldProps, 'onChange'> {
  quickchange?: boolean;
  value: string;
  onChange: (val: string) => void;
}

export function Input(props: InputProps) {
  const {
    quickchange,
    value = '',
    onKeyDown: onPropsKeyDown,
    onChange: propsOnChange,
  } = props;

  const onChange = useCallback(
    (val: string) => {
      propsOnChange(val);
    },
    [propsOnChange]
  );

  const onKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (onPropsKeyDown) {
        onPropsKeyDown?.(ev);
      }

      if (quickchange) {
        let step = 0;
        if (ev.key === 'ArrowUp') {
          step = 1;
        }
        if (ev.key === 'ArrowDown') {
          step = -1;
        }

        if (step) {
          if (/^\d+/.test(value)) {
            ev.preventDefault();
            onChange(
              String(value).replace(/^(\d+)/, (_, match) => {
                return (Number(match) + step).toString();
              })
            );
          }
        }
      }
    },
    [onPropsKeyDown, quickchange, value, onChange]
  );

  return (
    <TextField
      {...{ ...props, quickchange: undefined }}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}
