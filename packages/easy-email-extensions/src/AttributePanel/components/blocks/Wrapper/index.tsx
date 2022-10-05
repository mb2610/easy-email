import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes//Padding';
import { Background } from '@extensions/AttributePanel/components/attributes//Background';
import { InputField } from '@extensions/components/Form';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function Wrapper() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper>

      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="Dimension-content"
            id="Dimension-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Dimension</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Stack vertical spacing='tight'>
            <Padding />
          </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="Background-content"
            id="Background-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Background</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Stack vertical spacing='tight'>
            <Background />
          </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="Border-content"
            id="Border-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Border</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Stack vertical spacing='tight'>
            <InputField
              label='Border'
              name={`${focusIdx}.attributes.border`}
              inline
            />
            <InputField
              label='Background border radius'
              name={`${focusIdx}.attributes.border-radius`}
              inline
            />
          </Stack>
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
