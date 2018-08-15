import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getToys } from "../actions/toy_actions"
import PropTypes from 'prop-types'

class Landing extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      color: "blue"
    }
  }

  componentDidMount(){
    console.log("here");
    this.props.getToys()
    setTimeout(this.rotatePriceColor, 1000)
  }

rotatePriceColor() {
    let counter = 0
    let colors = ["violet", "lightgreen", "pink", "blue", "orange", "black"]
    const prices = document.querySelectorAll('.buy-me')
    console.log(prices);
    setInterval(function(){
      prices.forEach(price => {
        price.style.color = colors[counter]
      })
      counter ++
      if (counter === 6) counter = 0
    }, 4000)
  }

  render(){
    const toys = this.props.toys.map((toy, index) => {
      return (
        <div key={index} className="landing-div">
          <div className="img-links">
            <img src={toy.avatar} alt="" heigth="500" width="400"/>
            <div className="buy-div">
              <i className="add-cart fas fa-cart-plus fa-2x"></i>
              <h1 className="buy-me">Buy Me!</h1>
            </div>
          </div>
          <div className="toy-info">
            <p className="description">{toy.description}</p>
            <h1 ref="price" id="price" className="price">{toy.price}$</h1>
          </div>
        </div>
      )
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

Landing.propTypes = {
  getToys: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  toys: state.toy.toys,
  auth: state.auth
})

export default connect(mapStateToProps, { getToys })(withRouter(Landing))
