import React, {Component} from 'react';
import CreateRoom from "./CreateRoom";
const CREATE_ROOM_URL = '/rooms/new'
class RoomsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {currentPage:''};
    }

    componentDidMount() {
        this.setState({currentPage:this.props.location.pathname});
    }

    render() {
        return (
            <div>
                {
                    this.showComponent()

                }


            </div>
        );
    }

    showComponent() {
        switch(this.state.currentPage) {

            case CREATE_ROOM_URL:   return  <CreateRoom />;
            case "/rooms/two":   return "tito el bambi";

            default:      return <h1>tas en el inicio nieri</h1>
        }
    }

}

export default RoomsContainer;