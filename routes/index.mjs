import express from "express";
import setup from "../setup.mjs";
import AppService from "../services/AppService.mjs";

const router = express.Router();

const { paymentService, csrfCacheService, totpService } = setup();

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

/* debug */

// Basic health check route
router.get('dev/healthcheck', (req, res) => {
	return res.status(200).json(AppService.stat());
})

router.get('/dev/csrf', (_, response) => {
	return response.status(200).json(csrfCacheService.getAll());
});

router.post('/dev/mock/qr', (request, response) => {
	return response.status(200).json(totpService.generateMockTOTPForUser(request.body));
});

router.post('/dev/csrf/flush', (_, response) => {
	return response.status(200).json(csrfCacheService.deleteAll());
});

export default router;
