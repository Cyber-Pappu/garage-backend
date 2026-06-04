const db = require('../config/db');


const getInvoices = (req, res) => {

    db.query(
        'SELECT * FROM invoices ORDER BY created_at DESC',
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

const saveInvoice = (req, res) => {

    const invoice = req.body;

    console.log(req.body);

    const partsProfit = req.body.partsProfit || 0;
    const labourCharge = req.body.labourCharge || 0;

    const invoiceSql = `
        INSERT INTO invoices
        (
            invoice_id,
            invoice_date,
            customer_name,
            customer_phone,
            vehicle_name,
            vehicle_number,
            odometer,
            grand_total,
            labour_charge,
            parts_profit,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        invoiceSql,
        [
            invoice.id,
            invoice.date,
            invoice.customerName,
            invoice.mobileNo,
            invoice.brandName,
            invoice.vehicleNumber,
            invoice.kmsRun,
            invoice.grandTotal,
            labourCharge,
            partsProfit,
            invoice.paymentStatus
        ],
        (err) => {

            if (err) {
                console.error('Invoice Insert Error:', err);
                return res.status(500).json(err);
            }

            const itemSql = `
                INSERT INTO invoice_items
                (
                    invoice_id,
                    description,
                    quantity,
                    unit_price,
                    total
                )
                VALUES ?
            `;

            const values = invoice.items.map(item => [
                invoice.id,
                item.description,
                item.quantity,
                item.unitPrice,
                item.total
            ]);

            db.query(itemSql, [values], (err) => {

                if (err) {
                    console.error('Invoice Items Insert Error:', err);
                    return res.status(500).json(err);
                }

                res.json({
                    success: true,
                    message: 'Invoice saved'
                });
            });

        }
    );
};

const getInvoiceItems = (req, res) => {

    const invoiceId = req.params.invoiceId;

    db.query(
        'SELECT * FROM invoice_items WHERE invoice_id = ?',
        [invoiceId],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

module.exports = {
    getInvoices,
    saveInvoice,
    getInvoiceItems
};