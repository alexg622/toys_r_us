import React from 'react'

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

  handleSubmit(e){
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    console.log(newUser);
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
          <input placeholder="name" type="text" value={this.state.name} onChange={this.update("name")}/>
          <input placeholder="email" type="email" value={this.state.email} onChange={this.update("email")}/>
          <input placeholder="password" type="password" value={this.state.password} onChange={this.update("password")}/>
          <input type="submit" value="Create Account"/>
        </form>
      </div>
    )
  }
}

export default Register
