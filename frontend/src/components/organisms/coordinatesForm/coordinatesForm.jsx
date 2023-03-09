import React, {Component} from "react";
import {clearCanvas, drawCanvas} from "../../../app/canvas";
import FormErrors from "../../molecules/errors/errors";
import './coordForm.css'
import CoordinateInput from "../../atoms/coordinatesInput/coordinateInput";
import FormButton from "../../atoms/formButton/formButton";

class CoordinatesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xValid: false,
            yValid: false,
            rValid: false,
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.validateField(name, value, e);
    }

    validateField(fieldName, value, e) {
        let xValid = this.state.xValid;
        let yValid = this.state.yValid;
        let rValid = this.state.rValid;
        switch (fieldName) {
            case 'X':
                xValid = this.props.validateX(value)
                this.props.addError("x", xValid ? '' : ' must be in range (-3; 3)')
                this.props.setX(e.target.value)
                break;
            case 'Y':
                yValid = this.props.validateY(value)
                this.props.addError("y", yValid ? '' : ' must be in range (-5; 5)')
                this.props.setY(e.target.value)
                break;
            case 'R':
                rValid = this.props.validateR(value)
                this.props.addError("r", rValid ? '' : ' must be in range (0; 5)')
                if (rValid) {
                    this.props.setR(e.target.value)
                    this.props.changeRState(e.target.value)
                } else {
                    this.props.setR(e.target.value)
                    this.props.changeRState(null)
                }
                break;
            default:
                break;
        }
        this.setState({
            xValid: xValid,
            yValid: yValid,
            rValid: rValid
        })
        drawCanvas(document.getElementById("canvas"))
    }

    errorClass(error) {
        return (error.length === 0 ? 'nums-field' : 'has-error');
    }

    render() {
        return (
            <div className={"coordinates-wrapper"}>
                <div className={"form-wrapper"}>
                    <form id="form">
                        <CoordinateInput name={"X"} errorClass={this.errorClass} formErrors={this.props.formErrors}
                                         form={this.props.x_form} placeholder={"Enter X (-3; 3):"} handleUserInput={this.handleUserInput}
                                         errorElement={this.props.formErrors.x}/>
                        <CoordinateInput name={"Y"} errorClass={this.errorClass} formErrors={this.props.formErrors}
                                         form={this.props.y_form} placeholder={"Enter Y (-5; 5):"} handleUserInput={this.handleUserInput}
                                         errorElement={this.props.formErrors.y}/>
                        <CoordinateInput name={"R"} errorClass={this.errorClass} formErrors={this.props.formErrors}
                                         form={this.props.r_form} placeholder={"Enter R (0; 5):"} handleUserInput={this.handleUserInput}
                                         errorElement={this.props.formErrors.r}/>
                    </form>
                </div>
                <div className={`button-wrapper ${this.errorClass(this.props.formErrors.r + this.props.formErrors.y + this.props.formErrors.x)}`}>
                    <FormButton submit={this.props.submit} text={"Submit"}/>
                    <FormButton submit={this.props.clear} text={"Clear"}/>
                    <FormErrors formErrors={this.props.formErrors}/>
                </div>
            </div>
        )
    }
}

export default CoordinatesForm
