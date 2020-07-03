import React, {Component} from 'react';
import Navigation from "./Navigation";
import Login from "./Login";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {authToken:'',user:'',loggedIn:false};
    }

    async updateAuthToken(res){
        this.setState({authToken:res.token,user:res.user,loggedIn:res.auth});
    }

    render() {
        var handleToUpdate  = this.updateAuthToken;
        return (
            <div>
                <Navigation />
                <Login isUserLoggedIn={this.state.loggedIn} handleAuthToken={handleToUpdate.bind(this)}/>
            </div>
        );
    }
}

export default Container;