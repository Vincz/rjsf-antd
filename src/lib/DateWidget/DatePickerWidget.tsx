import React from 'react';
import { DatePicker } from 'antd';
import { WidgetProps } from 'react-jsonschema-form';
import moment from 'moment';

const DatePickerWidget: React.FC<WidgetProps> = ({
  required,
  readonly,
  disabled,
  value,
  onChange,
  autofocus,
  options,
  schema,
}: WidgetProps) => {
  const _onChange = (date: moment.Moment | null, dateString: string): void => {
    onChange(dateString === '' ? null : dateString);
  };

  return (
    <DatePicker
      {...options}
      autoFocus={autofocus}
      disabled={disabled || readonly}
      value={value != null ? moment(value) : value}
      onChange={_onChange}
    />
  );
};

export default DatePickerWidget;
