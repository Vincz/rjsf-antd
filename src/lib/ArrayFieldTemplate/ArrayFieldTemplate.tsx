import React from 'react';
import { isMultiSelect, getDefaultRegistry } from 'react-jsonschema-form/lib/utils';
import { ArrayFieldTemplateProps, FieldProps, IdSchema } from 'react-jsonschema-form';
import { JSONSchema6 } from 'json-schema';
import AddButton from '../AddButton/AddButton';
import IconButton from '../IconButton/IconButton';

const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = (props: ArrayFieldTemplateProps) => {
  const { schema, registry = getDefaultRegistry() }: { schema: JSONSchema6; registry: FieldProps['registry'] } = props;

  if (isMultiSelect(schema, registry.definitions)) {
    return <DefaultFixedArrayFieldTemplate {...props} />;
  }
  return <DefaultNormalArrayFieldTemplate {...props} />;
};

interface ArrayFieldTitleProps {
  TitleField: any;
  idSchema: IdSchema;
  title: string;
  required: boolean;
}

const ArrayFieldTitle: React.FC<ArrayFieldTitleProps> = (props: ArrayFieldTitleProps) => {
  const { TitleField, idSchema, title, required }: ArrayFieldTitleProps = props;

  if (!title) {
    return <div />;
  }

  const id = `${idSchema.$id}__title`;

  return <TitleField id={id} title={title} required={required} />;
};

interface ArrayFieldDescriptionProps {
  DescriptionField: any;
  idSchema: IdSchema;
  description: string;
}

const ArrayFieldDescription: React.FC<ArrayFieldDescriptionProps> = (props: ArrayFieldDescriptionProps) => {
  const { DescriptionField, idSchema, description }: ArrayFieldDescriptionProps = props;

  if (!description) {
    return <div />;
  }

  const id = `${idSchema.$id}__description`;

  return <DescriptionField id={id} description={description} />;
};

// Used in the two templates
const DefaultArrayItem: React.FC<any> = (props: any) => {
  const btnStyle: object = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold',
  };
  const {
    index,
    children,
    hasMoveUp,
    hasMoveDown,
    disabled,
    readonly,
    onDropIndexClick,
    hasToolbar,
    onReorderClick,
    hasRemove,
  } = props;

  return (
    <div key={index}>
      <div>{children}</div>
      {hasToolbar && (
        <div>
          {(hasMoveUp || hasMoveDown) && (
            <IconButton
              icon='arrow-up'
              className='array-item-move-up'
              tabIndex={-1}
              style={btnStyle}
              disabled={disabled || readonly || !hasMoveUp}
              onClick={onReorderClick(index, index - 1)}
            />
          )}

          {(hasMoveUp || hasMoveDown) && (
            <IconButton
              icon='arrow-down'
              tabIndex={-1}
              style={btnStyle}
              disabled={disabled || readonly || !hasMoveDown}
              onClick={onReorderClick(index, index + 1)}
            />
          )}

          {hasRemove && (
            <IconButton
              icon='remove'
              tabIndex={-1}
              style={btnStyle}
              disabled={disabled || readonly}
              onClick={onDropIndexClick(index)}
            />
          )}
        </div>
      )}
    </div>
  );
};

const DefaultFixedArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = (props: ArrayFieldTemplateProps) => {
  const {
    className,
    TitleField,
    idSchema,
    title,
    uiSchema,
    schema,
    items,
    canAdd,
    required,
    onAddClick,
    disabled,
    readonly,
  } = props;

  return (
    <fieldset className={className}>
      <ArrayFieldTitle
        key={`array-field-title-${idSchema.$id}`}
        TitleField={TitleField}
        idSchema={idSchema}
        title={uiSchema['ui:title'] || title}
        required={required}
      />

      {(uiSchema['ui:description'] || schema.description) && (
        <div className='field-description' key={`field-description-${idSchema.$id}`}>
          {uiSchema['ui:description'] || schema.description}
        </div>
      )}

      <div className='row array-item-list' key={`array-item-list-${idSchema.$id}`}>
        {items && items.map(DefaultArrayItem)}
      </div>

      {canAdd && <AddButton className='array-item-add' onClick={onAddClick} disabled={disabled || readonly} />}
    </fieldset>
  );
};

const DefaultNormalArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = (props: ArrayFieldTemplateProps) => {
  const {
    TitleField,
    idSchema,
    title,
    required,
    uiSchema,
    schema,
    items,
    canAdd,
    onAddClick,
    disabled,
    readonly,
    DescriptionField,
  } = props;

  return (
    <div>
      <ArrayFieldTitle
        key={`array-field-title-${props.idSchema.$id}`}
        TitleField={TitleField}
        idSchema={idSchema}
        title={uiSchema['ui:title'] || title}
        required={required}
      />

      {(uiSchema['ui:description'] || schema.description) && (
        <ArrayFieldDescription
          key={`array-field-description-${idSchema.$id}`}
          DescriptionField={DescriptionField}
          idSchema={idSchema}
          description={uiSchema['ui:description'] || schema.description}
        />
      )}

      <div key={`array-item-list-${idSchema.$id}`}>
        {items && items.map((p) => DefaultArrayItem(p))}
        {canAdd && (
          <div>
            <AddButton className='array-item-add' onClick={onAddClick} disabled={disabled || readonly} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayFieldTemplate;
