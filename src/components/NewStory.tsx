import { Component } from "react";

interface State {
    storyParts: StoryParts[],
    usersId: number|undefined,
    id: number|undefined,
    rating: number,
    title: string,
}

interface StoryParts {
    textPartId: number,
    textPart: string,
    storyId: number,
}

export default class NewStory extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            storyParts: [ { textPartId: -1, textPart: '', storyId: -1 } ],
            usersId: undefined,
            id: undefined,
            rating: 0,
            title: ''
        }
    }

    handleNewTextPart = () => {
        const { storyParts } = this.state;
        const newParts = [ ...storyParts, { textPartId: -1, textPart: '', storyId: -1 } ]
        this.setState({ storyParts: newParts })
    }

    render() {
        const { title, storyParts } = this.state;

        return <div>
            
            <h3>Cím:</h3>
            <input type="text" placeholder="Cím" value={ title }/>
            <h3>Szöveg hozzáadása: </h3>
            {
                storyParts.map(part => {
                    const { textPart } = part;
                    return <input type="text" placeholder="Szöveg" value={ textPart } />
                })
            }

            <button onClick={this.handleNewTextPart}>Új szöveg</button>
            
        </div>
    }
}
