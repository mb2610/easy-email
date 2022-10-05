import { useBlock, useFocusIdx } from 'easy-email-editor';
import { AdvancedBlock, OperatorSymbol, AdvancedType, Operator, ICondition, IConditionGroup } from 'easy-email-core';
import { SelectField, InputField } from '@extensions/components/Form';
import React, { useCallback } from 'react';
import { cloneDeep, get, upperFirst } from 'lodash';
import { Delete, Add, ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Switch, IconButton, List, ListItem, Divider } from '@mui/material';
import { useField } from 'react-final-form';

export function Condition() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change, values } = useBlock();
  const condition = focusBlock?.data.value?.condition as
    | undefined
    | AdvancedBlock['data']['value']['condition'];

  const enabled = Boolean(condition && condition.enabled);

  const onConditionToggle = useCallback(
    (enabled: boolean) => {
      if (enabled) {
        if (!condition) {
          change(`${focusIdx}.data.value.condition`, {
            enabled: true,
            symbol: OperatorSymbol.AND,
            groups: [
              {
                symbol: OperatorSymbol.AND,
                groups: [
                  {
                    left: '',
                    operator: Operator.TRUTHY,
                    right: ''
                  }
                ],
              }
            ] as unknown[],
          } as ICondition);
        }
      }
      change(`${focusIdx}.data.value.condition.enabled`, enabled);
    },
    [change, condition, focusIdx]
  );

  const onAddCondition = useCallback((path: string) => {
    const groups = get(values, path) as IConditionGroup[];

    groups.push({
      symbol: OperatorSymbol.AND,
      groups: [
        {
          left: '',
          operator: Operator.TRUTHY,
          right: ''
        }
      ],
    });
    change(path, [...groups]);
  }, [change, values]);

  const onAddSubCondition = useCallback((path: string) => {
    const groups = get(values, path) as IConditionGroup['groups'];

    groups.push({
      left: '',
      operator: Operator.TRUTHY,
      right: ''

    });
    change(path, [...groups]);
  }, [change, values]);

  // content.children.[0].children.[0].data.value.condition.groups.1.groups
  const onDelete = useCallback((path: string, gIndex: number, ggIndex: number) => {
    if (!condition) return;
    const subPath = `${path}.${gIndex}.groups`;
    const groups = cloneDeep(get(values, path)) as any[];
    const subGroups = cloneDeep(get(values, subPath)) as any[];

    subGroups.splice(ggIndex, 1);
    if (subGroups.length === 0) {
      if (groups.length === 1) {
        console.error('At least one condition');
        return;
      }
      // remove empty array
      groups.splice(gIndex, 1);
      change(path, [...groups]);
    } else {
      change(subPath, [...subGroups]);
    }

  }, [change, condition, values]);

  if (
    !focusBlock?.type ||
    !Object.values(AdvancedType).includes(focusBlock?.type as any)
  ) {
    return null;
  }

  const isEmpty = !condition?.groups.length;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="condition-content"
        id="condition-header"
        sx={{
          backgroundColor: '#CCC'
        }}
      >
        <Typography>Condition</Typography>
        <div style={{ marginRight: 10 }}>
          <Switch checked={condition?.enabled} onChange={(e) => onConditionToggle(e.target.checked)} />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {condition?.enabled && (<>
         <nav aria-label="main mailbox header">
           <List>
             <ListItem disablePadding>
                <Grid direction='row' justifyContent='space-between'>
                    <Grid item sm={8}>
                      {condition.groups.length > 1 && (
                        <SelectField inline name={`${focusIdx}.data.value.condition.symbol`}
                          label="Symbol"
                          options={[
                            {
                              label: 'And',
                              value: OperatorSymbol.AND
                            },
                            {
                              label: 'Or',
                              value: OperatorSymbol.OR
                            },
                          ]}
                        />
                      )}
                    </Grid>
                    <IconButton color="secondary" aria-label="add" component="label" onClick={() => onAddCondition(`${focusIdx}.data.value.condition.groups`)}>
                      <Add />
                    </IconButton>
                </Grid>
             </ListItem>
           </List>
         </nav>
         <Divider />
         {condition.groups.map((group, gIndex) => (
          <>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <List>
                  {group.groups.map((group, ggIndex) => (
                    <ListItem disablePadding>
                      <ConditionItem
                        allowDelete={condition.groups.length > 1 || condition.groups[0].groups.length > 1}
                        onDelete={onDelete}
                        path={`${focusIdx}.data.value.condition.groups`}
                        gIndex={gIndex}
                        ggIndex={ggIndex}
                        key={ggIndex}
                      />
                      </ListItem>
                  ))}
            </List>
          </nav>
          </>
          ))}
         </>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

const options = Object.values(Operator).map(item => ({ label: upperFirst(item), value: item }));

function ConditionItem({ path, onDelete, gIndex, ggIndex, allowDelete }: { path: string; gIndex: number; ggIndex: number; allowDelete: boolean; onDelete: (path: string, gIndex: number, ggIndex: number,) => void; }) {

  const name = `${path}.${gIndex}.groups.${ggIndex}`;
  const { input: { value } } = useField(name);

  const hideRight = value.operator === Operator.TRUTHY || value.operator === Operator.FALSY;

  return (
    <Grid direction='row' alignContent='flex-end'>
      <Grid item sm={3}> <InputField label="Variable path" name={`${name}.left`} /></Grid>
      <Grid item sm={3}> <SelectField label="Operator" name={`${name}.operator`} options={options} /></Grid>
      <Grid item sm={3}> {!hideRight && <InputField label="Right" name={`${name}.right`} />}</Grid>
      <Grid item sm={3}>
        <IconButton color="secondary" aria-label="add" component="label" onClick={() => onDelete(path, gIndex, ggIndex)} disabled={!allowDelete}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
}