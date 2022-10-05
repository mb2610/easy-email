import React, { useState } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { FontWeight } from '@extensions/AttributePanel/components/attributes/FontWeight';
import { FontStyle } from '@extensions/AttributePanel/components/attributes/FontStyle';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { FontSize } from '@extensions/AttributePanel/components/attributes/FontSize';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { LetterSpacing } from '@extensions/AttributePanel/components/attributes/LetterSpacing';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { IconFont } from 'easy-email-editor';
import { HtmlEditor } from '../../UI/HtmlEditor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, IconButton, Tooltip } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function Text() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={(
        <Tooltip arrow title='Html mode'>
          <IconButton  onClick={() => setVisible(true)}>
              <IconFont iconName='icon-html' />
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
          <Grid direction='column'>
            <Height />
            <Padding />
          </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="Color-content"
            id="Color-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Color</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Grid>
            <Grid item>
              <Color />
            </Grid>
            <Grid item>
              <ContainerBackgroundColor title='Background color' />
            </Grid>
          </Grid>
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
          <Grid direction='column'>
            <Grid>
              <Grid item>
                <FontFamily />
              </Grid>
              <Grid item>
                <FontSize />
              </Grid>
            </Grid>

            <Grid>
              <Grid item>
                <LineHeight />
              </Grid>
              <Grid item>
                <LetterSpacing />
              </Grid>
            </Grid>

            <Grid>
              <Grid item>
                <TextDecoration />
              </Grid>
              <Grid item>
                <FontWeight />
              </Grid>
            </Grid>

            <Align />

            <FontStyle />

            <Grid>
              <Grid item />
              <Grid item />
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
      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}
