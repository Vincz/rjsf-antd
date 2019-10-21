import React from 'react';
import { Rate } from 'antd';
import { WidgetProps } from 'react-jsonschema-form';

const RateWidget: React.FC<WidgetProps> = ({ options, value, disabled, onChange }: WidgetProps) => {
  const { count = 5, ...rest } = options;

  const _onChange = (value: number): void => {
    onChange(value);
  };

  return <Rate onChange={_onChange} value={value} count={count as number} disabled={disabled} {...rest} />;
};

export default RateWidget;
