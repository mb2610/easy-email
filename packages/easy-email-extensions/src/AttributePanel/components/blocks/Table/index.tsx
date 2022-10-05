import { AttributesPanelWrapper } from '@extensions/AttributePanel';
import { Stack } from 'easy-email-editor';
import React, { useState } from 'react';
import { Border } from '../../attributes/Border';
import { Color } from '../../attributes/Color';
import { ContainerBackgroundColor } from '../../attributes/ContainerBackgroundColor';
import { FontFamily } from '../../attributes/FontFamily';
import { FontSize } from '../../attributes/FontSize';
import { FontStyle } from '../../attributes/FontStyle';
import { Padding } from '../../attributes/Padding';
import { TextAlign } from '../../attributes/TextAlign';
import { Width } from '../../attributes/Width';
import { HtmlEditor } from '../../UI/HtmlEditor';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip, IconButton } from '@mui/material';
import { ExpandMore, HtmlOutlined } from "@mui/icons-material";

export function Table() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={(
        <Tooltip title="Edit">
        <IconButton onClick={() => setVisible(true)}>
          <HtmlOutlined />
        </IconButton>
      </Tooltip>
      )}
    >
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
          <Stack>
            <Width />
            <Stack.Item />
          </Stack>
          <Stack vertical>
            <Padding />
          </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="Decoration-content"
            id="Decoration-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Decoration</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Color />
          <ContainerBackgroundColor />
          <Border />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="Typography-content"
            id="Typography-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Typography</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Stack>
            <FontFamily />
            <FontSize />
          </Stack>
          <FontStyle />
          <TextAlign />
          </AccordionDetails>
        </Accordion>




      </CollapseWrapper>
      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}
