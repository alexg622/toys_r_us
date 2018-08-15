import React from 'react'

const rotatePriceColor = function() {
  let counter = 0
  let colors = ["violet", "lightgreen", "blue", "orange"]
  const prices = document.querySelectorAll('.price')
  console.log(prices);
  setInterval(function(){
    prices.forEach(price => {
      price.style.color = colors[counter]
    })
    counter ++
    if (counter === 4) counter = 0
  }, 4000)
}

const ToyIndexItem = ({ toy, index }) => {
  return (
    <div key={index} className="landing-div">
      <div className="img-links">
        <img src={toy.avatar} alt="" heigth="500" width="400"/>
        <i className="add-cart fas fa-cart-plus fa-2x"></i>
      </div>
      <div className="toy-info">
        <p className="description">{toy.description}</p>
        <h1 ref="price" id="price" className="price">{toy.price}$</h1>
      </div>
    </div>
  )
}
