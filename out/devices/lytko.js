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
const zigbee_herdsman_1 = require("zigbee-herdsman");
const fromZigbee_1 = __importDefault(require("../converters/fromZigbee"));
const toZigbee_1 = __importDefault(require("../converters/toZigbee"));
const constants = __importStar(require("../lib/constants"));
const exposes = __importStar(require("../lib/exposes"));
const ota = __importStar(require("../lib/ota"));
const reporting = __importStar(require("../lib/reporting"));
const utils_1 = require("../lib/utils");
const e = exposes.presets;
const ea = exposes.access;
const manufacturerOptions = { manufacturerCode: 0x7777 };
const sensorTypes = ['3.3', '5', '6.8', '10', '12', '14.8', '15', '20', '33', '47'];
const fzLocal = {
    thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const ep = (0, utils_1.getKey)(model.endpoint(msg.device), msg.endpoint.ID);
            const result = {};
            if (msg.data.minSetpointDeadBand !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('min_setpoint_deadband', msg, model, meta)] = (0, utils_1.precisionRound)(msg.data['minSetpointDeadBand'], 2) / 10;
            }
            // sensor type
            if (msg.data['30464'] !== undefined) {
                result[`sensor_type_${ep}`] = sensorTypes[(0, utils_1.toNumber)(msg.data['30464'])];
            }
            if (msg.data['30465'] !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('target_temp_first', msg, model, meta)] = msg.data['30465'] == 1;
            }
            return result;
        },
    },
    thermostat_ui: {
        cluster: 'hvacUserInterfaceCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data['30464'] !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('brightness', msg, model, meta)] = msg.data['30464'];
            }
            if (msg.data['30465'] !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('brightness_standby', msg, model, meta)] = msg.data['30465'];
            }
            if (msg.data.keypadLockout !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('keypad_lockout', msg, model, meta)] = (0, utils_1.getFromLookup)(msg.data['keypadLockout'], constants.keypadLockoutMode);
            }
            return result;
        },
    },
};
const tzLocal = {
    thermostat: {
        key: ['sensor_type', 'target_temp_first', 'min_setpoint_deadband'],
        convertGet: async (entity, key, meta) => {
            const lookup = {
                sensor_type: 30464,
                target_temp_first: 30465,
            };
            switch (key) {
                case 'sensor_type':
                    await entity.read('hvacThermostat', [lookup[key]], manufacturerOptions);
                    break;
                case 'target_temp_first':
                    await entity.read('hvacThermostat', [lookup[key]], manufacturerOptions);
                    break;
                case 'min_setpoint_deadband':
                    await entity.read('hvacThermostat', ['minSetpointDeadBand']);
                    break;
                default:
                    break;
            }
        },
        convertSet: async (entity, key, value, meta) => {
            let payload = {};
            let newValue = value;
            switch (key) {
                case 'sensor_type':
                    newValue = sensorTypes.indexOf(value);
                    payload = { 30464: { value: newValue, type: zigbee_herdsman_1.Zcl.DataType.ENUM8 } };
                    await entity.write('hvacThermostat', payload, manufacturerOptions);
                    break;
                case 'target_temp_first':
                    payload = { 30465: { value: newValue, type: zigbee_herdsman_1.Zcl.DataType.BOOLEAN } };
                    await entity.write('hvacThermostat', payload, manufacturerOptions);
                    break;
                case 'min_setpoint_deadband':
                    await entity.write('hvacThermostat', { minSetpointDeadBand: Math.round((0, utils_1.toNumber)(value) * 10) });
                    break;
                default:
                    break;
            }
            return { state: { [key]: value } };
        },
    },
    thermostat_ui: {
        key: ['brightness', 'brightness_standby'],
        convertGet: async (entity, key, meta) => {
            const lookup = {
                brightness: 30464,
                brightness_standby: 30465,
            };
            switch (key) {
                case 'brightness':
                    await entity.read('hvacUserInterfaceCfg', [lookup[key]], manufacturerOptions);
                    break;
                case 'brightness_standby':
                    await entity.read('hvacUserInterfaceCfg', [lookup[key]], manufacturerOptions);
                    break;
                default:
                    break;
            }
        },
        convertSet: async (entity, key, value, meta) => {
            let payload = {};
            const newValue = value;
            switch (key) {
                case 'brightness':
                    payload = { 30464: { value: newValue, type: zigbee_herdsman_1.Zcl.DataType.ENUM8 } };
                    await entity.write('hvacUserInterfaceCfg', payload, manufacturerOptions);
                    break;
                case 'brightness_standby':
                    payload = { 30465: { value: newValue, type: zigbee_herdsman_1.Zcl.DataType.ENUM8 } };
                    await entity.write('hvacUserInterfaceCfg', payload, manufacturerOptions);
                    break;
                default:
                    break;
            }
            return { state: { [key]: value } };
        },
    },
};
const definitions = [
    {
        zigbeeModel: ['L101Z-SBI'],
        model: 'L101Z-SBI',
        vendor: 'Lytko',
        ota: ota.zigbeeOTA,
        description: 'Single channel Zigbee thermostat',
        fromZigbee: [fromZigbee_1.default.humidity, fromZigbee_1.default.temperature, fromZigbee_1.default.thermostat, fzLocal.thermostat, fzLocal.thermostat_ui],
        toZigbee: [
            toZigbee_1.default.thermostat_keypad_lockout,
            toZigbee_1.default.temperature,
            toZigbee_1.default.thermostat_local_temperature,
            toZigbee_1.default.thermostat_system_mode,
            toZigbee_1.default.thermostat_running_mode,
            toZigbee_1.default.thermostat_occupied_heating_setpoint,
            toZigbee_1.default.thermostat_local_temperature_calibration,
            tzLocal.thermostat,
            tzLocal.thermostat_ui,
        ],
        meta: { multiEndpoint: true },
        endpoint: (device) => {
            return { l3: 3, l2: 2, l1: 1 };
        },
        exposes: [
            e.temperature().withAccess(ea.STATE_GET).withEndpoint('l2'),
            e.humidity().withEndpoint('l2'),
            e
                .climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 15, 35, 0.5)
                .withSystemMode(['off', 'heat'])
                .withRunningMode(['off', 'heat'])
                .withLocalTemperatureCalibration(-3.0, 3.0, 0.1)
                .withEndpoint('l3'),
            e
                .numeric('min_setpoint_deadband', ea.ALL)
                .withUnit('C')
                .withValueMax(3)
                .withValueMin(0)
                .withValueStep(0.1)
                .withDescription('Hysteresis setting')
                .withEndpoint('l3'),
            e.enum('sensor_type', ea.ALL, sensorTypes).withDescription('Type of sensor. Sensor resistance value (kOhm)').withEndpoint('l3'),
            e
                .binary('target_temp_first', ea.ALL, true, false)
                .withDescription('Display current temperature or target temperature')
                .withEndpoint('l3'),
            e.enum('keypad_lockout', ea.ALL, ['unlock', 'lock1']).withDescription('Enables/disables physical input on the device').withEndpoint('l1'),
            e
                .numeric('brightness', ea.ALL)
                .withUnit('%')
                .withValueMax(100)
                .withValueMin(0)
                .withValueStep(1)
                .withDescription('Display brightness')
                .withEndpoint('l1'),
            e
                .numeric('brightness_standby', ea.ALL)
                .withUnit('%')
                .withValueMax(100)
                .withValueMin(0)
                .withValueStep(1)
                .withDescription('Display brightness in standby mode')
                .withEndpoint('l1'),
        ],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint2, coordinatorEndpoint, ['msTemperatureMeasurement', 'msRelativeHumidity']);
            await endpoint2.read('msRelativeHumidity', ['measuredValue']);
            await endpoint2.read('msTemperatureMeasurement', ['measuredValue']);
            const endpoint3 = device.getEndpoint(3);
            await reporting.bind(endpoint3, coordinatorEndpoint, ['hvacThermostat']);
            await reporting.thermostatTemperature(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'localTemp', minimumReportInterval: 60, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'occupiedHeatingSetpoint', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatSystemMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'systemMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await reporting.thermostatRunningMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'runningMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await endpoint3.read('hvacThermostat', ['localTemp', 'occupiedHeatingSetpoint', 'systemMode', 'runningMode']);
            await endpoint3.read('hvacThermostat', [30464, 30465], manufacturerOptions);
            const endpoint1 = device.getEndpoint(1);
            await endpoint1.read('hvacUserInterfaceCfg', ['keypadLockout']);
            await endpoint1.read('hvacUserInterfaceCfg', [30464, 30465], manufacturerOptions);
        },
    },
    {
        zigbeeModel: ['L101Z-SBN'],
        model: 'L101Z-SBN',
        vendor: 'Lytko',
        description: 'Single channel Zigbee thermostat',
        ota: ota.zigbeeOTA,
        fromZigbee: [fromZigbee_1.default.thermostat, fzLocal.thermostat, fzLocal.thermostat_ui],
        toZigbee: [
            toZigbee_1.default.thermostat_keypad_lockout,
            toZigbee_1.default.temperature,
            toZigbee_1.default.thermostat_local_temperature,
            toZigbee_1.default.thermostat_system_mode,
            toZigbee_1.default.thermostat_running_mode,
            toZigbee_1.default.thermostat_occupied_heating_setpoint,
            toZigbee_1.default.thermostat_local_temperature_calibration,
            tzLocal.thermostat,
            tzLocal.thermostat_ui,
        ],
        meta: { multiEndpoint: true },
        endpoint: (device) => {
            return { l3: 3, l1: 1 };
        },
        exposes: [
            e
                .climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 15, 35, 0.5)
                .withSystemMode(['off', 'heat'])
                .withRunningMode(['off', 'heat'])
                .withLocalTemperatureCalibration(-3.0, 3.0, 0.1)
                .withEndpoint('l3'),
            e
                .numeric('min_setpoint_deadband', ea.ALL)
                .withUnit('C')
                .withValueMax(3)
                .withValueMin(0)
                .withValueStep(0.1)
                .withDescription('Hysteresis setting')
                .withEndpoint('l3'),
            e.enum('sensor_type', ea.ALL, sensorTypes).withDescription('Type of sensor. Sensor resistance value (kOhm)').withEndpoint('l3'),
            e
                .binary('target_temp_first', ea.ALL, true, false)
                .withDescription('Display current temperature or target temperature')
                .withEndpoint('l3'),
            e.enum('keypad_lockout', ea.ALL, ['unlock', 'lock1']).withDescription('Enables/disables physical input on the device').withEndpoint('l1'),
            e
                .numeric('brightness', ea.ALL)
                .withUnit('%')
                .withValueMax(100)
                .withValueMin(0)
                .withValueStep(1)
                .withDescription('Display brightness')
                .withEndpoint('l1'),
            e
                .numeric('brightness_standby', ea.ALL)
                .withUnit('%')
                .withValueMax(100)
                .withValueMin(0)
                .withValueStep(1)
                .withDescription('Display brightness in standby mode')
                .withEndpoint('l1'),
        ],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint3 = device.getEndpoint(3);
            await reporting.bind(endpoint3, coordinatorEndpoint, ['hvacThermostat']);
            await reporting.thermostatTemperature(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'localTemp', minimumReportInterval: 60, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'occupiedHeatingSetpoint', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatSystemMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'systemMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await reporting.thermostatRunningMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'runningMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await endpoint3.read('hvacThermostat', ['localTemp', 'occupiedHeatingSetpoint', 'systemMode', 'runningMode']);
            await endpoint3.read('hvacThermostat', [30464, 30465], manufacturerOptions);
            const endpoint1 = device.getEndpoint(1);
            await endpoint1.read('hvacUserInterfaceCfg', ['keypadLockout']);
            await endpoint1.read('hvacUserInterfaceCfg', [30464, 30465], manufacturerOptions);
        },
    },
    {
        zigbeeModel: ['L101Z-SLN'],
        model: 'L101Z-SLN',
        vendor: 'Lytko',
        description: 'Single channel Zigbee thermostat without screen',
        ota: ota.zigbeeOTA,
        fromZigbee: [fromZigbee_1.default.thermostat, fzLocal.thermostat],
        toZigbee: [
            toZigbee_1.default.thermostat_local_temperature,
            toZigbee_1.default.thermostat_system_mode,
            toZigbee_1.default.thermostat_running_mode,
            toZigbee_1.default.thermostat_occupied_heating_setpoint,
            toZigbee_1.default.thermostat_local_temperature_calibration,
            tzLocal.thermostat,
        ],
        meta: { multiEndpoint: true },
        endpoint: (device) => {
            return { l3: 3, l1: 1 };
        },
        exposes: [
            e
                .climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 15, 35, 0.5)
                .withSystemMode(['off', 'heat'])
                .withRunningMode(['off', 'heat'])
                .withLocalTemperatureCalibration(-3.0, 3.0, 0.1)
                .withEndpoint('l3'),
            e
                .numeric('min_setpoint_deadband', ea.ALL)
                .withUnit('C')
                .withValueMax(3)
                .withValueMin(0)
                .withValueStep(0.1)
                .withDescription('Hysteresis setting')
                .withEndpoint('l3'),
            e.enum('sensor_type', ea.ALL, sensorTypes).withDescription('Type of sensor. Sensor resistance value (kOhm)').withEndpoint('l3'),
            e
                .binary('target_temp_first', ea.ALL, true, false)
                .withDescription('Display current temperature or target temperature')
                .withEndpoint('l3'),
        ],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint3 = device.getEndpoint(3);
            await reporting.bind(endpoint3, coordinatorEndpoint, ['hvacThermostat']);
            await reporting.thermostatTemperature(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'localTemp', minimumReportInterval: 60, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'occupiedHeatingSetpoint', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatSystemMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'systemMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await reporting.thermostatRunningMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'runningMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await endpoint3.read('hvacThermostat', ['localTemp', 'occupiedHeatingSetpoint', 'systemMode', 'runningMode']);
        },
    },
    {
        zigbeeModel: ['L101Z-DBI'],
        model: 'L101Z-DBI',
        vendor: 'Lytko',
        description: 'Dual channel Zigbee thermostat',
        ota: ota.zigbeeOTA,
        fromZigbee: [fromZigbee_1.default.humidity, fromZigbee_1.default.temperature, fromZigbee_1.default.thermostat, fzLocal.thermostat, fzLocal.thermostat_ui],
        toZigbee: [
            toZigbee_1.default.thermostat_keypad_lockout,
            toZigbee_1.default.temperature,
            toZigbee_1.default.thermostat_local_temperature,
            toZigbee_1.default.thermostat_system_mode,
            toZigbee_1.default.thermostat_running_mode,
            toZigbee_1.default.thermostat_occupied_heating_setpoint,
            toZigbee_1.default.thermostat_local_temperature_calibration,
            tzLocal.thermostat,
            tzLocal.thermostat_ui,
        ],
        meta: { multiEndpoint: true },
        endpoint: (device) => {
            return { l4: 4, l3: 3, l2: 2, l1: 1 };
        },
        exposes: [
            e.temperature().withAccess(ea.STATE_GET).withEndpoint('l2'),
            e.humidity().withEndpoint('l2'),
            e
                .climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 15, 35, 0.5)
                .withSystemMode(['off', 'heat'])
                .withRunningMode(['off', 'heat'])
                .withLocalTemperatureCalibration(-3.0, 3.0, 0.1)
                .withEndpoint('l3'),
            e
                .numeric('min_setpoint_deadband', ea.ALL)
                .withUnit('C')
                .withValueMax(3)
                .withValueMin(0)
                .withValueStep(0.1)
                .withDescription('Hysteresis setting')
                .withEndpoint('l3'),
            e.enum('sensor_type', ea.ALL, sensorTypes).withDescription('Type of sensor. Sensor resistance value (kOhm)').withEndpoint('l3'),
            e
                .binary('target_temp_first', ea.ALL, true, false)
                .withDescription('Display current temperature or target temperature')
                .withEndpoint('l3'),
            e
                .climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 15, 35, 0.5)
                .withSystemMode(['off', 'heat'])
                .withRunningMode(['off', 'heat'])
                .withLocalTemperatureCalibration(-3.0, 3.0, 0.1)
                .withEndpoint('l4'),
            e
                .numeric('min_setpoint_deadband', ea.ALL)
                .withUnit('C')
                .withValueMax(3)
                .withValueMin(0)
                .withValueStep(0.1)
                .withDescription('Hysteresis setting')
                .withEndpoint('l4'),
            e.enum('sensor_type', ea.ALL, sensorTypes).withDescription('Type of sensor. Sensor resistance value (kOhm)').withEndpoint('l4'),
            e
                .binary('target_temp_first', ea.ALL, true, false)
                .withDescription('Display current temperature or target temperature')
                .withEndpoint('l4'),
            e.enum('keypad_lockout', ea.ALL, ['unlock', 'lock1']).withDescription('Enables/disables physical input on the device').withEndpoint('l1'),
            e
                .numeric('brightness', ea.ALL)
                .withUnit('%')
                .withValueMax(100)
                .withValueMin(0)
                .withValueStep(1)
                .withDescription('Display brightness')
                .withEndpoint('l1'),
            e
                .numeric('brightness_standby', ea.ALL)
                .withUnit('%')
                .withValueMax(100)
                .withValueMin(0)
                .withValueStep(1)
                .withDescription('Display brightness in standby mode')
                .withEndpoint('l1'),
        ],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint2, coordinatorEndpoint, ['msTemperatureMeasurement', 'msRelativeHumidity']);
            await endpoint2.read('msRelativeHumidity', ['measuredValue']);
            await endpoint2.read('msTemperatureMeasurement', ['measuredValue']);
            const endpoint3 = device.getEndpoint(3);
            await reporting.bind(endpoint3, coordinatorEndpoint, ['hvacThermostat']);
            await reporting.thermostatTemperature(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'localTemp', minimumReportInterval: 60, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'occupiedHeatingSetpoint', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatSystemMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'systemMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await reporting.thermostatRunningMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'runningMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await endpoint3.read('hvacThermostat', ['localTemp', 'occupiedHeatingSetpoint', 'systemMode', 'runningMode']);
            await endpoint3.read('hvacThermostat', [30464, 30465], manufacturerOptions);
            const endpoint4 = device.getEndpoint(4);
            await reporting.bind(endpoint3, coordinatorEndpoint, ['hvacThermostat']);
            await reporting.thermostatTemperature(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'localTemp', minimumReportInterval: 60, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'occupiedHeatingSetpoint', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatSystemMode(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'systemMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await reporting.thermostatRunningMode(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'runningMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await endpoint4.read('hvacThermostat', ['localTemp', 'occupiedHeatingSetpoint', 'systemMode', 'runningMode']);
            await endpoint4.read('hvacThermostat', [30464, 30465], manufacturerOptions);
            const endpoint1 = device.getEndpoint(1);
            await endpoint1.read('hvacUserInterfaceCfg', ['keypadLockout']);
            await endpoint1.read('hvacUserInterfaceCfg', [30464, 30465], manufacturerOptions);
        },
    },
    {
        zigbeeModel: ['L101Z-DBN'],
        model: 'L101Z-DBN',
        vendor: 'Lytko',
        description: 'Dual channel zigbee thermostat',
        ota: ota.zigbeeOTA,
        fromZigbee: [fromZigbee_1.default.thermostat, fzLocal.thermostat, fzLocal.thermostat_ui],
        toZigbee: [
            toZigbee_1.default.thermostat_keypad_lockout,
            toZigbee_1.default.temperature,
            toZigbee_1.default.thermostat_local_temperature,
            toZigbee_1.default.thermostat_system_mode,
            toZigbee_1.default.thermostat_running_mode,
            toZigbee_1.default.thermostat_occupied_heating_setpoint,
            toZigbee_1.default.thermostat_local_temperature_calibration,
            tzLocal.thermostat,
            tzLocal.thermostat_ui,
        ],
        meta: { multiEndpoint: true },
        endpoint: (device) => {
            return { l4: 4, l3: 3, l1: 1 };
        },
        exposes: [
            e
                .climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 15, 35, 0.5)
                .withSystemMode(['off', 'heat'])
                .withRunningMode(['off', 'heat'])
                .withLocalTemperatureCalibration(-3.0, 3.0, 0.1)
                .withEndpoint('l3'),
            e
                .numeric('min_setpoint_deadband', ea.ALL)
                .withUnit('C')
                .withValueMax(3)
                .withValueMin(0)
                .withValueStep(0.1)
                .withDescription('Hysteresis setting')
                .withEndpoint('l3'),
            e.enum('sensor_type', ea.ALL, sensorTypes).withDescription('Type of sensor. Sensor resistance value (kOhm)').withEndpoint('l3'),
            e
                .binary('target_temp_first', ea.ALL, true, false)
                .withDescription('Display current temperature or target temperature')
                .withEndpoint('l3'),
            e
                .climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 15, 35, 0.5)
                .withSystemMode(['off', 'heat'])
                .withRunningMode(['off', 'heat'])
                .withLocalTemperatureCalibration(-3.0, 3.0, 0.1)
                .withEndpoint('l4'),
            e
                .numeric('min_setpoint_deadband', ea.ALL)
                .withUnit('C')
                .withValueMax(3)
                .withValueMin(0)
                .withValueStep(0.1)
                .withDescription('Hysteresis setting')
                .withEndpoint('l4'),
            e.enum('sensor_type', ea.ALL, sensorTypes).withDescription('Type of sensor. Sensor resistance value (kOhm)').withEndpoint('l4'),
            e
                .binary('target_temp_first', ea.ALL, true, false)
                .withDescription('Display current temperature or target temperature')
                .withEndpoint('l4'),
            e.enum('keypad_lockout', ea.ALL, ['unlock', 'lock1']).withDescription('Enables/disables physical input on the device').withEndpoint('l1'),
            e
                .numeric('brightness', ea.ALL)
                .withUnit('%')
                .withValueMax(100)
                .withValueMin(0)
                .withValueStep(1)
                .withDescription('Display brightness')
                .withEndpoint('l1'),
            e
                .numeric('brightness_standby', ea.ALL)
                .withUnit('%')
                .withValueMax(100)
                .withValueMin(0)
                .withValueStep(1)
                .withDescription('Display brightness in standby mode')
                .withEndpoint('l1'),
        ],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint3 = device.getEndpoint(3);
            await reporting.bind(endpoint3, coordinatorEndpoint, ['hvacThermostat']);
            await reporting.thermostatTemperature(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'localTemp', minimumReportInterval: 60, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'occupiedHeatingSetpoint', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatSystemMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'systemMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await reporting.thermostatRunningMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'runningMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await endpoint3.read('hvacThermostat', ['localTemp', 'occupiedHeatingSetpoint', 'systemMode', 'runningMode']);
            await endpoint3.read('hvacThermostat', [30464, 30465], manufacturerOptions);
            const endpoint4 = device.getEndpoint(4);
            await reporting.bind(endpoint3, coordinatorEndpoint, ['hvacThermostat']);
            await reporting.thermostatTemperature(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'localTemp', minimumReportInterval: 60, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'occupiedHeatingSetpoint', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatSystemMode(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'systemMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await reporting.thermostatRunningMode(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'runningMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await endpoint4.read('hvacThermostat', ['localTemp', 'occupiedHeatingSetpoint', 'systemMode', 'runningMode']);
            await endpoint4.read('hvacThermostat', [30464, 30465], manufacturerOptions);
            const endpoint1 = device.getEndpoint(1);
            await endpoint1.read('hvacUserInterfaceCfg', ['keypadLockout']);
            await endpoint1.read('hvacUserInterfaceCfg', [30464, 30465], manufacturerOptions);
        },
    },
    {
        zigbeeModel: ['L101Z-DLN'],
        model: 'L101Z-DLN',
        vendor: 'Lytko',
        description: 'Dual channel Zigbee thermostat without screen',
        ota: ota.zigbeeOTA,
        fromZigbee: [fromZigbee_1.default.thermostat, fzLocal.thermostat],
        toZigbee: [
            toZigbee_1.default.thermostat_local_temperature,
            toZigbee_1.default.thermostat_system_mode,
            toZigbee_1.default.thermostat_running_mode,
            toZigbee_1.default.thermostat_occupied_heating_setpoint,
            toZigbee_1.default.thermostat_local_temperature_calibration,
            tzLocal.thermostat,
        ],
        meta: { multiEndpoint: true },
        endpoint: (device) => {
            return { l4: 4, l3: 3, l1: 1 };
        },
        exposes: [
            e
                .climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 15, 35, 0.5)
                .withSystemMode(['off', 'heat'])
                .withRunningMode(['off', 'heat'])
                .withLocalTemperatureCalibration(-3.0, 3.0, 0.1)
                .withEndpoint('l3'),
            e
                .numeric('min_setpoint_deadband', ea.ALL)
                .withUnit('C')
                .withValueMax(3)
                .withValueMin(0)
                .withValueStep(0.1)
                .withDescription('Hysteresis setting')
                .withEndpoint('l3'),
            e.enum('sensor_type', ea.ALL, sensorTypes).withDescription('Type of sensor. Sensor resistance value (kOhm)').withEndpoint('l3'),
            e
                .binary('target_temp_first', ea.ALL, true, false)
                .withDescription('Display current temperature or target temperature')
                .withEndpoint('l3'),
            e
                .climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 15, 35, 0.5)
                .withSystemMode(['off', 'heat'])
                .withRunningMode(['off', 'heat'])
                .withLocalTemperatureCalibration(-3.0, 3.0, 0.1)
                .withEndpoint('l4'),
            e
                .numeric('min_setpoint_deadband', ea.ALL)
                .withUnit('C')
                .withValueMax(3)
                .withValueMin(0)
                .withValueStep(0.1)
                .withDescription('Hysteresis setting')
                .withEndpoint('l4'),
            e.enum('sensor_type', ea.ALL, sensorTypes).withDescription('Type of sensor. Sensor resistance value (kOhm)').withEndpoint('l4'),
            e
                .binary('target_temp_first', ea.ALL, true, false)
                .withDescription('Display current temperature or target temperature')
                .withEndpoint('l4'),
        ],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint3 = device.getEndpoint(3);
            await reporting.bind(endpoint3, coordinatorEndpoint, ['hvacThermostat']);
            await reporting.thermostatTemperature(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'localTemp', minimumReportInterval: 60, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'occupiedHeatingSetpoint', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatSystemMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'systemMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await reporting.thermostatRunningMode(endpoint3);
            await endpoint3.configureReporting('hvacThermostat', [
                { attribute: 'runningMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await endpoint3.read('hvacThermostat', ['localTemp', 'occupiedHeatingSetpoint', 'systemMode', 'runningMode']);
            await endpoint3.read('hvacThermostat', [30464, 30465], manufacturerOptions);
            const endpoint4 = device.getEndpoint(4);
            await reporting.bind(endpoint4, coordinatorEndpoint, ['hvacThermostat']);
            await reporting.thermostatTemperature(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'localTemp', minimumReportInterval: 60, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'occupiedHeatingSetpoint', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 50 },
            ]);
            await reporting.thermostatSystemMode(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'systemMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await reporting.thermostatRunningMode(endpoint4);
            await endpoint4.configureReporting('hvacThermostat', [
                { attribute: 'runningMode', minimumReportInterval: 1, maximumReportInterval: 120, reportableChange: 1 },
            ]);
            await endpoint4.read('hvacThermostat', ['localTemp', 'occupiedHeatingSetpoint', 'systemMode', 'runningMode']);
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=lytko.js.map