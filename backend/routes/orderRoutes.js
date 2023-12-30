import express from 'express';
import ErrorHandler from "../utils/errorhandler.js";
import catchasyncerror from "../middleware/asyncerrormiddleware.js";
import Product from '../models/productsModel.js';
import Order from '../models/orderModel.js';
import isAuthenticatedUser from '../middleware/authentication.js';
import authorizeRoles from '../middleware/authorizeroles.js';
const router = express.Router();
import updateStock from '../utils/updateStock.js';
import checkStock from '../utils/checkStock.js';
import changeStock from '../utils/changeStock.js';

//CREATE AN ORDER
router.post('/create-order', isAuthenticatedUser, catchasyncerror(async (req, res, next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    for(const item of orderItems){
        const result = await updateStock(item.quantity, item.product);
        if(!result){
            return res.status(400).json({
                success: false,
                message: "Order is out of Stock"
            });
        }
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    });
}));

//GET ORDER DETAILS
router.get('/get-single-order/:id', isAuthenticatedUser, catchasyncerror(async (req, res, next) => {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId }).populate("user", "name email");
    if (!order) {
        next(new ErrorHandler("Order not found", 404));
    }
    else {
        res.status(200).json({
            success: true,
            order
        });
    }
}));


//GET ORDER DETAILS(ADMIN ONLY)
router.get('/admin/get-single-order/:id', isAuthenticatedUser, authorizeRoles('admin'), catchasyncerror(async(req, res, next)=>{
    const orderId = req.params.id;
    const order = await Order.findOne({_id: orderId}).populate("user","name email");
    if(!order){
        next(new ErrorHandler("Order not found", 404));
    }
    else{
        res.status(200).json({
            success: true,
            order
        });
    }
}));


//GET USER SPECIFIC ORDER DETAILS
router.get('/get-my-orders', isAuthenticatedUser, catchasyncerror(async (req, res, next) => {
    const userId = req.user._id;
    const orders = await Order.find({user: userId }).populate("user", "name email");
    if (!orders) {
        next(new ErrorHandler("Order not found", 404));
    }
    else {
        res.status(200).json({
            success: true,
            orders
        });
    }
}));


//GET ALL ORDERS(ADMIN ONLY)
router.get('/admin/get-all-orders', isAuthenticatedUser, authorizeRoles('admin'), catchasyncerror(async (req, res, next)=>{
    const orders = await Order.find();
    let totalAmount = 0;
    let numberOfOrders = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
        numberOfOrders += 1;
    });

    res.status(200).json({
        orders,
        totalAmount: totalAmount,
        numberOfOrders: numberOfOrders
    });
}));


//UPDATE ORDER DETAILS(ADMIN ONLY)
router.put('/admin/update-order/:id', isAuthenticatedUser, authorizeRoles('admin'), catchasyncerror(async (req, res, next)=>{
    const order = await Order.findOne({_id: req.params.id});

    if(!order){
        next(new ErrorHandler("Order not found", 404));
    }
    else if(order.orderStatus==="Delivered"){
        next(new ErrorHandler("Order has already been delivered.", 400));
    }
    else{
        //updating the stock in the Product collection after the product has been delivered
        if(req.body.status==="Delivered"){
            // order.deliveredAt = Date.now();
            
            const update = { $set: { orderStatus: req.body.status , deliveredAt: Date.now() } };

            const updatedOrder = await Order.findOneAndUpdate(
                { _id: req.params.id },
                update,
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Order updated successfully",
                updatedOrder
            });
        }
        else{
            const update = { $set: { orderStatus: req.body.status } };

            const updatedOrder = await Order.findOneAndUpdate(
                { _id: req.params.id },
                update,
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Order updated successfully",
                updatedOrder
            });
        }
    }
}));


//DELETE AN ORDER(ADMIN ONLY)
router.delete('/admin/delete-order/:id', isAuthenticatedUser, authorizeRoles('admin'), catchasyncerror(async (req, res, next)=>{
    const orderId = req.params.id;
    const order = await Order.findOne({_id: orderId});
    
    if(!order){
        next(new ErrorHandler("Order not found", 404));
    }
    else if(order.orderStatus==="Delivered"){
        next(new ErrorHandler("Order has already been delivered", 400));
    }
    else{
        for (const item of order.orderItems) {
            await changeStock(item.quantity, item.product);
        }
        await order.deleteOne();
        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    }
}));
export default router;