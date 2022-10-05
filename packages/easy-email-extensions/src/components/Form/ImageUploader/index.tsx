import React, { useState, useCallback, useRef, useMemo } from 'react';
import styles from './index.module.scss';
import {
  Uploader,
  UploaderServer,
} from '@extensions/AttributePanel/utils/Uploader';
import { classnames } from '@extensions/AttributePanel/utils/classnames';
import { previewLoadImage } from '@extensions/AttributePanel/utils/previewLoadImage';
import { MergeTags } from '@extensions';
import { IconFont, useEditorProps } from 'easy-email-editor';
import { Button, IconButton, CircularProgress, Grid, Modal, Popover, Menu, MenuItem } from '@mui/material';
import { PhotoCamera, RemoveRedEye, Delete, ImageSearch } from '@mui/icons-material';
import { Image } from 'mui-image'
import { Input } from '../Input';

export interface ImageUploaderProps {
  onChange: (val: string) => void;
  value: string;
  label: string;
  uploadHandler?: UploaderServer;
  autoCompleteOptions?: Array<{ value: string; label: React.ReactNode; }>;
}

export function ImageUploader(props: ImageUploaderProps) {
  const { mergeTags } = useEditorProps();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const uploadHandlerRef = useRef<UploaderServer | null | undefined>(
    props.uploadHandler
  );
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [anchorElImg, setAnchorElImg] = React.useState<null | HTMLElement>(null);
  const openImg = Boolean(anchorElImg);
  const onChange = props.onChange;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickImg= (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElImg(event.currentTarget);
  };
  const handleCloseImg = () => {
    setAnchorElImg(null);
  };
  const handleClickItemImg = (value: string) => {
    onChange(value)
    handleCloseImg();
  };

  const onUpload = useCallback(() => {
    if (isUploading) {
      return console.log('Uploading...');
    }
    if (!uploadHandlerRef.current) return;

    const uploader = new Uploader(uploadHandlerRef.current, {
      limit: 1,
      accept: 'image/*',
    });

    uploader.on('start', (photos) => {
      setIsUploading(true);

      uploader.on('end', (data) => {
        const url = data[0]?.url;
        if (url) {
          onChange(url);
        }
        setIsUploading(false);
      });
    });

    uploader.chooseFile();
  }, [isUploading, onChange]);

  const onPaste = useCallback(
    async (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!uploadHandlerRef.current) return;
      const clipboardData = e.clipboardData;

      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item.kind == 'file') {
          const blob = item.getAsFile();

          if (!blob || blob.size === 0) {
            return;
          }
          try {
            setIsUploading(true);
            const picture = await uploadHandlerRef.current(blob);
            await previewLoadImage(picture);
            props.onChange(picture);
            setIsUploading(false);
          } catch (error: any) {
            console.error(error?.message || error || 'Upload failed');
            setIsUploading(false);
          }
        }
      }
    },
    [props]
  );

  const onRemove = useCallback(() => {
    props.onChange('');
  }, [props]);

  const content = useMemo(() => {
    if (isUploading) {
      return (
        <div className={styles['item']}>
          <div className={classnames(styles['info'])}>
            <CircularProgress />
            <div className={styles['btn-wrap']} />
          </div>
        </div>
      );
    }

    if (!props.value) {
      return (
        <Button variant="contained" component="label" startIcon={<PhotoCamera  />} onClick={onUpload}>
            Upload
            <input hidden accept="image/*" multiple type="file" />
        </Button>
      );
    }

    return (
      <div className={styles['item']}>
        <div className={classnames(styles['info'])}>
          <img src={props.value} />
          <div className={styles['btn-wrap']}>
            <IconButton  title='Preview' onClick={() => setPreview(true)}>
               <RemoveRedEye />
            </IconButton>
            <IconButton  title='Remove' onClick={() => onRemove}>
               <Delete />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }, [isUploading, onRemove, onUpload, props.value]);

  if (!props.uploadHandler) {
    return <Input value={props.value} onChange={onChange} />;
  }
  const open = Boolean(anchorEl);

  return (
    <div className={styles.wrap}>
      <div className={styles['container']}>
        {content}
        <Grid style={{ width: '100%' }}>
          {mergeTags && (
            <>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <MergeTags
                  value={props.value}
                  onChange={onChange}
                />
            </Popover>
            <IconButton  onClick={handleClick}>
                <IconFont iconName='icon-merge-tags' />
            </IconButton>
            </>
          )}
          <Input
            style={{ flex: 1 }}
            onPaste={onPaste}
            value={props.value}
            onChange={onChange}
            disabled={isUploading}
          />
          {props.autoCompleteOptions && (
            <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={openImg ? 'long-menu' : undefined}
              aria-expanded={openImg ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClickImg}
            >
              <ImageSearch/>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseImg}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {
                props.autoCompleteOptions.map((item, index) => {
                  return (
                    <MenuItem key={index} onClick={() => handleClickItemImg(item.value)}>
                      <img src={item.value} style={{ width: 20, height: 20 }} />&emsp;<span>{item.label}</span>
                    </MenuItem>
                  );
                })
              }

              <MenuItem onClick={handleCloseImg}>My account</MenuItem>
              <MenuItem onClick={handleCloseImg}>Logout</MenuItem>
            </Menu>
            </>
          )}
        </Grid>
      </div>
      <Modal
         open={preview}
         onClose={() => setPreview}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Image src={props.value} showLoading />
      </Modal>
    </div>
  );
}
