const mongoose = require('mongoose');
const ProductSch = require('./productSch');
const Schema = mongoose.Schema;

const purchasesTypesSchema = new Schema({
    quantity: {
        type: Number
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const Purchaseitem = mongoose.model('Purchaseitem', purchasesTypesSchema);
module.exports = Purchaseitem;