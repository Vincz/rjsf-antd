import React, { PropsWithChildren } from 'react';
import Form, { FormProps, ObjectFieldTemplateProps } from 'react-jsonschema-form';
import FormContext from 'antd/es/form/context';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/es/config-provider';
import omit from 'omit.js';
import { FormLabelAlign } from 'antd/es/form/FormItem';
import Theme from '../Theme';
import { ColProps } from 'antd/es/grid/col';
import classNames from 'classnames';
import ObjectFieldTemplateContext from '../ObjectFieldTemplate/ObjectFieldTemplateContext';
import withTheme from '../Theme/withTheme';

const FormWithTheme = withTheme<any>(Theme);

type layout = 'horizontal' | 'inline' | 'vertical';

type ObjectFieldTemplate =
  | React.StatelessComponent<ObjectFieldTemplateProps>
  | React.ComponentClass<ObjectFieldTemplateProps>;

type FormContext = {
  [key: string]: any;
} & {
  objectFieldTemplates: {
    [key: string]: ObjectFieldTemplate;
  };
};

export interface RjsfFormProps<T> extends FormProps<T> {
  prefixCls?: string;
  //className?: string;
  layout: layout;
  hideRequiredMark?: boolean;
  wrapperCol?: ColProps;
  labelCol?: ColProps;
  colon?: boolean;
  labelAlign?: FormLabelAlign;
  formContext?: FormContext;
  objectFieldTemplates?: {
    [key: string]: ObjectFieldTemplate;
  };
}

const RjsfForm = React.forwardRef((props: PropsWithChildren<RjsfFormProps<any>>, ref: React.Ref<Form<any>>) => {
  const { wrapperCol, labelAlign, labelCol, layout, colon, objectFieldTemplates = {} } = props;

  const renderForm = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, hideRequiredMark, className = '', layout } = props;
    const prefixCls = getPrefixCls('form', customizePrefixCls);
    const formClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-horizontal`]: layout === 'horizontal',
        [`${prefixCls}-vertical`]: layout === 'vertical',
        [`${prefixCls}-inline`]: layout === 'inline',
        [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
      },
      className,
    );

    const formProps = omit(props, [
      'prefixCls',
      'className',
      //'layout',
      'hideRequiredMark',
      'wrapperCol',
      'labelAlign',
      'labelCol',
      'colon',
    ]);

    return <FormWithTheme {...formProps} className={formClassName} ref={ref} />;
  };

  return (
    <ObjectFieldTemplateContext.Provider value={objectFieldTemplates}>
      <FormContext.Provider
        value={{
          wrapperCol,
          labelAlign,
          labelCol,
          vertical: layout === 'vertical',
          colon,
        }}>
        <ConfigConsumer>{renderForm}</ConfigConsumer>
      </FormContext.Provider>
    </ObjectFieldTemplateContext.Provider>
  );
});

RjsfForm.displayName = 'RjsfForm';

export default RjsfForm;
