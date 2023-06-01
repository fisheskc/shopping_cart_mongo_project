const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const ejsMate = require('ejs-mate');
const ejsMate = require('ejs');
const methodOverride = require('method-override');
const Product = require('./backend/productSch');
const Purchaseitem = require('./backend/purchaseItemSch');
const { v4: uuidv4 } = require('uuid');

mongoose.connect('mongodb://127.0.0.1:27017/shoppingcart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true
    
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'));

// localhost:3000 - home page
app.get('/', (req, res) => {
    res.render('home')
})

// display the product to the webpage, {products} - this will render
// the products to the webpage
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', {products})
    // res.send('New here')
})

app.get('/products/new', async (req, res) => {
    const products = await Product.find({})
    res.render('products/new')
    // res.send('New here')
})

// looks up the product and the purchaseItem here, in the DB here, using the ID, will then display the 
// product id to find the product
app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('purchaseitem')
    // see app.js, line 142, folder new_nutrition_Aug_27
    console.log(product)
    res.render('products/show', {product})
    // res.send('New here')
})

app.post('/products', async(req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/products/${product._id}`)
})
app.get('/products/:id/purchaseitems/purchaseNew', async (req, res) => {
    const { id } = req.params;
    const purchaseitem = await Purchaseitem.findById(id);
    res.render('purchaseitems/purchaseNew', {purchaseitem})
    // res.send('New purchaseitems here')
})

app.post('/products/:id/purchaseitems', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    const {price, quantity} = req.body;
    const makePurchaseitem = new Purchaseitem({price, quantity, product});
    // const purchaseitem = await Purchaseitem.findById(id);
    // product.makePurchaseitem = makePurchaseitem;
    await makePurchaseitem.save();
    await product.save();
    res.redirect(`/purchaseitems/${makePurchaseitem._id}`)
})

// display the product to the webpage, {products} - this will render
// the products to the webpage
app.get('/purchaseitems', async (req, res) => {
    const purchaseitems = await Purchaseitem.find({})
    res.render('purchaseitems/purchaseitem', {purchaseitems})
//    res.send('Index here')
})

app.get('/purchaseitems/:id', async (req, res) => {
    // const purchaseitem = await Purchaseitem.findById(req.params.id).populate('product');
    const purchaseitem = await Purchaseitem.findById(req.params.id);
    const populated = await purchaseitem.populate('product');
    console.log(req.params.id);
    console.log(purchaseitem);
    // get the 
    
    console.log(populated);
    res.render('purchaseitems/show', {purchaseitem})
    // res.send('New here')
})

app.listen(3000, () => {
    console.log("App is listening on Port 3000")
})











