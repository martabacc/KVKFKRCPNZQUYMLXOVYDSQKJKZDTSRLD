import morgan from 'morgan';
import * as os from "os";

morgan.token('session-id', function getSessionId(req) {
	return req.sessionId;
});

morgan.token('hostname', function getHostname() {
	return os.hostname();
});
morgan.token('pid', function getPid() {
	return process.pid;
});

morgan.token('timestamp', () => new Date().toISOString()); // Add timestamp token
morgan.token('response-time', (req, res) => `${res.getHeader('X-Response-Time') || '-'}ms`);
morgan.token('req-body', (req, res) => JSON.stringify(req.body) || '{}');
morgan.token('res-body', (req, res) => JSON.stringify(res.body) || '{}');

function jsonFormat(tokens, req, res) {
	return JSON.stringify({
		timestamp: tokens.timestamp(req, res),
		'response-time': tokens['response-time'](req, res),
		'req-body': tokens['req-body'](req, res),
		'res-body': tokens['res-body'](req, res),
		'remote-address': tokens['remote-addr'](req, res),
		'time': tokens['date'](req, res, 'iso'),
		'method': tokens['method'](req, res),
		'url': tokens['url'](req, res),
		'http-version': tokens['http-version'](req, res),
		'status-code': tokens['status'](req, res),
		'content-length': tokens['res'](req, res, 'content-length'),
		'referrer': tokens['referrer'](req, res),
		'user-agent': tokens['user-agent'](req, res),
		'session-id': tokens['session-id'](req, res),
		'hostname': tokens['hostname'](req, res),
		'pid': tokens['pid'](req, res)
	});
}

export default () => {
	return morgan(jsonFormat);
};
