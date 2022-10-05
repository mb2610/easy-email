import React from 'react';
import { IconButton, Tooltip, TooltipProps } from '@mui/material';
import { HelpRounded } from '@mui/icons-material';

export interface HelpProps extends Omit<TooltipProps, 'children'> {
  // Partial<{ style: Partial<React.CSSProperties> }> & {
  //   title: React.ReactNode;
  // }
}

export function Help(props: HelpProps) {
  return (
    <Tooltip {...props}>
      <IconButton>
        <HelpRounded />
      </IconButton>
    </Tooltip>
  );
}
