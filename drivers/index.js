(function () {

    // main settings
    var http = require('http.min');
    var options = {
        protocol: 'https:',
        hostname: 'developer-apis.awair.is',
        path: '/dummy',
        headers: {}
    };

    var awair = exports;

    // active functions()  -------------------------------------  active functions()  --------------------------------------------

    awair.getDevices = function getDevices(apikey) {
        let url = '/v1/users/self/devices';

        return new Promise((resolve, reject) => {
            getData(url, apikey, (error, jsonobj) => {
                if (jsonobj) {
                    resolve(jsonobj);
                } else {
                    reject(error);
                }
            });
        });
    }

    awair.getCurrentData = function getCurrentData(settings) {
        let url = '/v1/users/self/devices/'+settings.deviceType+'/'+settings.deviceId+'/air-data/latest?fahrenheit=false';

        return new Promise((resolve, reject) => {
            getData(url, settings.apikey, (error, jsonobj) => {
                if (jsonobj) {
                    resolve(jsonobj);
                } else {
                    console.log("problem with request: "+ error);
                    reject(error);
                }
            });
        });
    }

    function getData(url, token, callback) {
        options.path = url;
        options.headers = {
            'User-Agent': 'Node.js http.min',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ token
        };

        console.log('url ' + url);
        http.json(options).then(data => {
                //this.log(data)
                return callback(null, data);
            })
            .catch(err => {
                console.log("problem with request: ${err.message}");
            });
    }

})();
