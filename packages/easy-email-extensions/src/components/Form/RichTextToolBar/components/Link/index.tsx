import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { IconFont } from 'easy-email-editor';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'easy-email-core';
import { Popover, TextField, Grid, Button, FormGroup, FormControlLabel, Switch } from "@mui/material"

export interface LinkParams {
  link: string;
  blank: boolean;
  underline: boolean;
  linkNode: HTMLAnchorElement | null;
}

export interface LinkProps {
  currentRange: Range | null | undefined;
  onChange: (val: LinkParams) => void;
  getPopupContainer: () => HTMLElement;
}

function getAnchorElement(
  node: Node | null,
): HTMLAnchorElement | null {
  if (!node) return null;
  if (node instanceof HTMLAnchorElement) {
    return node;
  }
  if (node instanceof Element && node.classList.contains(EMAIL_BLOCK_CLASS_NAME)) return null;

  return getAnchorElement(node.parentNode);
}

function getLinkNode(
  currentRange: Range | null | undefined
): HTMLAnchorElement | null {
  let linkNode: HTMLAnchorElement | null = null;
  if (!currentRange) return null;
  linkNode = getAnchorElement(currentRange.startContainer);
  return linkNode;
}

export function Link(props: LinkProps) {

  const initialValues = useMemo((): LinkParams => {
    let link = '';
    let blank = true;
    let underline = true;
    let linkNode: HTMLAnchorElement | null = getLinkNode(props.currentRange);
    if (linkNode) {
      link = linkNode.getAttribute('href') || '';
      blank = linkNode.getAttribute('target') === '_blank';
      underline = linkNode.style.textDecoration === 'underline';
    }
    return {
      link,
      blank,
      underline,
      linkNode,
    };
  }, [props.currentRange]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const visible = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = useCallback(
    (values: LinkParams) => {
      props.onChange(values);
    },
    [props]
  );

  return (
    <>
      <ToolItem isActive={Boolean(initialValues.link)} title='Link' onClick={handleClick} icon={<IconFont iconName='icon-link' />} />
      <Popover
        open={visible}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Form
          key={initialValues.link}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => {
            return (
              <Grid spacing={2} direction="column">
                  <TextField name="link" label="Link" variant="standard" size='small' placeholder='https://www.example.com' />
                  <Grid spacing={2} direction="row">
                    <Grid item xs>
                      <FormGroup>
                        <FormControlLabel control={<Switch name='blank' defaultChecked />} label="Target" />
                      </FormGroup>
                    </Grid>
                    <Grid item xs>
                      <FormGroup>
                        <FormControlLabel control={<Switch name='underline' defaultChecked />} label="Underline" />
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Button variant='outlined' size='small' type='submit'>Apply</Button>
              </Grid>
            );
          }}
        </Form>
      </Popover>
    </>
  );
}
