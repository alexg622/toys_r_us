document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".price")){
    setTimeout(rotatePriceColor, 2000)
  }
})

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
