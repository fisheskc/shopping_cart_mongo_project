const mongoose = require('mongoose');
const PurchaseItemSch = require('./purchaseItemSch');
const Schema = mongoose.Schema;

const productTypesSchema = new Schema({
    name: {
       type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    purchaseitem: {
        type: Schema.Types.ObjectId,
        ref: 'Purchaseitem'
    }
})

const Product = mongoose.model('Product', productTypesSchema);
module.exports = Product;