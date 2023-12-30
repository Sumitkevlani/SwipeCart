import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import catchasyncerror from '../middleware/asyncerrormiddleware.js';
import isAuthenticatedUser from '../middleware/authentication.js';
import Stripe from 'stripe';

const router = express.Router();
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY);


router.post('/process-payment', isAuthenticatedUser, catchasyncerror(async (req, res, next) => {
    try {
        console.log(req.body.amount);
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'inr',
            metadata: {
                company: 'SwipeCart'
            },
            description: 'SwipeCart online product delivery payment',
            shipping: {
                name: 'Mariah Legros Jr.',
                address: {
                    line1: '1156 Tyler Avenue',
                    postal_code: '  33128',
                    city: 'Miami',
                    state: 'FL',
                    country: 'US',
                },
            },
            
        });
    
        res.status(200).json({ success: true, client_secret: myPayment.client_secret });
    } catch (error) {
        console.log(error);
    }
}));

router.get('/stripeapikey', isAuthenticatedUser, catchasyncerror(async (req, res, next) => {
    try{
        res.status(200).json({ success: true, stripeApiKey: STRIPE_PUBLISHABLE_KEY });
    }catch(error){
        console.log(error);
    }
}));

export default router;