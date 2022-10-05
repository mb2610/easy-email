import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { createPortal } from 'react-dom';
import { useHoverIdx } from 'easy-email-editor';
import {
  BlockMarketCategory,
  BlockMarketManager,
} from '../../utils/BlockMarketManager';
import { defaultCategories } from './presetTemplate';
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from "@mui/lab"

BlockMarketManager.addCategories(defaultCategories);

export const BlocksPanel: React.FC = (props) => {
  const { isDragging } = useHoverIdx();
  const [visible, setVisible] = useState(false);
  const [ele, setEle] = useState<HTMLElement | null>(null);
  const [categories, setCategories] = useState<BlockMarketCategory[]>(
    BlockMarketManager.getCategories()
  );

  useEffect(() => {
    if (!isDragging) {
      setVisible(false);
    }
  }, [isDragging]);

  useEffect(() => {
    const onChange = (c: BlockMarketCategory[]) => {
      setCategories(c);
    };
    BlockMarketManager.subscribe(onChange);
    return () => {
      BlockMarketManager.subscribe(onChange);
    };
  }, []);

  const toggleVisible = useCallback(() => {
    setVisible((v) => !v);
  }, []);

  const filterCategories = useMemo(() => {
    return categories.filter((item) => item.blocks.length > 0);
  }, [categories]);

  const [value, setValue] = React.useState<string>('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return useMemo(
    () => (
      <div ref={setEle} style={{ position: 'relative' }}>
        <div onClick={toggleVisible}>{props.children}</div>

        {ele &&
          visible &&
          createPortal(
            <div
              className={styles.BlocksPanel}
              style={{
                pointerEvents: isDragging ? 'none' : undefined,
                position: 'fixed',
                width: isDragging ? 0 : 650,
                backgroundColor: 'var(--color-bg-2)',
                zIndex: 200,
                left: 60,
                maxHeight: '85vh',

                transition: 'width .5s',
                boxShadow:
                  '0 1px 5px 0 rgb(0 0 0 / 12%), 0 2px 10px 0 rgb(0 0 0 / 8%), 0 1px 20px 0 rgb(0 0 0 / 8%)',
              }}
            >
              {/* <Card
                bodyStyle={{ padding: 0 }}
                title='Drag block'
                extra={
                  <div className={styles.closeBtn}>
                    <IconFont iconName='icon-close' onClick={toggleVisible} />
                  </div>
                }
              >

              </Card> */}
               <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Configurator Panel">
                      {filterCategories.map((category, index) => (
                        <Tab key={index} label={category.title} value={category.name} />
                      ))}
                    </TabList>
                  </Box>
                  {filterCategories.map((category, index) => (
                    <TabPanel key={index} value={category.name} sx={{ height: 500, overflow: 'auto' }}>
                        <BlockPanelItem category={category} />
                    </TabPanel>
                  ))}
                </TabContext>
            </div>,
            ele
          )}
      </div>
    ),
    [filterCategories, ele, isDragging, props.children, toggleVisible, visible]
  );
};

const BlockPanelItem: React.FC<{
  category: BlockMarketCategory;
}> = React.memo((props) => {
  const [value, setValue] = React.useState<string>('');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="Configurator Panel">
          {props.category.blocks.map((block, index) => (
            <Tab key={index} label={block.title} value={block.title} />
          ))}
        </TabList>
      </Box>
      {props.category.blocks.map((block, index) => (
        <TabPanel key={index} value={block.title} sx={{ height: 500, overflow: 'auto' }}>
            <div
              className='small-scrollbar'
              style={{
                maxHeight: '100%',
                overflow: 'auto',
                paddingRight: 10,
                overflowX: 'hidden',
                padding: '24px 48px 24px 24px',
              }}
            >
              {block.component && <block.component />}
            </div>
        </TabPanel>
      ))}
    </TabContext>
  );
});
