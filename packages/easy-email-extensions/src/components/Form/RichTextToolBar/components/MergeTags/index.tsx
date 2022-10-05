import React, { useCallback } from 'react';

import { MergeTags as MergeTagsOptions } from '@extensions/AttributePanel';
import { ToolItem } from '../ToolItem';
import { IconFont } from 'easy-email-editor';
import { Menu, MenuItem } from '@mui/material'

export interface MergeTagsProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function MergeTags(props: MergeTagsProps) {
  const { execCommand } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const visible = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChange = useCallback((val: string) => {
    execCommand('insertHTML', val);
    handleClose();
  }, [execCommand]);

  return (
    <>
      <ToolItem
          title='Merge tag'
          icon={<IconFont iconName='icon-merge-tags' />}
          onClick={handleClick}
        />
      <Menu
        anchorEl={anchorEl}
        open={visible}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <MergeTagsOptions
                value=''
                onChange={(value) => {
                  onChange(value)
                }}
              />
        </MenuItem>
      </Menu>
    </>
  );
}
