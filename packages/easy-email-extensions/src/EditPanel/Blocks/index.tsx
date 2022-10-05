import { AdvancedType, BlockManager, IBlockData } from 'easy-email-core';
import { BlockAvatarWrapper, IconFont } from 'easy-email-editor';
import React, { useMemo, useState } from 'react';
import { getIconNameByBlockType } from '@extensions/utils/getIconNameByBlockType';
import styles from './index.module.scss';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { ExpandMore, ArrowLeft, ArrowDropUp  } from "@mui/icons-material";

export function Blocks() {
  const { categories } = useExtensionProps();

  const defaultActiveKey = useMemo(
    () => [
      ...categories.filter((item) => item.active).map((item) => item.label),
    ],
    [categories]
  );
  return (
    <>
      {categories.map((cat, index) => {
        if (cat.displayType === 'column') {
          return (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={cat.label}
                id={cat.label}
                sx={{
                  backgroundColor: '#CCC'
                }}
              >
                <Typography>{cat.label}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {cat.blocks.map((item) => (
                  <LayoutItem
                    key={item.title}
                    title={item.title || ''}
                    columns={item.payload}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          )
        }

        if (cat.displayType === 'custom') {
          return (
          <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={cat.label}
                id={cat.label}
                sx={{
                  backgroundColor: '#CCC'
                }}
              >
                <Typography>{cat.label}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid>
                  {cat.blocks.map((item, index) => {
                    return <React.Fragment key={index}>{item}</React.Fragment>;
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        }
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={cat.label}
              id={cat.label}
              sx={{
                backgroundColor: '#CCC'
              }}
            >
              <Typography>{cat.label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid>
                {cat.blocks.map((item, index) => {
                  return <BlockItem key={index} {...(item as any)} />;
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}

function BlockItem({
  type,
  payload,
  title,
  filterType,
}: {
  type: string;
  payload?: Partial<IBlockData>;
  title?: string;
  filterType: string | undefined;
}) {
  const block = BlockManager.getBlockByType(type);

  return (
    <div className={styles.blockItem}>
      <BlockAvatarWrapper type={type} payload={payload}>
        <div className={styles.blockItemContainer}>
          <IconFont
            style={{ fontSize: 20 }}
            iconName={getIconNameByBlockType(type)}
          />
          <Typography>
            {title || block?.name}
          </Typography>
        </div>
      </BlockAvatarWrapper>
    </div>
  );
}

function LayoutItem({
  columns,
  title,
}: {
  columns: string[][];
  title: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <p
        onClick={() => setVisible((v) => !v)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>{title}</span>
        {columns.length > 1 && (
          <span>{!visible ? <ArrowLeft /> : <ArrowDropUp />}</span>
        )}
      </p>
      {columns.map((item, index) => {
        const hide = !visible && index !== 0;
        const payload = {
          type: AdvancedType.SECTION,
          attributes: {},
          children: item.map((col) => ({
            type: AdvancedType.COLUMN,
            attributes: {
              width: col,
            },
            data: {
              value: {},
            },
            children: [],
          })),
        };

        return (
          <div
            key={index}
            style={{
              height: hide ? 0 : undefined,
              overflow: 'hidden',
              marginBottom: hide ? 0 : 20,
            }}
          >
            <BlockAvatarWrapper type={AdvancedType.SECTION} payload={payload}>
              <div
                style={{
                  border: '1px solid rgb(229, 229, 229)',
                  width: '100%',
                  padding: 10,
                }}
              >
                <div
                  style={{
                    height: 16,
                    border: '1px solid rgb(85, 85, 85)',
                    borderRadius: 3,
                    display: 'flex',
                  }}
                >
                  {item.map((column, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          borderRight:
                            index === item.length - 1
                              ? undefined
                              : '1px solid rgb(85, 85, 85)',
                          height: '100%',
                          width: column,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </BlockAvatarWrapper>
          </div>
        );
      })}
    </div>
  );
}
