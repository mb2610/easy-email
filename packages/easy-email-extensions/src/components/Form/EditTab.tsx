import React from 'react';
import { Box, Tab, IconButton } from '@mui/material'
import { Delete, Add } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from "@mui/lab"

export interface EditTabProps<T> {
  value: Array<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
  onChange: (vals: Array<T>) => any;
  additionItem: T;
  label: string;
}
export function EditTab<T extends any = any>(props: EditTabProps<T>) {
  const { value, additionItem } = props;
  const [activeTab, setActiveTab] = React.useState<string>('0');

  const onAddTab = () => {
    setActiveTab((value.length).toString());
    props.onChange([...value, additionItem]);
  };

  const onDeleteTab = (index: string) => {
    if (index < activeTab) {
      setActiveTab((Number(activeTab) - 1).toString());
    }
    if (index === activeTab) {
      setActiveTab(Number(index) > 0 ? `${Number(index) - 1}` : '0');
    }
    props.onChange(value.filter((_, vIndex) => Number(index) !== vIndex));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if(newValue == 'last')
      onAddTab()
    else
      setActiveTab(newValue);
  };

  return (
    <TabContext value={activeTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="Configurator Panel">
          {(Array.isArray(value) ? value : []).map((_, index) =>  (
            <Tab key={index} label={(<>
              <span>{`${props.label || 'Tab'} ${index + 1}`}</span>
              <IconButton onClick={() => onDeleteTab('' + index)}><Delete /></IconButton>
            </>)} value={index} />
          ))}
          <Tab label={(<Add />)} value='last' />
        </TabList>
      </Box>
      {(Array.isArray(value) ? value : []).map((item, index) => (
        <TabPanel key={index} value={'' + index} sx={{ height: 500, overflow: 'auto' }}>
            {props.renderItem(item, index)}
        </TabPanel>
      ))}
  </TabContext>
  );
}