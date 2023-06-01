const mongoose = require('mongoose');
const Product = require('./backend/productSch');

mongoose.connect('mongodb://127.0.0.1:27017/shoppingcart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true
    
}).then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

// const product = new Product({
//     name: "external harddrive",
//     price: 70,
//     quantity: 9
// })

// product.save().then(product => {
//     console.log(product)
// }).catch(e => {
//     console.log(e)
// })

const seedProducts = [
        {name: "screen", price: 200, quantity: 12},
        {name: "mouse", price: 30, quantity: 41},
        {name: "headphones", price: 50, quantity: 29},
        {name: "mobile phone", price: 800, quantity: 62},
        {name: "hard drive", price: 75, quantity: 80},
        {name: "ethernet cable 10m", price: 25, quantity: 74},
        {name: "office desk", price: 175, quantity: 73},
        {name: "office chair", price: 250, quantity: 28}
]

Product.insertMany(seedProducts).then(res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})
