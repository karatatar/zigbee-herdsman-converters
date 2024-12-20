"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modernExtend_1 = require("../lib/modernExtend");
const definitions = [
    {
        zigbeeModel: ['HejSW01'],
        model: 'GLSK3ZB-1711',
        vendor: 'Hej',
        description: 'Goqual 1 gang Switch',
        extend: [(0, modernExtend_1.onOff)({ configureReporting: false, powerOnBehavior: false })],
    },
    {
        zigbeeModel: ['HejSW02'],
        model: 'GLSK3ZB-1712',
        vendor: 'Hej',
        description: 'Goqual 2 gang Switch',
        extend: [
            (0, modernExtend_1.deviceEndpoints)({ endpoints: { top: 1, bottom: 2 } }),
            (0, modernExtend_1.onOff)({ configureReporting: false, endpointNames: ['top', 'bottom'], powerOnBehavior: false }),
        ],
    },
    {
        zigbeeModel: ['HejSW03'],
        model: 'GLSK3ZB-1713',
        vendor: 'Hej',
        description: 'Goqual 3 gang Switch',
        extend: [
            (0, modernExtend_1.deviceEndpoints)({ endpoints: { top: 1, center: 2, bottom: 3 } }),
            (0, modernExtend_1.onOff)({ configureReporting: false, endpointNames: ['top', 'center', 'bottom'], powerOnBehavior: false }),
        ],
    },
    {
        zigbeeModel: ['HejSW04'],
        model: 'GLSK6ZB-1714',
        vendor: 'Hej',
        description: 'Goqual 4 gang Switch',
        extend: [
            (0, modernExtend_1.deviceEndpoints)({ endpoints: { top_left: 1, bottom_left: 2, top_right: 3, bottom_right: 4 } }),
            (0, modernExtend_1.onOff)({ configureReporting: false, endpointNames: ['top_left', 'bottom_left', 'top_right', 'bottom_right'], powerOnBehavior: false }),
        ],
    },
    {
        zigbeeModel: ['HejSW05'],
        model: 'GLSK6ZB-1715',
        vendor: 'Hej',
        description: 'Goqual 5 gang Switch',
        extend: [
            (0, modernExtend_1.deviceEndpoints)({ endpoints: { top_left: 1, center_left: 2, bottom_left: 3, top_right: 4, bottom_right: 5 } }),
            (0, modernExtend_1.onOff)({
                configureReporting: false,
                endpointNames: ['top_left', 'center_left', 'bottom_left', 'top_right', 'bottom_right'],
                powerOnBehavior: false,
            }),
        ],
    },
    {
        zigbeeModel: ['HejSW06'],
        model: 'GLSK6ZB-1716',
        vendor: 'Hej',
        description: 'Goqual 6 gang Switch',
        extend: [
            (0, modernExtend_1.deviceEndpoints)({ endpoints: { top_left: 1, center_left: 2, bottom_left: 3, top_right: 4, center_right: 5, bottom_right: 6 } }),
            (0, modernExtend_1.onOff)({
                configureReporting: false,
                endpointNames: ['top_left', 'center_left', 'bottom_left', 'top_right', 'center_right', 'bottom_right'],
                powerOnBehavior: false,
            }),
        ],
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=hej.js.map