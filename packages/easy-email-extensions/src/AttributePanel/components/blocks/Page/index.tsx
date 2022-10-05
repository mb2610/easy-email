import React from 'react';
import {
  ColorPickerField,
  InputWithUnitField,
  TextAreaField,
  InputField
} from '@extensions/components/Form';
import { AddFont } from '@extensions/components/Form/AddFont';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { FontFamily } from '../../attributes/FontFamily';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function Page() {
  const { focusIdx } = useFocusIdx();

  if (!focusIdx) return null;
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Stack.Item fill>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="page-content"
            id="page-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Page Setting</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid direction='column' spacing={4}>
              <InputField label='Name' name={'subject'} inline disabled />
              <InputWithUnitField disabled
                label='Width'
                name={`${focusIdx}.attributes.width`}
                inline
              />
              <InputWithUnitField disabled
                label='Breakpoint'
                helpText='Allows you to control on which breakpoint the layout should go desktop/mobile.'
                name={`${focusIdx}.data.value.breakpoint`}
                inline
              />
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="theme-content"
            id="theme-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Theme Setting</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid direction='column' spacing={1}>
              <Grid item direction='row' spacing={1}>
                <Grid sm={6}>
                  <FontFamily name={`${focusIdx}.data.value.font-family`} disabled />
                </Grid>
                <Grid sm={11}>
                  <InputWithUnitField
                    label='Font size' disabled
                    name={`${focusIdx}.data.value.font-size`}
                  />
                </Grid>
              </Grid>

              <Grid item direction='row' spacing={1}>
                <Grid sm={6}>
                  <InputWithUnitField
                    label='Line height'
                    unitOptions='percent' disabled
                    name={`${focusIdx}.data.value.line-height`}
                  />
                </Grid>
                <Grid sm={6}>
                  <InputWithUnitField
                    label='Font weight'
                    unitOptions='percent' disabled
                    name={`${focusIdx}.data.value.font-weight`}
                  />
                </Grid>
              </Grid>

              <Grid item direction='row' spacing={1}>
                <Grid sm={6}>
                  <ColorPickerField
                    label='Text color' disabled
                    name={`${focusIdx}.data.value.text-color`}
                  />
                </Grid>
                <Grid sm={6}>
                  <ColorPickerField
                    label='Background' disabled
                    name={`${focusIdx}.attributes.background-color`}
                  />
                </Grid>
              </Grid>

              <Grid item>
                <ColorPickerField
                  label='Content background' disabled
                  name={`${focusIdx}.data.value.content-background-color`}
                />
              </Grid>

              <TextAreaField
                autoSize
                label='User style' disabled
                name={`${focusIdx}.data.value.user-style.content`}
              />

              <AddFont />
            </Grid>
          </AccordionDetails>
        </Accordion>

      </Stack.Item>
    </AttributesPanelWrapper>
  );
}
