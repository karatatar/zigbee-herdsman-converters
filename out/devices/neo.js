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
const legacy = __importStar(require("../lib/legacy"));
const modernExtend_1 = require("../lib/modernExtend");
const tuya = __importStar(require("../lib/tuya"));
const e = exposes.presets;
const ea = exposes.access;
const definitions = [
    {
        fingerprint: [{ modelID: 'TS0601', manufacturerName: '_TZE200_d0yu2xgi' }],
        zigbeeModel: ['0yu2xgi'],
        model: 'NAS-AB02B0',
        vendor: 'Neo',
        description: 'Temperature & humidity sensor and alarm',
        fromZigbee: [legacy.fz.neo_t_h_alarm, fromZigbee_1.default.ignore_basic_report, fromZigbee_1.default.ignore_tuya_set_time],
        toZigbee: [legacy.tz.neo_t_h_alarm],
        exposes: [
            e.temperature(),
            e.humidity(),
            e.binary('humidity_alarm', ea.STATE_SET, true, false),
            e.battery_low(),
            e.binary('temperature_alarm', ea.STATE_SET, true, false),
            e.binary('alarm', ea.STATE_SET, true, false),
            e.enum('melody', ea.STATE_SET, Array.from(Array(18).keys()).map((x) => (x + 1).toString())),
            e.numeric('duration', ea.STATE_SET).withUnit('s').withValueMin(0).withValueMax(1800),
            e.numeric('temperature_min', ea.STATE_SET).withUnit('°C').withValueMin(-20).withValueMax(80),
            e.numeric('temperature_max', ea.STATE_SET).withUnit('°C').withValueMin(-20).withValueMax(80),
            e.numeric('humidity_min', ea.STATE_SET).withUnit('%').withValueMin(1).withValueMax(100),
            e.numeric('humidity_max', ea.STATE_SET).withUnit('%').withValueMin(1).withValueMax(100),
            e.enum('volume', ea.STATE_SET, ['low', 'medium', 'high']),
            e.enum('power_type', ea.STATE, ['battery_full', 'battery_high', 'battery_medium', 'battery_low', 'usb']),
        ],
        onEvent: tuya.onEventSetLocalTime,
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.command('manuSpecificTuya', 'dataQuery', {});
            await endpoint.command('manuSpecificTuya', 'mcuVersionRequest', { seq: 0x0002 });
        },
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE200_t1blo2bj', '_TZE204_t1blo2bj', '_TZE204_q76rtoa9']),
        zigbeeModel: ['1blo2bj', 'lrfgpny', 'q76rtoa9'],
        model: 'NAS-AB02B2',
        vendor: 'Neo',
        description: 'Alarm',
        fromZigbee: [legacy.fz.neo_alarm, fromZigbee_1.default.ignore_basic_report],
        toZigbee: [legacy.tz.neo_alarm],
        exposes: [
            e.battery_low(),
            e.binary('alarm', ea.STATE_SET, true, false),
            e.enum('melody', ea.STATE_SET, Array.from(Array(18).keys()).map((x) => (x + 1).toString())),
            e.numeric('duration', ea.STATE_SET).withUnit('s').withValueMin(0).withValueMax(1800),
            e.enum('volume', ea.STATE_SET, ['low', 'medium', 'high']),
            e.numeric('battpercentage', ea.STATE).withUnit('%'),
        ],
        onEvent: tuya.onEventSetLocalTime,
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.command('manuSpecificTuya', 'dataQuery', {});
            await endpoint.command('manuSpecificTuya', 'mcuVersionRequest', { seq: 0x0002 });
        },
    },
    {
        fingerprint: [{ modelID: 'TS0601', manufacturerName: '_TZE200_7hfcudw5' }],
        model: 'NAS-PD07',
        vendor: 'Neo',
        description: 'Motion, temperature & humidity sensor',
        fromZigbee: [legacy.fz.neo_nas_pd07, fromZigbee_1.default.ignore_tuya_set_time],
        toZigbee: [legacy.tz.neo_nas_pd07],
        onEvent: tuya.onEventSetTime,
        exposes: [
            e.occupancy(),
            e.humidity(),
            e.temperature(),
            e.tamper(),
            e.battery_low(),
            e.enum('power_type', ea.STATE, ['battery_full', 'battery_high', 'battery_medium', 'battery_low', 'usb']),
            e
                .enum('alarm', ea.STATE, ['over_temperature', 'over_humidity', 'below_min_temperature', 'below_min_humdity', 'off'])
                .withDescription('Temperature/humidity alarm status'),
            e.numeric('temperature_min', ea.STATE_SET).withUnit('°C').withValueMin(-20).withValueMax(80),
            e.numeric('temperature_max', ea.STATE_SET).withUnit('°C').withValueMin(-20).withValueMax(80),
            e.binary('temperature_scale', ea.STATE_SET, '°C', '°F').withDescription('Temperature scale (°F/°C)'),
            e.numeric('humidity_min', ea.STATE_SET).withUnit('%').withValueMin(1).withValueMax(100),
            e.numeric('humidity_max', ea.STATE_SET).withUnit('%').withValueMin(1).withValueMax(100),
            // e.binary('unknown_111', ea.STATE_SET, 'ON', 'OFF').withDescription('Unknown datapoint 111 (default: ON)'),
            // e.binary('unknown_112', ea.STATE_SET, 'ON', 'OFF').withDescription('Unknown datapoint 112 (default: ON)')
        ],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await tuya.configureMagicPacket(device, coordinatorEndpoint);
            await endpoint.command('manuSpecificTuya', 'mcuVersionRequest', { seq: 0x0002 });
        },
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE200_nlrfgpny', '_TZE284_nlrfgpny', '_TZE204_nlrfgpny']),
        model: 'NAS-AB06B2',
        vendor: 'Neo',
        description: 'Outdoor solar alarm',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        configure: tuya.configureMagicPacket,
        exposes: [
            e.enum('alarm_state', ea.STATE, ['alarm_sound', 'alarm_light', 'alarm_sound_light', 'normal']).withDescription('Alarm status'),
            e.binary('alarm_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Enable alarm'),
            e.binary('tamper_alarm_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Enable tamper alarm'),
            e.binary('tamper_alarm', ea.STATE, 'ON', 'OFF').withDescription('Indicates whether the device is tampered'),
            e.enum('alarm_melody', ea.STATE_SET, ['melody_1', 'melody_2', 'melody_3']).withDescription('Alarm sound effect'),
            e.enum('alarm_mode', ea.STATE_SET, ['alarm_sound', 'alarm_light', 'alarm_sound_light']).withDescription('Alarm mode'),
            e
                .numeric('alarm_time', ea.STATE_SET)
                .withValueMin(1)
                .withValueMax(60)
                .withValueStep(1)
                .withUnit('min')
                .withDescription('Alarm duration in minutes'),
            e.binary('charging', ea.STATE, true, false).withDescription('Charging status'),
            e.battery(),
        ],
        meta: {
            tuyaDatapoints: [
                [
                    1,
                    'alarm_state',
                    tuya.valueConverterBasic.lookup({
                        alarm_sound: tuya.enum(0),
                        alarm_light: tuya.enum(1),
                        alarm_sound_light: tuya.enum(2),
                        no_alarm: tuya.enum(3),
                    }),
                ],
                [13, 'alarm_switch', tuya.valueConverter.onOff],
                [101, 'tamper_alarm_switch', tuya.valueConverter.onOff],
                [20, 'tamper_alarm', tuya.valueConverter.onOff],
                [21, 'alarm_melody', tuya.valueConverterBasic.lookup({ melody_1: tuya.enum(0), melody_2: tuya.enum(1), melody_3: tuya.enum(2) })],
                [
                    102,
                    'alarm_mode',
                    tuya.valueConverterBasic.lookup({ alarm_sound: tuya.enum(0), alarm_light: tuya.enum(1), alarm_sound_light: tuya.enum(2) }),
                ],
                [7, 'alarm_time', tuya.valueConverter.raw],
                [6, 'charging', tuya.valueConverter.raw],
                [15, 'battery', tuya.valueConverter.raw],
            ],
        },
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE204_rzrrjkz2', '_TZE204_uab532m0']),
        zigbeeModel: ['NAS-WV03B'],
        model: 'NAS-WV03B',
        vendor: 'Neo',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        description: 'Smart sprinkler timer',
        onEvent: tuya.onEventSetTime,
        configure: tuya.configureMagicPacket,
        exposes: [
            e.switch(),
            e.enum('status', ea.STATE, ['off', 'auto', 'disabled']).withDescription('Status'),
            e.numeric('countdown', ea.STATE_SET).withUnit('min').withValueMin(1).withValueMax(240).withDescription('Countdown'),
            e.numeric('countdown_left', ea.STATE).withUnit('min').withValueMin(1).withValueMax(240).withDescription('Countdown left'),
            e
                .numeric('water_current', ea.STATE)
                .withUnit('L/min')
                .withValueMin(0)
                .withValueMax(3785.41)
                .withValueStep(0.001)
                .withDescription('Current water flow (L/min)'),
            e.numeric('battery_percentage', ea.STATE).withUnit('%').withValueMin(0).withValueMax(100).withDescription('Battery percentage'),
            e
                .numeric('water_total', ea.STATE)
                .withUnit('L')
                .withValueMin(0)
                .withValueMax(378541.0)
                .withValueStep(0.001)
                .withDescription('Total water flow (L)'),
            e.binary('fault', ea.STATE, 'DETECTED', 'NOT_DETECTED').withDescription('Fault status'),
            e.enum('weather_delay', ea.STATE_SET, ['24h', '48h', '72h', 'cancel']).withDescription('Weather delay'),
            e.text('normal_timer', ea.STATE_SET).withDescription('Normal timer'),
            e.binary('switch_enabled', ea.STATE_SET, 'ON', 'OFF').withDescription('Switch enabled'),
            e.numeric('smart_irrigation', ea.STATE).withDescription('Smart irrigation'),
            e.binary('total_flow_reset_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Total flow reset switch'),
            e
                .numeric('quantitative_watering', ea.STATE_SET)
                .withUnit('L')
                .withValueMin(0)
                .withValueMax(10000)
                .withDescription('Quantitative watering'),
            e.binary('flow_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Flow switch'),
            e.binary('child_lock', ea.STATE_SET, 'ON', 'OFF').withDescription('Child lock'),
            e.numeric('surplus_flow', ea.STATE).withDescription('Surplus flow'),
            e.numeric('single_watering_duration', ea.STATE).withDescription('Single watering duration'),
            e.numeric('single_watering_amount', ea.STATE).withDescription('Single watering amount'),
        ],
        meta: {
            tuyaDatapoints: [
                [1, 'state', tuya.valueConverter.onOff],
                [3, 'status', tuya.valueConverter.onOff],
                [5, 'countdown', tuya.valueConverter.raw],
                [6, 'countdown_left', tuya.valueConverter.raw],
                [9, 'water_current', tuya.valueConverter.raw],
                [11, 'battery_percentage', tuya.valueConverter.batteryState],
                [15, 'water_total', tuya.valueConverter.raw],
                [19, 'fault', tuya.valueConverter.raw],
                [37, 'weather_delay', tuya.valueConverter.raw],
                [38, 'normal_timer', tuya.valueConverter.raw],
                [42, 'switch_enabled', tuya.valueConverter.onOff],
                [47, 'smart_irrigation', tuya.valueConverter.raw],
                [101, 'total_flow_reset_switch', tuya.valueConverter.onOff],
                [102, 'quantitative_watering', tuya.valueConverter.raw],
                [103, 'flow_switch', tuya.valueConverter.onOff],
                [104, 'child_lock', tuya.valueConverter.onOff],
                [105, 'surplus_flow', tuya.valueConverter.raw],
                [106, 'single_watering_duration', tuya.valueConverter.raw],
                [108, 'single_watering_amount', tuya.valueConverter.raw],
            ],
        },
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE204_a9ojznj8', '_TZE284_a9ojznj8']),
        model: 'NAS-WV03B2',
        vendor: 'NEO',
        description: 'Smart sprinkler timer',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        onEvent: tuya.onEventSetTime,
        configure: tuya.configureMagicPacket,
        exposes: [
            e.switch(),
            e.enum('status', ea.STATE, ['off', 'auto', 'disabled', 'app_manual', 'key_control']).withDescription('Status'),
            e.numeric('countdown', ea.STATE_SET).withUnit('min').withValueMin(1).withValueMax(60).withDescription('Count down'),
            e.numeric('countdown_left', ea.STATE).withUnit('min').withValueMin(1).withValueMax(60).withDescription('Countdown left time'),
            e.binary('child_lock', ea.STATE_SET, 'ON', 'OFF').withDescription('Child lock'),
            e.battery(),
        ],
        meta: {
            tuyaDatapoints: [
                [1, 'state', tuya.valueConverter.onOff],
                [
                    3,
                    'status',
                    tuya.valueConverterBasic.lookup({
                        off: tuya.enum(0),
                        auto: tuya.enum(1),
                        disabled: tuya.enum(2),
                        app_manual: tuya.enum(3),
                        key_control: tuya.enum(4),
                    }),
                ],
                [101, 'countdown', tuya.valueConverter.raw],
                [6, 'countdown_left', tuya.valueConverter.raw],
                [104, 'child_lock', tuya.valueConverter.onOff],
                [11, 'battery', tuya.valueConverter.raw],
            ],
        },
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE284_z7a2jmyy']),
        model: 'NAS-WV05B2-L',
        vendor: 'NEO',
        description: 'Smart sprinkler timer',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        onEvent: tuya.onEventSetTime,
        configure: tuya.configureMagicPacket,
        exposes: [
            e.switch(),
            e.enum('status', ea.STATE, ['off', 'auto', 'disabled', 'app_manual', 'key_control']).withDescription('Status'),
            e.numeric('countdown', ea.STATE_SET).withUnit('min').withValueMin(1).withValueMax(60).withDescription('Count down'),
            e.numeric('countdown_left', ea.STATE).withUnit('min').withValueMin(1).withValueMax(60).withDescription('Countdown left time'),
            e.numeric('water_total', ea.STATE).withUnit('L').withValueMin(0).withValueStep(0.001).withDescription('Water total (L)'),
            e.numeric('water_current', ea.STATE).withUnit('L/min').withValueMin(0).withValueStep(0.001).withDescription('Current water flow (L/min)'),
            e.binary('current_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Flow switch'),
            e.binary('reset_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Total flow reset switch'),
            e.binary('child_lock', ea.STATE_SET, 'ON', 'OFF').withDescription('Child lock'),
            e.battery(),
        ],
        meta: {
            tuyaDatapoints: [
                [1, 'state', tuya.valueConverter.onOff],
                [
                    3,
                    'status',
                    tuya.valueConverterBasic.lookup({
                        off: tuya.enum(0),
                        auto: tuya.enum(1),
                        disabled: tuya.enum(2),
                        app_manual: tuya.enum(3),
                        key_control: tuya.enum(4),
                    }),
                ],
                [109, 'countdown', tuya.valueConverter.raw],
                [6, 'countdown_left', tuya.valueConverter.raw],
                [9, 'water_current', tuya.valueConverter.divideBy1000],
                [15, 'water_total', tuya.valueConverter.divideBy1000],
                [103, 'current_switch', tuya.valueConverter.onOff],
                [101, 'reset_switch', tuya.valueConverter.onOff],
                [104, 'child_lock', tuya.valueConverter.onOff],
                [11, 'battery', tuya.valueConverter.raw],
            ],
        },
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE284_rzrrjkz2', '_TZE284_uab532m0']),
        model: 'NAS-WV05B2',
        vendor: 'NEO',
        description: 'Smart sprinkler timer',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        onEvent: tuya.onEventSetTime,
        configure: tuya.configureMagicPacket,
        exposes: [
            e.switch(),
            e.enum('status', ea.STATE, ['off', 'auto', 'disabled', 'app_manual', 'key_control']).withDescription('Status'),
            e.numeric('countdown', ea.STATE_SET).withUnit('min').withValueMin(1).withValueMax(60).withDescription('Count down'),
            e.numeric('countdown_left', ea.STATE).withUnit('min').withValueMin(1).withValueMax(60).withDescription('Countdown left time'),
            e.numeric('water_total', ea.STATE).withUnit('gal').withValueMin(0).withValueStep(0.001).withDescription('Water total (gal)'),
            e
                .numeric('water_current', ea.STATE)
                .withUnit('gal/min')
                .withValueMin(0)
                .withValueStep(0.001)
                .withDescription('Current water flow (gal/min)'),
            e.binary('current_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Flow switch'),
            e.binary('reset_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Total flow reset switch'),
            e.binary('child_lock', ea.STATE_SET, 'ON', 'OFF').withDescription('Child lock'),
            e.battery(),
        ],
        meta: {
            tuyaDatapoints: [
                [1, 'state', tuya.valueConverter.onOff],
                [
                    3,
                    'status',
                    tuya.valueConverterBasic.lookup({
                        off: tuya.enum(0),
                        auto: tuya.enum(1),
                        disabled: tuya.enum(2),
                        app_manual: tuya.enum(3),
                        key_control: tuya.enum(4),
                    }),
                ],
                [109, 'countdown', tuya.valueConverter.raw],
                [6, 'countdown_left', tuya.valueConverter.raw],
                [9, 'water_current', tuya.valueConverter.divideBy1000],
                [15, 'water_total', tuya.valueConverter.divideBy1000],
                [103, 'current_switch', tuya.valueConverter.onOff],
                [101, 'reset_switch', tuya.valueConverter.onOff],
                [104, 'child_lock', tuya.valueConverter.onOff],
                [11, 'battery', tuya.valueConverter.raw],
            ],
        },
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE284_rqcuwlsa']),
        model: 'NAS-STH02B2',
        vendor: 'NEO',
        description: 'Soil moisture, temperature, and ec',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        configure: tuya.configureMagicPacket,
        exposes: [
            e.numeric('ec', ea.STATE).withUnit('us/cm').withValueMin(0).withValueMax(20000).withDescription('Soil electrical conductivity'),
            e.enum('fertility', ea.STATE, ['normal', 'lower', 'low', 'middle', 'high', 'higher']).withDescription('Soil fertility'),
            e.numeric('humidity', ea.STATE).withUnit('%').withValueMin(0).withValueMax(100).withDescription('Soil humidity'),
            e.numeric('temperature', ea.STATE).withUnit('°C').withValueMin(-10).withValueMax(60).withDescription('Soil temperature'),
            e.numeric('temperature_f', ea.STATE).withUnit('°F').withValueMin(14).withValueMax(140).withDescription('Soil temperature'),
            e
                .numeric('temperature_sensitivity', ea.STATE_SET)
                .withUnit('°C')
                .withValueMin(0.3)
                .withValueMax(1)
                .withValueStep(0.1)
                .withDescription('Upper temperature limit'),
            e.numeric('humidity_sensitivity', ea.STATE_SET).withUnit('%').withValueMin(1).withValueMax(5).withDescription('Upper temperature limit'),
            e.enum('temperature_alarm', ea.STATE, ['lower_alarm', 'upper_alarm', 'cancel']).withDescription('Temperature alarm state'),
            e.enum('humidity_alarm', ea.STATE, ['lower_alarm', 'upper_alarm', 'cancel']).withDescription('Humidity alarm state'),
            e
                .numeric('max_temperature_alarm', ea.STATE_SET)
                .withUnit('°C')
                .withValueMin(0)
                .withValueMax(60)
                .withDescription('Upper temperature limit'),
            e
                .numeric('min_temperature_alarm', ea.STATE_SET)
                .withUnit('°C')
                .withValueMin(0)
                .withValueMax(60)
                .withDescription('Lower temperature limit'),
            e.numeric('max_humidity_alarm', ea.STATE_SET).withUnit('%').withValueMin(0).withValueMax(100).withDescription('Upper humidity limit'),
            e.numeric('min_humidity_alarm', ea.STATE_SET).withUnit('%').withValueMin(0).withValueMax(100).withDescription('Lower humidity limit'),
            e.numeric('schedule_periodic', ea.STATE_SET).withUnit('min').withValueMin(5).withValueMax(60).withDescription('Report sensitivity'),
            e.battery(),
        ],
        meta: {
            tuyaDatapoints: [
                [
                    101,
                    'temperature_alarm',
                    tuya.valueConverterBasic.lookup({
                        lower_alarm: tuya.enum(0),
                        upper_alarm: tuya.enum(1),
                        cancel: tuya.enum(2),
                    }),
                ],
                [
                    102,
                    'humidity_alarm',
                    tuya.valueConverterBasic.lookup({
                        lower_alarm: tuya.enum(0),
                        upper_alarm: tuya.enum(1),
                        cancel: tuya.enum(2),
                    }),
                ],
                [
                    4,
                    'fertility',
                    tuya.valueConverterBasic.lookup({
                        normal: tuya.enum(0),
                        lower: tuya.enum(1),
                        low: tuya.enum(2),
                        middle: tuya.enum(3),
                        high: tuya.enum(4),
                        higher: tuya.enum(5),
                    }),
                ],
                [1, 'ec', tuya.valueConverter.raw],
                [3, 'humidity', tuya.valueConverter.raw],
                [5, 'temperature', tuya.valueConverter.divideBy10],
                [110, 'temperature_f', tuya.valueConverter.divideBy10],
                [107, 'temperature_sensitivity', tuya.valueConverter.divideBy10],
                [108, 'humidity_sensitivity', tuya.valueConverter.raw],
                [103, 'max_temperature_alarm', tuya.valueConverter.divideBy10],
                [104, 'min_temperature_alarm', tuya.valueConverter.divideBy10],
                [105, 'max_humidity_alarm', tuya.valueConverter.raw],
                [106, 'min_humidity_alarm', tuya.valueConverter.raw],
                [109, 'schedule_periodic', tuya.valueConverter.raw],
                [15, 'battery', tuya.valueConverter.raw],
            ],
        },
    },
    {
        fingerprint: [{ modelID: 'SNZB-02', manufacturerName: '_TZ3000_utwgoauk' }],
        model: 'NAS-TH07B2',
        vendor: 'NEO',
        description: 'Temperature & humidity sensor',
        extend: [(0, modernExtend_1.temperature)(), (0, modernExtend_1.humidity)(), (0, modernExtend_1.battery)()],
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE204_1youk3hj']),
        model: 'NAS-PS10B2',
        vendor: 'NEO',
        description: 'Human presence sensor',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        configure: tuya.configureMagicPacket,
        exposes: [
            e.presence(),
            e.enum('human_motion_state', ea.STATE, ['none', 'small', 'large']).withDescription('Human Motion State'),
            e
                .numeric('dis_current', ea.STATE)
                .withUnit('cm')
                .withValueMin(0)
                .withValueMax(600)
                .withValueStep(1)
                .withLabel('Current distance')
                .withDescription('Current distance of detected motion'),
            e
                .numeric('presence_time', ea.STATE_SET)
                .withUnit('s')
                .withValueMin(3)
                .withValueMax(600)
                .withValueStep(1)
                .withDescription('Presence Time'),
            e
                .numeric('motion_far_detection', ea.STATE_SET)
                .withUnit('cm')
                .withValueMin(150)
                .withValueMax(600)
                .withValueStep(75)
                .withDescription('Motion Range Detection'),
            e
                .numeric('motion_sensitivity_value', ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(7)
                .withValueStep(1)
                .withDescription('Motion Detection Sensitivity'),
            e
                .numeric('motionless_sensitivity', ea.STATE_SET)
                .withValueMin(0)
                .withValueMax(7)
                .withValueStep(1)
                .withDescription('Motionless Detection Sensitivity'),
            e.enum('work_mode', ea.STATE_SET, ['manual', 'auto']).withDescription('Work Mode'),
            e.binary('output_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Output Switch'),
            e.numeric('output_time', ea.STATE_SET).withUnit('s').withValueMin(10).withValueMax(1800).withDescription('Output Times'),
            e.binary('led_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Led Switch'),
            e.enum('lux_value', ea.STATE_SET, ['10 lux', '20 lux', '50 lux', '24h']).withDescription('Lux Value'),
        ],
        meta: {
            tuyaDatapoints: [
                [1, 'presence', tuya.valueConverter.trueFalse1],
                [11, 'human_motion_state', tuya.valueConverterBasic.lookup({ none: 0, small: 1, large: 2 })],
                [19, 'dis_current', tuya.valueConverter.raw],
                [12, 'presence_time', tuya.valueConverter.raw],
                [13, 'motion_far_detection', tuya.valueConverter.raw],
                [15, 'motion_sensitivity', tuya.valueConverter.raw],
                [16, 'motionless_sensitivity', tuya.valueConverter.raw],
                [101, 'work_mode', tuya.valueConverterBasic.lookup({ manual: 0, auto: 1 })],
                [104, 'output_switch', tuya.valueConverter.onOff],
                [103, 'output_time', tuya.valueConverter.raw],
                [105, 'led_switch', tuya.valueConverter.onOff],
                [102, 'lux_value', tuya.valueConverterBasic.lookup({ '10_lux': 0, '20_lux': 1, '50_lux': 2, '24h': 3 })],
            ],
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=neo.js.map