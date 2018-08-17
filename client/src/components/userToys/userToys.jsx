import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getToys } from "../../actions/toy_actions"
import { getCurrentUser } from "../../actions/auth_actions"
import PropTypes from 'prop-types'

class UserToys extends React.Component{
  constructor(props){
    super(props)
    this.getPrice = this.getPrice.bind(this)
  }
  componentDidMount(){
    if(this.props.auth.user.toys !== undefined){
      this.props.getCurrentUser()
    }
    this.props.getToys()
    setTimeout(this.rotatePriceColor, 1000)
  }

  getPrice(newPrice){
      let counter = 1
      newPrice = String(newPrice)
      let stri = ""
      for(let i=newPrice.length-1; i>-1; i--){
        if(counter % 3 === 0) {
          stri = "," + newPrice[i] + stri
        } else {
          stri = newPrice[i] + stri
        }
        counter ++
        if(counter === 4) counter = 1
      }
    if(stri[stri.length-1] === ",") return stri.substr(0, stri.length-1)
    if(stri[0] === ",") return stri.substr(1, stri.length-1)
    return stri
  }

  toysInCart(){
    let toys = {}
    this.props.toys.map(toy => {
      if(this.props.ids.includes(toy._id)) {
        toys[toy._id] = [toy]
      }
    })
    this.props.cartToys.map(toy => {
      toys[toy._id].push(toy.quantity)
    })
    return toys
  }

  items(){
    let result = 0
    this.props.quantities.map(quantity => result += parseInt(quantity))
    return result
  }

  emptyMessage(){
    if(this.props.ids.length === 0){
      return (
        <div className="empty-message">You Have No Toys</div>
      )
    }
  }

  render(){
    console.log("HHHHHHERERERERE");
    window.props = this.props
    let toys = []
    if(this.props.toys.length > 0) {
      window.toys = this.toysInCart()
      toys = Object.values(this.toysInCart())
    }

    let price = 0
    const outputToys = toys.map((toy, index) => {
      let quantity = parseInt(toy[1])
      price += quantity * parseInt(toy[0].price)
      return (
        <div key={index} id={index === 0 ? "first" : null} className="userToy-div">
          <div className="img-userToy-links">
            <img id="userToy-img" src={toy[0].avatar} alt="" heigth="300px" width="400px"/>
          </div>
          <div className="userToy-info">
            <p className="new-description">{toy[0].description}</p>
            <h1 ref="price" id="new-price" className="price">${toy[0].price}</h1>
            <h1 ref="price" id="new-price" className="quantity">Quantity: {quantity}</h1>
          </div>
        </div>
      )
    })
    if(price > 0) price = this.getPrice(String(price))
    if(this.props.ids.length === 0) price = 0
    return(
      <div className='userToy-container'>
        <div className="list-of-userToys-userToy">
          <h1 className='new-your-toys'>Your Toys!</h1>
          {this.emptyMessage()}
          {outputToys}
        </div>
      </div>
    )
  }
}

UserToys.propTypes = {
  getToys: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  let ids = {}
  let cartToys = {}
  let quantities = {}
  let allToyIds = {}
  if (state.auth.user.toys === undefined) {
    ids = {}
  } else {
    ids = Object.values(state.auth.user.toys).map(toy => toy._id)
    allToyIds = Object.values(state.toy.toys).map(toy => toy._id)
    cartToys = Object.values(state.auth.user.toys).map(toy => toy)
    quantities = Object.values(state.auth.user.toys).map(toy => toy.quantity)

  }
  return {allToyIds: allToyIds, toys: state.toy.toys, errors: state.errors, auth: state.auth, ids: ids, cartToys: cartToys, quantities: quantities}
}

export default connect(mapStateToProps, { getCurrentUser, getToys })(withRouter(UserToys))
