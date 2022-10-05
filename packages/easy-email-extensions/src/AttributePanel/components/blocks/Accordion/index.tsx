import React from 'react';
import { useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  SelectField,
  InputField,
} from '@extensions/components/Form';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";


const positionOptions = [
  {
    value: 'left',
    label: 'Left',
  },
  {
    value: 'right',
    label: 'Right',
  },
];

const alignOptions = [
  {
    value: 'top',
    label: 'top',
  },
  {
    value: 'middle',
    label: 'middle',
  },
  {
    value: 'bottom',
    label: 'bottom',
  },
];

export function Accordion() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <CollapseWrapper>
        <MuiAccordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="setting-content"
            id="setting-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Setting</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
            <Grid>
              <Grid item>
                <BackgroundColor />
              </Grid>
              <Grid item>
                <FontFamily />
              </Grid>
            </Grid>

            <Padding />

            <Grid>
              <Grid item>
                <InputWithUnitField
                  label='Icon width'
                  name={`${focusIdx}.attributes.icon-width`}
                />
              </Grid>
              <Grid item>
                <InputWithUnitField
                  label='Icon height'
                  name={`${focusIdx}.attributes.icon-height`}
                />
              </Grid>
            </Grid>

            <Grid>
              <Grid item>
                <ImageUploaderField
                  label='Unwrapped icon'
                  name={`${focusIdx}.attributes.icon-unwrapped-url`}
                  // helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
                  uploadHandler={onUploadImage}
                />
              </Grid>
              <Grid item>
                <ImageUploaderField
                  label='Wrapped icon'
                  name={`${focusIdx}.attributes.icon-wrapped-url`}
                  uploadHandler={onUploadImage}
                />
              </Grid>
            </Grid>

            <Grid>
              <Grid item>
                <RadioGroupField
                  label='Icon position'
                  name={`${focusIdx}.attributes.icon-position`}
                  options={positionOptions}
                />
              </Grid>
              <Grid item>
                <SelectField
                  style={{ width: 120 }}
                  label='Icon align'
                  name={`${focusIdx}.attributes.icon-align`}
                  options={alignOptions}
                />
              </Grid>
            </Grid>

            <InputField label='border' name={`${focusIdx}.attributes.border`} />
            </Grid>
          </AccordionDetails>
        </MuiAccordion>

        <MuiAccordion>
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
        </MuiAccordion>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
