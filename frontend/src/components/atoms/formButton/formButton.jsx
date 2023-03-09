import React, {Component} from "react";
import './formButton.css'

class FormButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`button-elem`}>
                <button type="button" onClick={this.props.submit}>{this.props.text}</button>
            </div>
        )
    }
}

export default FormButton