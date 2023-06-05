import { Request, Response } from 'express';
import mercadopago from 'mercadopago';
import { Currency } from 'mercadopago/shared/currency';
import productsJson from '../db/products.json' assert { type: "json" };
import { HOST_URL } from '../constants.js';

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
			}],
			back_urls: {
				success: `${HOST_URL}/success`,
				failure: `${HOST_URL}/failure`,
				pending: `${HOST_URL}/pending`,
			},
			notification_url: `${process.env.NGROK_URL ?? HOST_URL}/webhook`,
		})

		res.json({ message: 'Creating order', paymentLink: result.body.init_point });

	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export const receiveWebhook = async (req: Request, res: Response) => {
	const payment = req.query as Record<string, string | number>;

	try {
		if (payment.type === 'payment') {
			const paymentInfo = await mercadopago.payment.findById(payment['data.id'] as number);
			console.log(paymentInfo.body);
		}
		res.sendStatus(204);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
