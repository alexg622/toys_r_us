import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logoutUser } from '../actions/auth_actions'
import { connect } from 'react-redux'
import axios from 'axios' 


class Navbar extends React.Component {

  noAuthLinks(){
    return (
      <div className="no-auth-links">
        <Link className="login-button" to='/login'>Login</Link>
        <Link className="register-button" to='/register'>Register</Link>
      </div>
    )
  }

  authLinks(user){
    return (
      <div className="auth-links">
        <div className='view-cart'>
          <i className="add-cart fas fa-shopping-cart fa-2x"></i>
        </div>
        <button className="logout-button" onClick={this.props.logoutUser}>Logout</button>
      </div>
    )
  }
  render() {
    window.props = this.props
    const { isAuthenticated } = this.props.auth
    const logout = <button className="logout-button" onClick={this.props.logoutUser}>Logout</button>
    return (
      <div className="navbar">
        <Link to="/" className="logo">
          <ul className='letters'>
            <li className="T">T</li>
            <li className="O">O</li>
            <li className="Y">Y</li>
            <li id="S" className="S">S</li>
            <li id="four" className="four">4</li>
            <li id="U" className="U">U</li>
            <li id="two-S" className="S">S</li>
          </ul>
        </Link>
        <div className="auth-buttons">
          {isAuthenticated ? this.authLinks(this.props.auth.user) : this.noAuthLinks()}
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar)
