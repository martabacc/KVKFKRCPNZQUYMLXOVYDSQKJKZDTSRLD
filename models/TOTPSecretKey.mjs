import CryptoTool from '../tools/CryptoTool';

export default class TOTPSecretKey {
	static create({ deviceId }) {
		return {
			deviceId,
			secret: CryptoTool.generateSecretTOTP()
		};
	}
}
