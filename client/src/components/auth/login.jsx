import React from 'react'
import axios from 'axios'
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
    axios.post('/api/users/login', user).then(res => console.log(res.data))
    .catch(err => this.setState({errors: err.response.data}))
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
        <ul>
          {divErrors}
        </ul>
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
