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
export default class Contractual extends React.Component<any, any>{
    constructor(props) {
        super(props)
    }
    onFinish(values: any) {
        let self = this;
        console.log(values);
        let updatedDt = values.task.Date.format("YYYY-MM-DD");
        let obj = {}
        obj[this.props.action] = values.task[this.props.action]
        obj["incharge"] = this.props.loginUserObj.username.split("@")[0]
        obj["updatedDt"] = updatedDt

        let gangtaskjson = []
        gangtaskjson.push(obj)
        fetch('/updateWork', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gangtaskjson),
        }).then((res) => {
            return res.json()
        }).then((json) => {
            console.log(json)
        })
        console.log(gangtaskjson)

    };
    render() {
        return (
            <Form {...layout} name="nest-messages" onFinish={this.onFinish.bind(this)} validateMessages={validateMessages}>

                <Form.Item name={['task', 'Date']} label="Date">

                    <DatePicker />

                </Form.Item>
                <Form.Item name={['task', this.props.action]} label="Update">
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