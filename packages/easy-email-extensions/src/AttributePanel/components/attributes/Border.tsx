import React, { useMemo } from 'react';
import { InputWithUnitField, InputField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';
import { Grid } from '@mui/material';

export function Border() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Grid direction='row'>
        <Grid item>
          <InputField label='Border' name={`${focusIdx}.attributes.border`} />
        </Grid>
        <Grid item>
          <InputWithUnitField
            label='Border radius'
            name={`${focusIdx}.attributes.border-radius`}
            unitOptions='percent'
          />
        </Grid>
      </Grid>
    );
  }, [focusIdx]);
}
