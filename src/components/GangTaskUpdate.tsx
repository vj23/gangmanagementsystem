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

export default class GangTaskUpdate extends React.Component<any, any>{
    constructor(props) {
        super(props)
    }
    onFinish(values: any) {
        let self = this;
        console.log(values);
        let updatedDt = values.task.Date.format("YYYY-MM-DD");
        delete values.task.Date;
        let keys = Object.keys(values.task)
        let gangtaskjson = keys.map((ele) => {
            let obj = {}
            obj["gang"] = ele;
            obj["updatedDt"] = updatedDt;
            obj["incharge"] = self.props.loginUserObj.parent;
            obj["section"] = self.props.loginUserObj.username.split("@")[0];
            obj[self.props.action] = values.task[ele]
            return obj;

        })
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
        let { children } = this.props.loginUserObj;
        let formItems = children.map((ele) => {
            return (
                <Form.Item name={['task', ele]} label={ele}>
                    <Input.TextArea />
                </Form.Item>
            )
        })
        return (
            <div>
                <Form {...layout} name="nest-messages" onFinish={this.onFinish.bind(this)} validateMessages={validateMessages}>
                    <Form.Item name={['task', 'Date']} label="Date">

                        <DatePicker />

                    </Form.Item>
                    {formItems}
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        )
    }
}