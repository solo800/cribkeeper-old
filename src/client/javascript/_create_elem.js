// jshint esversion: 6
/**
 * @var passedArgs Object
 * passedArgs.tag String
 * passedArgs.attrs Object
 * passedArgs.text String
 * passedArgs.id String
 * passedArgs.classes String
 **/
module.exports = function (passedArgs = {}) {
    const createElem = function (passedArgs) {
        let defArgs = {
            tag: 'div',
            attrs: {},
            text: '',
            id: '',
            classes: '',
            children: []
        },
        args = Object.assign({}, defArgs, passedArgs),
        elem = document.createElement(args.tag);

        _.each(args.attrs, (val, attr) => {
            "use strict";
            elem.setAttribute(attr, val);
        });

        if ('' !== args.text) {
            elem.innerHTML = args.text;
        }
        if ('' !== args.classes) {
            elem.setAttribute('class', args.classes);
        }
        if ('' !== args.id) {
            elem.setAttribute('id', args.id);
        }
        
        if (0 < args.children.length) {
            args.children.forEach((child) => {
                "use strict";
                elem.appendChild(createElem(child));
            });
        }

        return elem;
    };

    return createElem(passedArgs);
};