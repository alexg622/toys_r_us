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
import './styles/navbar.css';

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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
