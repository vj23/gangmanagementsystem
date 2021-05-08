import * as React from 'react';
import { Card } from 'antd';
import { Tabs } from 'antd';
import Compliance from './components/Compliance';
import Grievance from './components/Grievance';
import Contractual from './components/Contractual';
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
export default class App extends React.Component<any, any>{

  render() {
    return (
      <Card>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Compliance" key="1">
            <Compliance />
          </TabPane>
          <TabPane tab="Grievnace and material requirement" key="2">
            <Grievance />
          </TabPane>
          <TabPane tab="Contractual" key="3">
            <Contractual />
          </TabPane>
          <TabPane tab="Machine" key="4">
          <Contractual />
          </TabPane>
        </Tabs>
      </Card >
    )
  }
}