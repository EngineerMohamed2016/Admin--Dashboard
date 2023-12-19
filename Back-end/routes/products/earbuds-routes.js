const express = require('express');
const router = express.Router();

// controllers 
const { getEarbuds, getEarbud, getLatest, editEarbud, deleteEarbud, addEarbud } = require('../../controllers/product/earbuds-controllers');

const vertifyAdminTokenMiddleware = require('../../middleware/verifyAdmin');

// routes
router.get('/', getEarbuds);
router.get('/latest', getLatest);
router.get('/:id', getEarbud);
// for dashboard project
router.patch('/:id', vertifyAdminTokenMiddleware, editEarbud);
router.delete('/:id', vertifyAdminTokenMiddleware, deleteEarbud);
router.post('/', vertifyAdminTokenMiddleware, addEarbud);

module.exports = router;