import { expect } from 'chai';
import crypto from 'crypto';
import CryptoTool from '../../tools/CryptoTool.mjs';

describe('CryptoTool', () => {
	describe('generateSecretTOTP', () => {
		it('should generate a secret TOTP of the correct length', () => {
			const secret = CryptoTool.generateSecretTOTP();
			expect(secret).to.be.a('string');
			expect(secret).to.have.lengthOf(CryptoTool.LENGTH * 2); // Each byte is represented by 2 hex characters
		});
	});

	describe('decryptData', () => {
		it('should decrypt data correctly', () => {
			const secretKey = crypto.randomBytes(32); // 256-bit key for aes-256-gcm
			const data = { test: 'data' };
			const cipher = crypto.createCipheriv(CryptoTool.ALGO, secretKey, Buffer.alloc(12, 0));
			let encrypted = cipher.update(JSON.stringify(data), CryptoTool.OUTPUT_ENCODING, CryptoTool.ENCODING);
			encrypted += cipher.final(CryptoTool.ENCODING);
			const authTag = cipher.getAuthTag().toString(CryptoTool.ENCODING);
			const encryptedData = `${encrypted}.${authTag}`;

			const decryptedData = CryptoTool.decrypt(encryptedData, secretKey);
			expect(decryptedData).to.deep.equal(data);
		});

		it('should throw an error with incorrect auth tag', () => {
			const secretKey = crypto.randomBytes(32);
			const data = { test: 'data' };
			const cipher = crypto.createCipheriv(CryptoTool.ALGO, secretKey, Buffer.alloc(12, 0));
			let encrypted = cipher.update(JSON.stringify(data), CryptoTool.OUTPUT_ENCODING, CryptoTool.ENCODING);
			encrypted += cipher.final(CryptoTool.ENCODING);
			const authTag = crypto.randomBytes(16).toString(CryptoTool.ENCODING); // Incorrect auth tag
			const encryptedData = `${encrypted}.${authTag}`;

			expect(() => CryptoTool.decrypt(encryptedData, secretKey)).to.throw();
		});
	});
});
