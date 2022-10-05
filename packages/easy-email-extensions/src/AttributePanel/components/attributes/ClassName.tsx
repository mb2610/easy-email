import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { InputField } from '../../../components/Form';

export function ClassName() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <InputField label='Class name' name={`${focusIdx}.attributes.css-class`} />
    );
  }, [focusIdx]);
}
