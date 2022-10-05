import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';
import { useFontFamily } from '@extensions/hooks/useFontFamily';

export function FontFamily({ name, disabled }: { name?: string; disabled?: boolean }) {
  const { focusIdx } = useFocusIdx();
  const { fontList } = useFontFamily();

  return useMemo(() => {
    return (
      <SelectField
        name={name || `${focusIdx}.attributes.font-family`}
        options={[{value: '', label: 'None'}, ...fontList]}
        disabled={disabled}
        label='Font family'
        />
    );
  }, [focusIdx, fontList, name]);
}
