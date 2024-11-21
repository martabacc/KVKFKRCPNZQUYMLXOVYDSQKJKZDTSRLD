import BaseResponse from "../contracts/BaseResponse.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";

const response = BaseResponse.createErrorResponse(ErrorConstant.GENERAL_ERROR_NOT_FOUND)

export default ((req, res, next) => {
	return res.status(response.statusCode).json(response);
});
