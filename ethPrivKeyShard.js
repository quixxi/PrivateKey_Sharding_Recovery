var http = require('http');
var secrets = require('../secrets.js');

//success

// Usage:
//    cd examples
//    node example_node.js
//
//  Visit http://127.0.0.1:1337/ in your browser.
//  You should see two identical keys displayed, one original
//  key and then a key that resulted from splitting and combining shares.
//  In between the two keys you should see an array of the sharded private key pieces.

//just using http, super basic. Not even express
//very rudimentary display
http.createServer(function (req, res) {

    var key, comb, shares, newShare;


    //key = secrets.random(512);
    //instead of randomly generated key, directly passing ethereum Private Key to be sharded
    // example testnet ropsten priv key fe1dfcaf50206561e507e9d659bdc8017907d4529f051152978d8df5b7d93328
    key = 'fe1dfcaf50206561e507e9d659bdc8017907d4529f051152978d8df5b7d93328';
    //splitting into 10 shards with a threshold of 5 pieces required for recovery
    // shares are the equivalent of shards or pieces of the private key
    // shares = secrets.share(key, 10, 5);
    shares = secrets.share(key, 100, 5);

    // console.log(shares);

    comb = secrets.combine( shares );

    /*
    //create another share with an id of 8
    newShare = secrets.newShare(8, shares);
    //reconstruct using 4 original shares and the new share;
    comb = secrets.combine( shares.slice(1,5).concat(newShare) );
*/

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('You should see two identical keys below, before and after share and combine.\n\n' + "Private key to be sharded: " + key + '\n' + "Private key shard array: " + shares + '\n' + "Recovered Private Key: " + comb);

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
