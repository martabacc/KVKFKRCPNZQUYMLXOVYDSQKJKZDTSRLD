import CsrfCacheRepository from "./repositories/CsrfCacheRepository.mjs";
import TOTPSecretRepository from "./repositories/TOTPSecretRepository.mjs";
import QRService from "./services/QRService.mjs";
import CsrfCacheService from "./services/CsrfCacheService.mjs";
import TOTPService from "./services/TOTPService.mjs";
import CryptoTool from "./tools/CryptoTool.mjs";
import PaymentService from "./services/PaymentService.mjs";

export default () => {
	/* repositories */
	const csrfCacheRepository = new CsrfCacheRepository();
	const totpSecretRepository = new TOTPSecretRepository();

	/* tools */
	const cryptoTool = new CryptoTool()

	/* services */
	// const qrService = new QRService();
	const csrfCacheService = new CsrfCacheService({ repository: csrfCacheRepository });
	const totpService = new TOTPService({
		repository: totpSecretRepository, cryptoTool
	});
	const paymentService = new PaymentService({
		csrfCacheService, totpService
	})

	return { paymentService }
}
