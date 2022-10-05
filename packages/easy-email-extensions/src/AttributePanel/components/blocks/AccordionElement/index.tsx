import React from 'react';
import { Border } from '../../attributes/Border';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { FontFamily } from '../../attributes/FontFamily';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function AccordionElement() {
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
          <Grid direction='column'>
          <Border />
            <BackgroundColor />
            <FontFamily />
          </Grid>
          </AccordionDetails>
        </Accordion>
    </AttributesPanelWrapper>
  );
}
