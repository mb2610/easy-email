import React from 'react';
import { Padding } from '../../attributes/Padding';
import { Border } from '../../attributes/Border';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Color } from '../../attributes/Color';
import { Link } from '../../attributes/Link';
import { Width } from '../../attributes/Width';
import { ContainerBackgroundColor } from '../../attributes/ContainerBackgroundColor';
import { Align } from '../../attributes/Align';
import { FontSize } from '../../attributes/FontSize';
import { FontStyle } from '../../attributes/FontStyle';
import { FontWeight } from '../../attributes/FontWeight';
import { FontFamily } from '../../attributes/FontFamily';
import { TextDecoration } from '../../attributes/TextDecoration';
import { LineHeight } from '../../attributes/LineHeight';
import { LetterSpacing } from '../../attributes/LetterSpacing';
import { InputField } from '../../../../components/Form';
import { IconFont, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { MergeTags } from '../../attributes';
import { useField } from 'react-final-form';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Switch, Popover, IconButton } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function Button() {
  const { focusIdx } = useFocusIdx();
  const { input } = useField(`${focusIdx}.data.value.content`, {
    parse: (v) => v,
  });
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { mergeTags } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <CollapseWrapper>
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
            <InputField
              label={(
                <Grid>
                  <span>Content</span>
                  {mergeTags && (
                    <>
                    <Popover
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                    <MergeTags
                          value={input.value}
                          onChange={input.onChange}
                        />
                    </Popover>
                    <IconButton  onClick={handleClick}>
                        <IconFont iconName='icon-merge-tags' />
                    </IconButton>
                    </>
                  )}
                </Grid>
              )}
              name={`${focusIdx}.data.value.content`}
            />
            <Link />
          </Grid>
          </AccordionDetails>
        </Accordion>


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
            <Grid>
              <Grid item>
                <Width />
              </Grid>
              <Grid item>
                <FontWeight />
              </Grid>
            </Grid>

            <Padding title='Padding' attributeName='padding' />
            <Padding title='Inner padding' attributeName='inner-padding' />
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
          <Grid direction='column'>
            <Grid>
              <Grid item>
                <Color title='Text color' />
              </Grid>
              <Grid item>
                <BackgroundColor title='Button color' />
              </Grid>
              <Grid item>
                <ContainerBackgroundColor title='Background color' />
              </Grid>
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
                <FontWeight />
              </Grid>
              <Grid item>
                <LineHeight />
              </Grid>
            </Grid>

            <Grid>
              <Grid item>
                <TextDecoration />
              </Grid>
              <Grid item>
                <LetterSpacing />
              </Grid>
            </Grid>
            <Align />

            <FontStyle />
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
