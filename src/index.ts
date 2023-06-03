import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';

import routerIndex from './routes/index.js';
import routerProducts from './routes/products.js';
import routerPayment from './routes/payment.js';

config();

const app = express();

const PORT = process.env.PORT || 4734;

app.use(express.json());
app.use(morgan('dev'));

app.use(routerIndex);
app.use(routerProducts);
app.use(routerPayment);

app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`);
})
