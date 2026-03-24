import express from 'express'
import { addToCart,clearCart, deleteCartItem, getCart, updateCartItem } from '../controllers/cartController.js'

import authMiddileWare from '../middleware/auth.js'

const router = express.Router();

router.route('/')
.get(authMiddileWare, getCart)
.post(authMiddileWare, addToCart)


router.post('/clear', authMiddileWare, clearCart)

router.route('/:id')
.put(authMiddileWare, updateCartItem)
.delete(authMiddileWare, deleteCartItem)


export default router