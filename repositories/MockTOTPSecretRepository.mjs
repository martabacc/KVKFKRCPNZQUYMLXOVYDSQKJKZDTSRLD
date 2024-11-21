import AppConstant from "../constants/AppConstant.mjs";

export default class MockTOTPSecretRepository {
    db = {};

    set = () => {
        return true;
    };

    get = () => {
        return AppConstant.SECRET_KEY_TOTP
    };
}
