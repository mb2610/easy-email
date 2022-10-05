import React, { useEffect } from 'react';
import { AttributePanel } from '@extensions/AttributePanel';
import { SourceCodePanel } from '@extensions/SourceCodePanel';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import { ChevronLeft } from '@mui/icons-material'
import { Box, List, ListItem, ListSubheader, IconButton, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from "@mui/lab"

export interface ConfigurationPanelProps {
  showSourceCode: boolean;
  height: string;
  onBack?: () => void;
  compact?: boolean;
}

export function ConfigurationPanel({
  showSourceCode,
  height,
  onBack,
  compact,
}: ConfigurationPanelProps) {
  const [value, setValue] = React.useState<string>();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setValue('1');
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!value) return null;

  return (
    <>
    {showSourceCode ? (
      <List
        sx={{ width: '100%'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={!compact && <ListSubheader component="div" id="nested-list-subheader">
          <IconButton onClick={onBack}>
            <ChevronLeft />
          </IconButton>
        </ListSubheader>}
      >
        <ListItem>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="Configurator Panel">
                <Tab label="Configuration" value="1" />
                <Tab label="Source code" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
                  <AttributePanel />
                </FullHeightOverlayScrollbars>
            </TabPanel>
            <TabPanel value="2">
              <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
                  <SourceCodePanel />
                </FullHeightOverlayScrollbars>
            </TabPanel>
          </TabContext>
        </ListItem>
      </List>

      ) : (
        <AttributePanel />
      )}
    </>
  );
}
