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
const toZigbee_1 = __importDefault(require("../converters/toZigbee"));
const constants = __importStar(require("../lib/constants"));
const exposes = __importStar(require("../lib/exposes"));
const legacy = __importStar(require("../lib/legacy"));
const modernExtend_1 = require("../lib/modernExtend");
const reporting = __importStar(require("../lib/reporting"));
const tuya = __importStar(require("../lib/tuya"));
const e = exposes.presets;
const ea = exposes.access;
const definitions = [
    {
        zigbeeModel: ['PIRILLSensor-EF-3.0'],
        model: 'HS1MIS-3.0',
        vendor: 'HEIMAN',
        description: 'Smart occupancy sensor',
        fromZigbee: [fromZigbee_1.default.occupancy, fromZigbee_1.default.battery, fromZigbee_1.default.illuminance],
        toZigbee: [],
        exposes: [e.occupancy(), e.battery(), e.illuminance()],
        configure: async (device, cordinatorEndpoint) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, cordinatorEndpoint, ['msOccupancySensing', 'genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint1);
            await reporting.occupancy(endpoint1);
            await reporting.bind(endpoint1, cordinatorEndpoint, ['msIlluminanceMeasurement']);
            await reporting.illuminance(endpoint1);
        },
    },
    {
        fingerprint: [{ modelID: 'TS0212', manufacturerName: '_TYZB01_wpmo3ja3' }],
        zigbeeModel: ['CO_V15', 'CO_YDLV10', 'CO_V16', '1ccaa94c49a84abaa9e38687913947ba', 'CO_CTPG'],
        model: 'HS1CA-M',
        description: 'Smart carbon monoxide sensor',
        vendor: 'HEIMAN',
        fromZigbee: [fromZigbee_1.default.ias_carbon_monoxide_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.batteryAlarmState(endpoint);
        },
        exposes: [e.carbon_monoxide(), e.battery_low(), e.battery()],
    },
    {
        zigbeeModel: ['PIRSensor-N', 'PIRSensor-EM', 'PIRSensor-EF-3.0', 'PIR_TPV13'],
        model: 'HS3MS',
        vendor: 'HEIMAN',
        description: 'Smart motion sensor',
        fromZigbee: [fromZigbee_1.default.ias_occupancy_alarm_1],
        toZigbee: [],
        exposes: [e.occupancy(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['SmartPlug', 'SmartPlug-EF-3.0'],
        model: 'HS2SK',
        description: 'Smart metering plug',
        vendor: 'HEIMAN',
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.electrical_measurement, fromZigbee_1.default.metering],
        toZigbee: [toZigbee_1.default.on_off],
        whiteLabel: [{ vendor: 'Schneider Electric', model: 'CCTFR6500' }],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement', 'seMetering']);
            await reporting.onOff(endpoint);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint);
            await reporting.rmsVoltage(endpoint);
            await reporting.rmsCurrent(endpoint);
            await reporting.activePower(endpoint);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint);
        },
        exposes: [e.switch(), e.power(), e.current(), e.voltage(), e.energy()],
    },
    {
        fingerprint: [{ modelID: 'SmartPlug-N', manufacturerName: 'HEIMAN' }],
        model: 'HS2SK_nxp',
        description: 'Smart metering plug',
        vendor: 'HEIMAN',
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.electrical_measurement],
        toZigbee: [toZigbee_1.default.on_off],
        options: [exposes.options.measurement_poll_interval()],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement']);
            await reporting.onOff(endpoint);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint);
        },
        onEvent: (type, data, device, settings) => tuya.onEventMeasurementPoll(type, data, device, settings),
        exposes: [e.switch(), e.power(), e.current(), e.voltage()],
    },
    {
        zigbeeModel: [
            'SMOK_V16',
            'SMOK_V15',
            'b5db59bfd81e4f1f95dc57fdbba17931',
            '98293058552c49f38ad0748541ee96ba',
            'SMOK_YDLV10',
            'FB56-SMF02HM1.4',
            'SmokeSensor-N-3.0',
            '319fa36e7384414a9ea62cba8f6e7626',
            'c3442b4ac59b4ba1a83119d938f283ab',
            'SmokeSensor-EF-3.0',
            'SMOK_HV14',
        ],
        model: 'HS1SA',
        vendor: 'HEIMAN',
        description: 'Smoke detector',
        fromZigbee: [fromZigbee_1.default.ias_smoke_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.smoke(), e.battery_low(), e.battery(), e.test()],
    },
    {
        zigbeeModel: ['SmokeSensor-N', 'SmokeSensor-EM'],
        model: 'HS3SA/HS1SA',
        vendor: 'HEIMAN',
        description: 'Smoke detector',
        fromZigbee: [fromZigbee_1.default.ias_smoke_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.smoke(), e.battery_low(), e.battery(), e.test()],
    },
    {
        zigbeeModel: ['GASSensor-N', 'GASSensor-N-3.0', 'd90d7c61c44d468a8e906ca0841e0a0c'],
        model: 'HS3CG',
        vendor: 'HEIMAN',
        description: 'Combustible gas sensor',
        fromZigbee: [fromZigbee_1.default.ias_gas_alarm_2],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['GASSensor-EN'],
        model: 'HS1CG-M',
        vendor: 'HEIMAN',
        description: 'Combustible gas sensor',
        fromZigbee: [fromZigbee_1.default.ias_gas_alarm_1],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['RH3070'],
        model: 'HS1CG',
        vendor: 'HEIMAN',
        description: 'Smart combustible gas sensor',
        fromZigbee: [fromZigbee_1.default.ias_gas_alarm_1],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['GAS_V15'],
        model: 'HS1CG_M',
        vendor: 'HEIMAN',
        description: 'Combustible gas sensor',
        fromZigbee: [fromZigbee_1.default.ias_gas_alarm_2],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['DoorSensor-N', 'DoorSensor-N-3.0'],
        model: 'HS3DS',
        vendor: 'HEIMAN',
        description: 'Door sensor',
        fromZigbee: [fromZigbee_1.default.ias_contact_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        },
        exposes: [e.contact(), e.battery(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['DoorSensor-EM', 'DoorSensor-EF-3.0'],
        model: 'HS1DS',
        vendor: 'HEIMAN',
        description: 'Door sensor',
        fromZigbee: [fromZigbee_1.default.ias_contact_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        },
        exposes: [e.contact(), e.battery_low(), e.tamper(), e.battery()],
    },
    {
        zigbeeModel: ['DOOR_TPV13', 'DOOR_TPV12'],
        model: 'HEIMAN-M1',
        vendor: 'HEIMAN',
        description: 'Door sensor',
        fromZigbee: [fromZigbee_1.default.ias_contact_alarm_1],
        toZigbee: [],
        exposes: [e.contact(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['WaterSensor-N', 'WaterSensor-EM', 'WaterSensor-N-3.0', 'WaterSensor-EF-3.0', 'WaterSensor2-EF-3.0', 'WATER_TPV13'],
        model: 'HS1WL/HS3WL',
        vendor: 'HEIMAN',
        description: 'Water leakage sensor',
        fromZigbee: [fromZigbee_1.default.ias_water_leak_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        },
        exposes: [e.water_leak(), e.battery_low(), e.tamper(), e.battery()],
    },
    {
        fingerprint: [{ modelID: 'RC-N', manufacturerName: 'HEIMAN' }],
        model: 'HS1RC-N',
        vendor: 'HEIMAN',
        description: 'Smart remote controller',
        fromZigbee: [fromZigbee_1.default.battery, legacy.fz.heiman_smart_controller_armmode, fromZigbee_1.default.command_emergency],
        toZigbee: [],
        exposes: [e.battery(), e.action(['emergency', 'disarm', 'arm_partial_zones', 'arm_all_zones'])],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        },
    },
    {
        fingerprint: [{ modelID: 'RC-EF-3.0', manufacturerName: 'HEIMAN' }],
        model: 'HM1RC-2-E',
        vendor: 'HEIMAN',
        description: 'Smart remote controller',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.command_arm, fromZigbee_1.default.command_emergency],
        toZigbee: [],
        exposes: [e.battery(), e.action(['emergency', 'disarm', 'arm_day_zones', 'arm_all_zones'])],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        },
        onEvent: async (type, data, device) => {
            // Since arm command has a response zigbee-herdsman doesn't send a default response.
            // This causes the remote to repeat the arm command, so send a default response here.
            if (data.type === 'commandArm' && data.cluster === 'ssIasAce') {
                await data.endpoint.defaultResponse(0, 0, 1281, data.meta.zclTransactionSequenceNumber);
            }
        },
    },
    {
        fingerprint: [{ modelID: 'RC-EM', manufacturerName: 'HEIMAN' }],
        model: 'HS1RC-EM',
        vendor: 'HEIMAN',
        description: 'Smart remote controller',
        fromZigbee: [fromZigbee_1.default.battery, legacy.fz.heiman_smart_controller_armmode, fromZigbee_1.default.command_emergency],
        toZigbee: [],
        exposes: [e.battery(), e.action(['emergency', 'disarm', 'arm_partial_zones', 'arm_all_zones'])],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        },
    },
    {
        zigbeeModel: ['COSensor-EM', 'COSensor-N', 'COSensor-EF-3.0'],
        model: 'HS1CA-E',
        vendor: 'HEIMAN',
        description: 'Smart carbon monoxide sensor',
        fromZigbee: [fromZigbee_1.default.ias_carbon_monoxide_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.carbon_monoxide(), e.battery_low(), e.battery()],
    },
    {
        fingerprint: [
            { modelID: 'TS0216', manufacturerName: '_TYZB01_8scntis1' },
            { modelID: 'TS0216', manufacturerName: '_TYZB01_4obovpbi' },
        ],
        zigbeeModel: ['WarningDevice', 'WarningDevice-EF-3.0'],
        model: 'HS2WD-E',
        vendor: 'HEIMAN',
        description: 'Smart siren',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.ignore_basic_report],
        toZigbee: [toZigbee_1.default.warning],
        meta: { disableDefaultResponse: true },
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.battery(), e.warning()],
    },
    {
        zigbeeModel: ['HT-EM', 'TH-EM', 'TH-T_V14'],
        model: 'HS1HT',
        vendor: 'HEIMAN',
        description: 'Smart temperature & humidity Sensor',
        exposes: [e.battery(), e.temperature(), e.humidity()],
        fromZigbee: [fromZigbee_1.default.temperature, fromZigbee_1.default.humidity, fromZigbee_1.default.battery],
        toZigbee: [],
        meta: { battery: { voltageToPercentage: { min: 2500, max: 3000 } } },
        whiteLabel: [{ vendor: 'Ferguson', model: 'TH-T_V14' }],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, coordinatorEndpoint, ['msTemperatureMeasurement']);
            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint2, coordinatorEndpoint, ['msRelativeHumidity', 'genPowerCfg']);
            await reporting.temperature(endpoint1);
            await reporting.humidity(endpoint2);
            await reporting.batteryVoltage(endpoint2);
            await reporting.batteryPercentageRemaining(endpoint2);
        },
    },
    {
        zigbeeModel: ['HT-N', 'HT-EF-3.0'],
        model: 'HS1HT-N',
        vendor: 'HEIMAN',
        description: 'Smart temperature & humidity Sensor',
        fromZigbee: [fromZigbee_1.default.temperature, fromZigbee_1.default.humidity, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, coordinatorEndpoint, ['msTemperatureMeasurement', 'genPowerCfg']);
            await reporting.temperature(endpoint1);
            await reporting.batteryPercentageRemaining(endpoint1);
            await endpoint1.read('genPowerCfg', ['batteryPercentageRemaining']);
            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint2, coordinatorEndpoint, ['msRelativeHumidity']);
            await reporting.humidity(endpoint2);
        },
        exposes: [e.temperature(), e.humidity(), e.battery()],
    },
    {
        zigbeeModel: ['E_Socket'],
        model: 'HS2ESK-E',
        vendor: 'HEIMAN',
        description: 'Smart in wall plug',
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.electrical_measurement],
        toZigbee: [toZigbee_1.default.on_off],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement']);
            await reporting.onOff(endpoint);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint);
            await reporting.rmsVoltage(endpoint);
            await reporting.rmsCurrent(endpoint);
            await reporting.activePower(endpoint);
        },
        exposes: [e.switch(), e.power(), e.current(), e.voltage()],
    },
    {
        fingerprint: [
            { modelID: 'SOS-EM', manufacturerName: 'HEIMAN' },
            { modelID: 'SOS-EF-3.0', manufacturerName: 'HEIMAN' },
        ],
        model: 'HS1EB/HS1EB-E',
        vendor: 'HEIMAN',
        description: 'Smart emergency button',
        fromZigbee: [fromZigbee_1.default.command_status_change_notification_action, legacy.fz.st_button_state, fromZigbee_1.default.battery],
        toZigbee: [],
        exposes: [e.battery(), e.action(['off', 'single', 'double', 'hold'])],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        },
    },
    {
        fingerprint: [{ modelID: 'SceneSwitch-EM-3.0', manufacturerName: 'HEIMAN' }],
        model: 'HS2SS',
        vendor: 'HEIMAN',
        description: 'Smart scene switch',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.heiman_scenes],
        exposes: [e.battery(), e.action(['cinema', 'at_home', 'sleep', 'go_out', 'repast'])],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'heimanSpecificScenes']);
            await reporting.batteryPercentageRemaining(endpoint);
        },
    },
    {
        zigbeeModel: ['TempDimmerSw-EM-3.0'],
        model: 'HS2WDSC-E',
        vendor: 'HEIMAN',
        description: 'Remote dimmer and temperature control',
        fromZigbee: [
            fromZigbee_1.default.battery,
            fromZigbee_1.default.command_on,
            fromZigbee_1.default.command_off,
            fromZigbee_1.default.command_move,
            fromZigbee_1.default.command_stop,
            fromZigbee_1.default.command_move_to_color,
            fromZigbee_1.default.command_move_to_color_temp,
        ],
        exposes: [e.battery(), e.action(['on', 'off', 'move', 'stop', 'color_move', 'color_temperature_move'])],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'genOnOff', 'genLevelCtrl', 'lightingColorCtrl']);
            await reporting.batteryPercentageRemaining(endpoint, { min: constants.repInterval.MINUTES_5, max: constants.repInterval.HOUR });
        },
    },
    {
        fingerprint: [{ modelID: 'ColorDimmerSw-EM-3.0', manufacturerName: 'HEIMAN' }],
        model: 'HS2WDSR-E',
        vendor: 'HEIMAN',
        description: 'Remote dimmer and color control',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.command_on, fromZigbee_1.default.command_off, fromZigbee_1.default.command_move, fromZigbee_1.default.command_stop, fromZigbee_1.default.command_move_to_color],
        exposes: [e.battery(), e.action(['on', 'off', 'move', 'stop', 'color_move'])],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'genOnOff', 'genLevelCtrl', 'lightingColorCtrl']);
            await reporting.batteryPercentageRemaining(endpoint, { min: constants.repInterval.MINUTES_5, max: constants.repInterval.HOUR });
        },
    },
    {
        zigbeeModel: ['HS3HT-EFA-3.0'],
        model: 'HS3HT',
        vendor: 'HEIMAN',
        description: 'Temperature & humidity sensor with display',
        fromZigbee: [fromZigbee_1.default.temperature, fromZigbee_1.default.humidity, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, coordinatorEndpoint, ['msTemperatureMeasurement', 'genPowerCfg']);
            await reporting.temperature(endpoint1);
            await reporting.batteryPercentageRemaining(endpoint1);
            await endpoint1.read('genPowerCfg', ['batteryPercentageRemaining']);
            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint2, coordinatorEndpoint, ['msRelativeHumidity']);
            await reporting.humidity(endpoint2);
        },
        exposes: [e.battery(), e.temperature(), e.humidity()],
    },
    {
        zigbeeModel: ['GASSensor-EM', '358e4e3e03c644709905034dae81433e'],
        model: 'HS1CG-E',
        vendor: 'HEIMAN',
        description: 'Combustible gas sensor',
        fromZigbee: [fromZigbee_1.default.ias_gas_alarm_1],
        toZigbee: [],
        whiteLabel: [{ vendor: 'Piri', model: 'HSIO18008' }],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['GASSensor-EFR-3.0', 'GASSensor-EF-3.0'],
        model: 'HS1CG-E_3.0',
        vendor: 'HEIMAN',
        description: 'Combustible gas sensor',
        fromZigbee: [fromZigbee_1.default.ias_gas_alarm_2],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        fingerprint: [{ modelID: 'Vibration-N', manufacturerName: 'HEIMAN' }],
        model: 'HS1VS-N',
        vendor: 'HEIMAN',
        description: 'Vibration sensor',
        fromZigbee: [fromZigbee_1.default.ias_vibration_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        },
        exposes: [e.vibration(), e.battery_low(), e.tamper(), e.battery()],
    },
    {
        fingerprint: [
            { modelID: 'Vibration-EF_3.0', manufacturerName: 'HEIMAN' },
            { modelID: 'Vibration-EF-3.0', manufacturerName: 'HEIMAN' },
        ],
        model: 'HS1VS-EF',
        vendor: 'HEIMAN',
        description: 'Vibration sensor',
        fromZigbee: [fromZigbee_1.default.ias_vibration_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
        },
        exposes: [e.vibration(), e.battery_low(), e.tamper(), e.battery()],
    },
    {
        fingerprint: [{ modelID: 'HS2AQ-EM', manufacturerName: 'HEIMAN' }],
        model: 'HS2AQ-EM',
        vendor: 'HEIMAN',
        description: 'Air quality monitor',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.temperature, fromZigbee_1.default.humidity, fromZigbee_1.default.pm25, fromZigbee_1.default.heiman_hcho, fromZigbee_1.default.heiman_air_quality],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const heiman = {
                configureReporting: {
                    pm25MeasuredValue: async (endpoint, overrides) => {
                        const payload = reporting.payload('measuredValue', 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting('pm25Measurement', payload);
                    },
                    formAldehydeMeasuredValue: async (endpoint, overrides) => {
                        const payload = reporting.payload('measuredValue', 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting('msFormaldehyde', payload);
                    },
                    batteryState: async (endpoint, overrides) => {
                        const payload = reporting.payload('batteryState', 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting('heimanSpecificAirQuality', payload);
                    },
                    pm10measuredValue: async (endpoint, overrides) => {
                        const payload = reporting.payload('pm10measuredValue', 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting('heimanSpecificAirQuality', payload);
                    },
                    tvocMeasuredValue: async (endpoint, overrides) => {
                        const payload = reporting.payload('tvocMeasuredValue', 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting('heimanSpecificAirQuality', payload);
                    },
                    aqiMeasuredValue: async (endpoint, overrides) => {
                        const payload = reporting.payload('aqiMeasuredValue', 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting('heimanSpecificAirQuality', payload);
                    },
                },
            };
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, [
                'genPowerCfg',
                'genTime',
                'msTemperatureMeasurement',
                'msRelativeHumidity',
                'pm25Measurement',
                'msFormaldehyde',
                'heimanSpecificAirQuality',
            ]);
            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.temperature(endpoint);
            await reporting.humidity(endpoint);
            await heiman.configureReporting.pm25MeasuredValue(endpoint);
            await heiman.configureReporting.formAldehydeMeasuredValue(endpoint);
            await heiman.configureReporting.batteryState(endpoint);
            await heiman.configureReporting.pm10measuredValue(endpoint);
            await heiman.configureReporting.tvocMeasuredValue(endpoint);
            await heiman.configureReporting.aqiMeasuredValue(endpoint);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
            // Seems that it is bug in HEIMAN, device does not asks for the time with binding
            // So, we need to write time during configure
            const time = Math.round((new Date().getTime() - constants.OneJanuary2000) / 1000);
            // Time-master + synchronised
            const values = { timeStatus: 3, time: time, timeZone: new Date().getTimezoneOffset() * -1 * 60 };
            await endpoint.write('genTime', values);
        },
        exposes: [
            e.battery(),
            e.temperature(),
            e.humidity(),
            e.pm25(),
            e.hcho(),
            e.voc(),
            e.aqi(),
            e.pm10(),
            e.enum('battery_state', ea.STATE, ['not_charging', 'charging', 'charged']),
        ],
    },
    {
        fingerprint: [{ modelID: 'IRControl-EM', manufacturerName: 'HEIMAN' }],
        model: 'HS2IRC',
        vendor: 'HEIMAN',
        description: 'Smart IR Control',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.heiman_ir_remote],
        toZigbee: [toZigbee_1.default.heiman_ir_remote],
        exposes: [e.battery()],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'heimanSpecificInfraRedRemote']);
            await reporting.batteryPercentageRemaining(endpoint);
        },
    },
    {
        zigbeeModel: ['HS2SW1L-EF-3.0', 'HS2SW1L-EFR-3.0', 'HS2SW1A-N'],
        fingerprint: [
            { modelID: 'HS2SW1A-EF-3.0', manufacturerName: 'HEIMAN' },
            { modelID: 'HS2SW1A-EFR-3.0', manufacturerName: 'HEIMAN' },
        ],
        model: 'HS2SW1A/HS2SW1A-N',
        vendor: 'HEIMAN',
        description: 'Smart switch - 1 gang with neutral wire',
        fromZigbee: [fromZigbee_1.default.ignore_basic_report, fromZigbee_1.default.on_off, fromZigbee_1.default.device_temperature],
        toZigbee: [toZigbee_1.default.on_off],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genDeviceTempCfg']);
            await reporting.onOff(endpoint);
            await reporting.deviceTemperature(endpoint);
        },
        exposes: [e.switch(), e.device_temperature()],
    },
    {
        zigbeeModel: ['HS2SW2L-EF-3.0', 'HS2SW2L-EFR-3.0', 'HS2SW2A-N'],
        fingerprint: [
            { modelID: 'HS2SW2A-EF-3.0', manufacturerName: 'HEIMAN' },
            { modelID: 'HS2SW2A-EFR-3.0', manufacturerName: 'HEIMAN' },
        ],
        model: 'HS2SW2A/HS2SW2A-N',
        vendor: 'HEIMAN',
        description: 'Smart switch - 2 gang with neutral wire',
        fromZigbee: [fromZigbee_1.default.ignore_basic_report, fromZigbee_1.default.on_off, fromZigbee_1.default.device_temperature],
        toZigbee: [toZigbee_1.default.on_off],
        endpoint: (device) => {
            return { left: 1, right: 2 };
        },
        meta: { multiEndpoint: true },
        configure: async (device, coordinatorEndpoint) => {
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff', 'genDeviceTempCfg']);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
            await reporting.deviceTemperature(device.getEndpoint(1));
        },
        exposes: [e.switch().withEndpoint('left'), e.switch().withEndpoint('right'), e.device_temperature()],
    },
    {
        zigbeeModel: ['HS2SW3L-EF-3.0', 'HS2SW3L-EFR-3.0', 'HS2SW3A-N'],
        fingerprint: [
            { modelID: 'HS2SW3A-EF-3.0', manufacturerName: 'HEIMAN' },
            { modelID: 'HS2SW3A-EFR-3.0', manufacturerName: 'HEIMAN' },
        ],
        model: 'HS2SW3A/HS2SW3A-N',
        vendor: 'HEIMAN',
        description: 'Smart switch - 3 gang with neutral wire',
        fromZigbee: [fromZigbee_1.default.ignore_basic_report, fromZigbee_1.default.on_off, fromZigbee_1.default.device_temperature],
        toZigbee: [toZigbee_1.default.on_off],
        endpoint: (device) => {
            return { left: 1, center: 2, right: 3 };
        },
        meta: { multiEndpoint: true },
        configure: async (device, coordinatorEndpoint) => {
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff', 'genDeviceTempCfg']);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, ['genOnOff']);
            await reporting.deviceTemperature(device.getEndpoint(1));
        },
        exposes: [e.switch().withEndpoint('left'), e.switch().withEndpoint('center'), e.switch().withEndpoint('right'), e.device_temperature()],
    },
    {
        zigbeeModel: ['TemperLight'],
        model: 'HS2WDS',
        vendor: 'HEIMAN',
        description: 'LED 9W CCT E27',
        extend: [(0, modernExtend_1.light)({ colorTemp: { range: [153, 370] } })],
    },
    {
        zigbeeModel: ['CurtainMo-EF-3.0', 'CurtainMo-EF'],
        model: 'HS2CM-N-DC',
        vendor: 'HEIMAN',
        description: 'Gear window shade motor',
        fromZigbee: [fromZigbee_1.default.cover_position_via_brightness],
        toZigbee: [toZigbee_1.default.cover_via_brightness],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genLevelCtrl', 'genPowerCfg']);
            await reporting.brightness(endpoint);
        },
        exposes: [e.cover_position().setAccess('state', ea.ALL)],
    },
    {
        zigbeeModel: ['PIR_TPV16'],
        model: 'HS1MS-M',
        vendor: 'HEIMAN',
        description: 'Smart motion sensor',
        fromZigbee: [fromZigbee_1.default.ias_occupancy_alarm_1],
        toZigbee: [],
        exposes: [e.occupancy(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['TY0202'],
        model: 'HS1MS-EF',
        vendor: 'HEIMAN',
        description: 'Smart motion sensor',
        fromZigbee: [fromZigbee_1.default.ias_occupancy_alarm_1],
        toZigbee: [],
        exposes: [e.occupancy(), e.battery_low(), e.tamper()],
    },
    {
        fingerprint: [{ modelID: 'DoorBell-EM', manufacturerName: 'HEIMAN' }],
        model: 'HS2DB',
        vendor: 'HEIMAN',
        description: 'Smart doorbell button',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.heiman_doorbell_button, fromZigbee_1.default.ignore_basic_report],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.battery(), e.action(['pressed']), e.battery_low(), e.tamper()],
    },
    {
        fingerprint: [{ modelID: 'DoorBell-EF-3.0', manufacturerName: 'HEIMAN' }],
        model: 'HS2SS-E_V03',
        vendor: 'HEIMAN',
        description: 'Smart doorbell button',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.heiman_doorbell_button, fromZigbee_1.default.ignore_basic_report],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.battery(), e.action(['pressed']), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['HS3AQ-EFA-3.0'],
        model: 'HS3AQ',
        vendor: 'HEIMAN',
        description: 'Smart air quality monitor',
        fromZigbee: [fromZigbee_1.default.co2, fromZigbee_1.default.humidity, fromZigbee_1.default.battery, fromZigbee_1.default.temperature],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['msRelativeHumidity', 'genPowerCfg', 'msTemperatureMeasurement', 'msCO2']);
            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.temperature(endpoint, { min: 1, max: constants.repInterval.MINUTES_5, change: 10 }); // 0.1 degree change
            await reporting.humidity(endpoint, { min: 1, max: constants.repInterval.MINUTES_5, change: 10 }); // 0.1 % change
            await reporting.co2(endpoint, { min: 5, max: constants.repInterval.MINUTES_5, change: 0.00005 }); // 50 ppm change
        },
        exposes: [e.co2(), e.battery(), e.humidity(), e.temperature()],
    },
    {
        zigbeeModel: ['RouteLight-EF-3.0'],
        model: 'HS2RNL',
        vendor: 'HEIMAN',
        description: 'Smart repeater & night light',
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.battery],
        toZigbee: [toZigbee_1.default.on_off],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'genOnOff', 'genLevelCtrl']);
            await reporting.onOff(endpoint); // switch the night light on/off
            await reporting.batteryPercentageRemaining(endpoint); // internal backup battery in case of power outage
        },
        exposes: [e.switch(), e.battery()],
    },
    {
        zigbeeModel: ['PIR_TPV12'],
        model: 'PIR_TPV12',
        vendor: 'HEIMAN',
        description: 'Motion sensor',
        extend: [
            (0, modernExtend_1.battery)({ voltageToPercentage: { min: 2500, max: 3000 }, voltage: true }),
            (0, modernExtend_1.iasZoneAlarm)({ zoneType: 'occupancy', zoneAttributes: ['alarm_1', 'tamper', 'battery_low'] }),
        ],
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=heiman.js.map