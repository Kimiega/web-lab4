import React, {Component} from "react";
import './authInput.css'

class AuthInput extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="log-field">
                <label
                    className={`${this.props.errorClass(this.props.errorElement)}`}>{this.props.name.substr(0,1).toUpperCase() + this.props.name.substr(1)}</label><br/>
                <input className={`${this.props.errorClass(this.props.errorElement)}`}
                       type={this.props.type}
                       name={this.props.name} id={this.props.name} value={this.props.value}
                       onChange={(e) => this.props.handleUserInput(e)} maxLength={this.props.maxLength}/>
            </div>
        )
    }
}

export default AuthInput