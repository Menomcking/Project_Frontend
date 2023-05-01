import { Component } from "react";
import NewStory from "./NewStory";
/**
 * stories: Egy tömb ami egy id (azonosító)-ból és egy title (cím)-ből áll
 * selectedStoryId: Szám típusú, a kiválasztott történet id-je
 */
interface State {
    stories: { id: number, title: string }[];
    selectedStoryId: number | null;
}
/**
 * authToken: A token ami az autentikációhoz szükséges
 */
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
    /**
     * Meghívja a backenden a get-user-stories végpontot, ami kilistázza a felhasználó történeteinek címét.
     */
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
   /**
    * 
    * @param id A történet azonosítója, szám típusú
    */
   handleStoryClick = (id: number) => {
    this.setState({ selectedStoryId: id });
   };
   /**
    * 
    * @returns Kilistázza a felhasználó történeteinek a címét, amik kattinthatók
    */
    render() {
        const { stories, selectedStoryId } = this.state;

        return (
            <div>
                <h2>Válassz egy történetet:</h2>
                <ul>
                    {stories.map((story) => (
                        <li key={story.id} onClick={() => this.handleStoryClick(story.id)}>
                            <a href="#">{story.title}</a>
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
