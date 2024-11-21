import express from 'express'

const router = express.Router();

/*merchant*/
router.post('/payment/offline/initiate', () => 'hello world');
router.post('/payment/offline/authorize', () => 'hello world');

export default router;
