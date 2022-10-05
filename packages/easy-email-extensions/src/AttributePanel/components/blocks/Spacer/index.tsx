import React from 'react';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Stack } from 'easy-email-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function Spacer() {
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
            <Grid direction='column' spacing={2}>
              <Grid item>
                <Height />
              </Grid>
              <Grid item>
                <Padding />
              </Grid>
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
            <ContainerBackgroundColor title='Background color' />
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
