import { useEditorProps, useFocusIdx } from 'easy-email-editor';
import React, { useEffect } from 'react';
import { InteractivePrompt } from '../InteractivePrompt';
import { MergeTagBadgePrompt } from '@extensions/MergeTagBadgePrompt';
import { EditPanel } from '../EditPanel';
import { ConfigurationPanel } from '@extensions/ConfigurationPanel';
import {
  ExtensionProps,
  ExtensionProvider,
} from '@extensions/components/Providers/ExtensionProvider';
import { AdvancedType } from 'easy-email-core';
import { Box, Stack } from '@mui/material'

const defaultCategories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
      {
        type: AdvancedType.NAVBAR,
      },
      {
        type: AdvancedType.CAROUSEL,
      }
    ],
  },
  {
    label: 'Layout',
    active: true,
    displayType: 'column',
    blocks: [
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        title: '4 columns',
        payload: [[['25%', '25%', '25%', '25%']]],
      },
    ],
  },
];

export const StandardLayout: React.FC<ExtensionProps> = props => {
  const { height: containerHeight } = useEditorProps();
  const { showSourceCode = true, compact = true, categories = defaultCategories } = props;

  const { setFocusIdx } = useFocusIdx();

  useEffect(() => {
    if (!compact) {
      setFocusIdx('');
    }
  }, [compact, setFocusIdx]);

  return (
    <ExtensionProvider
      {...props}
      categories={categories}
    >
      <Stack
        direction='row'
        spacing={0}
        className='StandardLayout'
        sx={{
            width: '100vw',
            overflow: 'hidden',
          }}
      >

          {compact && <EditPanel />}

          <Box sx={{ height: containerHeight, flex: 1 }}>{props.children}</Box>

          {!compact && <EditPanel />}

          {compact && (
            <Box
              sx={{
                height: containerHeight,
                minWidth: 300,
                maxWidth: 350,
                width: 350,
                border: 1
              }}
            >
              <ConfigurationPanel
                compact={compact}
                height={containerHeight}
                showSourceCode={showSourceCode}
              />
            </Box>
          )}
      </Stack>
      <InteractivePrompt />
      <MergeTagBadgePrompt />
    </ExtensionProvider>
  );
};
