module.exports = function (node_env) {
    var settings = {
        "production": {
            mongoUrl: "Prod mongo"
        },
        "default": {
            mongoUrl: "Default mongo"
        }
    };

    return "undefined" !== typeof settings[node_env] ? settings[node_env] : settings.default;
};
