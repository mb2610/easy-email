import React from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';

import { Padding } from '../../attributes/Padding';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Color } from '../../attributes/Color';
import { TextAreaField } from '../../../../components/Form';
import { FontSize } from '../../attributes/FontSize';
import { FontWeight } from '../../attributes/FontWeight';
import { FontFamily } from '../../attributes/FontFamily';
import { LineHeight } from '../../attributes/LineHeight';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";


export function AccordionText() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper>

      <Accordion>
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
            <TextAreaField
              label='Content'
              name={`${focusIdx}.data.value.content`}
            />

            <Color />
                <Color />
                <BackgroundColor />
                <FontSize />
                <FontFamily />
                <LineHeight />
                <FontWeight />
                <BackgroundColor />
            <Padding title='Padding' attributeName='padding' />

            </Grid>
          </AccordionDetails>
        </Accordion>
    </AttributesPanelWrapper>
  );
}
