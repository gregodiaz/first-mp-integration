import { Request, Response } from 'express';
import mercadopago from 'mercadopago';
import { Currency } from 'mercadopago/shared/currency';
import productsJson from '../db/products.json' assert { type: "json" };

export const createOrder = async (req: Request, res: Response) => {
	const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
	const productFound = productsJson.find((product) => product.id === parseInt(req.params.id));

	if (!productFound) return res.sendStatus(404);
	if (!MP_ACCESS_TOKEN) return res.sendStatus(401);

	try {
		mercadopago.configure({ access_token: MP_ACCESS_TOKEN })
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}

	const { title, unit_price, currency_id: currId } = productFound;
	const currency_id = currId as Currency;

	try {
		const result = await mercadopago.preferences.create({
			items: [{
				title,
				unit_price,
				currency_id,
				quantity: 1,
			}]
		})

		res.json({ message: 'Creating order', paymentLink: result.body.init_point });

	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
