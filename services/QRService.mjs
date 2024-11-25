import CryptoTool from "../tools/CryptoTool.mjs";
import AppConstant from "../constants/AppConstant.mjs";

export default class QRService {
	static decryptAndParse = ({ data }) => {
		return CryptoTool.decrypt(data, AppConstant.SECRET_KEY_ENCRYPTION);
	};
}


