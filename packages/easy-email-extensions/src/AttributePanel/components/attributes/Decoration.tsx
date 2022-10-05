import React, { useMemo } from 'react';
import { InputField } from '../../../components/Form';
import { useFocusIdx, Stack, TextStyle } from 'easy-email-editor';

export function Decoration() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <TextStyle variation='strong' size='large'>
          Decoration
        </TextStyle>
        <InputField
          label='Border radius'
          name={`${focusIdx}.attributes.borderRadius`}
          inline
        />
        <InputField
          label='Border'
          name={`${focusIdx}.attributes.border`}
          inline
          alignment='center'
        />
        <InputField
          label='Opacity'
          type="number"
          max={1}
          min={0}
          step={0.1}
          InputLabelProps={{
            shrink: true,
          }}
          name={`${focusIdx}.attributes.opacity`}
          inline
          alignment='center'
        />
      </Stack>
    );
  }, [focusIdx]);
}
