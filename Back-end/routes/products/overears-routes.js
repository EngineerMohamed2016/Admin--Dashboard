const express = require('express');
const router = express.Router();

// controllers 
const { getOverears, getOverear, getLatest, editOveraer, deleteOveraer, addOveraer } = require('../../controllers/product/overears-controllers');

const vertifyAdminTokenMiddleware = require('../../middleware/verifyAdmin');

// routes
router.get('/', getOverears);
router.get('/latest', getLatest);
router.get('/:id', getOverear);
// for dashboard project
router.patch('/:id',vertifyAdminTokenMiddleware, editOveraer);
router.delete('/:id',vertifyAdminTokenMiddleware, deleteOveraer);
router.post('/',vertifyAdminTokenMiddleware, addOveraer);

module.exports = router;