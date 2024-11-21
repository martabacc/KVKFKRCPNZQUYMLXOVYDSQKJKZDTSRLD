import express from 'express'

const router = express.Router();

/*customer*/
router.post('/payment/totp/generate', () => 'hello world');
router.delete('/payment/totp', () => 'hello world');

export default router;
