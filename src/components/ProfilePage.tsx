import { Component } from "react";
import ProfileData from "../ProfileData";

interface Props {
    authToken: string;
}

interface State {
    profile: ProfileData | null;
}

export default class ProfilePage extends Component{

    constructor(props: Props) {
        super(props);
        this.state = {
            profile: null,
        }
    }
    
}