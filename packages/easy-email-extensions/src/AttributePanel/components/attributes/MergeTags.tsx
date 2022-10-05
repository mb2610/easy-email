import React, { useCallback, useMemo, useState } from 'react';
import { get, isObject } from 'lodash';
import { useBlock, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { getContextMergeTags } from '@extensions/utils/getContextMergeTags';
import { TreeView, TreeItem } from "@mui/lab"
import { ExpandMore, ChevronRight} from '@mui/icons-material';

export const MergeTags: React.FC<{
  onChange: (v: string) => void;
  value: string;
}> = React.memo((props) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const { focusIdx } = useFocusIdx();
  const {
    mergeTags = {},
    mergeTagGenerate,
    renderMergeTagContent,
  } = useEditorProps();
  const { values } = useBlock();

  const contextMergeTags = useMemo(
    () => getContextMergeTags(mergeTags, values, focusIdx),
    [mergeTags, values, focusIdx]
  );

  const treeOptions = useMemo(() => {
    const treeData: Array<{
      key: any;
      value: any;
      title: string;
      children: never[];
    }> = [];
    const deep = (
      key: string,
      title: string,
      parent: { [key: string]: any; children?: any[] },
      mapData: Array<any> = []
    ) => {
      const currentMapData = {
        key: key,
        value: key,
        title: title,
        children: [],
      };

      mapData.push(currentMapData);
      const current = parent[title];
      if (current && typeof current === 'object') {
        Object.keys(current).map((childKey) =>
          deep(key + '.' + childKey, childKey, current, currentMapData.children)
        );
      }
    };

    Object.keys(contextMergeTags).map((key) =>
      deep(key, key, contextMergeTags, treeData)
    );
    return treeData;
  }, [contextMergeTags]);

  const onSelect = useCallback(
    (key: string) => {
      const value = get(contextMergeTags, key);
      if (isObject(value)) {
        setExpandedKeys((keys) => {
          if (keys.includes(key)) {
            return keys.filter((k) => k !== key);
          } else {
            return [...keys, key];
          }
        });
        return;
      }
      return props.onChange(mergeTagGenerate(key));
    },
    [contextMergeTags, props, mergeTagGenerate]
  );

  const mergeTagContent = useMemo(
    () =>
      renderMergeTagContent ? (
        renderMergeTagContent({
          onChange: props.onChange,
          value: props.value
        })
      ) : (
        <></>
      ),
    [renderMergeTagContent, props.onChange, props.value]
  );

  if (renderMergeTagContent) {
    return <>{mergeTagContent}</>;
  }

  const renderTree = (nodes: any) => (
    <TreeItem key={nodes.key} nodeId={nodes.id} label={nodes.title} onClick={() => {
      if(Array.isArray(nodes.children)) onSelect(nodes.id)
    }}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node: any) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMore />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRight />}
      sx={{ height: 400, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {renderTree(treeOptions)}
    </TreeView>
  );
});
