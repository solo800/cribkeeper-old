// jshint esversion: 6
const express = require('express'),
    templateRouter = express.Router();

module.exports = function () {
    templateRouter.route('/:templateName')
        .get(function (req, res) {
            const templateName = req.params.templateName;

            console.log(templateName);
            res.render(templateName, {}, function (err, html) {
                "use strict";
                if (err) {
                    res.sendStatus(400).send(`${templateName} template does not exist`);
                } else {
                    res.send(html);
                }
            });

        });

    return templateRouter;
};
