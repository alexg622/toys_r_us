import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getToys } from "../../actions/toy_actions"
import PropTypes from 'prop-types'



class UserCart extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      items: {}
    }
  }
  componentDidMount(){
    this.props.getToys()
    setTimeout(this.rotatePriceColor, 1000)
  }

rotatePriceColor() {
    let counter = 0
    let colors = ["violet", "lightgreen", "pink", "blue", "orange", "black"]
    const prices = document.querySelectorAll('.buy-me')
    setInterval(function(){
      prices.forEach(price => {
        price.style.color = colors[counter]
      })
      counter ++
      if (counter === 6) counter = 0
    }, 4000)
  }

  render(){
    window.props = this.props
    const toys = this.props.toys.map((toy, index) => {
      if(this.props.ids.includes(toy._id)) {
        let quantity = 0
        this.props.ids.map(id => {
          if(id === toy._id) {
            quantity += 1
          }
        })
        return (
          <div key={index} className="landing-div">
            <div className="img-links">
              <img id="cart-img" src={toy.avatar} alt="" heigth="300px" width="400px"/>
            </div>
            <div className="toy-info">
              <p className="description">{toy.description}</p>
              <h1 ref="price" id="price" className="price">{toy.price}$</h1>
              <h1 ref="price" id="price" className="quantity">Quantity: {quantity}</h1>
            </div>
          </div>
        )
      }
    })

    return(
      <div>
        <div ref="toys" className="list-of-toys">
          {toys}
        </div>
      </div>
    )
  }
}

UserCart.propTypes = {
  getToys: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getToys })(withRouter(UserCart))
