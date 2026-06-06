const db = require('../config/db');

const getInventory = (req, res) => {

    db.query(
        'SELECT * FROM inventory',
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

const restockItem = (req, res) => {

    const {
        part_name,
        category,
        quantity,
        unit_price,
        selling_price
    } = req.body;

    db.query(
        'SELECT * FROM inventory WHERE part_name = ?',
        [part_name],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length > 0) {

                db.query(
                    `
                    UPDATE inventory
                    SET current_stock = current_stock + ?,
                        unit_price = ?,
                        selling_price = ?
                    WHERE part_name = ?
                    `,
                    [
                        quantity,
                        unit_price,
                        selling_price,
                        part_name
                    ],
                    (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.json({
                            success: true,
                            message: 'Stock updated'
                        });
                    }
                );

            } else {

                db.query(
                    `
                    INSERT INTO inventory
                    (
                        part_name,
                        category,
                        current_stock,
                        unit_price,
                        selling_price
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        part_name,
                        category,
                        quantity,
                        unit_price,
                        selling_price
                    ],
                    (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.json({
                            success: true,
                            message: 'New inventory item created'
                        });
                    }
                );

            }
        }
    );
};
const consumeStock = (req, res) => {

    console.log('Consume Request:', req.body);

    const { part_name, quantity } = req.body;

    db.query(
        `
        UPDATE inventory
        SET current_stock = current_stock - ?
        WHERE part_name = ?
        AND current_stock >= ?
        `,
        [quantity, part_name, quantity],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(400).json({
                    message: 'Insufficient stock'
                });
            }

            res.json({
                success: true
            });
        }
    );
};

module.exports = {
    getInventory,
    restockItem,
    consumeStock
};