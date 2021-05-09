import * as React from 'react';
import { Card } from 'antd';
import { Tabs } from 'antd';
import Contractual from './components/Contractual';
import GangTaskUpdate from './components/GangTaskUpdate';
import AdminConsole from './AdminConsole';
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
export default class App extends React.Component<any, any>{

  render() {
    let { role} = this.props.loginUserObj;
    return (
      <Card>
        {role == "section" ?
          <Tabs defaultActiveKey="1" onChange={callback}>

            <TabPane tab="WorkUpdate" key="1">
              <GangTaskUpdate {...this.props} action={"task"}/>
            </TabPane>
            <TabPane tab="Compliance" key="2">
              <GangTaskUpdate {...this.props} action={"compliance"}/>
            </TabPane>
            <TabPane tab="Grievnace and material requirement" key="3">
              <GangTaskUpdate {...this.props} action={"grievance"}/>
            </TabPane>
          </Tabs>
          :

          <Tabs defaultActiveKey="4" onChange={callback}>
            <TabPane tab="Contractual" key="4">
              <Contractual {...this.props} action={"contractual"}/>
            </TabPane>
            <TabPane tab="Machine" key="5">
              <Contractual {...this.props} action={"machine"}/>
            </TabPane>
            <TabPane tab="DashBoard" key="6">
              <AdminConsole />
            </TabPane>

          </Tabs>
        }
      </Card >
    )
  }
}