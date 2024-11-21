import CsrfCacheRepository from "./repositories/CsrfCacheRepository.mjs";
import TOTPSecretRepository from "./repositories/TOTPSecretRepository.mjs";
import CsrfCacheService from "./services/CsrfCacheService.mjs";
import TOTPService from "./services/TOTPService.mjs";
import CryptoTool from "./tools/CryptoTool.mjs";
import PaymentService from "./services/PaymentService.mjs";
import AppConstant from "./constants/AppConstant.mjs";
import MockTOTPSecretRepository from "./repositories/MockTOTPSecretRepository.mjs";

export default () => {
	/* repositories */
	const csrfCacheRepository = new CsrfCacheRepository();
	const totpSecretRepository = AppConstant.isDynamicTOTPSecretKey ? new TOTPSecretRepository()
		: new MockTOTPSecretRepository();

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
