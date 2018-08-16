import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getToys } from "../actions/toy_actions"
import { addToyToCart, clearErrors, haveItem } from "../actions/auth_actions"
import PropTypes from 'prop-types'



class Landing extends React.Component{
  constructor(props){
    super(props)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount(){
    this.props.getToys()
    this.props.clearErrors()
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

  addToCart(){
    return e => {
      const element = e.target
      const classL = element.classList.value
      const color = element.style.color
      let counter = false
      if(this.props.auth.user.cart !== undefined){
        this.props.auth.user.cart.forEach(toy => {
          if(String(toy._id) === String(e.target.id)) counter = true
        })
      }
      if(counter){
        this.props.haveItem()
        element.classList.value = "animated inifite bounce wink far fa-frown fa-2x"
        element.style.color = "red"
        setTimeout(() => {
          element.classList.value = classL
          element.style.color = color
        }, 3000)
        setTimeout(() => {
          let theError = document.querySelector(".errors")
          if(!theError) return
          this.props.clearErrors()
        }, 7000)
      } else {
        this.props.addToyToCart(e.target.id).then(res => {
          if (res.type === "GET_ERRORS") {
            element.classList.value = "animated inifite bounce wink far fa-frown fa-2x"
            element.style.color = "red"
            setTimeout(() => {
              element.classList.value = classL
              element.style.color = color
            }, 3000)
            setTimeout(() => {
              let theError = document.querySelector(".errors")
              if(!theError) return
                this.props.clearErrors()
            }, 7000)
          } else {
            element.classList.value = "animated inifite bounce wink far fa-smile-wink fa-2x"
            setTimeout(() => {
              element.classList.value = classL
            }, 3000)
          }
        })
      }
    }
  }

  render(){
    let divErrors
    window.props = this.props
    if (this.props.errors) {
      divErrors = <div className="errors">{this.props.errors.error}</div>
    }
    const toys = this.props.toys.map((toy, index) => {
      return (
        <div key={index} className="landing-div">
          <div className="img-links">
            <img id="landing-img" src={toy.avatar} alt="" height="300px" width="400px"/>
            <div className="buy-div">
              <i onClick={this.addToCart()} id={toy._id} className="add-cart fas fa-cart-plus fa-2x"></i>
              <h1 className="buy-me">Buy Me!</h1>
            </div>
          </div>
          <div className="toy-info">
            <p className="description">{toy.description}</p>
            <h1 ref="price" id="price" className="price">${toy.price}</h1>
          </div>
        </div>
      )
    })
    return(
      <div>
        {divErrors}
        <div ref="toys" className="list-of-toys">
          {toys}
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  getToys: PropTypes.func.isRequired,
  haveItem: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addToyToCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  toys: state.toy.toys,
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { getToys, clearErrors, addToyToCart, haveItem })(withRouter(Landing))
