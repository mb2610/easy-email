import { useFocusIdx } from 'easy-email-editor';
import { ConfigurationPanel } from '@extensions/ConfigurationPanel';
import React, { useCallback, useMemo, useRef } from 'react';
import { Drawer } from '@mui/material';

export function ConfigurationDrawer({
  height,
  compact,
}: {
  height: string;
  compact: boolean;
}) {
  const { focusIdx, setFocusIdx } = useFocusIdx();

  const onClose = useCallback(() => {
    setFocusIdx('');
  }, [setFocusIdx]);

  const visible = Boolean(focusIdx);
  return useMemo(() => {
    return (
      <>
        <Drawer
            anchor='right'
            variant='persistent'
            open={visible}
            onClose={onClose}
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: '100%',
                position: 'relative'
              }
            }}
          >
            <ConfigurationPanel
              compact={compact}
              showSourceCode
              height={height}
              onBack={onClose}
            />
          </Drawer>
      </>
    );
  }, [visible, onClose, compact, height]);
}
