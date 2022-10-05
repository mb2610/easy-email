import React, { useContext, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SquareIcon from '@mui/icons-material/Square';

import { PresetColorsContext } from '@extensions/AttributePanel/components/provider/PresetColorsProvider';

export interface ColorPickerContentProps {
  onChange: (val: string) => void;
  value: string;
}

const transparentColor = 'rgba(0,0,0,0)';

export function ColorPickerContent(props: ColorPickerContentProps) {
  const { colors: presetColors } = useContext(PresetColorsContext);

  const { onChange } = props;
  const [color, setColor] = useState(props.value);

  useEffect(() => {
    setColor(props.value);
  }, [props.value]);

  const presetColorList = useMemo(() => {
    return [...presetColors.filter(item => item !== transparentColor).slice(-14)];
  }, [presetColors]);

  return (
    <Stack spacing={2} direction="row">
      {presetColorList.filter(x => x !== color).map((item, index) => (
        <IconButton key={index} type="button" onClick={() => onChange(item)}>
          <SquareIcon sx={{ color: item}} />
        </IconButton>
      ))}
    </Stack>
  );
}
