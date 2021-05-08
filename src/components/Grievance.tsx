import * as React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { DatePicker, Space } from 'antd';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const onFinish = (values: any) => {
    console.log(values);
};
export default class Grievance extends React.Component<any, any>{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'Date']} label="Date">
                    <Space direction="vertical">
                        <DatePicker />
                    </Space>
                </Form.Item>
                <Form.Item name={['user', 'DTM19']} label="DTM19">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name={['user', 'DTM20']} label="DTM20">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name={['user', 'DTM21']} label="DTM21">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
          </Button>
                </Form.Item>
            </Form>
        )
    }
}