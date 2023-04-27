import { Router } from "express";
import CartValidator from "../dao/validators/cart.validator.js";
import PasswordRecoveryValidator from "../dao/validators/pwdRecovery.validator.js";
import ProductValidator from "../dao/validators/product.validator.js";
import UserDTO from "../dao/dto/user.dto.js"
import { __dirname, passportCall } from '../utils.js';

const router = Router();

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/products', passportCall('current'), async (req, res) => {
    if (!req.user) {
        return res.redirect('/login')
    }

    const products = await ProductValidator.getProducts(req)

    const user = new UserDTO(req.user)
    
    res.render('products', { products, user})
})

router.get('/products/:id', async (req, res) => {
    const product = await ProductValidator.getProductByID(req)
    
    res.render('productDetails', { product })
})

router.get('/carts/:cid', async (req,res) => {
    const cart = await CartValidator.getCartByID(req)

    res.render('cart', { cart })
})

router.get('/login', async (req, res) => {    
    res.render('login')
})

router.get('/register', async (req, res) => {    
    res.render('register')
})

// -- view for "generete a password recovery request"
router.get('/passwordRecovery', async (req, res) => {
    res.render('passwordRecovery')
})

// -- password recovery generated link
router.get('/pwdrecover/:id', async (req, res) => {
    const request = await PasswordRecoveryValidator.linkValidation(req);
    
    if(!request){
        return res.redirect('/pwdrecover/expired')
    }

    res.render('newPassword', { email: request.user })
})

// -- password recovery link expired
router.get('/pwdrecover/expired', async (req, res) => {
    res.render('passwordReqExpired')
})






export default router;