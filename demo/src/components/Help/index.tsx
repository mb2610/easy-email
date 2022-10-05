import React from 'react';
import { QuestionAnswerRounded } from '@mui/icons-material';
import { Tooltip, TooltipProps } from '@mui/material';

export function Help(props: TooltipProps) {
  return (
    <Tooltip {...{ ...props, style: undefined }}>
      <QuestionAnswerRounded />
    </Tooltip>
  );
}
