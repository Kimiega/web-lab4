import React, {Component} from "react";
import CoordinatesForm from "../../organisms/coordinatesForm/coordinatesForm";
import Table from "../../molecules/table/table";
import "./main.css"
import Graph from "../../atoms/graph/graph";
import {check, clear, getAll} from "../../../api/request";
import Header from "../../organisms/header/header";
import {clearCanvas, drawCanvas, drawPoint} from "../../../app/canvas";
import store from "../../../app/store";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            output: React.createRef(),
            x_form: '',
            y_form: '',
            r_form: '',
            formErrors: {
                x: '',
                y: '',
                r: '',
                important: ''
            },
        }
    }

    componentDidMount() {
        this.state.mounted = true;
        store.subscribe(() => {
            if (this.state.mounted)
                this.setState({reduxState: store.getState()});
        })
        if (store.getState().checks === null) {
            this.getChecks()
        }
    }

    componentWillUnmount() {
        this.state.mounted = false;
    }

    getChecks = () => {
        getAll()
            .then(response => {
                if (response.status === 200) {
                  store.dispatch({type: "setChecks", value: response.data})
                  drawCanvas(document.getElementById("canvas"))
                }
                else {
                   this.setError("important", response.data);
                   setTimeout(() => {
                     this.setError("important", '')
                   }, 3000)
                }
            })
          .catch(e => {
            this.setError("important", e.message)
            setTimeout(() => this.setError("important",  ""), 5000)
          })
    }

    submit = () => {
        if (!this.validateForm()) {
            if (this.state.x_form === '')
                this.setError("important", "Can't submit while X is not set!")
            else if (this.state.y_form === '')
                this.setError("important", "Can't submit while Y is not set!")
            else if (this.state.r_form === '')
                this.setError("important", "Can't submit while R is not set!")
            else
                this.setError("important",  "Can't submit while data is invalid!")
            setTimeout(() => this.setError("important", ''), 3000)
        } else {
            let information = {
                "x": this.state.x_form,
                "y": this.state.y_form,
                "r": this.state.r_form
            };
            this.submitInfo(information)
        }
    }

    handleCanvasSubmit = (information) => {
        if (this.state.r_form === '') {
            this.setError("important",  "Can't submit while R is not set!")
            setTimeout(() => this.setError("important", ''), 3000)
        } else if(!this.validateR(information.r)) {
            this.setError("important",  "R must be in range (0; 5)!")
            setTimeout(() => this.setError("important", ''), 3000)
        }
        else if(!this.validateX(information.x)) {
            this.setError("important",  "X must be in range (-3; 3)!")
            setTimeout(() => this.setError("important", ''), 3000)
        } else if(!this.validateY(information.y)) {
            this.setError("important",  "Y must be in range (-5; 5)!")
            setTimeout(() => this.setError("important", ''), 3000)
        } else this.submitInfo(information)
    }

    submitInfo = (information) => {
             check(information)
                .then(response => {
                  if (response.status === 200) {
                    store.dispatch({type: "appendCheck", value: response.data})
                    drawPoint(response.data, document.getElementById("canvas"), this.state.r_form)
                  }
                  else {
                    this.setError("important", response.data);
                    setTimeout(() => {
                      this.setError("important", '')
                    }, 3000)
                  }
                })
               .catch(e => {
                 this.setError("important", e.message)
                 setTimeout(() => this.setError("important",  ""), 5000)
               })
    }

    clear = () => {
        clear().then(response => {
            if(this.state.mounted)
                if (response.status === 200) {
                    this.getChecks()
                } else {
                  this.setError("important", response.data);
                  setTimeout(() => {
                    this.setError("important", '')
                  }, 3000)
                }
        })
          .catch(e => {
          this.setError("important", e.message)
          setTimeout(() => this.setError("important",  ""), 5000)
        })
    }

    changeRState(value) {
        store.dispatch({type: "changeRadius", value: value})
    }

    setX = (x) => this.setState({x_form: x});
    setY = (y) => this.setState({y_form: y});
    setR = (r) => this.setState({r_form: r});
    validateX = (x) => x != null && x !== '' && !isNaN(x) && x > -3 && x < 3
    validateY = (y) => y != null && y !== '' && !isNaN(y) && y > -5 && y < 5
    validateR = (r) => r != null && r !== '' && !isNaN(r) && r > 0 && r < 5
    setFormValid = (formValid) => this.setState({formValid: formValid})
    validateForm() {
        return (this.validateX(this.state.x_form) && this.validateY(this.state.y_form) && this.validateR(this.state.r_form));
    }
    setError = (name, message) => {
        let form = Object.assign({}, this.state.formErrors);
        form[name] = message;
        if(this.state.mounted)
            this.setState({formErrors: form})
    }

    render() {
        return (
            <div id="main">
                <Header login={true}/>
                <div className={"main-wrapper"}>
                    <Graph submitInfo={this.handleCanvasSubmit}/>
                    <CoordinatesForm validate={this.validate} x_form={this.state.x_form} y_form={this.state.y_form}
                                     r_form={this.state.r_form} getChecks={this.getChecks} setX={this.setX} setY={this.setY}
                                     setR={this.setR} displayError={this.displayError} setFormValid={this.setFormValid}
                                     submit={this.submit} clear={this.clear} addError={this.setError}
                                     formErrors={this.state.formErrors} changeRState={this.changeRState}
                                     validateX={this.validateX} validateY={this.validateY} validateR={this.validateR}
                    />
                </div>
                <Table coordinateX={"x"} coordinateY={"y"} radius={"r"} hit={"hit"} ldt={"time"} checks={store.getState().checks}/>
            </div>)
    }


}

export default Main
