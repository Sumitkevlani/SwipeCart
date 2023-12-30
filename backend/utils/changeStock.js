import Product from "../models/productsModel.js";

async function updateStock(quantity, id) {

    const product = await Product.findOne({ _id: id });

    product.Stock += quantity;
    await product.save();

}
export default updateStock;