import React, {Component} from 'react';

class FormErrors extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`button-elem form-errors`}>
                {this.props.formErrors.important && this.props.formErrors.important !== '' ?
                    <p className={"error-text"}>
                        {this.props.formErrors.important}
                    </p>
                    :
                    Object.keys(this.props.formErrors).map((fieldName, i) => {
                        if (this.props.formErrors[fieldName].length > 0) {
                            return (
                                <p className={"error-text"}
                                   key={i}>{fieldName.substr(0, 1).toUpperCase() + fieldName.substr(1)} {this.props.formErrors[fieldName]}!</p>
                            )
                        } else {
                            return '';
                        }
                    })}
            </div>)
    }
}

export default FormErrors