import React from 'react';
import {
  ColorPickerField,
  EditTabField,
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  SelectField,
  InputField,
} from '@extensions/components/Form';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { ICarousel } from 'easy-email-core';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, InputAdornment } from '@mui/material';
import { ExpandMore, Link } from "@mui/icons-material";

const options = [
  {
    value: 'hidden',
    label: 'hidden',
  },
  {
    value: 'visible',
    label: 'visible',
  },
];

export function Carousel() {
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
          <Grid direction='column'>
            <InputWithUnitField
              label='Thumbnail width'
              name={`${focusIdx}.attributes.tb-width`}
              quickchange
              inline
            />

            <RadioGroupField
              label='Thumbnails'
              name={`${focusIdx}.attributes.thumbnails`}
              options={options}
              inline
            />
            <Align inline />
          </Grid>
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="Images-content"
            id="Images-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Images</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Stack vertical spacing='tight'>
            <EditTabField
              tabPosition='top'
              name={`${focusIdx}.data.value.images`}
              label=''
              labelHidden
              renderItem={(item: any, index: number) => (
                <CarouselImage item={item} index={index} />
              )}
              additionItem={{
                src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
                target: '_blank',
              }}
            />
          </Stack>
          </AccordionDetails>
        </Accordion>

<Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="Icon-content"
            id="Icon-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Icon</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Grid>
            <Grid item>
              <InputField
                label='Left icon'
                name={`${focusIdx}.attributes.left-icon`}
              />
            </Grid>
            <Grid item>
              <InputField
                label='Right icon'
                name={`${focusIdx}.attributes.right-icon`}
              />
            </Grid>
          </Grid>

          <Grid>
            <InputWithUnitField
                label='Icon width'
                name={`${focusIdx}.attributes.icon-width`}
              />
          </Grid>
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
          <Grid>
            <Grid item>
              <ColorPickerField
                label='Hovered border'
                name={`${focusIdx}.attributes.tb-hover-border-color`}
                alignment='center'
              />
            </Grid>
            <Grid item>
              <ColorPickerField
                label='Selected Border'
                name={`${focusIdx}.attributes.tb-selected-border-color`}
                alignment='center'
              />
            </Grid>
          </Grid>
          <Grid>
            <Grid item>
              <InputField
                label='Border of the thumbnails'
                name={`${focusIdx}.attributes.tb-border`}
              />
            </Grid>
            <Grid item>
              <InputField
                label='Border radius of the thumbnails'
                name={`${focusIdx}.attributes.tb-border-radius`}
              />
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
    </AttributesPanelWrapper>
  );
}

function CarouselImage({
  item,
  index,
}: {
  item: ICarousel['data']['value']['images'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  return (
    <Grid direction='column'>
      <ImageUploaderField
        label='Image'
        labelHidden
        name={`${focusIdx}.data.value.images.[${index}].src`}
        helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
        uploadHandler={onUploadImage}
      />
      <Grid>
        <Grid item>
          <InputField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Link />
                </InputAdornment>
              ),
            }}
            label='Url'
            name={`${focusIdx}.data.value.images.[${index}].href`}
          />
        </Grid>
        <Grid item>
          <SelectField
            label='Target'
            name={`${focusIdx}.data.value.images.[${index}].target`}
            options={[
              {
                value: '',
                label: '_self',
              },
              {
                value: '_blank',
                label: '_blank',
              },
            ]}
          />
        </Grid>
      </Grid>

      <InputField
        label='Title'
        name={`${focusIdx}.data.value.image.[${index}].title`}
      />
    </Grid>
  );
}
