import express from "express";

const router = express.Router();

/*customer*/
router.post('/payment/totp/generate', () => 'hello world');
router.delete('/payment/totp', () => 'hello world');

/*merchant*/
router.post('/payment/offline/initiate', () => 'hello world');
router.post('/payment/offline/authorize', () => 'hello world');

export default router;
