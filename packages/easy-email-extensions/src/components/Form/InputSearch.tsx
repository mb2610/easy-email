import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase, {InputBaseProps} from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export interface InputSearchProps extends Omit<InputBaseProps, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
}

export function InputSearch(props: InputSearchProps) {
  const [value, setValue] = React.useState(props.value);
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase {...props}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={e => setValue(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => props.onChange(value)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
