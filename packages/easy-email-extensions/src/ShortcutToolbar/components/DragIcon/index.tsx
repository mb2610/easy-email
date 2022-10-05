import { IconFont, BlockAvatarWrapper } from 'easy-email-editor';
import { getIconNameByBlockType } from '@extensions';
import React from 'react';
import { BlockManager, IBlockData } from 'easy-email-core';
import { RecursivePartial } from 'easy-email-core';
import { IconButton } from '@mui/material';

export interface DragIconProps<T extends IBlockData> {
  type: string;
  payload?: RecursivePartial<T>;
  color: string;
}

export function DragIcon<T extends IBlockData = any>(props: DragIconProps<T>) {
  const block = BlockManager.getBlockByType(props.type);
  return (
    <BlockAvatarWrapper type={props.type} payload={props.payload}>
      <IconButton>
        <IconFont
              iconName={getIconNameByBlockType(props.type)}
              style={{
                fontSize: 16,
                textAlign: 'center',
                cursor: 'move',
                color: props.color,
              }}
        />
      </IconButton>
    </BlockAvatarWrapper>
  );
}
