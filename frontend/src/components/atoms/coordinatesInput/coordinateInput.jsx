import React, {Component} from "react";
import './coordinatesInput.css'

class CoordinateInput extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`form-group ${this.props.errorClass(this.props.errorElement)}`}>
                <label>{this.props.name} </label>
                <input type={"text"} name={this.props.name} value={this.props.form} onChange={this.props.handleUserInput}
                       maxLength={10} placeholder={this.props.placeholder}/>
                <br/>
            </div>
        )
    }
}

export default CoordinateInput