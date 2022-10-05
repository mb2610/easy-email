import React, { useCallback } from 'react';

import { ToolItem } from '../ToolItem';
import { IconFont } from 'easy-email-editor';
import { Menu, MenuItem } from '@mui/material'

const list = [
  {
    value: '1',
    label: '12px',
  },
  {
    value: '2',
    label: '13px',
  },
  {
    value: '3',
    label: '16px',
  },
  {
    value: '4',
    label: '18px',
  },
  {
    value: '5',
    label: '24px',
  },
  {
    value: '6',
    label: '32px',
  },
  {
    value: '7',
    label: '48px',
  },
];

export interface FontSizeProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function FontSize(props: FontSizeProps) {
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
    execCommand('fontSize', val);
    handleClose();
  }, [execCommand]);

  return (
    <>
     <ToolItem
        title='Font size'
        icon={<IconFont iconName='icon-font-color' />}
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
        {list.map((option) => (
          <MenuItem key={option.value} onClick={(e) => onChange(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

}
