import React from 'react'

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
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(user);
  }

  update(field){
    return e => {
      this.setState({[field]: e.target.value})
    }
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="email" type="email" value={this.state.email} onChange={this.update("email")}/>
          <input placeholder="password" type="password" value={this.state.password} onChange={this.update("password")}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}

export default Login
