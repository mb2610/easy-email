import React, { useMemo } from 'react';
import {
  ImageUploaderField,
  SelectField,
  InputField,
} from '../../../components/Form';
import { useFocusIdx, useEditorProps } from 'easy-email-editor';
import { BackgroundColor } from './BackgroundColor';
import { Grid } from '@mui/material';

const backgroundRepeatOptions = [
  {
    value: 'no-repeat',
    label: 'No repeat',
  },
  {
    value: 'repeat',
    label: 'Repeat',
  },
  {
    value: 'repeat-x',
    label: 'Repeat X',
  },
  {
    value: 'repeat-y',
    label: 'Repeat Y',
  },
];

export function Background() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  return useMemo(() => {
    return (
      <Grid key={focusIdx} direction='row' spacing={4}>
        <ImageUploaderField
          label='Background image'
          name={`${focusIdx}.attributes.background-url`}
          helpText='The image suffix should be .jpg, jpeg, png, etc. Otherwise, the picture may not be displayed normally.'
          uploadHandler={onUploadImage}
        />

        <Grid direction='column' spacing={3}>
            <BackgroundColor />
            <SelectField
              label='Background repeat'
              name={`${focusIdx}.attributes.background-repeat`}
              options={backgroundRepeatOptions}
            />
        </Grid>

        <InputField
          label='Background size'
          name={`${focusIdx}.attributes.background-size`}
        />
      </Grid>
    );
  }, [focusIdx, onUploadImage]);
}
