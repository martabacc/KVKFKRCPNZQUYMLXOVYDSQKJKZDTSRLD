import express from 'express'
import routes from './routes/index.mjs'
import AppConstant from "./constants/AppConstant.mjs";
import middlewares from "./middlewares/index.mjs";
import lastMiddlewares from "./middlewares/lastMiddlewares.mjs";

const app = express();

app.use(...middlewares);

app.use('/', routes);
app.use(...lastMiddlewares);

// Start the server
app.listen(AppConstant.APP_PORT, () => {
	console.log(`Server is running at http://localhost:${AppConstant.APP_PORT}`);
});
