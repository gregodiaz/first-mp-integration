import { Request, Response } from 'express';
import productsJson from '../db/products.json' assert { type: "json" };
import { HOST_URL } from '../constants.js';

export const getProduct = (req: Request, res: Response) => {
	const productId = parseInt(req.params.id);

	const productFound = productsJson.find((product) => product.id === productId);

	if (!productFound) {
		res.sendStatus(404);
	} else {
		const product = { ...productFound, buy: `${HOST_URL}/${productId}/buy` };
		res.json(product);
	}
}
