import { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";
import EditStory from "./EditStory";
import NewStory from "./NewStory";

interface Props {
    authToken: string;
}

export default class Main extends Component <Props>{

    handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    render() {
        return <div>
            <div id="mainpage">
                <h1>Üdvözöllek a történetszerkesztőben!</h1>
                <h4>Írj egy új történetet vagy ha már van, szerkezd!</h4>
                <Link to="/newstory" className="mainButtons">Új történet</Link>
                <Link to="/editstory" className="mainButtons">Történet szerkesztése</Link>
                <Routes>
                    <Route path="newstory" element={<NewStory authToken={this.props.authToken} />} />
                    <Route path="editstory" element={<EditStory authToken={this.props.authToken} />} />
                </Routes>
            </div>
        </div>
    }

}
