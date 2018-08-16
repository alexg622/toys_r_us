import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getToys, changeQuantity } from "../../actions/toy_actions"
import { removeToyFromCart } from "../../actions/auth_actions"
import PropTypes from 'prop-types'



class UserCart extends React.Component{
  constructor(props){
    super(props)
    this.getPrice = this.getPrice.bind(this)
    this.deleteToy = this.deleteToy.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    this.props.getToys()
    setTimeout(this.rotatePriceColor, 1000)
  }

  deleteToy(e){
    e.preventDefault()
    this.props.removeToyFromCart(String(e.target.id))
  }

  handleSubmit(e){
    e.preventDefault()
    let select = e.target.querySelector('select')
    let val = select.value
    let id = select.id
    const quantity = {quantity: val}
    this.props.changeQuantity(id, quantity)
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

  optionSelect(){
    let i = 0
    let options = []
    while(i < 11) {
      options.push(<option key={i}>{i}</option>)
      i ++
    }
    return options
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

  render(){
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
        <div key={index} className="userCart-div">
          <div className="img-links">
            <img id="cart-img" src={toy[0].avatar} alt="" heigth="300px" width="400px"/>
            <button className="delete-from-cart" id={toy[0]._id} onClick={this.deleteToy}>Delete</button>
          </div>
          <div className="toy-info">
            <p className="description">{toy[0].description}</p>
            <h1 ref="price" id="price" className="price">${toy[0].price}</h1>
            <h1 ref="price" id="price" className="quantity">Quantity: {quantity}</h1>
            <form id="quantity-form" onSubmit={this.handleSubmit}>
              <select id={toy[0]._id} className="select-value" from="quantity-form">
                <option defaultValue="selected">{quantity}</option>
                {this.optionSelect()}
              </select>
              <input type="submit" value="quantity"/>
            </form>
          </div>
        </div>
      )
    })
    if(price > 0) price = this.getPrice(String(price))
    if(this.props.ids.length === 0) price = 0

    return(
      <div className='userCart-container'>
        <div className="list-of-toys-cart">
          {outputToys}
        </div>
        <div className='checkout'>
          <div className="checkout-items">
            <div>Items: {this.items()}</div>
            <div>Buy Items: ${price}</div>
            <button className="purchase">Purchase</button>
          </div>
        </div>
      </div>
    )
  }
}

UserCart.propTypes = {
  getToys: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  removeToyFromCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  let ids = {}
  let cartToys = {}
  let quantities = {}
  let allToyIds = {}
  if (state.auth.user.cart === undefined) {
    ids = {}
  } else {
    ids = Object.values(state.auth.user.cart).map(toy => toy._id)
    allToyIds = Object.values(state.toy.toys).map(toy => toy._id)
    cartToys = Object.values(state.auth.user.cart).map(toy => toy)
    quantities = Object.values(state.auth.user.cart).map(toy => toy.quantity)

  }
  return {allToyIds: allToyIds, toys: state.toy.toys, errors: state.errors, auth: state.auth, ids: ids, cartToys: cartToys, quantities: quantities}
}

export default connect(mapStateToProps, { getToys, changeQuantity, removeToyFromCart })(withRouter(UserCart))
