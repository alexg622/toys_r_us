import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logoutUser } from '../actions/auth_actions'
import { connect } from 'react-redux'

class Navbar extends React.Component {

  authLinks(){
    return (
      <div className="authLinks">
        <Link className="login-button" to='/login'>Login</Link>
        <Link className="register-button" to='/register'>Register</Link>
      </div>
    )
  }
  render() {
    const { isAuthenticated, user } = this.props.auth
    const logout = <button className="logout-button" onClick={this.props.logoutUser}>Logout</button>
    return (
      <div className="navbar">
        <div className="logo">
          <ul className='letters'>
            <li className="T">T</li>
            <li className="O">O</li>
            <li className="Y">Y</li>
            <li id="S" className="S">S</li>
            <li id="four" className="four">4</li>
            <li id="U" className="U">U</li>
            <li id="two-S" className="S">S</li>
          </ul>
        </div>
        <div className="auth-buttons">
          {isAuthenticated ? logout : this.authLinks()}
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
