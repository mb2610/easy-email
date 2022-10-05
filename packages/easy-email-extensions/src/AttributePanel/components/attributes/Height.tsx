import React, { useMemo } from 'react';
import { InputField } from '../../../components/Form';
import { useFocusIdx, Stack } from 'easy-email-editor';

export function Height({ inline }: { inline?: boolean; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <InputField
            label='Height'
            name={`${focusIdx}.attributes.height`}
            quickchange
            inline={inline}
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx, inline]);
}
