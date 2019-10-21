import React from 'react';
import { Select } from 'antd';
// import { WidgetProps } from 'react-jsonschema-form';

const SelectWidget: React.FC<any> = (props: any) => {
  const { options, multiple, disabled, readonly, value, autofocus, onChange, onBlur, onFocus } = props;

  const { enumOptions, enumDisabled }: { enumOptions: object[]; enumDisabled: string[] } = options;

  let mode = multiple ? 'multiple' : 'default';

  mode = options.mode || mode;

  const _onChange = (value: any): void => {
    onChange(value);
  };

  const _onBlur = (value: any): void => {
    onBlur(value);
  };

  const _onFocus = () => {
    onFocus();
  };

  return (
    <Select
      mode={mode}
      value={value}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}>
      {enumOptions.map(({ value, label }: any, i: number) => {
        const disabled: any = enumDisabled && enumDisabled.indexOf(value) !== -1;

        return (
          <Select.Option key={i} value={value} disabled={disabled}>
            {label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default SelectWidget;
