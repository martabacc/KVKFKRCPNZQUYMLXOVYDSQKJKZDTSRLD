import ApiKey from './ApiKey.mjs';
import express from "express";
import morgan from "morgan";
import ErrorInterceptor from "./ErrorInterceptor.mjs";

morgan.format('custom',
	':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":user-agent"');

export default [ApiKey, morgan("custom"), express.json(), ErrorInterceptor]
