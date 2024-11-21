import crypto from 'crypto';
import { authenticator } from 'otplib';
import ErrorConstant from "../constants/ErrorConstant.mjs";

export default class CryptoTool {
	static TOTP_BYTE_LENGTH = 16;
	static CSRF_LENGTH = 16;
	static ALGO = 'aes-256-gcm';
	static ENCODING = 'base64';
	static OUTPUT_ENCODING = 'utf8';

	constructor() {
		authenticator.options = {
			step: 120, // Set the time step to 120 seconds (2 minutes)
			window: 1, // Only allow 1 valid OTP per 120 seconds window
		};
	}

	static generateSecretTOTP() {
		return crypto.randomBytes(CryptoTool.TOTP_BYTE_LENGTH).toString('hex');
	}

	static generateCSRFToken() {
		return crypto.randomBytes(CryptoTool.CSRF_LENGTH).toString('hex');
	}

	static decryptData(encryptedData, secretKey) {
		try {
			if (!encryptedData || typeof encryptedData !== 'string') {
				throw new Error('Invalid input: Encrypted data must be a string.');
			}

			// Split the encrypted data and authentication tag
			const [ciphertext, authTag] = encryptedData.split('.');

			if (!ciphertext || !authTag) {
				throw new Error('Invalid encrypted data format: Missing ciphertext or authentication tag.');
			}

			// Create a decipher instance
			const decipher = crypto.createDecipheriv(CryptoTool.ALGO, secretKey,
				Buffer.alloc(12, 0));

			// Set the authentication tag to verify integrity
			decipher.setAuthTag(Buffer.from(authTag, CryptoTool.ENCODING));

			// Decrypt the data
			let decrypted = decipher.update(ciphertext, CryptoTool.ENCODING, CryptoTool.OUTPUT_ENCODING);
			decrypted += decipher.final(CryptoTool.OUTPUT_ENCODING);

			// Return the parsed JSON object
			return JSON.parse(decrypted);
		} catch (error) {
			error.code = ErrorConstant.OFFLINE_PAYMENT_INIT_INVALID_QR
			throw error;
		}
	}

	validateOTP = ({ token, secret }) => {
		try {
			const isValid = authenticator.verify({ token, secret });

			return isValid
		} catch (_) {
			return false
		}
	}
}
