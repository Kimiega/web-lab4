import React, {Component} from "react";
import './appHeader.css'
import store from "../../../app/store";

class AppHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className={"header"}>
                <div className={"header-button-wrapper"}>
                    {this.props.isLoggedIn ? <button className={"logout"} onClick={this.props.logout}>Log Out</button> : ""}
                  </div>
              <div>
              <span className="user-name-tag">
                    {this.props.isLoggedIn ? store.getState().username : ""}
                  </span>
                </div>
                <div>
                <span>
                    Belyakov Dmitry, P32131
                </span>
                <span>
                    Variant 4321
                </span>
                </div>
            </header>
        )
    }
}

export default AppHeader
