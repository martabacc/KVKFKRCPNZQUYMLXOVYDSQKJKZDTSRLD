import InMemoryCacheRepository from "./repositories/InMemoryCacheRepository.mjs";
import TOTPSecretRepository from "./repositories/TOTPSecretRepository.mjs";
import CsrfCacheService from "./services/CsrfCacheService.mjs";
import TOTPService from "./services/TOTPService.mjs";
import PaymentService from "./services/PaymentService.mjs";
import AppConstant from "./constants/AppConstant.mjs";
import MockTOTPSecretRepository from "./repositories/MockTOTPSecretRepository.mjs";
import AuthenticatorTool from "./tools/AuthenticatorTool.mjs";

export default () => {
	/* repositories */
	const csrfCacheRepository = new InMemoryCacheRepository();
	const paidCsrfCacheRepository = new InMemoryCacheRepository();
	const totpSecretRepository = AppConstant.DYNAMIC_SECRET_OTP_ENABLED ? new TOTPSecretRepository()
		: new MockTOTPSecretRepository();

	/* tools */
	const authenticatorTool = new AuthenticatorTool()

	/* services */
	// const qrService = new QRService();
	const csrfCacheService = new CsrfCacheService({ repository: csrfCacheRepository });
	const totpService = new TOTPService({
		totpSecretRepository, authenticatorTool
	});
	const paymentService = new PaymentService({
		csrfCacheService, totpService, paidCsrfCacheRepository
	})

	return { paymentService, totpService, csrfCacheService }
}
