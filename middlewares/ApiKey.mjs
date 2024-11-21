import AppConstant from "../constants/AppConstant.mjs";
import BaseResponse from "../contracts/BaseResponse.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";

const response = BaseResponse.createErrorResponse(ErrorConstant.API_KEY_INVALID);
export default (req, res, next) => {
	const apiKey = req.header('x-apikey');

	if (!apiKey || apiKey !== AppConstant.API_KEY) {
		return res.status(response.statusCode).json(response);
	}

	next();
};
