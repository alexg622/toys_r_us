import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {loginUser } from '../../actions/auth_actions'

class Login extends React.Component{
  constructor(){
    super()
    this.state = {
      email: "",
      password: "",
      errors: {}
    }
    this.update = this.update.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData)
  }

  componentWillReceiveProps(nextProps) {
     if(nextProps.auth.isAuthenticated) {
       this.props.history.push('/')
     }

     if (nextProps.errors) {
       this.setState({ errors: nextProps.errors });
     }
   }

  update(field){
    return e => {
      this.setState({[field]: e.target.value})
    }
  }
  render(){
    const { errors } = this.state
    let divErrors
    if(errors) {
      divErrors = Object.values(errors).map((error, idx) => {
        return (
          <li key={idx}>{error}</li>
        )
      })
    }
    return(
      <div>
        <ul className="errors">
          {divErrors}
        </ul>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <placeholder>Email:</placeholder>
           <input placeholder="email" type="email" value={this.state.email} onChange={this.update("email")}/>
          <placeholder className="password-placeholder">Password:</placeholder>
          <input placeholder="password" type="password" value={this.state.password} onChange={this.update("password")}/>
          <input id="login-submit" type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
