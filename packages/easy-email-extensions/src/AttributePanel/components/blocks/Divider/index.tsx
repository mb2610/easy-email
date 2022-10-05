import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { BorderWidth } from '@extensions/AttributePanel/components/attributes/BorderWidth';
import { BorderStyle } from '@extensions/AttributePanel/components/attributes/BorderStyle';
import { BorderColor } from '@extensions/AttributePanel/components/attributes/BorderColor';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Stack } from 'easy-email-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function Divider() {
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
                <Width unitOptions='percent' />
              </Grid>
              <Align />
              <Padding />
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="border-content"
            id="border-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Border</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack wrap={false} spacing='tight'>
              <div style={{ width: 50 }}>
                <BorderWidth />
              </div>
              <div style={{ width: 100 }}>
                <BorderStyle />
              </div>
              <div style={{ width: 100 }}>
                <BorderColor />
              </div>
            </Stack>
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
            <ContainerBackgroundColor />
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
