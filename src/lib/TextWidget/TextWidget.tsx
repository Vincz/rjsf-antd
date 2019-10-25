import React from 'react';
import { Input } from 'antd';
import { WidgetProps } from 'react-jsonschema-form';
import omit from 'omit.js';

const TextWidget: React.FC<WidgetProps> = ({
  id,
  required,
  readonly,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  autofocus,
  options,
  schema,
}: WidgetProps) => {
  const _onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(value === '' ? options.emptyValue : value);
  };

  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>): void => {
    onBlur(id, value);
  };

  const _onFocus = ({ target: { value } }: React.FocusEvent<HTMLInputElement>): void => {
    onFocus(id, value);
  };

  const inputOptions = omit(options, ['enumOptions']);

  return (
    <Input
      {...inputOptions}
      type='text'
      autoFocus={autofocus}
      required={required}
      disabled={disabled || readonly}
      value={value}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
    />
  );
};

export default TextWidget;
