import express from "express";
import setup from "../setup.mjs";

const router = express.Router();

const { paymentService } = setup();

/*customer*/
router.post('/payment/totp/generate', () => 'hello world');
router.delete('/payment/totp', () => 'hello world');

/*merchant*/
router.post('/payment/offline/initiate', (request, response) => {
	const result = paymentService.initiate(request.body);
	return response.status(result.statusCode).json(result);
});
router.post('/payment/offline/authorize', (request, response) => {
	const result = paymentService.authorize(request.body);
	return response.status(result.statusCode).json(result);
});

export default router;ø
