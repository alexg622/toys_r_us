import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Landing from './components/landing'
import Register from './components/auth/register'
import Login from './components/auth/login'
import { Provider } from 'react-redux'
import store from './store'
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
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
