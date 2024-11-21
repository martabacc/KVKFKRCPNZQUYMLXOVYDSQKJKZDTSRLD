import ErrorConstants from '../constants/ErrorConstant.mjs';
import TOTPSecretKey from '../models/TOTPSecretKey.mjs';

export default class TOTPSecretKeyService {
	constructor({ repository }) {
		this.repository = repository;
	}

	generateSecret({ userId, deviceId }) {
		const value = TOTPSecretKey.create({ deviceId });

		if (!this.repository.set(userId, value)) {
			return BaseResponse.createErrorResponse(
				ErrorConstants.INVALID_GENERATE_ALREADY_REGISTERED
			);
		}

		return BaseResponse.createOkResponse();
	};

	deleteByUserId({ userId }) {
		this.repository.delete(userId);
		return BaseResponse.createOkResponse();
	};

	validateSecret({ userId }) {
		if (!this.repository.get(userId)) {
			return BaseResponse.createErrorResponse(
				ErrorConstants.INVALID_NOT_REGISTERED
			);
		}

		return BaseResponse.createOkResponse();
	};
}
