const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');

router.route('/')
.get(productControllers.getAllProducts)
.post(productControllers.createNewProduct)
.patch(productControllers.updareProducts)
.delete(productControllers.DeleteProduct)


module.exports = router;