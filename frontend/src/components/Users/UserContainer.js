import React, {Component} from 'react';
import CreateUser from "./CreateUser";
const CREATE_USER_URL = '/user/new';

class UserContainer extends Component {
    constructor(props) {
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

            case CREATE_USER_URL:   return  <CreateUser />;
            case "/user/two":   return "tito el bambi";

            default:      return <h1>tas en el inicio nieri</h1>
        }
    }
}



export default UserContainer;