import crypto from 'crypto';
import { authenticator } from 'otplib';
import ErrorConstant from "../constants/ErrorConstant.mjs";
import AppConstant from "../constants/AppConstant.mjs";

export default class CryptoTool {
	static TOTP_BYTE_LENGTH = 16;
	static CSRF_LENGTH = 16;
	static ALGO = 'aes-256-gcm';
	static ENCODING = 'base64';
	static OUTPUT_ENCODING = 'utf8';

	constructor() {
		this.authenticator = Object.create(authenticator)
		this.authenticator.options = {
			step: AppConstant.CSRF_CACHE_EXPIRY_IN_SEC, // Set the time step to 120 seconds (2 minutes)
			digits: 6,
			algorithm: 'sha1',
			window: 1, // Check the current step and one step before and after
		};
	}

	static generateSecretTOTP() {
		return crypto.randomBytes(CryptoTool.TOTP_BYTE_LENGTH).toString('hex');
	}

	static generateCSRFToken() {
		return crypto.randomBytes(CryptoTool.CSRF_LENGTH).toString('hex');
	}

	static encrypt = (payload, secretKey) => {
		try {

			const iv = crypto.randomBytes(12); // 12-byte IV for AES-GCM
			const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(secretKey, 'utf8'), iv);

			const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);
			const authTag = cipher.getAuthTag(); // Authentication tag for integrity

			// Combine IV, auth tag, and encrypted data into a single string
			return Buffer.concat([iv, authTag, encrypted]).toString('base64');
		} catch (_) {
			return { error: ErrorConstant.OFFLINE_PAYMENT_INIT_INVALID_QR };
		}
	};

	static decrypt = (encryptedString, secretKey) => {
		try {
			// Decode the encrypted string (base64) and extract IV, auth tag, and encrypted data
			const data = Buffer.from(encryptedString, 'base64');
			const iv = data.slice(0, 12); // First 12 bytes are the IV
			const authTag = data.slice(12, 28); // Next 16 bytes are the auth tag
			const encryptedData = data.slice(28); // Rest is the encrypted payload

			const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(secretKey, 'utf8'), iv);
			decipher.setAuthTag(authTag); // Set the authentication tag

			const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

			return JSON.parse(decrypted.toString('utf8'))
		} catch (error) {
			console.error('Decryption error:', error.message);
			throw error;
		}
	};

	validate = ({ token, secret }) => {
		return this.authenticator.verify({ token, secret });
	}

	create = ({ secret }) => {
		return this.authenticator.generate(secret);
	}
}
