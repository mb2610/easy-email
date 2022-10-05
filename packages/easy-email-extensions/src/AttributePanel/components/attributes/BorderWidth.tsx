import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { InputField } from '../../../components/Form';

export function BorderWidth() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <InputField
        label='Width'
        quickchange
        name={`${focusIdx}.attributes.border-width`}
      />
    );
  }, [focusIdx]);
}
