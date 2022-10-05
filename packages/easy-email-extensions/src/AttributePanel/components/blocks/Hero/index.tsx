import React from 'react';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import {
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  InputField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

const options = [
  {
    value: 'fluid-height',
    label: 'Fluid height',
  },
  {
    value: 'fixed-height',
    label: 'Fixed height',
  },
];

export function Hero() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <CollapseWrapper>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="dimension-content"
            id="dimension-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Dimension</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Grid direction='column'>
            <RadioGroupField
              label='Mode'
              name={`${focusIdx}.attributes.mode`}
              options={options}
            />
            <Grid>
              <Grid>
                <Width />
              </Grid>
              <Grid>
                <Height />
              </Grid>
            </Grid>

            <Padding />
            <VerticalAlign />
          </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="background-content"
            id="background-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Background</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Grid direction='column'>
            <ImageUploaderField
              label='src'
              name={`${focusIdx}.attributes.background-url`}
              helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
              uploadHandler={onUploadImage}
            />

            <Grid>
              <Grid>
                <InputWithUnitField
                  label='Background width'
                  name={`${focusIdx}.attributes.background-width`}
                />
              </Grid>
              <Grid>
                <InputWithUnitField
                  label='Background height'
                  name={`${focusIdx}.attributes.background-height`}
                />
              </Grid>
            </Grid>

            <Grid>
              <Grid>
                <InputField
                  label='Background position'
                  name={`${focusIdx}.attributes.background-position`}
                />
              </Grid>
              <Grid>
                <InputWithUnitField
                  label='Border radius'
                  name={`${focusIdx}.attributes.border-radius`}
                  unitOptions='percent'
                />
              </Grid>
              <Grid>
                <BackgroundColor />
              </Grid>
            </Grid>
          </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="extra-content"
            id="extra-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Extra</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ClassName />
          </AccordionDetails>
        </Accordion>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
