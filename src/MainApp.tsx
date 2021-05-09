import * as React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
Amplify.configure(awsconfig);

import AdminConsole from './AdminConsole';
import Applcation from './App';
import Header from './HeaderComp';
import HierarchyTree from './HierarchyTree';
import OpenRole from './components/OpenRole';

class MainApp extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            loginUserObj: {}
        }
    }
    componentDidMount() {
        let self = this;
        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            let email = user.attributes.email;
            let loginUserObj = HierarchyTree[email.split("@")[0]]
            if (loginUserObj.role == "admin") {
                this.setState({
                    user: "admin",
                    loginUserObj: loginUserObj,
                })
            }
            else if (loginUserObj.role == "open") {
                this.setState({
                    user: "open",
                    loginUserObj: loginUserObj
                })
            }
            else {
                this.setState({
                    user: "inchargeOrSectional",
                    loginUserObj: loginUserObj
                })
            }
        }
        )
            .catch(err => console.log(err));
    }
    render() {
        let comp;
        if (this.state.user == "admin") {
            comp = <AdminConsole />
        }
        else if (this.state.user == "open") {
            comp = <OpenRole />
        }
        else {
            comp = <Applcation loginUserObj={this.state.loginUserObj} />
        }
        return (
            <div style={{ height: "100%" }}>

                <Header name={this.state.loginUserObj.username} />
                {comp}
            </div>
        )
    }
}

export default withAuthenticator(MainApp);