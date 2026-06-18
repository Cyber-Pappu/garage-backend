require('dotenv').config();

const express = require('express');
const cors = require('cors');

require('./config/db');

const inventoryRoutes = require('./routes/inventoryroutes');

const invoiceRoutes = require('./routes/invoicerouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/inventory', inventoryRoutes);

app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => {
    res.send('Mechanic Billing API Running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});