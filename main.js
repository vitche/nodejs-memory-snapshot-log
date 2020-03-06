let fs = require('fs');
let uuid = require('uuid-random');
let heapdump = require('heapdump');

module.exports = {
	snapshot: function(path, callback) {
		let name = path + '/' + uuid() + '.heapsnapshot';
		heapdump.writeSnapshot(name, (error) => {
			callback(error, name);
		});
	},
	log: function(path) {
		let content = fs.readFileSync(path);
		console.log('Memory snapshot', content);
	}
};