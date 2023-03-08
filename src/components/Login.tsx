import { Component } from "react";
import LoginForm from "./LoginForm";
import Main from "./Main";

interface State {
    authToken: string;
}

export default class Login extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            authToken: '',
        }
    }

    render() {
        const { authToken } = this.state;
        const loggedIn = authToken != '';

        return <div>
            <LoginForm
            authToken={authToken}
            onAuthTokenChange={(token) => this.setState({ authToken: token })}
            />
            {
                loggedIn ?
                    <Main /> :
                    <p>Jelentkezz be!</p>
            }
        </div>
    }
    
}