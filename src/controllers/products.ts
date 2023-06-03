import { Request, Response } from 'express';
import productsJson from '../db/products.json' assert { type: "json" };

export const getProduct = (req: Request, res: Response) => {
	const productId = parseInt(req.params.id);

	const productFound = productsJson.find((product) => product.id === productId);

	if (!productFound) {
		res.sendStatus(404);
	} else {
		res.status(200).json(productFound);
	}
}
