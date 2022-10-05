import React, { useMemo } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  EditGridTabField,
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  InputField,
} from '@extensions/components/Form';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { FontSize } from '@extensions/AttributePanel/components/attributes/FontSize';
import { FontStyle } from '@extensions/AttributePanel/components/attributes/FontStyle';
import { FontWeight } from '@extensions/AttributePanel/components/attributes/FontWeight';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { useBlock, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { ISocial } from 'easy-email-core';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, InputAdornment } from '@mui/material';
import { ExpandMore, Link } from "@mui/icons-material";

const options = [
  {
    value: 'vertical',
    label: 'vertical',
  },
  {
    value: 'horizontal',
    label: 'horizontal',
  },
];

export function Social() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock } = useBlock();
  const value = focusBlock?.data.value as ISocial['data']['value'];
  if (!value) return null;

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
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
          <RadioGroupField
              label='Mode'
              name={`${focusIdx}.attributes.mode`}
              options={options}
            />
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
                <Color />
              </Grid>
              <Grid item>

                <ContainerBackgroundColor title='Background color' />
              </Grid>
            </Grid>
            <Grid>
              <Grid item>
                <TextDecoration />
              </Grid>
              <Grid item>
                <FontStyle />
              </Grid>
            </Grid>
          </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="item-content"
            id="item-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Social item</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <EditGridTabField
            tabPosition='top'
            name={`${focusIdx}.data.value.elements`}
            label=''
            labelHidden
            renderItem={(item: any, index: number) => (
              <SocialElement item={item} index={index} />
            )}
          />
          </AccordionDetails>
        </Accordion>

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
              <Grid>
                  <Grid>
                  <Grid>
                    <InputWithUnitField
                      label='Icon width'
                      name={`${focusIdx}.attributes.icon-size`}
                    />
                  </Grid>
                  <Grid>
                    <InputField
                      label='Border radius'
                      name={`${focusIdx}.attributes.border-radius`}
                    />
                  </Grid>
                </Grid>
                <Padding />
                <Padding attributeName='inner-padding' title='Icon padding' />
                <Padding attributeName='text-padding' title='Text padding' />
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
    </AttributesPanelWrapper>
  );
}

function SocialElement({
  index,
}: {
  item: ISocial['data']['value']['elements'][0];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage, socialIcons } = useEditorProps();

  const autoCompleteOptions = useMemo(() => {
    if (!socialIcons) return undefined;
    return socialIcons.map((icon) => {
      return {
        label: icon.content,
        value: icon.image
      };
    });
  }, [socialIcons]);

  return (
    <Grid direction='column' spacing={2}>
      <ImageUploaderField
        label='Image'
        autoCompleteOptions={autoCompleteOptions}
        labelHidden
        name={`${focusIdx}.data.value.elements.[${index}].src`}
        // helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
        uploadHandler={onUploadImage}
      />
      <Grid>
        <Grid>
          <InputField
            label='Content'
            name={`${focusIdx}.data.value.elements.[${index}].content`}
            quickchange
          />
        </Grid>
        <Grid>
          <InputField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Link />
                </InputAdornment>
              ),
            }}
            label='Link'
            name={`${focusIdx}.data.value.elements.[${index}].href`}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
