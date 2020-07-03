import React, {Component} from 'react';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {auth:'false'};
    }
    async componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.state.auth}
            </div>
        );
    }
}

export default Home;