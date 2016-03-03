var request = require('request');

module.exports = function(api_key) {
    if (!api_key) return new Error('API Key Required');

    var mapbox = {},
        base = 'http://api.tiles.mapbox.com/v4';

    mapbox.apiKey = function(_) {
        if (!arguments.length) return api_key;
        api_key = _;
        return mapbox;
    };

    mapbox.geocode = function(_, cb) {
        return request({
            url: base + '/geocode/mapbox.places/' + encodeURIComponent(_) + '.json?access_token='+api_key
        }, function(err, data) {
            if(err) { return cb(err, data.body); }
          cb(err, JSON.parse(data.body));
        });
    };

    mapbox.static = function(_, cb) {
        var markers = '';
        if (_.markers) {
            markers = _.markers.map(function(m) {
                return 'pin-m(' + [m.lon, m.lat].join(',') + ')';
            }).join(',') + '/';
        }
        return request({
            url: base + api_key + '/' +
                markers +
                [_.lon, _.lat, _.z].join(',') + '/' + [_.width || 640, _.height || 320].join('x') + '.png'
        });
    };

    return mapbox;
};
