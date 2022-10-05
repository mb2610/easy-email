import { useEditorProps } from 'easy-email-editor';
import React from 'react';
import { Blocks } from './Blocks';
import { BlockLayer } from '@extensions/BlockLayer';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import { ConfigurationDrawer } from './ConfigurationDrawer';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from "@mui/lab"

export function EditPanel() {
  const { height } = useEditorProps();
  const { compact = true } = useExtensionProps();
  const [value, setValue] = React.useState<string>('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        minWidth: '360px',
        width: '360px',
        border: 1,
        position: 'relative'
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Configurator Panel">
            <Tab label="Block" value="1" />
            <Tab label="Layer" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
              <Blocks />
            </FullHeightOverlayScrollbars>
        </TabPanel>
        <TabPanel value="2">
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <div style={{ padding: 20 }}>
                <BlockLayer />
              </div>
            </FullHeightOverlayScrollbars>
        </TabPanel>
      </TabContext>

      {!compact && (
        <ConfigurationDrawer height={height} compact={Boolean(compact)} />
      )}
    </Box>
  );
}
