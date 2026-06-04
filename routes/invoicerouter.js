const express = require('express');
const router = express.Router();

const {
    getInvoices,
    saveInvoice,
    getInvoiceItems
} = require('../Controllers/invoiceController');

router.get('/', getInvoices);

router.post('/', saveInvoice);

router.get(
    '/:invoiceId/items',
    getInvoiceItems
);

module.exports = router;