import { useBlock, useFocusIdx } from 'easy-email-editor';
import { AdvancedBlock, AdvancedType } from 'easy-email-core';
import { InputField } from '@extensions/components/Form';
import React, { useCallback } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Switch } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function Iteration() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change } = useBlock();
  const iteration = focusBlock?.data.value?.iteration as
    | undefined
    | AdvancedBlock['data']['value']['iteration'];

  const enabled = Boolean(iteration && iteration.enabled);

  const onIterationToggle = useCallback(
    (enabled: boolean) => {
      if (enabled) {
        if (!iteration) {
          change(`${focusIdx}.data.value.iteration`, {
            enabled: true,
            dataSource: '',
            itemName: 'item',
            limit: 9999,
            mockQuantity: 1,
          } as AdvancedBlock['data']['value']['iteration']);
        }
      }
      change(`${focusIdx}.data.value.iteration.enabled`, enabled);
    },
    [change, focusIdx, iteration]
  );

  if (
    !focusBlock?.type ||
    !Object.values(AdvancedType).includes(focusBlock?.type as any)
  ) {
    return null;
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="iteration-content"
        id="iteration-header"
        sx={{
          backgroundColor: '#CCC'
        }}
      >
        <Typography>Iteration</Typography>
        <div style={{ marginRight: 10 }}>
          <Switch checked={iteration?.enabled} onChange={(e) => onIterationToggle(e.target.checked)} />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {iteration?.enabled && (
         <Grid direction='row'>
            <Grid direction='column'>
              <InputField
                label='Data source'
                name={`${focusIdx}.data.value.iteration.dataSource`}
              />
              <InputField
                label='Item name'
                name={`${focusIdx}.data.value.iteration.itemName`}
              />
            </Grid>
            <Grid direction='column'>
              <InputField
                label='Limit'
                name={`${focusIdx}.data.value.iteration.limit`}
                quickchange
                type='number'
                onChangeAdapter={(v) => Number(v)}
              />
              <InputField
                label='Mock quantity'
                max={iteration?.limit}
                name={`${focusIdx}.data.value.iteration.mockQuantity`}
                quickchange
                type='number'
                onChangeAdapter={(v) => Number(v)}
              />
            </Grid>
         </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
