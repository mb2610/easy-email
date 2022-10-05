import React from 'react';
import {
  ColorPickerField,
  EditTabField,
  SelectField,
  InputField,
} from '@extensions/components/Form';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { NavbarLinkPadding } from '@extensions/AttributePanel/components/attributes/NavbarLinkPadding';
import { useFocusIdx } from 'easy-email-editor';
import { INavbar } from 'easy-email-core';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { FontFamily, FontStyle, FontWeight, LetterSpacing, LineHeight, TextDecoration, TextTransform } from '../../attributes';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, InputAdornment } from '@mui/material';
import { ExpandMore, Link } from "@mui/icons-material";


export function Navbar() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="layout-content"
            id="layout-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Layout</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Align />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="nav-content"
            id="nav-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Navbar links</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <EditTabField
              tabPosition='top'
              name={`${focusIdx}.data.value.links`}
              label='Links'
              labelHidden
              renderItem={(item: any, index: number) => (
                <NavbarLink item={item} index={index} />
              )}
              additionItem={{
                src: 'http://www.site.com',
                target: '_blank',
                content: 'New link',
                color: '#1890ff',
                'font-size': '13px',
              }}
            />
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

function NavbarLink({
  item,
  index,
}: {
  item: INavbar['data']['value']['links'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  return (
    <div className='NavbarLink'>
      <Grid direction='column' style={{ width: '100%' }}>

        <Grid>
          <Grid item>
            <InputField
              label='Content'
              name={`${focusIdx}.data.value.links.[${index}].content`}
            />
          </Grid>
          <Grid item>
            <ColorPickerField
              label='Color'
              name={`${focusIdx}.data.value.links.[${index}].color`}
              alignment='center'
            />
          </Grid>
        </Grid>

        <Grid>
          <Grid item>

            <FontFamily name={`${focusIdx}.data.value.links.[${index}].font-family`} />
          </Grid>
          <Grid item>
            <InputField
              label='Font size'
              quickchange
              name={`${focusIdx}.data.value.links.[${index}].font-size`}
            />
          </Grid>
        </Grid>

        <Grid>
          <Grid item>
            <LineHeight name={`${focusIdx}.data.value.links.[${index}].line-height`} />
          </Grid>
          <Grid item>
            <LetterSpacing name={`${focusIdx}.data.value.links.[${index}].letter-spacing`} />
          </Grid>
        </Grid>

        <Grid>
          <Grid item>
            <TextDecoration name={`${focusIdx}.data.value.links.[${index}].text-decoration`} />
          </Grid>
          <Grid item>
            <FontWeight name={`${focusIdx}.data.value.links.[${index}].font-weight`} />
          </Grid>
        </Grid>

        <Grid>
          <Grid item>
            <TextTransform name={`${focusIdx}.data.value.links.[${index}].text-transform`} />
          </Grid>
          <Grid item />
        </Grid>
        <FontStyle name={`${focusIdx}.data.value.links.[${index}].font-style`} />
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
              label={<span>Url</span>}
              name={`${focusIdx}.data.value.links.[${index}].href`}
            />
          </Grid>
          <Grid item>
            <SelectField
              style={{ minWidth: 65 }}
              label='Target'
              name={`${focusIdx}.data.value.links.[${index}].target`}
              options={[
                {
                  value: '_blank',
                  label: '_blank',
                },
                {
                  value: '_self',
                  label: '_self',
                },
              ]}
            />
          </Grid>
        </Grid>
        <NavbarLinkPadding
          key={index}
          name={`${focusIdx}.data.value.links.[${index}].padding`}
        />
        <div />
      </Grid>
    </div>
  );
}
