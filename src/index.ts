import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import routerIndex from './routes/index.js';

config();

const app = express();

const PORT = process.env.PORT || 4734;

app.use(express.json());
app.use(morgan('dev'));

app.use(routerIndex);

app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`);
})
