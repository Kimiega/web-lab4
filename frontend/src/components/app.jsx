import React, {Component} from 'react';
import Main from "./pages/main/main";
import './app.css'
import Login from "./pages/login/login";
import store from "../app/store";

class App extends Component {
    componentDidMount() {
        store.subscribe(() => {
            this.setState({reduxState: store.getState()});
        })
        function relMouseCoords(event) {
            let totalOffsetX = 0;
            let totalOffsetY = 0;
            let canvasX = 0;
            let canvasY = 0;
            let currentElement = this;

            do {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            }
            while (currentElement === currentElement.offsetParent)

            canvasX = event.pageX - totalOffsetX;
            canvasY = event.pageY - totalOffsetY;

            return {x: canvasX, y: canvasY}
        }

        HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
    }

    render() {
        return (
            <div className="first-page">
                {store.getState().login && store.getState().login !== "null" ? <Main/> : <Login/>}
            </div>
        )
    }
}

export default App;