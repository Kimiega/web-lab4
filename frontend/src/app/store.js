import {createStore} from "redux";

const initialState = {
    username: localStorage.getItem("username"),
    login: localStorage.getItem("login"),
    checks: null,
    radius: null
};

function reducer(state, action) {
    switch (action.type) {
      case "setUsername":
        this.username = action.value
        localStorage.setItem("username", action.value)
        return state
      case "changeLogin":
          localStorage.setItem("login", action.value)
          if(action.value == null) {
             state.radius = null
          }
          state.login = action.value
          state.checks = null
          state.formErrors = initialState.formErrors
          return state;
      case "appendCheck":
          state.checks.push(action.value)
          return state;
      case "changeRadius":
          state.radius = action.value
          return state
      case "setChecks":
          localStorage.setItem("checks", action.value)
          state.checks = action.value

          return state;
      default:
          return state;
    }
}

const store = createStore(reducer, initialState);
export default store;
