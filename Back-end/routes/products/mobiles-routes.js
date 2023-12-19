const express = require('express');
const router = express.Router();

// controllers 
const { getMobiles, getMobile, getLatest, editMobile, deleteMobile, addMobile } = require('../../controllers/product/mobiles-controllers');

const vertifyAdminTokenMiddleware = require('../../middleware/verifyAdmin');

// routes
router.get('/', getMobiles);
router.get('/latest', getLatest);
router.get('/:id', getMobile);
// for dashboard project
router.patch('/:id', vertifyAdminTokenMiddleware, editMobile);
router.delete('/:id', vertifyAdminTokenMiddleware, deleteMobile);
router.post('/', vertifyAdminTokenMiddleware, addMobile);


module.exports = router;