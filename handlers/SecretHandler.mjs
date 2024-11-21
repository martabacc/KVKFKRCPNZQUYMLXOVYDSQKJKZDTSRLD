import ErrorConstants from '../constants/ErrorConstant';
import Secret from '../models/Secret';

export default class SecretHandler {
    constructor(secretRepository) {
        this.secretRepository = secretRepository;
    }

    generateSecret({ userId, deviceId }) {
        const value = Secret.create({ deviceId });

        if (!this.secretRepository.set(userId, value)) {
            return BaseResponse.createErrorResponse(
                ErrorConstants.INVALID_GENERATE_ALREADY_REGISTERED
            );
        }

        return BaseResponse.createOkResponse();
    };

    deleteByUserId({ userId }) {
        this.secretRepository.delete(userId);
        return BaseResponse.createOkResponse();
    };

    validateSecret({ userId }) {
        if (!this.secretRepository.get(userId)) {
            return BaseResponse.createErrorResponse(
                ErrorConstants.INVALID_NOT_REGISTERED
            );
        }

        return BaseResponse.createOkResponse();
    };
}
