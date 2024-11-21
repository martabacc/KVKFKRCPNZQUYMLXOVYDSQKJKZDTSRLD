import dotenv from 'dotenv';
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import routes from './routes/index.mjs'
import AppConstant from "./constants/AppConstant.mjs";

dotenv.config();

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// Start the server
app.listen(AppConstant.APP_PORT, () => {
	console.log(`Server is running at http://localhost:${AppConstant.APP_PORT}`);
});
