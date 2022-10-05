import { Uploader } from '@extensions/AttributePanel/utils/Uploader';
import React, { useEffect, useRef, useState } from 'react';
import { TextField, InputAdornment, CircularProgress  } from '@mui/material';
import { Upload  } from '@mui/icons-material';

export interface UploadFieldProps {
  onChange: (val: string) => void;
  value: string;
  inputDisabled?: boolean;
  accept?: string;
  uploadHandler: (file: File) => Promise<string>;
}

export function UploadField(props: UploadFieldProps) {
  const { onChange, inputDisabled = false, accept, uploadHandler } = props;
  const [loading, setLoading] = useState(false);
  const { current: uploader } = useRef(
    new Uploader(uploadHandler, {
      limit: 1,
      accept,
    })
  );

  useEffect(() => {
    uploader.on('start', () => {
      setLoading(true);
      uploader.on('end', (photos) => {
        setLoading(false);
        onChange(
          photos
            .filter((item) => item.status === 'done')
            .map((item) => item.url)[0] || ''
        );
      });
    });
  }, [onChange, uploader]);

  const onClick = () => {
    if (loading) return;
    uploader.chooseFile();
  };

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            loading ? <CircularProgress /> : <Upload onClick={onClick} />
          </InputAdornment>
        ),
      }}
      value={props.value}
      onChange={inputDisabled ? undefined : (e) => onChange(e.target.value)}
    />
  );
}
