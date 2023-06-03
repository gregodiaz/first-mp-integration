import { Request, Response } from 'express';
import productsJson from '../db/products.json' assert { type: "json" };
import { HOST_URL } from '../constants.js';

type ProductJson = typeof productsJson[0]
type Product = { title: ProductJson['title'], link: string }

export const getProductsList = (req: Request, res: Response) => {
	const products: Product[] = productsJson.map((product) => ({
		title: product.title,
		link: `${HOST_URL}/${product.id}`
	}))

	res.json({ products });
}
