import React, { useCallback }  from 'react';

import { ToolItem } from '../ToolItem';
import { IconFont } from 'easy-email-editor';
import { Menu, MenuItem } from '@mui/material'

const list = [
  {
    value: 'H1',
    label: 'H1',
  },
  {
    value: 'H2',
    label: 'H2',
  },
  {
    value: 'H3',
    label: 'H3',
  },
  {
    value: 'H4',
    label: 'H4',
  },
  {
    value: 'H5',
    label: 'H5',
  },
  {
    value: 'H6',
    label: 'H6',
  },
  {
    value: 'P',
    label: 'Paragraph',
  },
];

export interface HeadingProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function Heading(props: HeadingProps) {
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
        title='Heading'
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