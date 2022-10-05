import { useBlock, useEditorProps } from 'easy-email-editor';
import React from 'react';
import { Form } from 'react-final-form';
import { v4 as uuidv4 } from 'uuid';
import { ImageUploaderField, TextAreaField, InputField } from '../Form';
import { Modal, Grid, Stack, Button } from '@mui/material';

export const AddToCollection: React.FC<{
  visible: boolean;
  setVisible: (v: boolean) => void;
}> = ({ visible, setVisible }) => {
  const { focusBlock: focusBlockData } = useBlock();
  const { onAddCollection, onUploadImage } = useEditorProps();

  const onSubmit = (values: {
    label: string;
    helpText: string;
    thumbnail: string;
  }) => {
    if (!values.label) return;
    const uuid = uuidv4();
    onAddCollection?.({
      label: values.label,
      helpText: values.helpText,
      data: focusBlockData!,
      thumbnail: values.thumbnail,
      id: uuid,
    });
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Form
      initialValues={{ label: '', helpText: '', thumbnail: '' }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <>
          <Modal
            open={visible}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Stack>
              <InputField
                label='Title'
                name='label'
                validate={(val: string) => {
                  if (!val) return 'Title required!';
                  return undefined;
                }}
              />
              <TextAreaField label='Description' name='helpText' rows={4} />
              <ImageUploaderField
                label='Thumbnail'
                name={'thumbnail'}
                uploadHandler={onUploadImage}
                validate={(val: string) => {
                  if (!val) return 'Thumbnail required!';
                  return undefined;
                }}
              />
                <Grid>
                  <Button onClick={() => handleSubmit()}>OK</Button>
                  <Button onClick={() => handleClose()}>Cancel</Button>
                </Grid>
              </Stack>
          </Modal>
        </>
      )}
    </Form>
  );
};
