import crypto from 'crypto';

export default class CryptoTool {
	static LENGTH = 16;
	static ALGO = 'aes-256-gcm';
	static ENCODING = 'base64';
	static OUTPUT_ENCODING = 'utf8';

	static generateSecretTOTP() {
		return crypto.randomBytes(CryptoTool.LENGTH).toString('hex');
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
			console.error('Decryption failed:', error.message);
			throw new Error(
				'Decryption failed due to internal error or invalid data.');
		}
	}
}
