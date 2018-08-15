import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logoutUser } from '../actions/auth_actions'
import { connect } from 'react-redux'

class Navbar extends React.Component {
  render() {
    const { isAuthenticated, user } = this.props.auth
    const logout = <button onClick={this.props.logoutUser}>Logout</button>
    const login = <button>Login</button>
    return (
      <div>
        {isAuthenticated ? logout : login}
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
