import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Background } from '@extensions/AttributePanel/components/attributes/Background';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { useCallback } from 'react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { useBlock } from 'easy-email-editor';
import { BasicType, BlockManager } from 'easy-email-core';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Switch, FormControlLabel } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function Section() {
  const { focusBlock, setFocusBlock } = useBlock();

  const noWrap = focusBlock?.data.value.noWrap;

  const onChange = useCallback((checked) => {
    if (!focusBlock) return;
    focusBlock.data.value.noWrap = checked;
    if (checked) {
      const children = [...focusBlock.children];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child) continue;
        if (child.type === BasicType.GROUP) {
          children.splice(i, 1, ...child.children);
        }
      }
      focusBlock.children = [
        BlockManager.getBlockByType(BasicType.GROUP)!.create({
          children: children,
        }),
      ];
    } else {
      if (
        focusBlock.children.length === 1 &&
        focusBlock.children[0].type === BasicType.GROUP
      ) {
        focusBlock.children = focusBlock.children[0]?.children || [];
      }
    }
    setFocusBlock({ ...focusBlock });
  }, [focusBlock, setFocusBlock]);

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
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
                  <FormControlLabel control={<Switch defaultChecked={noWrap} />} label="Group" />
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
            <Background />
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
            <Border />
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
