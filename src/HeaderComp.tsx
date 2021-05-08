import * as React from 'react';
import { Divider } from 'antd';
import { Row, Col } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Sider } = Layout;
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
export default class HeaderComp extends React.Component<any, any> {
    render() {
        return (
            <Layout style={{ padding: "20px", marginBottom: "20px",height:"8%"}}>
                <Row>
                    <Col span={8}>Gang Management System <Divider type="vertical" /></Col>
                    <Col span={10}></Col>
                    <Col span={4}>Welcome! {this.props.name}</Col>
                    <Col span={2}><AmplifySignOut /></Col>
                </Row>
            </Layout>
        )
    }
}