import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Landing from './components/landing'
import Register from './components/auth/register'
import Login from './components/auth/login'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/set_auth_token'
import { setCurrentUser } from './actions/auth_actions'
import Navbar from './components/navbar'
import store from './store'
import CreateToyForm from './components/toy/create_toy_form'
import './styles/navbar.css';
import './styles/login_form.css';
import './styles/register_form.css';
import './styles/create_toy_form.css';
import './styles/landing.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
}
window.store = store

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing }/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/toys/new' component={CreateToyForm} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
