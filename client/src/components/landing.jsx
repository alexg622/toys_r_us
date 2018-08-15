import React from 'react'
import { connect } from 'react-redux'
import { getToys } from "../actions/toy_actions"
import PropTypes from 'prop-types'
import store from '../store'

class Landing extends React.Component{

  componentDidMount(){
    this.props.getToys()
  }

  render(){
    window.store = store
    window.props = this.props
    const toys = this.props.toys.map((toy, index) => {
      return (
        <li>
          <img src={toy.avatar} alt="" heigth="500" width="400"/>
        </li>
      )
    })
    return(
      <div>
        <ul>
          {toys}
        </ul>
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

export default connect(mapStateToProps, { getToys })(Landing)
