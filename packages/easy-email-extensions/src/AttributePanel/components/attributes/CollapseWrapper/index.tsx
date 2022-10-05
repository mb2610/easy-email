import React from 'react';
import { useBlock, useEditorProps } from 'easy-email-editor';
import { isAdvancedBlock } from 'easy-email-core';
import { Iteration } from '../Iteration';
import { Condition } from '../Condition';

export const CollapseWrapper: React.FC = (props) => {
  const { enabledLogic } = useEditorProps();
  const { focusBlock } = useBlock();
  const value = focusBlock?.data.value;

  const isAdvancedBlockType = isAdvancedBlock(focusBlock?.type);

  const iterationEnabled =
    isAdvancedBlockType &&
    Boolean(value?.iteration && value?.iteration?.enabled);

  const conditionEnabled =
    isAdvancedBlockType &&
    Boolean(value?.condition && value?.condition?.enabled);

  return (
    <>
      {props.children}
      {enabledLogic && iterationEnabled && <Iteration />}
      {enabledLogic && conditionEnabled && <Condition />}
    </>
  );
};
