import AppConstant from "../constants/AppConstant.mjs";
import BaseResponse from "../contracts/BaseResponse.mjs";

export default (req, res, next) => {
	const apiKey = req.header('x-apikey');

	if (!apiKey || apiKey !== AppConstant.API_KEY) {
		return res.status(400).json(BaseResponse.createErrorResponse('API_KEY_INVALID'));
	}

	next();
};
