export default (err, req, res, next) => {
	console.error(err.stack);  // Log the error stack to the console
	res.status(500).send('Something went wrong!');
};
