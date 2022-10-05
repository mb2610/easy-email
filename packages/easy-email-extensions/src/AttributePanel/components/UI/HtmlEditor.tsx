import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { BasicType, IText } from 'easy-email-core';
import {
  Stack,
  TextStyle,
  useBlock,
  useEditorContext,
  useFocusIdx,
} from 'easy-email-editor';
import { ShadowDom } from '@extensions/components/ShadowDom';
import { Button, Drawer, Box } from '@mui/material';

const CodeMirrorEditorPromise = import(
  '../../../components/Form/CodemirrorEditor'
);
const CodeMirrorEditor = React.lazy(() => CodeMirrorEditorPromise);

export const HtmlEditor: React.FC<{
  visible: boolean;
  setVisible: (v: boolean) => void;
}> = (props) => {
  const { visible, setVisible } = props;

  const { focusBlock, setValueByIdx } = useBlock();
  const { pageData } = useEditorContext();
  const { focusIdx } = useFocusIdx();
  const [content, setContent] = useState(focusBlock?.data.value.content);

  const isTable = focusBlock?.type === BasicType.TABLE;

  useEffect(() => {
    setContent(focusBlock?.data.value.content);
  }, [focusBlock?.data.value.content]);

  const onClose = () => {
    setVisible(false);
  };

  const onSave = () => {
    if (!focusBlock) return;
    focusBlock.data.value.content = content;
    setValueByIdx(focusIdx, { ...focusBlock });
    onClose();
  };

  const styles = useMemo(() => {
    if (!focusBlock) return {};

    const attributes = focusBlock.attributes as IText['attributes'];
    return {
      color: attributes.color || pageData.data.value['text-color'],
      fontSize: attributes['font-size'] || pageData.data.value['font-size'],
      fontFamily:
        attributes['font-family'] || pageData.data.value['font-family'],
      fontWeight:
        attributes['font-weight'] || pageData.data.value['font-weight'],
      backgroundColor: attributes['container-background-color'],
      padding: attributes.padding,
    };
  }, [focusBlock, pageData.data.value]);

  return (
    <Drawer
      anchor='right'
      sx={{
        width: "100vh",
        height: "100hv"
      }}
      variant="permanent"
      open={visible}
    >
      <Box sx={{lineHeight: '48px', display: 'block'}}>
        <Stack distribution='equalSpacing'>
          <TextStyle variation='strong' size='large'>
            Html
          </TextStyle>
          <Stack>
            <Button variant='contained' color='primary' onClick={onSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flex: 1, height: '100%' }}>
          <Suspense
            fallback={(
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#263238',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: '#fff',
                }}
              >
                Editor Loading...
              </div>
            )}
          >
            <CodeMirrorEditor value={content} onChange={setContent} />
          </Suspense>
        </div>
        <div
          style={{ flex: 1, height: '100%', overflow: 'auto', marginRight: 10 }}
        >
          <ShadowDom
            style={{
              ...styles,
              width: pageData.attributes.width || '600px',
              margin: 'auto',
            }}
          >
            {isTable ? (
              <table>
                <tbody dangerouslySetInnerHTML={{ __html: content }} />
              </table>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </ShadowDom>
        </div>
      </div>
    </Drawer>
  );
};
