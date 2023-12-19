const express = require('express');
const router = express.Router();

// controllers 
const { getLaptops, getLaptop, getLatest, editLaptop, deleteLaptop, addLaptop } = require('../../controllers/product/laptops-controllers');

const vertifyAdminTokenMiddleware = require('../../middleware/verifyAdmin');

// routes
router.get('/', getLaptops);
router.get('/latest', getLatest);
router.get('/:id', getLaptop);
// for dashboard project
router.patch('/:id',vertifyAdminTokenMiddleware, editLaptop);
router.delete('/:id',vertifyAdminTokenMiddleware, deleteLaptop);
router.post('/',vertifyAdminTokenMiddleware, addLaptop);

module.exports = router;