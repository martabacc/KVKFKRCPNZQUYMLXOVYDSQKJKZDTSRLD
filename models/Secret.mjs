import CryptoTool from '../tools/CryptoTool';

export default class Secret {
    static create({ deviceId }) {
        return {
            deviceId,
            secret: CryptoTool.generateSecretTOTP()
        };
    }
}
