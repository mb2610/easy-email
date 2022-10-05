
import { ColorPicker } from '@extensions/components/Form/ColorPicker';
import { IconFont } from 'easy-email-editor';
import React, { useMemo } from 'react';
import { ToolItem } from '../../ToolItem';

export function IconFontColor({ selectionRange, execCommand }: { selectionRange: Range | null; execCommand: (cmd: string, val?: any) => void;}) {

  const color = useMemo(() => {
    if (!selectionRange) return undefined;
    if (selectionRange.commonAncestorContainer instanceof HTMLElement) {
      return getComputedStyle(selectionRange.commonAncestorContainer).color;
    } else if (selectionRange.commonAncestorContainer.parentNode instanceof HTMLElement) {
      return getComputedStyle(selectionRange.commonAncestorContainer.parentNode).color;

    }

    return undefined;
  }, [selectionRange]);

  return (
    <ColorPicker
      label=''
      onChange={(color) => execCommand('foreColor', color)}
      showInput={false}
    >
      <ToolItem
        icon={(
          <div style={{
            position: 'relative'
          }}
          >
            <IconFont size={12} iconName='icon-font-color' style={{ position: 'relative', top: '-1px' }} />
            <div style={{ borderBottom: `2px solid ${color}`, position: 'absolute', width: '130%', left: '-15%', top: 16 }} />
          </div>
        )}
        title='Text color'
      />
    </ColorPicker>

  );
}