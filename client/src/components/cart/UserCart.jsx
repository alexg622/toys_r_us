import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getToys } from "../../actions/toy_actions"
import { removeToyFromCart } from "../../actions/auth_actions"
import PropTypes from 'prop-types'



class UserCart extends React.Component{
  constructor(props){
    super(props)
    this.getPrice = this.getPrice.bind(this)
    this.deleteToy = this.deleteToy.bind(this)
  }
  componentDidMount(){
    this.props.getToys()
    setTimeout(this.rotatePriceColor, 1000)
  }

  deleteToy(e){
    e.preventDefault()
    console.log(typeof e.target.id);
    this.props.removeToyFromCart(String(e.target.id))
  }

  getPrice(newPrice){
      let counter = 1
      newPrice = String(newPrice)
      let stri = ""
      for(let i=0; i<newPrice.length; i++){
        console.log("in loop");
        if(counter % 3 === 0) {
          stri = stri + newPrice[i] + ","
        } else {
          stri = stri + newPrice[i]
        }
        counter ++
        if(counter === 4) counter = 1
      }
    if(stri[stri.length-1] === ",") return stri.substr(0, stri.length-1)
    return stri
  }

  render(){
    window.props = this.props
    let price = 0
    const toys = this.props.toys.map((toy, index) => {
      if(this.props.ids.includes(toy._id)) {
        let quantity = 0
        this.props.ids.map(id => {
          if(id === toy._id) {
            quantity += 1
          }
        })
        price += quantity * toy.price
        return (
          <div key={index} className="userCart-div">
            <div className="img-links">
              <img id="cart-img" src={toy.avatar} alt="" heigth="300px" width="400px"/>
              <button id={toy._id} onClick={this.deleteToy}>Delete</button>
            </div>
            <div className="toy-info">
              <p className="description">{toy.description}</p>
              <h1 ref="price" id="price" className="price">${toy.price}</h1>
              <h1 ref="price" id="price" className="quantity">Quantity: {quantity}</h1>
            </div>
          </div>
        )
      }
    })
    if(price > 0) price = this.getPrice(price)
    if(this.props.ids.length === 0) price = 0
    return(
      <div className='userCart-container'>
        <div ref="toys" className="list-of-toys-cart">
          {toys}
        </div>
        <div className='checkout'>
          <div className="checkout-items">
            <div>Items: {this.props.ids.length}</div>
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
  removeToyFromCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  let ids = {}
  if (state.auth.user.cart === undefined) {
    ids = {}
  } else {
    ids = Object.values(state.auth.user.cart).map(toy => toy._id)
  }
  return {toys: state.toy.toys, errors: state.errors, auth: state.auth, ids: ids}
}

export default connect(mapStateToProps, { getToys, removeToyFromCart })(withRouter(UserCart))
