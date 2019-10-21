import React from 'react';
import { Typography, Button, Card, Layout, Divider, Form as AntdForm, Row, Col } from 'antd';
import { JSONSchema6 } from 'json-schema';
import Source from './Source';
//import styles from './Example.less';
import ExampleForm from './ExampleForm';
import Form from '../../lib/Form';

const liveSettingsSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    validate: { type: 'boolean', title: 'Live validation' },
    disabled: { type: 'boolean', title: 'Disable whole form' },
  },
};

const { Title, Paragraph, Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;

class Example extends React.Component<any, any> {
  state = {
    ...this.props.data,
    liveSettings: {
      validate: true,
      disabled: false,
    },
  };

  componentDidCatch() {
    this.setState({
      [this.state.backType]: this.state.backSource,
    });
  }

  UNSAFE_componentWillReceiveProps = ({ data }: any): void => {
    this.setState({
      ...data,
    });
  };

  onChange = (type: any) => (value: any): void => {
    this.setState({
      [type]: value,
      backSource: this.state[type],
      backType: type,
    });
  };

  onFormChanged = ({ formData }: any): void => {
    console.log(formData);
    this.setState({ formData });
  };

  onSubmit = (value: any): void => {
    console.log('onSubmit:', value);
  };

  onCancel = (): void => {
    const { data } = this.props;

    this.setState({
      ...data,
    });
  };

  setLiveSettings = ({ formData }: any) => {
    this.setState({ liveSettings: formData });
  };

  render() {
    const { data } = this.props;
    const { title } = data;
    const { schema, uiSchema, formData, liveSettings, validate } = this.state;

    return (
      <Layout>
        <Typography>
          <Title>{title}</Title>
        </Typography>
        <Form schema={liveSettingsSchema} formData={liveSettings} onChange={this.setLiveSettings}></Form>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <div>
              <Source title='JSONSchema' source={schema} onChange={this.onChange('schema')} />
            </div>
            <div>
              <Source title='uiSchema' source={uiSchema} onChange={this.onChange('uiSchema')} />
              <Source title='formData' source={formData} onChange={this.onChange('formData')} />
            </div>
          </Col>
          <Col span={12}>
            <ExampleForm
              schema={schema}
              uiSchema={uiSchema}
              formData={formData}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
              onFormChanged={this.onFormChanged}
              liveSettings={liveSettings}
              validate={validate}
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Example;
