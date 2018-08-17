# toys_r_us

This application is meant to be a representation of an online toy store. I used bcrypt.js, jsonwebtoken, passport, and localStorage for user authentication, and storing user state. For my backend and database I used Node.js, Express, and MongoDB. For the frontend I used React/Redux. I also utilized concurrently and axios to simplify making requests to my api and running my servers while in development.

![][https://github.com/alexg622/toys_r_us/blob/master/images/cart.png?raw=true]

Once logged in the user is able to add or delete toys from their cart, choose how many of a particular toy they want to buy, and then purchase the toy to add it to their purchased toys collection. Once a toy is added to the user's cart, the count of how many toys the user has will increment by one in the small cart icon in the navbar. I also added the functionality so that the user can only add one of each toy to their cart, but they can choose how many of that toy they want to purchase once it is in their cart. I also utilized setTimeout and setInterval to change certain elements styles every several seconds.

This project is still a work in progress as I am going to implement user reviews, a spinner for when the page is loading, and do more styling. Some challenges when developing this application were losing state when I would refresh the page. I was able to work around this through utilizing functions within componentDidMout. I also ran into the problem of not being able to grab certain elements because the DOM content was still loading, which I was able to work around using SetTimeout.  
