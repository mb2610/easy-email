import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField, InputField } from '../../../components/Form';
import { Grid, InputAdornment } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';

export function Link() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Grid direction='column' spacing={2}>
        <InputField
            name={`${focusIdx}.attributes.href`}
            label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <SelectField
            label='Target'
            name={`${focusIdx}.attributes.target`}
            options={[
              {
                value: '',
                label: '_self',
              },
              {
                value: '_blank',
                label: '_blank',
              },
            ]}
          />
      </Grid>
    );
  }, [focusIdx]);
}
