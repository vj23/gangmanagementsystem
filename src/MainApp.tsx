import * as React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
Amplify.configure(awsconfig);

import AdminConsole from './AdminConsole';
import Applcation from './App';
import Header from './HeaderComp';

class MainApp extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            user:""
        }
    }
    componentDidMount() {
        let self = this;
        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            console.log(user);
            if (user.attributes.email == "jainvaibhav211@gmail.com") {
                this.setState({
                    user: "nodal",
                    email:user.attributes.email 
                })
            }
            else{
                this.setState({
                    user: "bank",
                    email:user.attributes.email 
                })
            }
        }
        )
            .catch(err => console.log(err));
    }
    render() {


        return (
            <div style={{height:"100%"}}>
                
                <Header name={this.state.email}/>
                {
                    this.state.user=="nodal"?<AdminConsole />:<Applcation />
                }
            </div>
        )
    }
}

export default withAuthenticator(MainApp);