"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fromZigbee_1 = __importDefault(require("../converters/fromZigbee"));
const exposes = __importStar(require("../lib/exposes"));
const tuya = __importStar(require("../lib/tuya"));
const utils = __importStar(require("../lib/utils"));
const e = exposes.presets;
const ea = exposes.access;
const tzLocal = {
    TS0225: {
        key: ['motion_detection_distance', 'motion_detection_sensitivity', 'static_detection_sensitivity', 'led_indicator'],
        convertSet: async (entity, key, value, meta) => {
            switch (key) {
                case 'motion_detection_distance': {
                    utils.assertNumber(value, 'motion_detection_distance');
                    await entity.write('manuSpecificTuya_2', { 57355: { value, type: 0x21 } });
                    break;
                }
                case 'motion_detection_sensitivity': {
                    utils.assertNumber(value, 'motion_detection_sensitivity');
                    await entity.write('manuSpecificTuya_2', { 57348: { value, type: 0x20 } });
                    break;
                }
                case 'static_detection_sensitivity': {
                    utils.assertNumber(value, 'static_detection_sensitivity');
                    await entity.write('manuSpecificTuya_2', { 57349: { value, type: 0x20 } });
                    break;
                }
                case 'led_indicator': {
                    await entity.write('manuSpecificTuya_2', { 57353: { value: value ? 0x01 : 0x00, type: 0x10 } });
                    break;
                }
            }
        },
    },
};
const fzLocal = {
    TS0225_illuminance: {
        cluster: 'msIlluminanceMeasurement',
        type: 'raw',
        convert: (model, msg, publish, options, meta) => {
            const buffer = msg.data;
            const measuredValue = Number(buffer[7]) * 256 + Number(buffer[6]);
            return { illuminance: measuredValue === 0 ? 0 : Math.round(Math.pow(10, (measuredValue - 1) / 10000)) };
        },
    },
    TS0225: {
        cluster: 'manuSpecificTuya_2',
        type: ['attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data['57354'] !== undefined) {
                result['target_distance'] = msg.data['57354'];
            }
            if (msg.data['57355'] !== undefined) {
                result['motion_detection_distance'] = msg.data['57355'];
            }
            if (msg.data['57348'] !== undefined) {
                result['motion_detection_sensitivity'] = msg.data['57348'];
            }
            if (msg.data['57349'] !== undefined) {
                result['static_detection_sensitivity'] = msg.data['57349'];
            }
            if (msg.data['57345'] !== undefined) {
                result['presence_keep_time'] = msg.data['57345'];
            }
            if (msg.data['57353'] !== undefined) {
                result['led_indicator'] = msg.data['57353'] === 1 ? true : false;
            }
            return result;
        },
    },
};
const definitions = [
    {
        fingerprint: tuya.fingerprint('TS0225', ['_TZ3218_awarhusb', '_TZ3218_t9ynfz4x']),
        model: 'ES1ZZ(TY)',
        vendor: 'Linptech',
        description: 'mmWave Presence sensor',
        fromZigbee: [fromZigbee_1.default.ias_occupancy_alarm_1, fzLocal.TS0225, fzLocal.TS0225_illuminance, tuya.fz.datapoints],
        toZigbee: [tzLocal.TS0225, tuya.tz.datapoints],
        configure: tuya.configureMagicPacket,
        exposes: [
            e.occupancy().withDescription('Presence state'),
            e.illuminance().withUnit('lx'),
            e.numeric('target_distance', ea.STATE).withDescription('Distance to target').withUnit('cm'),
            e
                .numeric('motion_detection_distance', ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(600)
                .withValueStep(75)
                .withDescription('Motion detection distance')
                .withUnit('cm'),
            e.numeric('presence_keep_time', ea.STATE).withDescription('Presence keep time').withUnit('min'),
            e
                .numeric('motion_detection_sensitivity', ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(5)
                .withValueStep(1)
                .withDescription('Motion detection sensitivity'),
            e
                .numeric('static_detection_sensitivity', ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(5)
                .withValueStep(1)
                .withDescription('Static detection sensitivity'),
            e
                .numeric('fading_time', ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(10000)
                .withValueStep(1)
                .withUnit('s')
                .withDescription('Time after which the device will check again for presence'),
            e.binary('led_indicator', ea.STATE_SET, true, false).withDescription('LED Presence Indicator'),
        ],
        meta: {
            tuyaDatapoints: [[101, 'fading_time', tuya.valueConverter.raw]],
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=linptech.js.map