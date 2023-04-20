import { Component } from "react";
import NewStory from "./NewStory";

interface State {
    stories: { id: number, title: string }[];
    selectedStoryId: number | null;
}

interface Props {
    authToken: string;
}

export default class EditStory extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            stories: [],
            selectedStoryId: null,
        };
    }

   async componentDidMount() {
    const response = await fetch('http://localhost:3000/story/get-user-stories', {
       method: 'GET',
       headers: {
        'Authorization': 'Bearer ' + this.props.authToken,
       } ,
    });


    const data = await response.json();

    this.setState({ stories: data });
   }

   handleStoryClick = (id: number) => {
    this.setState({ selectedStoryId: id });
   };

    render() {
        const { stories, selectedStoryId } = this.state;

        return (
            <div>
                <h2>Válassz egy történetet:</h2>
                <ul>
                    {stories.map((story) => (
                        <li key={story.id} onClick={() => this.handleStoryClick(story.id)}>
                            {story.title}
                        </li>
                    ))}
                </ul>

                {selectedStoryId !== null && (
                    <NewStory authToken={this.props.authToken} storyId={selectedStoryId} />
                )}
            </div>
        )
    }
}
