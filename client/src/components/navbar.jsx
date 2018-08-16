import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { logoutUser, loginUser } from '../actions/auth_actions'
import { connect } from 'react-redux'



class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.demoLogin = this.demoLogin.bind(this)
    this.logout = this.logout.bind(this)
    this.items = this.items.bind(this)
  }
  demoLogin(e){
    e.preventDefault()
    const demoUser = {
      email: "alex@mail.com",
      password: "password"
    }
    this.props.loginUser(demoUser).then(this.props.history.push('/'))
  }

  logout(e){
    e.preventDefault()
    this.props.logoutUser()
    this.props.history.push('/')
  }
  noAuthLinks(){
    return (
      <div className="no-auth-links">
        <button className="demo-button" onClick={this.demoLogin}>DemoLogin</button>
        <Link className="login-button" to='/login'>Login</Link>
        <Link className="register-button" to='/register'>Register</Link>
      </div>
    )
  }

  items(){
    let result = 0
    this.props.auth.user.cart.map(toy => result += parseInt(toy.quantity))
    return result
  }

  authLinks(user){
    return (
      <div className="auth-links">
        <div className='view-cart'>

          <Link to="/cart">
            <i className="add-cart fas fa-shopping-cart fa-3x"><h1 className="cartItems">{this.items()}</h1></i>
          </Link>
        </div>
        <button className="logout-button" onClick={this.logout}>Logout</button>
      </div>
    )
  }
  render() {
    window.props = this.props
    const { isAuthenticated } = this.props.auth
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
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  let items = 0
  if (state.auth.user.cart === undefined) {
    items = 0
  } else {
    items = Object.values(state.auth.user.cart).length
  }
  return {auth: state.auth, cartItems: items}
}

export default connect(mapStateToProps, { logoutUser, loginUser })(withRouter(Navbar))
