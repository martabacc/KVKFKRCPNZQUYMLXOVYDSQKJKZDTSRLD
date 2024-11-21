export default class AppService {
	static stat = () => {
		const uptimeInSeconds = process.uptime(); // Uptime in seconds
		const uptimeFormatted = AppService.formatUptime(uptimeInSeconds); // Format uptime

		return {
			status: 'ok',
			uptime: uptimeFormatted,
			timestamp: new Date().toISOString()
		}
	};

	static formatUptime = (seconds) => {
		const days = Math.floor(seconds / (3600 * 24));
		const hours = Math.floor((seconds % (3600 * 24)) / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = Math.floor(seconds % 60);

		return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
	}

}


