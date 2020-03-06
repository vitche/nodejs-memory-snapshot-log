let main = require('../main');
main.snapshot('/tmp', (error, path) => {
	if (error) {
		console.log('Failed writing memory snapshot');
		return;
	}
	main.log(path);
});
