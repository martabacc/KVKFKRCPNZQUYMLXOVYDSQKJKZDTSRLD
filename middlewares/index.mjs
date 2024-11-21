import express from "express";
import ApiKey from './ApiKey.mjs';

import ResponseLogger from "./ResponseLogger.mjs";

export default [ApiKey, express.json(), ResponseLogger()]
