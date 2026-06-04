const express = require('express');
const router = express.Router();

const {
    getInventory,
    restockItem,
    consumeStock
} = require('../Controllers/inventoryController');

router.get('/', getInventory);

router.post('/restock', restockItem);

router.post('/consume', consumeStock);

module.exports = router;

