import React, { useCallback } from 'react';

import { ToolItem } from '../ToolItem';
import { IconFont } from 'easy-email-editor';
import { useFontFamily } from '@extensions/hooks/useFontFamily';
import { Menu, MenuItem } from '@mui/material'

export interface FontFamilyProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function FontFamily(props: FontFamilyProps) {
  const { fontList } = useFontFamily();
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
    execCommand('fontName', val);
    handleClose();
  }, [execCommand]);

  return (
    <>
      <ToolItem
        title='Font family'
        icon={<IconFont iconName='icon-font-family' />}
        onClick={handleClick}
      />

      <Menu
        // className='easy-email-extensions-Tools-Popover'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={visible}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 350 * 4.5,
            width: '150px',
          },
        }}
      >
        {fontList.map((option) => (
          <MenuItem key={option.value} onClick={(e) => onChange(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
