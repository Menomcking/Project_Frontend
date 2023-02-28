import { Component } from "react";
import LoginForm from "./LoginForm";

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
        </div>
    }
    
}