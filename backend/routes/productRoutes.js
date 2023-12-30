import express from 'express';
import Product from '../models/productsModel.js';
import ErrorHandler from '../utils/errorhandler.js';
import catchasyncerror from '../middleware/asyncerrormiddleware.js';
import ApiFeatures from '../utils/apifeatures.js';
import isAuthenticatedUser from '../middleware/authentication.js';
import authorizeroles from '../middleware/authorizeroles.js';
const router = express.Router();


//GET ALL PRODUCTS
router.get('/get-all-products', catchasyncerror(async (req, res, next) => {
    //query => Product.find()
    //queryStr => req.query
    const resultPerPage = 8;
    const currentPage = Number(req.query.page) || 1; 

    const productCount = await Product.countDocuments();

    // const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter();

    // Count documents after search and filter
    let products = await apifeatures.query;

    const filteredProductsCount = products.length;

    const startIndex = (currentPage - 1) * resultPerPage;
    const endIndex = startIndex + resultPerPage;
    products = products.slice(startIndex, endIndex);

    

    if (!products) {
        return next(new ErrorHandler("Products not available.", 404));
    }
    else {
        res.status(200).json({
            success: true,
            productCount,
            filteredProductsCount,
            products
        });
    }
}));

router.get('/admin/products', isAuthenticatedUser, authorizeroles("admin"), catchasyncerror(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });
}));

//CREATE A NEW PRODUCT(ADMIN ONLY)
router.post('/create-product/new', isAuthenticatedUser, authorizeroles("admin"), catchasyncerror(async (req, res, next) => {
    
    req.body.createdBy = req.user.id;
    const product = await Product.create(req.body);

    if (!product) {
        return next(new ErrorHandler("Product not created", 422));
    }
    else {
        res.status(201).json({
            success: true,
            product
        });
    }
}));

//UPDATE A PRODUCT(ADMIN ONLY)
router.put('/update-product/:id', isAuthenticatedUser, authorizeroles("admin"), catchasyncerror(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    else {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        return res.status(200).json({
            success: true,
            updatedProduct
        });
    }
}));


//DELETE A PRODUCT(ADMIN ONLY)
router.delete('/delete-product/:id', isAuthenticatedUser, authorizeroles("admin"), catchasyncerror(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    else {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Product Deleted Successfully" });

    }
}));

//GET A PRODUCT(BY THE PRODUCT ID)
router.get('/get-product-details/:id', catchasyncerror(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    else {
        return res.status(200).json(product);
    }
}));


//CREATE OR UPDATE REVIEW
router.put('/reviews', isAuthenticatedUser, catchasyncerror(async (req, res, next)=>{
    const {rating, comment, productId} = req.body;
    console.log(rating,comment,productId);
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment
    };

    const product = await Product.findOne({_id: productId});
    if(!product){
        next(new ErrorHandler("Product not found", 404));
    }
    else{
        const isReviewed = product.reviews.find((rev) => rev.user.toString()===req.user._id.toString());

        if(isReviewed){
            product.reviews.forEach((rev)=>{
                if(rev.user.toString()===req.user._id.toString()){
                    rev.name = req.user.name;
                    rev.rating = rating;
                    rev.comment = comment;
                }
            });
        }
        else{
            product.reviews.push(review);
        }

        let avgRating = 0;
        product.ratings = product.reviews.forEach((rev)=>{avgRating+=rev.rating;});
        product.ratings = avgRating/product.reviews.length;
        product.numOfReviews = product.reviews.length;

        await product.save();
        res.status(200).json({
            success: true,
            message: "Review added successfully"
        });
    }
}));


//GET ALL REVIEWS OF A PRODUCT
router.get('/reviews', catchasyncerror(async(req, res, next)=>{
    const product = await Product.findOne({_id: req.query.id});
    if(!product){
        next(new ErrorHandler("Product not found", 404));
    }
    else{
        res.status(200).json({
            success: true,
            reviews: product.reviews
        });
    }
}));


//DELETE A REVIEW
router.delete('/reviews', isAuthenticatedUser, catchasyncerror(async(req, res, next)=>{
    const product = await Product.findOne({_id: req.query.productId});
    if(!product){
        next(new ErrorHandler("Product not found",404));
    }
    else{
        const reviewId = req.query.id;
        const reviews = [];
        product.reviews.forEach((rev)=>{
            if(rev._id.toString()!==reviewId.toString()){
                reviews.push(rev);
            }
        });
        console.log("Reviews",reviews);
        product.reviews = reviews;
        product.numOfReviews = reviews.length;
        
        let avgRating = 0;
        reviews.forEach((rev)=>{avgRating += rev.rating;});
        product.ratings = reviews.length > 0 ? avgRating / reviews.length : 0;

        await product.save();
        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    }
}));


export default router;