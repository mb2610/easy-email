import React, { useMemo } from 'react';
import { isString } from 'lodash';
import TextField from '@mui/material/TextField';
import Autocomplete, {AutocompleteProps} from '@mui/material/Autocomplete';

export interface AutoCompleteProps<T>
  extends Omit<AutocompleteProps<T, false, false, true>, 'onChange' | 'options'> {
  quickchange?: boolean;
  value: string;
  options: Array<{ value: any; label: any }>;
  onChange: (val: string) => void;
}

export function AutoComplete<T>(props: AutoCompleteProps<T>) {
  const { value, options, quickchange, onChange, ...rest} = props;

  const myOptions = useMemo(() => {
    const selectedValue = (props.value || '').toLowerCase();
    return props.options
      .filter((item) => {
        return (
          (isString(item.value) &&
            item.value.toLowerCase().startsWith(selectedValue)) ||
          (isString(item.label) &&
            item.label.toLowerCase().startsWith(selectedValue))
        );
      })
      .map((item) => item.label);
  }, [options, value]);

  return (
    <Autocomplete {...rest}
      disablePortal
      value={value}
      onInputChange={(event, newInputValue) => {
          onChange(newInputValue);
      }}
      options={myOptions}
      renderInput={(params) => <TextField {...params} />}
    />
  )
}
