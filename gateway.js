// Lighthouse Gateway sending data to the Karelia server

const url = 'http://172.16.21.208:8888/api/sensors/measure1'

var Client = require('node-rest-client').Client

var authoptions = {
        user : 'karelia',
        password : 'puurakentaminen'
}

var client = new Client(authoptions)

var args = {
        headers : { 'Content-Type' : 'application/json' },
        data : { 'value' : '1.23' },
        requestConfig : { timeout : 1500, keepAlive : false }
}

var measuredValue = 0

setInterval( function () {
		// TODO tähän mittaus
        measuredValue = ((Math.random() - 0.5) * 5)
		
		// mittadata tietueeseen
        args.data.value = measuredValue
        console.log('PUTting new value %d', args.data.value)
        client.put( url, args, function(data, response) {
                console.log('Data sent. Received ' + response + '\n')
        }).on('error', function(err) {
                console.log('Error in PUT request')
        })
}, 3000)
