import React, { useState } from 'react';
import { IconFont, useFocusIdx } from 'easy-email-editor';
import { TextAreaField } from '@extensions/components/Form';
import { AttributesPanelWrapper } from '../../attributes';
import { HtmlEditor } from '../../UI/HtmlEditor';
import { IconButton, Tooltip } from '@mui/material';

export function Raw() {
  const { focusIdx } = useFocusIdx();
  const [visible, setVisible] = useState(false);
  return (
    <AttributesPanelWrapper
      style={{ padding: 20 }}
      extra={
        <Tooltip arrow title='Html mode'>
          <IconButton color="primary" onClick={() => setVisible(true)}>
            <IconFont iconName='icon-html' />
          </IconButton>
        </Tooltip>
      }
    >
      <TextAreaField
        label=''
        name={`${focusIdx}.data.value.content`}
        rows={5}
      />
      <HtmlEditor
        visible={visible}
        setVisible={setVisible}
      />
    </AttributesPanelWrapper>
  );
}
