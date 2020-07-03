import React, {Component} from 'react';
import axios from 'axios';

class CreateUser extends Component {

    state = {
        users:[],
        first_name:'',
        last_name:''
    };

    async componentDidMount() {
        const res =  await axios.get('http://localhost:3535/api/users');
        this.setState({users:res.data.users});
    }

    onChangeFirstName = (e) => {
        this.setState({first_name:e.target.value});
        console.log(this.state);
    }

    render() {
        return (
            <div className={"row"}>
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Crear nuevo Usuario!</h3>
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeFirstName}/>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.onChangeFirstName}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map((user) => <li key={user._id} className="list-group-item list-group-item-action">
                                {user.first_name} {user.last_name}
                            </li>
                            )
                        }
                    </ul>
                </div>

            </div>
        );
    }
}

export default CreateUser;