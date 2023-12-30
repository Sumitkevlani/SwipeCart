import Product from "../models/productsModel.js";

async function updateStock(quantity, id){
    const product = await Product.findOne({_id: id});

    if(product.Stock<quantity){
        return false;
    }
    else{
        product.Stock -= quantity;
        await product.save();
        return true;
    }
}
export default updateStock;