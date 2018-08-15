import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addToy } from '../../actions/toy_actions'
import store from "../../store"

class CreateToyForm extends React.Component{
  constructor(){
    super()
    this.state = {
      name: "",
      avatar: "",
      price: "",
      description: "",
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
  }

  componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
       this.setState({ errors: nextProps.errors });
     }
   }

  update(field){
    return e => {
      this.setState({[field]: e.target.value})
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const newToy = {
      name: this.state.name,
      avatar: this.state.avatar,
      price: this.state.price,
      description: this.state.description
    }
    this.props.addToy(newToy, this.props.history)
  }

  render() {
    const {errors} = this.state
    window.errors = errors
    let divErrors
    if(errors) {
      divErrors = Object.values(errors).map((error, idx) => {
        return (
          <li key={idx}>{error}</li>
        )
      })
    }

    window.store = store
    return (
      <div>
        <ul className="errors">
          {divErrors}
        </ul>
        <form className="create-toy-form" onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input placeholder="Name" type="text" value={this.state.name} onChange={this.update("name")}/>
          <label>Avatar:</label>
          <input placeholder="Please enter image address" type="text" value={this.state.avatar} onChange={this.update("avatar")}/>
          <label>Price:</label>
          <input placeholder="Price" type="text" value={this.state.price} onChange={this.update("price")}/>
          <label>Description:</label>
          <input placeholder="Description" type="text" value={this.state.description} onChange={this.update("description")}/>
          <input id="create-toy-submit" type="submit" value="Create Toy"/>
        </form>
      </div>
    )
  }
}

CreateToyForm.propTypes = {
  addToy: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { addToy })(withRouter(CreateToyForm))
