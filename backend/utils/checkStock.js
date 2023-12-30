import Product from "../models/productsModel.js";

async function checkStock(orderedQuantity, id){
    const product = await Product.findOne({_id: id});
    if(product.Stock >= orderedQuantity){
        return true;
    }
    else{
        return false;
    }
}

export default checkStock;