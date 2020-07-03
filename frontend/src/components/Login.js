import React, {Component} from 'react';
import './Login.css';
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username:"",password:"",auth:false};
    }

    onChangeUsername = (e) => {
        this.setState({username:e.target.value});
    }

    onChangePassword = (e) => {
        this.setState({password:e.target.value});
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const res =  await axios.post(process.env.REACT_APP_DOMAIN+'/api/login',{
                username:this.state.username,
                password:this.state.password
            });
            console.log(res);
            this.props.handleAuthToken(res.data);
        }catch(ex){
            console.log("explosion "+process.env.NODE_ENV,ex);
        }
    }

    render() {
        return (
            <div>
            {
                this.showLoginModal()
            }
            </div>

        );
    }
    showLoginModal() {
        if(!this.props.isUserLoggedIn) {
            return <div>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon"/>
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" onChange={this.onChangeUsername}/>
                            <input type="password" id="password" className="fadeIn third" name="login"
                                   placeholder="password" onChange={this.onChangePassword}/>
                            <button id="Login-Button" className="fadeIn fourth">Log In</button>
                        </form>

                    </div>
                </div>
            </div>

    }
}
}

export default Login;