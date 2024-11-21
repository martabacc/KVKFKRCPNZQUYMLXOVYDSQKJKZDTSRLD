import CryptoTool from "../tools/CryptoTool.mjs";
import AppConstant from "../constants/AppConstant.mjs";

export default class QRService {
	decryptAndParse = ({ data }) => {
		return CryptoTool.decryptData(data, AppConstant.SECRET_KEY_ENCRYPTION);
	};
}


