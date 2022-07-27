import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React, { Fragment } from "react"
import { Landing } from "./components/layouts/Landing"
import { Navbar } from "./components/layouts/Navbar"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Alert } from "./components/layout/Alert"

//Redux
import { Provider } from "react-redux"
import store from "./store"

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)

export default App
