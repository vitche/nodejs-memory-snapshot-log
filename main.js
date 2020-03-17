let fs = require('fs');
let uuid = require('uuid-random');
let heapdump = require('heapdump');
let parser = require('heapsnapshot-parser');

module.exports = {
    snapshot: function (path, callback) {
        let name = path + '/' + uuid() + '.heapsnapshot';
        heapdump.writeSnapshot(name, (error) => {
            callback(error, name);
        });
    },
    log: function (path, level) {
        let content = fs.readFileSync(path, {
            encoding: 'utf-8'
        });
        let snapshot = parser.parse(content);
        delete content;

        let distribution = {};
        for (let i = 0; i < snapshot.nodes.length; i++) {
            let node = snapshot.nodes[i];
            if (!distribution[node.name]) {
                distribution[node.name] = 0;
            }
            distribution[node.name] += node.self_size;
        }

        let filteredDistribution = {};
        for (let item in distribution) {
            if (level < distribution[item]) {
                filteredDistribution[item] = distribution[item];
            }
        }

        if (Object.keys(filteredDistribution).length) {
            console.log('Memory snapshot', JSON.stringify(filteredDistribution));
        }
    }
};
