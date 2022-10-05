import {
  BasicType,
  BlockManager,
  getPageIdx,
  getParentByIdx,
  IBlockData,
  JsonToMjml,
  MjmlToJson,
} from 'easy-email-core';
import {
  useBlock,
  useFocusIdx,
  useEditorContext,
  useEditorProps,
} from 'easy-email-editor';
import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField } from '@mui/material';
import { ExpandMore } from "@mui/icons-material";

export function SourceCodePanel() {
  const { setValueByIdx, focusBlock, values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const [mjmlText, setMjmlText] = useState('');
  const { pageData } = useEditorContext();
  const { mergeTags } = useEditorProps();

  const code = useMemo(() => {
    if (!focusBlock) return '';
    return JSON.stringify(focusBlock, null, 2) || '';
  }, [focusBlock]);

  const onChangeCode = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      try {
        const parseValue = JSON.parse(
          JSON.stringify(eval('(' + event.target.value + ')'))
        ) as IBlockData;

        const block = BlockManager.getBlockByType(parseValue.type);
        if (!block) {
          throw new Error('Invalid content');
        }
        if (
          !parseValue.data ||
          !parseValue.data.value ||
          !parseValue.attributes ||
          !Array.isArray(parseValue.children)
        ) {
          throw new Error('Invalid content');
        }
        setValueByIdx(focusIdx, parseValue);
      } catch (error: any) {
        console.error(error?.message || error);
      }
    },
    [focusIdx, setValueByIdx]
  );

  const onMjmlChange = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      try {
        const parseValue = MjmlToJson(event.target.value);
        if (parseValue.type !== BasicType.PAGE) {
          const parentBlock = getParentByIdx(values, focusIdx)!;
          const parseBlock = BlockManager.getBlockByType(parseValue.type);

          if (!parseBlock?.validParentType.includes(parentBlock?.type)) {
            throw new Error('Invalid content');
          }
        } else if (focusIdx !== getPageIdx()) {
          throw new Error('Invalid content');
        }

        setValueByIdx(focusIdx, parseValue);
      } catch (error) {
        console.error('Invalid content');
      }
    },
    [focusIdx, setValueByIdx, values]
  );

  const onChangeMjmlText = useCallback((value: string) => {
    setMjmlText(value);
  }, []);

  useEffect(() => {
    focusBlock &&
      setMjmlText(
        JsonToMjml({
          idx: focusIdx,
          data: focusBlock,
          context: pageData,
          mode: 'production',
          dataSource: cloneDeep(mergeTags),
        })
      );
  }, [focusBlock, focusIdx, pageData, mergeTags]);

  if (!focusBlock) return null;

  return (
    <>
      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="json-content"
            id="json-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>Json source</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
                label="Multiline"
                multiline
                rows={25}
                defaultValue={code}
                onBlur={onChangeCode}
              />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="mjml-content"
            id="mjml-header"
            sx={{
              backgroundColor: '#CCC'
            }}
          >
            <Typography>MJML source</Typography>
          </AccordionSummary>
          <AccordionDetails>
              <TextField
                label="Multiline"
                multiline
                rows={25}
                defaultValue={mjmlText}
                onChange={(e) => onChangeMjmlText(e.target.value)}
                onBlur={onMjmlChange}
              />
          </AccordionDetails>
        </Accordion>
    </>
  );
}
