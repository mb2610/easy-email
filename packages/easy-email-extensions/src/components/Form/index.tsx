import { ImageUploaderProps, ImageUploader } from './ImageUploader';
import { UploadField as Uploader, UploadFieldProps } from './UploadField';
import { ColorPicker, ColorPickerProps } from './ColorPicker';
import { Select, SelectProps } from './Select';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import enhancer from './enhancer';
import { Input, InputProps } from './Input';
import { InputSearch, InputSearchProps } from './InputSearch';
import { InputWithUnit, InputWithUnitProps } from './InputWithUnit';
import { InputMultiple, InputMultipleProps } from './InputMultiple';
import { CheckboxGroup, CheckboxGroupProps } from './CheckBoxGroup';
import { EditTab, EditTabProps } from './EditTab';
import { EditGridTab, EditGridTabProps } from './EditGridTab';
import { InlineText, InlineTextProps } from './InlineTextField';
export { RichTextField } from './RichTextField';
export { AutoComplete } from './AutoComplete';

export const ColorPickerField = enhancer<ColorPickerProps>(
  ColorPicker,
  (e: string) => e
);

export const UploadField = enhancer<UploadFieldProps>(
  Uploader,
  (val: string) => val
);

export const ImageUploaderField = enhancer<ImageUploaderProps>(ImageUploader, (url: string) => url);

export const InputField = enhancer<InputProps>(Input, (e: string) => e);
export const InputWithUnitField = enhancer<InputWithUnitProps, Required<InputWithUnitProps>['onChange']>(InputWithUnit, (e: string) => e);
export const SearchField = enhancer<InputSearchProps, Required<InputWithUnitProps>['onChange']>(InputSearch, (e: string) => e);
export const TextAreaField = enhancer<InputMultipleProps, Required<InputMultipleProps>['onChange']>(InputMultiple, (e: string) => e);
export const SelectField = enhancer<SelectProps>(Select, (e: string) => e);
export const InlineTextField = enhancer<InlineTextProps,  Required<InlineTextProps>['onChange']>(InlineText, (value) => value);
export const RadioGroupField = enhancer<RadioGroupProps,  Required<RadioGroupProps>['onChange']>(RadioGroup, (value) => value);
export const CheckboxField = enhancer<CheckboxGroupProps,  Required<CheckboxGroupProps>['onChange']>(CheckboxGroup, (value) => value);

export const EditTabField = enhancer<EditTabProps<any>>(EditTab, (e: any[]) => e);
export const EditGridTabField = enhancer<EditGridTabProps>(EditGridTab, (e: any[]) => e);


export { enhancer };
