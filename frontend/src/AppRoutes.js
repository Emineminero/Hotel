import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import  Home from './components/Home';
import RoomsContainer from "./components/Rooms/RoomsContainer";
import UserContainer from "./components/Users/UserContainer";

class AppRoutes extends Component {
    render() {
        return (
            <div className="container p-4">
                <Route path="/" component={Home} exact/>
                <Route path="/rooms/" component={RoomsContainer}/>
                <Route path="/user/" component={UserContainer}/>
            </div>
        );
    }
}

export default AppRoutes;

