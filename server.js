const express = require('express');
const cors = require('cors');

require('./config/db');

const inventoryRoutes = require('./routes/inventoryRoutes');

const invoiceRoutes = require('./routes/invoiceRouter');

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
    console.log('Server running on port ${PORT}');
});