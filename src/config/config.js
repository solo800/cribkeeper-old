module.exports = function (node_env) {
    var settings = {
        "production": {
            mongoUrl: "Prod mongo"
        },
        "default": {
            mongoUrl: "mongodb://localhost:27017/ttraction"
        }
    };

    for (var env in settings) {
        if (settings.hasOwnProperty(env)) {
            settings[env].port = process.env.PORT || 8081;
        }
    }

    return "undefined" !== typeof settings[node_env] ? settings[node_env] : settings.default;
};
