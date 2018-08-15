import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {registerUser } from '../../actions/auth_actions'

class Register extends React.Component{
  constructor(){
    super()
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    }
    this.update = this.update.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
       this.setState({ errors: nextProps.errors });
     }
   }

  handleSubmit(e){
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    this.props.registerUser(newUser, this.props.history)
  }

  update(field){
    return e => {
      this.setState({[field]: e.target.value})
    }
  }
  render(){
    const {errors} = this.state
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
        <form className="register-form" onSubmit={this.handleSubmit}>
          <placeholder>Name:</placeholder>
          <input placeholder="name" type="text" value={this.state.name} onChange={this.update("name")}/>
          <placeholder>Email:</placeholder>
          <input placeholder="email" type="email" value={this.state.email} onChange={this.update("email")}/>
          <placeholder class-Name="password-placeholder">Password</placeholder>
          <input placeholder="password" type="password" value={this.state.password} onChange={this.update("password")}/>
          <input id="register-submit" type="submit" value="Create Account"/>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
