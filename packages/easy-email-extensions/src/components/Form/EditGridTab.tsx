import { cloneDeep } from 'lodash';
import React from 'react';
import { Box, Tab, IconButton } from '@mui/material'
import { Delete, Add } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from "@mui/lab"

export interface EditGridTabProps<T extends any = any> {
  value: Array<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
  onChange: (vals: Array<T>) => any;
  additionItem?: T;
  label: string;
}
export function EditGridTab<T extends any = any>(props: EditGridTabProps<T>) {
  const { value, additionItem } = props;
  const [activeTab, setActiveTab] = React.useState<string>('' + value);

  const onAdd = (index: number) => {
    let newItem = additionItem || cloneDeep(value[index]);
    value.splice(index + 1, 0, newItem);
    setActiveTab('' + (index + 1))
    props.onChange([...value]);
  };

  const onDelete = (index: number) => {
    props.onChange(value.filter((_, vIndex) => Number(index) !== vIndex));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <TabContext value={activeTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="Configurator Panel">
          {(Array.isArray(value) ? value : []).map((_, index) =>  (
            <Tab key={index} label={(<>
              <span>{`${props.label || 'Item'} ${index + 1}`}</span>
              <IconButton onClick={() => onAdd(index)}><Add /></IconButton>
              <IconButton onClick={() => onDelete(index)}><Delete /></IconButton>
            </>)} value={index} />
          ))}
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
