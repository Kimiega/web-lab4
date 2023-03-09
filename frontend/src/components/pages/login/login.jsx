import React, {Component} from "react";
import store from "../../../app/store";
import './login.css'
import {login, register} from "../../../api/request";
import FormErrors from "../../molecules/errors/errors";
import Header from "../../organisms/header/header";
import AuthInput from "../../atoms/authInput/authInput";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loginValid: true,
            passwordValid: true,
            formErrors: {
                username: '',
                password: '',
                important: ''
            },
        }
    }

    componentDidMount() {
        this.state.component_mounted = true
    }

    componentWillUnmount() {
        this.state.component_mounted = false
    }


    signIn = () => {
        if (this.state.usernameValid && this.state.passwordValid)
        {
          login(this.state.username, this.state.password).then(r => {
            console.log(r)
            if (r.status === 200) {
              window.localStorage.setItem("token", r.data.token)
              store.dispatch({type: "changeLogin", value: "true"});
              store.dispatch( {type: "setUsername", value: r.data.username})
            }
            else
            {
              console.log(r)
              this.setError("important", r.data)
              setTimeout(() => this.setError("important",  ""), 3000)
            }
          })
            .catch(e => {
            this.setError("important", e.response.data)
            setTimeout(() => this.setError("important",  ""), 5000)
          })
        }
    }

    signUp = () => {
        if (this.state.usernameValid && this.state.passwordValid)
            register(this.state.username, this.state.password).then(r => {
              if (r.status === 200)
              {
                window.localStorage.setItem("token", r.data.token)
                this.setError("important", "You has been registered")
                setTimeout(() => this.setError("important",  ""), 5000)
              }
              else
              {
                this.setError("important", r.data)
                setTimeout(() => this.setError("important",  ""), 5000)
              }
            })
              .catch(e => {
                this.setError("important", e.response.data)
                setTimeout(() => this.setError("important",  ""), 5000)
              })
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.validateField(name, value, e);
    }

    validateField(fieldName, value, e) {
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'password':
                passwordValid = value != null && value.length > 5
                this.setError("password", passwordValid ? '' : ' must contain at least 6 characters')
                this.setState({password: e.target.value})
                break;
            case 'username':
                usernameValid = value != null && value.length > 2
                this.setError("username", usernameValid ? '' : ' must contain at least 3 characters')
                if (usernameValid) {
                    usernameValid = value != null && value.match(/^[a-zA-Z]+/)
                    this.setError("username", usernameValid ? '' : ' must start with a letter')
                }
                this.setState({username: e.target.value})
                break;
            default:
                break;
        }
        this.setState({
            passwordValid: passwordValid,
            usernameValid: usernameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.passwordValid && this.state.usernameValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'login-error');
    }

    setError(name, message) {
        let form = Object.assign({}, this.state.formErrors);
        form[name] = message;
        if(this.state.component_mounted)
            this.setState({formErrors: form})
    }

    render() {
        return (
            <div>
                <Header login={false}/>
                <div className="login-form-wrapper">
                    <form className={`login-form`}>
                        <AuthInput name={"username"} type={"text"} errorClass={this.errorClass}
                                   errorElement={this.state.formErrors.username} value={this.state.username}
                                   handleUserInput={this.handleUserInput} maxLength={12}/>
                        <AuthInput name={"password"} type={"password"} errorClass={this.errorClass}
                                   errorElement={this.state.formErrors.password} value={this.state.password}
                                   handleUserInput={this.handleUserInput} maxLength={20}/>
                        <div className={"login-buttons"}>
                            <button className="button" type="button" onClick={this.signUp}>Sign Up</button>
                            <button className="button" type="button" onClick={this.signIn}>Sign In</button>
                        </div>
                        <FormErrors formErrors={this.state.formErrors}/>
                    </form>
                </div>
            </div>
        )
    }


}


export default Login
