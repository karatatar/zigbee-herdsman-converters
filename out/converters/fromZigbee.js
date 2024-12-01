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
Object.defineProperty(exports, "__esModule", { value: true });
const libColor = __importStar(require("../lib/color"));
const constants = __importStar(require("../lib/constants"));
const exposes = __importStar(require("../lib/exposes"));
const logger_1 = require("../lib/logger");
const globalStore = __importStar(require("../lib/store"));
const utils_1 = require("../lib/utils");
const utils = __importStar(require("../lib/utils"));
const NS = 'zhc:fz';
const defaultSimulatedBrightness = 255;
const e = exposes.presets;
const ea = exposes.access;
const converters1 = {
    // #region Generic/recommended converters
    fan: {
        cluster: 'hvacFanCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.fanMode !== undefined) {
                const key = (0, utils_1.getKey)(constants.fanMode, msg.data.fanMode);
                return { fan_mode: key, fan_state: key === 'off' ? 'OFF' : 'ON' };
            }
        },
    },
    thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const dontMapPIHeatingDemand = model.meta && model.meta.thermostat && model.meta.thermostat.dontMapPIHeatingDemand;
            if (msg.data.localTemp !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['localTemp'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('local_temperature', msg, model, meta)] = value;
                }
            }
            if (msg.data.localTemperatureCalibration !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('local_temperature_calibration', msg, model, meta)] =
                    (0, utils_1.precisionRound)(msg.data['localTemperatureCalibration'], 2) / 10;
            }
            if (msg.data.outdoorTemp !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['outdoorTemp'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('outdoor_temperature', msg, model, meta)] = value;
                }
            }
            if (msg.data.occupancy !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('occupancy', msg, model, meta)] = msg.data.occupancy % 2 > 0;
            }
            if (msg.data.occupiedHeatingSetpoint !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['occupiedHeatingSetpoint'], 2) / 100;
                // Stelpro will return -325.65 when set to off, value is not realistic anyway
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('occupied_heating_setpoint', msg, model, meta)] = value;
                }
            }
            if (msg.data.unoccupiedHeatingSetpoint !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('unoccupied_heating_setpoint', msg, model, meta)] =
                    (0, utils_1.precisionRound)(msg.data['unoccupiedHeatingSetpoint'], 2) / 100;
            }
            if (msg.data.occupiedCoolingSetpoint !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('occupied_cooling_setpoint', msg, model, meta)] =
                    (0, utils_1.precisionRound)(msg.data['occupiedCoolingSetpoint'], 2) / 100;
            }
            if (msg.data.unoccupiedCoolingSetpoint !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('unoccupied_cooling_setpoint', msg, model, meta)] =
                    (0, utils_1.precisionRound)(msg.data['unoccupiedCoolingSetpoint'], 2) / 100;
            }
            if (msg.data.setpointChangeAmount !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('setpoint_change_amount', msg, model, meta)] = msg.data['setpointChangeAmount'] / 100;
            }
            if (msg.data.setpointChangeSource !== undefined) {
                const lookup = { 0: 'manual', 1: 'schedule', 2: 'externally' };
                result[(0, utils_1.postfixWithEndpointName)('setpoint_change_source', msg, model, meta)] = lookup[msg.data['setpointChangeSource']];
            }
            if (msg.data.setpointChangeSourceTimeStamp !== undefined) {
                const date = new Date(2000, 0, 1);
                date.setSeconds(msg.data['setpointChangeSourceTimeStamp']);
                const value = (0, utils_1.toLocalISOString)(date);
                result[(0, utils_1.postfixWithEndpointName)('setpoint_change_source_timestamp', msg, model, meta)] = value;
            }
            if (msg.data.remoteSensing !== undefined) {
                const value = msg.data['remoteSensing'];
                result[(0, utils_1.postfixWithEndpointName)('remote_sensing', msg, model, meta)] = {
                    local_temperature: (value & 1) > 0 ? 'remotely' : 'internally',
                    outdoor_temperature: (value & (1 << 1)) > 0 ? 'remotely' : 'internally',
                    occupancy: (value & (1 << 2)) > 0 ? 'remotely' : 'internally',
                };
            }
            if (msg.data.ctrlSeqeOfOper !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('control_sequence_of_operation', msg, model, meta)] =
                    constants.thermostatControlSequenceOfOperations[msg.data['ctrlSeqeOfOper']];
            }
            if (msg.data.programingOperMode !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('programming_operation_mode', msg, model, meta)] =
                    constants.thermostatProgrammingOperationModes[msg.data['programingOperMode']];
            }
            if (msg.data.systemMode !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('system_mode', msg, model, meta)] = constants.thermostatSystemModes[msg.data['systemMode']];
            }
            if (msg.data.runningMode !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('running_mode', msg, model, meta)] = constants.thermostatRunningMode[msg.data['runningMode']];
            }
            if (msg.data.runningState !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('running_state', msg, model, meta)] = constants.thermostatRunningStates[msg.data['runningState']];
            }
            if (msg.data.pIHeatingDemand !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('pi_heating_demand', msg, model, meta)] = (0, utils_1.mapNumberRange)(msg.data['pIHeatingDemand'], 0, dontMapPIHeatingDemand ? 100 : 255, 0, 100);
            }
            if (msg.data.pICoolingDemand !== undefined) {
                // we assume the behavior is consistent for pIHeatingDemand + pICoolingDemand for the same vendor
                result[(0, utils_1.postfixWithEndpointName)('pi_cooling_demand', msg, model, meta)] = (0, utils_1.mapNumberRange)(msg.data['pICoolingDemand'], 0, dontMapPIHeatingDemand ? 100 : 255, 0, 100);
            }
            if (msg.data.tempSetpointHold !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('temperature_setpoint_hold', msg, model, meta)] = msg.data['tempSetpointHold'] == 1;
            }
            if (msg.data.tempSetpointHoldDuration !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('temperature_setpoint_hold_duration', msg, model, meta)] = msg.data['tempSetpointHoldDuration'];
            }
            if (msg.data.minHeatSetpointLimit !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['minHeatSetpointLimit'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('min_heat_setpoint_limit', msg, model, meta)] = value;
                }
            }
            if (msg.data.maxHeatSetpointLimit !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['maxHeatSetpointLimit'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('max_heat_setpoint_limit', msg, model, meta)] = value;
                }
            }
            if (msg.data.absMinHeatSetpointLimit !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['absMinHeatSetpointLimit'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('abs_min_heat_setpoint_limit', msg, model, meta)] = value;
                }
            }
            if (msg.data.absMaxHeatSetpointLimit !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['absMaxHeatSetpointLimit'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('abs_max_heat_setpoint_limit', msg, model, meta)] = value;
                }
            }
            if (msg.data.absMinCoolSetpointLimit !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['absMinCoolSetpointLimit'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('abs_min_cool_setpoint_limit', msg, model, meta)] = value;
                }
            }
            if (msg.data.absMaxCoolSetpointLimit !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['absMaxCoolSetpointLimit'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('abs_max_cool_setpoint_limit', msg, model, meta)] = value;
                }
            }
            if (msg.data.minSetpointDeadBand !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['minSetpointDeadBand'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('min_setpoint_dead_band', msg, model, meta)] = value;
                }
            }
            if (msg.data.acLouverPosition !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('ac_louver_position', msg, model, meta)] =
                    constants.thermostatAcLouverPositions[msg.data['acLouverPosition']];
            }
            return result;
        },
    },
    thermostat_weekly_schedule: {
        cluster: 'hvacThermostat',
        type: ['commandGetWeeklyScheduleRsp'],
        convert: (model, msg, publish, options, meta) => {
            const days = [];
            for (let i = 0; i < 8; i++) {
                if ((msg.data['dayofweek'] & (1 << i)) > 0) {
                    days.push(constants.thermostatDayOfWeek[i]);
                }
            }
            const transitions = [];
            for (const transition of msg.data.transitions) {
                const entry = { time: transition.transitionTime };
                if (transition.heatSetpoint !== undefined) {
                    entry['heating_setpoint'] = transition['heatSetpoint'] / 100;
                }
                if (transition.coolSetpoint !== undefined) {
                    entry['cooling_setpoint'] = transition['coolSetpoint'] / 100;
                }
                transitions.push(entry);
            }
            return { [(0, utils_1.postfixWithEndpointName)('weekly_schedule', msg, model, meta)]: { days, transitions } };
        },
    },
    hvac_user_interface: {
        cluster: 'hvacUserInterfaceCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.keypadLockout !== undefined) {
                result.keypad_lockout =
                    constants.keypadLockoutMode[msg.data['keypadLockout']] !== undefined
                        ? constants.keypadLockoutMode[msg.data['keypadLockout']]
                        : msg.data['keypadLockout'];
            }
            if (msg.data.tempDisplayMode !== undefined) {
                result.temperature_display_mode =
                    constants.temperatureDisplayMode[msg.data['tempDisplayMode']] !== undefined
                        ? constants.temperatureDisplayMode[msg.data['tempDisplayMode']]
                        : msg.data['tempDisplayMode'];
            }
            return result;
        },
    },
    lock_operation_event: {
        cluster: 'closuresDoorLock',
        type: 'commandOperationEventNotification',
        convert: (model, msg, publish, options, meta) => {
            const lookup = {
                0: 'unknown',
                1: 'lock',
                2: 'unlock',
                3: 'lock_failure_invalid_pin_or_id',
                4: 'lock_failure_invalid_schedule',
                5: 'unlock_failure_invalid_pin_or_id',
                6: 'unlock_failure_invalid_schedule',
                7: 'one_touch_lock',
                8: 'key_lock',
                9: 'key_unlock',
                10: 'auto_lock',
                11: 'schedule_lock',
                12: 'schedule_unlock',
                13: 'manual_lock',
                14: 'manual_unlock',
                15: 'non_access_user_operational_event',
            };
            return {
                action: lookup[msg.data['opereventcode']],
                action_user: msg.data['userid'],
                action_source: msg.data['opereventsrc'],
                action_source_name: constants.lockSourceName[msg.data['opereventsrc']],
            };
        },
    },
    lock_programming_event: {
        cluster: 'closuresDoorLock',
        type: 'commandProgrammingEventNotification',
        convert: (model, msg, publish, options, meta) => {
            const lookup = {
                0: 'unknown',
                1: 'master_code_changed',
                2: 'pin_code_added',
                3: 'pin_code_deleted',
                4: 'pin_code_changed',
                5: 'rfid_code_added',
                6: 'rfid_code_deleted',
            };
            return {
                action: lookup[msg.data['programeventcode']],
                action_user: msg.data['userid'],
                action_source: msg.data['programeventsrc'],
                action_source_name: constants.lockSourceName[msg.data['programeventsrc']],
            };
        },
    },
    lock: {
        cluster: 'closuresDoorLock',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.lockState !== undefined) {
                result.state = msg.data.lockState == 1 ? 'LOCK' : 'UNLOCK';
                const lookup = ['not_fully_locked', 'locked', 'unlocked'];
                result.lock_state = lookup[msg.data['lockState']];
            }
            if (msg.data.autoRelockTime !== undefined) {
                result.auto_relock_time = msg.data.autoRelockTime;
            }
            if (msg.data.soundVolume !== undefined) {
                result.sound_volume = constants.lockSoundVolume[msg.data.soundVolume];
            }
            if (msg.data.doorState !== undefined) {
                const lookup = {
                    0: 'open',
                    1: 'closed',
                    2: 'error_jammed',
                    3: 'error_forced_open',
                    4: 'error_unspecified',
                    0xff: 'undefined',
                };
                result.door_state = lookup[msg.data['doorState']];
            }
            return result;
        },
    },
    lock_pin_code_response: {
        cluster: 'closuresDoorLock',
        type: ['commandGetPinCodeRsp'],
        options: [exposes.options.expose_pin()],
        convert: (model, msg, publish, options, meta) => {
            const { data } = msg;
            let status = constants.lockUserStatus[data.userstatus];
            if (status === undefined) {
                status = `not_supported_${data.userstatus}`;
            }
            const userId = data.userid.toString();
            const result = { users: {} };
            result.users[userId] = { status: status };
            if (options && options.expose_pin && data.pincodevalue) {
                result.users[userId].pin_code = data.pincodevalue;
            }
            return result;
        },
    },
    lock_user_status_response: {
        cluster: 'closuresDoorLock',
        type: ['commandGetUserStatusRsp'],
        options: [exposes.options.expose_pin()],
        convert: (model, msg, publish, options, meta) => {
            const { data } = msg;
            let status = constants.lockUserStatus[data.userstatus];
            if (status === undefined) {
                status = `not_supported_${data.userstatus}`;
            }
            const userId = data.userid.toString();
            const result = { users: {} };
            result.users[userId] = { status: status };
            if (options && options.expose_pin && data.pincodevalue) {
                result.users[userId].pin_code = data.pincodevalue;
            }
            return result;
        },
    },
    linkquality_from_basic: {
        cluster: 'genBasic',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return { linkquality: msg.linkquality };
        },
    },
    battery: {
        cluster: 'genPowerCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            // If voltageToPercentage is specified, it means we do not trust the percentage
            // returned by the device and are instead calculating it ourselves.
            if (model.meta?.battery?.voltageToPercentage == null &&
                msg.data.batteryPercentageRemaining !== undefined &&
                msg.data['batteryPercentageRemaining'] < 255) {
                // Some devices do not comply to the ZCL and report a
                // batteryPercentageRemaining of 100 when the battery is full (should be 200).
                const dontDividePercentage = model.meta && model.meta.battery && model.meta.battery.dontDividePercentage;
                let percentage = msg.data['batteryPercentageRemaining'];
                percentage = dontDividePercentage ? percentage : percentage / 2;
                payload.battery = (0, utils_1.precisionRound)(percentage, 2);
            }
            if (msg.data.batteryVoltage !== undefined && msg.data['batteryVoltage'] < 255) {
                // Deprecated: voltage is = mV now but should be V
                payload.voltage = msg.data['batteryVoltage'] * 100;
                if (model.meta && model.meta.battery && model.meta.battery.voltageToPercentage) {
                    payload.battery = (0, utils_1.batteryVoltageToPercentage)(payload.voltage, model.meta.battery.voltageToPercentage);
                }
            }
            if (msg.data.batteryAlarmState !== undefined) {
                const battery1Low = (msg.data.batteryAlarmState & (1 << 0) ||
                    msg.data.batteryAlarmState & (1 << 1) ||
                    msg.data.batteryAlarmState & (1 << 2) ||
                    msg.data.batteryAlarmState & (1 << 3)) > 0;
                const battery2Low = (msg.data.batteryAlarmState & (1 << 10) ||
                    msg.data.batteryAlarmState & (1 << 11) ||
                    msg.data.batteryAlarmState & (1 << 12) ||
                    msg.data.batteryAlarmState & (1 << 13)) > 0;
                const battery3Low = (msg.data.batteryAlarmState & (1 << 20) ||
                    msg.data.batteryAlarmState & (1 << 21) ||
                    msg.data.batteryAlarmState & (1 << 22) ||
                    msg.data.batteryAlarmState & (1 << 23)) > 0;
                payload.battery_low = battery1Low || battery2Low || battery3Low;
            }
            return payload;
        },
    },
    temperature: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.measuredValue !== undefined) {
                const temperature = parseFloat(msg.data['measuredValue']) / 100.0;
                const property = (0, utils_1.postfixWithEndpointName)('temperature', msg, model, meta);
                return { [property]: temperature };
            }
        },
    },
    device_temperature: {
        cluster: 'genDeviceTempCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.currentTemperature !== undefined) {
                const value = parseInt(msg.data['currentTemperature']);
                return { device_temperature: value };
            }
        },
    },
    humidity: {
        cluster: 'msRelativeHumidity',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const humidity = parseFloat(msg.data['measuredValue']) / 100.0;
            const property = (0, utils_1.postfixWithEndpointName)('humidity', msg, model, meta);
            // https://github.com/Koenkk/zigbee2mqtt/issues/798
            // Sometimes the sensor publishes non-realistic vales, it should only publish message
            // in the 0 - 100 range, don't produce messages beyond these values.
            if (humidity >= 0 && humidity <= 100) {
                return { [property]: humidity };
            }
        },
    },
    pm25: {
        cluster: 'pm25Measurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.measuredValue !== undefined) {
                return { pm25: msg.data['measuredValue'] };
            }
        },
    },
    flow: {
        cluster: 'msFlowMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const flow = parseFloat(msg.data['measuredValue']) / 10.0;
            const property = (0, utils_1.postfixWithEndpointName)('flow', msg, model, meta);
            if (msg.data.measuredValue !== undefined) {
                return { [property]: flow };
            }
        },
    },
    soil_moisture: {
        cluster: 'msSoilMoisture',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const soilMoisture = parseFloat(msg.data['measuredValue']) / 100.0;
            return { soil_moisture: soilMoisture };
        },
    },
    illuminance: {
        cluster: 'msIlluminanceMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            // DEPRECATED: only return lux here (change illuminance_lux -> illuminance)
            const illuminance = msg.data['measuredValue'];
            const illuminanceLux = illuminance === 0 ? 0 : Math.pow(10, (illuminance - 1) / 10000);
            return { illuminance: illuminance, illuminance_lux: illuminanceLux };
        },
    },
    pressure: {
        cluster: 'msPressureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            let pressure = 0;
            if (msg.data.scaledValue !== undefined) {
                const scale = msg.endpoint.getClusterAttributeValue('msPressureMeasurement', 'scale');
                pressure = msg.data['scaledValue'] / Math.pow(10, scale) / 100.0; // convert to hPa
            }
            else {
                pressure = parseFloat(msg.data['measuredValue']);
            }
            return { pressure };
        },
    },
    co2: {
        cluster: 'msCO2',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return { co2: Math.floor(msg.data.measuredValue * 1000000) };
        },
    },
    occupancy: {
        // This is for occupancy sensor that send motion start AND stop messages
        cluster: 'msOccupancySensing',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.no_occupancy_since_false()],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.occupancy !== undefined) {
                const payload = { occupancy: msg.data.occupancy % 2 > 0 };
                utils.noOccupancySince(msg.endpoint, options, publish, payload.occupancy ? 'stop' : 'start');
                return payload;
            }
        },
    },
    occupancy_with_timeout: {
        // This is for occupancy sensor that only send a message when motion detected,
        // but do not send a motion stop.
        // Therefore we need to publish the no_motion detected by ourselves.
        cluster: 'msOccupancySensing',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.occupancy_timeout(), exposes.options.no_occupancy_since_true()],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.occupancy !== 1) {
                // In case of 0 no occupancy is reported.
                // https://github.com/Koenkk/zigbee2mqtt/issues/467
                return;
            }
            // The occupancy sensor only sends a message when motion detected.
            // Therefore we need to publish the no_motion detected by ourselves.
            const timeout = options && options.occupancy_timeout !== undefined ? Number(options.occupancy_timeout) : 90;
            // Stop existing timers because motion is detected and set a new one.
            clearTimeout(globalStore.getValue(msg.endpoint, 'occupancy_timer', null));
            if (timeout !== 0) {
                const timer = setTimeout(() => {
                    publish({ occupancy: false });
                }, timeout * 1000);
                globalStore.putValue(msg.endpoint, 'occupancy_timer', timer);
            }
            const payload = { occupancy: true };
            utils.noOccupancySince(msg.endpoint, options, publish, 'start');
            return payload;
        },
    },
    occupancy_timeout: {
        cluster: 'msOccupancySensing',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.pirOToUDelay !== undefined) {
                return { occupancy_timeout: msg.data.pirOToUDelay };
            }
        },
    },
    brightness: {
        cluster: 'genLevelCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.currentLevel !== undefined) {
                const property = (0, utils_1.postfixWithEndpointName)('brightness', msg, model, meta);
                return { [property]: msg.data['currentLevel'] };
            }
        },
    },
    level_config: {
        cluster: 'genLevelCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = { level_config: {} };
            // onOffTransitionTime - range 0x0000 to 0xffff - optional
            if (msg.data.onOffTransitionTime !== undefined && msg.data['onOffTransitionTime'] !== undefined) {
                result.level_config.on_off_transition_time = Number(msg.data['onOffTransitionTime']);
            }
            // onTransitionTime - range 0x0000 to 0xffff - optional
            //                    0xffff = use onOffTransitionTime
            if (msg.data.onTransitionTime !== undefined && msg.data['onTransitionTime'] !== undefined) {
                result.level_config.on_transition_time = Number(msg.data['onTransitionTime']);
                if (result.level_config.on_transition_time == 65535) {
                    result.level_config.on_transition_time = 'disabled';
                }
            }
            // offTransitionTime - range 0x0000 to 0xffff - optional
            //                    0xffff = use onOffTransitionTime
            if (msg.data.offTransitionTime !== undefined && msg.data['offTransitionTime'] !== undefined) {
                result.level_config.off_transition_time = Number(msg.data['offTransitionTime']);
                if (result.level_config.off_transition_time == 65535) {
                    result.level_config.off_transition_time = 'disabled';
                }
            }
            // startUpCurrentLevel - range 0x00 to 0xff - optional
            //                       0x00 = return to minimum supported level
            //                       0xff - return to previous previous
            if (msg.data.startUpCurrentLevel !== undefined && msg.data['startUpCurrentLevel'] !== undefined) {
                result.level_config.current_level_startup = Number(msg.data['startUpCurrentLevel']);
                if (result.level_config.current_level_startup == 255) {
                    result.level_config.current_level_startup = 'previous';
                }
                if (result.level_config.current_level_startup == 0) {
                    result.level_config.current_level_startup = 'minimum';
                }
            }
            // onLevel - range 0x00 to 0xff - optional
            //           Any value outside of MinLevel to MaxLevel, including 0xff and 0x00, is interpreted as "previous".
            if (msg.data.onLevel !== undefined && msg.data['onLevel'] !== undefined) {
                result.level_config.on_level = Number(msg.data['onLevel']);
                if (result.level_config.on_level === 255) {
                    result.level_config.on_level = 'previous';
                }
            }
            // options - 8-bit map
            //   bit 0: ExecuteIfOff - when 0, Move commands are ignored if the device is off;
            //          when 1, CurrentLevel can be changed while the device is off.
            //   bit 1: CoupleColorTempToLevel - when 1, changes to level also change color temperature.
            //          (What this means is not defined, but it's most likely to be "dim to warm".)
            if (msg.data.options !== undefined && msg.data['options'] !== undefined) {
                result.level_config.execute_if_off = !!(Number(msg.data['options']) & 1);
            }
            if (Object.keys(result.level_config).length > 0) {
                return result;
            }
        },
    },
    color_colortemp: {
        cluster: 'lightingColorCtrl',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.color_sync()],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.colorTemperature !== undefined) {
                result.color_temp = msg.data['colorTemperature'];
            }
            if (msg.data.startUpColorTemperature !== undefined) {
                result.color_temp_startup = msg.data['startUpColorTemperature'];
            }
            if (msg.data.colorMode !== undefined) {
                result.color_mode =
                    constants.colorModeLookup[msg.data['colorMode']] !== undefined
                        ? constants.colorModeLookup[msg.data['colorMode']]
                        : msg.data['colorMode'];
            }
            if (msg.data.currentX !== undefined ||
                msg.data.currentY !== undefined ||
                msg.data.currentSaturation !== undefined ||
                msg.data.currentHue !== undefined ||
                msg.data.enhancedCurrentHue !== undefined) {
                result.color = {};
                if (msg.data.currentX !== undefined) {
                    result.color.x = (0, utils_1.mapNumberRange)(msg.data['currentX'], 0, 65535, 0, 1, 4);
                }
                if (msg.data.currentY !== undefined) {
                    result.color.y = (0, utils_1.mapNumberRange)(msg.data['currentY'], 0, 65535, 0, 1, 4);
                }
                if (msg.data.currentSaturation !== undefined) {
                    result.color.saturation = (0, utils_1.mapNumberRange)(msg.data['currentSaturation'], 0, 254, 0, 100);
                }
                if (msg.data.currentHue !== undefined) {
                    result.color.hue = (0, utils_1.mapNumberRange)(msg.data['currentHue'], 0, 254, 0, 360, 0);
                }
                if (msg.data.enhancedCurrentHue !== undefined) {
                    result.color.hue = (0, utils_1.mapNumberRange)(msg.data['enhancedCurrentHue'], 0, 65535, 0, 360, 1);
                }
            }
            if (msg.data.options !== undefined) {
                /*
                 * Bit | Value & Summary
                 * --------------------------
                 * 0   | 0: Do not execute command if the On/Off cluster, OnOff attribute is 0x00 (FALSE)
                 *     | 1: Execute command if the On/Off cluster, OnOff attribute is 0x00 (FALSE)
                 */
                result.color_options = { execute_if_off: (msg.data.options & (1 << 0)) > 0 };
            }
            // handle color property sync
            // NOTE: this should the last thing we do, as we need to have processed all attributes,
            //       we use assign here so we do not lose other attributes.
            return Object.assign(result, libColor.syncColorState(result, meta.state, msg.endpoint, options));
        },
    },
    meter_identification: {
        cluster: 'haMeterIdentification',
        type: ['readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const elements = [/* 0x000A*/ 'softwareRevision', /* 0x000D*/ 'availablePower', /* 0x000E*/ 'powerThreshold'];
            for (const at of elements) {
                const atSnake = at
                    .split(/(?=[A-Z])/)
                    .join('_')
                    .toLowerCase();
                if (msg.data[at]) {
                    result[atSnake] = msg.data[at];
                }
            }
            return result;
        },
    },
    metering: {
        /**
         * When using this converter also add the following to the configure method of the device:
         * await readMeteringPowerConverterAttributes(endpoint);
         */
        cluster: 'seMetering',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (utils.hasAlreadyProcessedMessage(msg, model))
                return;
            const payload = {};
            const multiplier = msg.endpoint.getClusterAttributeValue('seMetering', 'multiplier');
            const divisor = msg.endpoint.getClusterAttributeValue('seMetering', 'divisor');
            const factor = multiplier && divisor ? multiplier / divisor : null;
            if (msg.data.instantaneousDemand !== undefined) {
                let power = msg.data['instantaneousDemand'];
                if (factor != null) {
                    power = power * factor * 1000; // kWh to Watt
                }
                const property = (0, utils_1.postfixWithEndpointName)('power', msg, model, meta);
                payload[property] = power;
            }
            if (msg.data.currentSummDelivered !== undefined) {
                const value = msg.data['currentSummDelivered'];
                const property = (0, utils_1.postfixWithEndpointName)('energy', msg, model, meta);
                payload[property] = value * (factor ?? 1);
            }
            if (msg.data.currentSummReceived !== undefined) {
                const value = msg.data['currentSummReceived'];
                const property = (0, utils_1.postfixWithEndpointName)('produced_energy', msg, model, meta);
                payload[property] = value * (factor ?? 1);
            }
            return payload;
        },
    },
    electrical_measurement: {
        /**
         * When using this converter also add the following to the configure method of the device:
         * await readEletricalMeasurementConverterAttributes(endpoint);
         */
        cluster: 'haElectricalMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (utils.hasAlreadyProcessedMessage(msg, model))
                return;
            const getFactor = (key) => {
                const multiplier = msg.endpoint.getClusterAttributeValue('haElectricalMeasurement', `${key}Multiplier`);
                const divisor = msg.endpoint.getClusterAttributeValue('haElectricalMeasurement', `${key}Divisor`);
                const factor = multiplier && divisor ? multiplier / divisor : 1;
                return factor;
            };
            const lookup = [
                { key: 'activePower', name: 'power', factor: 'acPower' },
                { key: 'activePowerPhB', name: 'power_phase_b', factor: 'acPower' },
                { key: 'activePowerPhC', name: 'power_phase_c', factor: 'acPower' },
                { key: 'apparentPower', name: 'power_apparent', factor: 'acPower' },
                { key: 'apparentPowerPhB', name: 'power_apparent_phase_b', factor: 'acPower' },
                { key: 'apparentPowerPhC', name: 'power_apparent_phase_c', factor: 'acPower' },
                { key: 'reactivePower', name: 'power_reactive', factor: 'acPower' },
                { key: 'reactivePowerPhB', name: 'power_reactive_phase_b', factor: 'acPower' },
                { key: 'reactivePowerPhC', name: 'power_reactive_phase_c', factor: 'acPower' },
                { key: 'rmsCurrent', name: 'current', factor: 'acCurrent' },
                { key: 'rmsCurrentPhB', name: 'current_phase_b', factor: 'acCurrent' },
                { key: 'rmsCurrentPhC', name: 'current_phase_c', factor: 'acCurrent' },
                { key: 'rmsVoltage', name: 'voltage', factor: 'acVoltage' },
                { key: 'rmsVoltagePhB', name: 'voltage_phase_b', factor: 'acVoltage' },
                { key: 'rmsVoltagePhC', name: 'voltage_phase_c', factor: 'acVoltage' },
                { key: 'acFrequency', name: 'ac_frequency', factor: 'acFrequency' },
                { key: 'dcPower', name: 'power', factor: 'dcPower' },
                { key: 'dcCurrent', name: 'current', factor: 'dcCurrent' },
                { key: 'dcVoltage', name: 'voltage', factor: 'dcVoltage' },
            ];
            const payload = {};
            for (const entry of lookup) {
                if (msg.data[entry.key] !== undefined) {
                    const factor = getFactor(entry.factor);
                    const property = (0, utils_1.postfixWithEndpointName)(entry.name, msg, model, meta);
                    const value = msg.data[entry.key] * factor;
                    payload[property] = value;
                }
            }
            if (msg.data.powerFactor !== undefined) {
                const property = (0, utils_1.postfixWithEndpointName)('power_factor', msg, model, meta);
                payload[property] = (0, utils_1.precisionRound)(msg.data['powerFactor'] / 100, 2);
            }
            if (msg.data.powerFactorPhB !== undefined) {
                const property = (0, utils_1.postfixWithEndpointName)('power_factor_phase_b', msg, model, meta);
                payload[property] = (0, utils_1.precisionRound)(msg.data['powerFactorPhB'] / 100, 2);
            }
            if (msg.data.powerFactorPhC !== undefined) {
                const property = (0, utils_1.postfixWithEndpointName)('power_factor_phase_c', msg, model, meta);
                payload[property] = (0, utils_1.precisionRound)(msg.data['powerFactorPhC'] / 100, 2);
            }
            return payload;
        },
    },
    on_off: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.state_action()],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.onOff !== undefined) {
                const payload = {};
                const property = (0, utils_1.postfixWithEndpointName)('state', msg, model, meta);
                const state = msg.data['onOff'] === 1 ? 'ON' : 'OFF';
                payload[property] = state;
                if (options && options.state_action) {
                    payload['action'] = (0, utils_1.postfixWithEndpointName)(state.toLowerCase(), msg, model, meta);
                }
                return payload;
            }
        },
    },
    on_off_force_multiendpoint: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.state_action()],
        convert: (model, msg, publish, options, meta) => {
            // This converted is need instead of `fz.on_off` when no meta: {multiEndpoint: true} can be defined for this device
            // but it is needed for the `state`. E.g. when a switch has 3 channels (state_l1, state_l2, state_l3) but
            // has combined power measurements (power, energy))
            if (msg.data.onOff !== undefined) {
                const payload = {};
                const endpointName = model.endpoint !== undefined ? utils.getKey(model.endpoint(meta.device), msg.endpoint.ID) : msg.endpoint.ID;
                const state = msg.data['onOff'] === 1 ? 'ON' : 'OFF';
                payload[`state_${endpointName}`] = state;
                if (options && options.state_action) {
                    payload['action'] = `${state.toLowerCase()}_${endpointName}`;
                }
                return payload;
            }
        },
    },
    on_off_skip_duplicate_transaction: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.state_action()],
        convert: (model, msg, publish, options, meta) => {
            // Device sends multiple messages with the same transactionSequenceNumber,
            // prevent that multiple messages get send.
            // https://github.com/Koenkk/zigbee2mqtt/issues/3687
            if (msg.data.onOff !== undefined && !(0, utils_1.hasAlreadyProcessedMessage)(msg, model)) {
                const payload = {};
                const property = (0, utils_1.postfixWithEndpointName)('state', msg, model, meta);
                const state = msg.data['onOff'] === 1 ? 'ON' : 'OFF';
                payload[property] = state;
                if (options && options.state_action) {
                    payload['action'] = (0, utils_1.postfixWithEndpointName)(state.toLowerCase(), msg, model, meta);
                }
                return payload;
            }
        },
    },
    power_on_behavior: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const lookup = { 0: 'off', 1: 'on', 2: 'toggle', 255: 'previous' };
            if (msg.data.startUpOnOff !== undefined) {
                const property = (0, utils_1.postfixWithEndpointName)('power_on_behavior', msg, model, meta);
                return { [property]: lookup[msg.data['startUpOnOff']] };
            }
        },
    },
    ias_no_alarm: {
        cluster: 'ssIasZone',
        type: ['attributeReport', 'commandStatusChangeNotification'],
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zoneStatus;
            return {
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_siren: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                alarm: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
                supervision_reports: (zoneStatus & (1 << 4)) > 0,
                restore_reports: (zoneStatus & (1 << 5)) > 0,
                ac_status: (zoneStatus & (1 << 7)) > 0,
                test: (zoneStatus & (1 << 8)) > 0,
            };
        },
    },
    ias_water_leak_alarm_1: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                water_leak: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_water_leak_alarm_1_report: {
        cluster: 'ssIasZone',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zoneStatus;
            return {
                water_leak: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_vibration_alarm_1: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                vibration: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_vibration_alarm_1_with_timeout: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        options: [exposes.options.vibration_timeout()],
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            const timeout = options && options.vibration_timeout !== undefined ? Number(options.vibration_timeout) : 90;
            // Stop existing timers because vibration is detected and set a new one.
            globalStore.getValue(msg.endpoint, 'timers', []).forEach((t) => clearTimeout(t));
            globalStore.putValue(msg.endpoint, 'timers', []);
            if (timeout !== 0) {
                const timer = setTimeout(() => {
                    publish({ vibration: false });
                }, timeout * 1000);
                globalStore.getValue(msg.endpoint, 'timers').push(timer);
            }
            return {
                vibration: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_gas_alarm_1: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                gas: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_gas_alarm_2: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                gas: (zoneStatus & (1 << 1)) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_smoke_alarm_1: {
        cluster: 'ssIasZone',
        type: ['commandStatusChangeNotification', 'attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.type === 'commandStatusChangeNotification' ? msg.data.zonestatus : msg.data.zoneStatus;
            return {
                smoke: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
                supervision_reports: (zoneStatus & (1 << 4)) > 0,
                restore_reports: (zoneStatus & (1 << 5)) > 0,
                trouble: (zoneStatus & (1 << 6)) > 0,
                ac_status: (zoneStatus & (1 << 7)) > 0,
                test: (zoneStatus & (1 << 8)) > 0,
                battery_defect: (zoneStatus & (1 << 9)) > 0,
            };
        },
    },
    ias_contact_alarm_1: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            const contactProperty = (0, utils_1.postfixWithEndpointName)('contact', msg, model, meta);
            const tamperProperty = (0, utils_1.postfixWithEndpointName)('tamper', msg, model, meta);
            const batteryLowProperty = (0, utils_1.postfixWithEndpointName)('battery_low', msg, model, meta);
            return {
                [contactProperty]: !((zoneStatus & 1) > 0),
                [tamperProperty]: (zoneStatus & (1 << 2)) > 0,
                [batteryLowProperty]: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_contact_alarm_1_report: {
        cluster: 'ssIasZone',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zoneStatus;
            return {
                contact: !((zoneStatus & 1) > 0),
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_carbon_monoxide_alarm_1: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                carbon_monoxide: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_carbon_monoxide_alarm_1_gas_alarm_2: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const { zoneStatus } = msg.data;
            return {
                carbon_monoxide: (zoneStatus & 1) > 0,
                gas: (zoneStatus & (1 << 1)) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
                trouble: (zoneStatus & (1 << 6)) > 0,
                ac_connected: !((zoneStatus & (1 << 7)) > 0),
                test: (zoneStatus & (1 << 8)) > 0,
                battery_defect: (zoneStatus & (1 << 9)) > 0,
            };
        },
    },
    ias_sos_alarm_2: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                sos: (zoneStatus & (1 << 1)) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_occupancy_alarm_1: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                occupancy: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_occupancy_alarm_1_report: {
        cluster: 'ssIasZone',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zoneStatus;
            return {
                occupancy: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_occupancy_alarm_2: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                occupancy: (zoneStatus & (1 << 1)) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    ias_alarm_only_alarm_1: {
        cluster: 'ssIasZone',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zoneStatus;
            return {
                alarm: (zoneStatus & 1) > 0,
            };
        },
    },
    ias_occupancy_only_alarm_2: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                occupancy: (zoneStatus & (1 << 1)) > 0,
            };
        },
    },
    ias_occupancy_alarm_1_with_timeout: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        options: [exposes.options.occupancy_timeout()],
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            const timeout = options && options.occupancy_timeout !== undefined ? Number(options.occupancy_timeout) : 90;
            clearTimeout(globalStore.getValue(msg.endpoint, 'timer'));
            if (timeout !== 0) {
                const timer = setTimeout(() => publish({ occupancy: false }), timeout * 1000);
                globalStore.putValue(msg.endpoint, 'timer', timer);
            }
            return {
                occupancy: (zoneStatus & 1) > 0,
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    command_store: {
        cluster: 'genScenes',
        type: 'commandStore',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)(`store_${msg.data.sceneid}`, msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_recall: {
        cluster: 'genScenes',
        type: 'commandRecall',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)(`recall_${msg.data.sceneid}`, msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_panic: {
        cluster: 'ssIasAce',
        type: 'commandPanic',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)(`panic`, msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_arm: {
        cluster: 'ssIasAce',
        type: 'commandArm',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(constants.armMode[msg.data['armmode']], msg, model, meta),
                action_code: msg.data.code,
                action_zone: msg.data.zoneid,
            };
            if (msg.groupID)
                payload.action_group = msg.groupID;
            return payload;
        },
    },
    command_cover_stop: {
        cluster: 'closuresWindowCovering',
        type: 'commandStop',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)('stop', msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_cover_open: {
        cluster: 'closuresWindowCovering',
        type: 'commandUpOpen',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)('open', msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_cover_close: {
        cluster: 'closuresWindowCovering',
        type: 'commandDownClose',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)('close', msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_on: {
        cluster: 'genOnOff',
        type: 'commandOn',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)('on', msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_off: {
        cluster: 'genOnOff',
        type: 'commandOff',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)('off', msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_off_with_effect: {
        cluster: 'genOnOff',
        type: 'commandOffWithEffect',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)(`off`, msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_toggle: {
        cluster: 'genOnOff',
        type: 'commandToggle',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)('toggle', msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_move_to_level: {
        cluster: 'genLevelCtrl',
        type: ['commandMoveToLevel', 'commandMoveToLevelWithOnOff'],
        options: [exposes.options.simulated_brightness()],
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`brightness_move_to_level`, msg, model, meta),
                action_level: msg.data.level,
                action_transition_time: msg.data.transtime / 100,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            if (options.simulated_brightness) {
                const currentBrightness = globalStore.getValue(msg.endpoint, 'simulated_brightness_brightness', defaultSimulatedBrightness);
                globalStore.putValue(msg.endpoint, 'simulated_brightness_brightness', msg.data.level);
                const property = (0, utils_1.postfixWithEndpointName)('brightness', msg, model, meta);
                payload[property] = msg.data.level;
                const deltaProperty = (0, utils_1.postfixWithEndpointName)('action_brightness_delta', msg, model, meta);
                payload[deltaProperty] = msg.data.level - currentBrightness;
            }
            return payload;
        },
    },
    command_move: {
        cluster: 'genLevelCtrl',
        type: ['commandMove', 'commandMoveWithOnOff'],
        options: [exposes.options.simulated_brightness()],
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const direction = msg.data.movemode === 1 ? 'down' : 'up';
            const action = (0, utils_1.postfixWithEndpointName)(`brightness_move_${direction}`, msg, model, meta);
            const payload = { action, action_rate: msg.data.rate };
            (0, utils_1.addActionGroup)(payload, msg, model);
            if (options.simulated_brightness) {
                const opts = options.simulated_brightness;
                const deltaOpts = typeof opts === 'object' && opts.delta !== undefined ? opts.delta : 20;
                const intervalOpts = typeof opts === 'object' && opts.interval !== undefined ? opts.interval : 200;
                globalStore.putValue(msg.endpoint, 'simulated_brightness_direction', direction);
                if (globalStore.getValue(msg.endpoint, 'simulated_brightness_timer') === undefined) {
                    const timer = setInterval(() => {
                        let brightness = globalStore.getValue(msg.endpoint, 'simulated_brightness_brightness', defaultSimulatedBrightness);
                        const delta = globalStore.getValue(msg.endpoint, 'simulated_brightness_direction') === 'up' ? deltaOpts : -1 * deltaOpts;
                        brightness += delta;
                        brightness = (0, utils_1.numberWithinRange)(brightness, 0, 255);
                        globalStore.putValue(msg.endpoint, 'simulated_brightness_brightness', brightness);
                        const property = (0, utils_1.postfixWithEndpointName)('brightness', msg, model, meta);
                        const deltaProperty = (0, utils_1.postfixWithEndpointName)('action_brightness_delta', msg, model, meta);
                        publish({ [property]: brightness, [deltaProperty]: delta });
                    }, intervalOpts);
                    globalStore.putValue(msg.endpoint, 'simulated_brightness_timer', timer);
                }
            }
            return payload;
        },
    },
    command_step: {
        cluster: 'genLevelCtrl',
        type: ['commandStep', 'commandStepWithOnOff'],
        options: [exposes.options.simulated_brightness()],
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const direction = msg.data.stepmode === 1 ? 'down' : 'up';
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`brightness_step_${direction}`, msg, model, meta),
                action_step_size: msg.data.stepsize,
                action_transition_time: msg.data.transtime / 100,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            if (options.simulated_brightness) {
                let brightness = globalStore.getValue(msg.endpoint, 'simulated_brightness_brightness', defaultSimulatedBrightness);
                const delta = direction === 'up' ? msg.data.stepsize : -1 * msg.data.stepsize;
                brightness += delta;
                brightness = (0, utils_1.numberWithinRange)(brightness, 0, 255);
                globalStore.putValue(msg.endpoint, 'simulated_brightness_brightness', brightness);
                const property = (0, utils_1.postfixWithEndpointName)('brightness', msg, model, meta);
                payload[property] = brightness;
                const deltaProperty = (0, utils_1.postfixWithEndpointName)('action_brightness_delta', msg, model, meta);
                payload[deltaProperty] = delta;
            }
            return payload;
        },
    },
    command_stop: {
        cluster: 'genLevelCtrl',
        type: ['commandStop', 'commandStopWithOnOff'],
        options: [exposes.options.simulated_brightness()],
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            if (options.simulated_brightness) {
                clearInterval(globalStore.getValue(msg.endpoint, 'simulated_brightness_timer'));
                globalStore.putValue(msg.endpoint, 'simulated_brightness_timer', undefined);
            }
            const payload = { action: (0, utils_1.postfixWithEndpointName)(`brightness_stop`, msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_move_color_temperature: {
        cluster: 'lightingColorCtrl',
        type: ['commandMoveColorTemp'],
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const direction = utils.getFromLookup(msg.data.movemode, { 0: 'stop', 1: 'up', 3: 'down' });
            const action = (0, utils_1.postfixWithEndpointName)(`color_temperature_move_${direction}`, msg, model, meta);
            const payload = { action, action_rate: msg.data.rate, action_minimum: msg.data.minimum, action_maximum: msg.data.maximum };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_step_color_temperature: {
        cluster: 'lightingColorCtrl',
        type: 'commandStepColorTemp',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const direction = msg.data.stepmode === 1 ? 'up' : 'down';
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`color_temperature_step_${direction}`, msg, model, meta),
                action_step_size: msg.data.stepsize,
            };
            if (msg.data.transtime !== undefined) {
                payload.action_transition_time = msg.data.transtime / 100;
            }
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_ehanced_move_to_hue_and_saturation: {
        cluster: 'lightingColorCtrl',
        type: 'commandEnhancedMoveToHueAndSaturation',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`enhanced_move_to_hue_and_saturation`, msg, model, meta),
                action_enhanced_hue: msg.data.enhancehue,
                action_hue: (0, utils_1.mapNumberRange)(msg.data.enhancehue, 0, 65535, 0, 360, 1),
                action_saturation: msg.data.saturation,
                action_transition_time: msg.data.transtime,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_move_to_hue_and_saturation: {
        cluster: 'lightingColorCtrl',
        type: 'commandMoveToHueAndSaturation',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`move_to_hue_and_saturation`, msg, model, meta),
                action_hue: msg.data.hue,
                action_saturation: msg.data.saturation,
                action_transition_time: msg.data.transtime,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_step_hue: {
        cluster: 'lightingColorCtrl',
        type: ['commandStepHue'],
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const direction = msg.data.stepmode === 1 ? 'up' : 'down';
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`color_hue_step_${direction}`, msg, model, meta),
                action_step_size: msg.data.stepsize,
                action_transition_time: msg.data.transtime / 100,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_step_saturation: {
        cluster: 'lightingColorCtrl',
        type: ['commandStepSaturation'],
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const direction = msg.data.stepmode === 1 ? 'up' : 'down';
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`color_saturation_step_${direction}`, msg, model, meta),
                action_step_size: msg.data.stepsize,
                action_transition_time: msg.data.transtime / 100,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_color_loop_set: {
        cluster: 'lightingColorCtrl',
        type: 'commandColorLoopSet',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const updateFlags = msg.data.updateflags;
            const actionLookup = {
                0x00: 'deactivate',
                0x01: 'activate_from_color_loop_start_enhanced_hue',
                0x02: 'activate_from_enhanced_current_hue',
            };
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`color_loop_set`, msg, model, meta),
                action_update_flags: {
                    action: (updateFlags & (1 << 0)) > 0,
                    direction: (updateFlags & (1 << 1)) > 0,
                    time: (updateFlags & (1 << 2)) > 0,
                    start_hue: (updateFlags & (1 << 3)) > 0,
                },
                action_action: actionLookup[msg.data.action],
                action_direction: msg.data.direction === 0 ? 'decrement' : 'increment',
                action_time: msg.data.time,
                action_start_hue: msg.data.starthue,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_move_to_color_temp: {
        cluster: 'lightingColorCtrl',
        type: 'commandMoveToColorTemp',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`color_temperature_move`, msg, model, meta),
                action_color_temperature: msg.data.colortemp,
                action_transition_time: msg.data.transtime,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_move_to_color: {
        cluster: 'lightingColorCtrl',
        type: 'commandMoveToColor',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`color_move`, msg, model, meta),
                action_color: {
                    x: (0, utils_1.precisionRound)(msg.data.colorx / 65535, 3),
                    y: (0, utils_1.precisionRound)(msg.data.colory / 65535, 3),
                },
                action_transition_time: msg.data.transtime,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_move_hue: {
        cluster: 'lightingColorCtrl',
        type: 'commandMoveHue',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const movestop = msg.data.movemode == 1 ? 'move' : 'stop';
            const action = (0, utils_1.postfixWithEndpointName)(`hue_${movestop}`, msg, model, meta);
            const payload = { action, action_rate: msg.data.rate };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_move_to_saturation: {
        cluster: 'lightingColorCtrl',
        type: 'commandMoveToSaturation',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)('move_to_saturation', msg, model, meta),
                action_saturation: msg.data.saturation,
                action_transition_time: msg.data.transtime,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_move_to_hue: {
        cluster: 'lightingColorCtrl',
        type: 'commandMoveToHue',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`move_to_hue`, msg, model, meta),
                action_hue: msg.data.hue,
                action_transition_time: msg.data.transtime / 100,
                action_direction: msg.data.direction === 0 ? 'decrement' : 'increment',
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_emergency: {
        cluster: 'ssIasAce',
        type: 'commandEmergency',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const payload = { action: (0, utils_1.postfixWithEndpointName)(`emergency`, msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    command_on_state: {
        cluster: 'genOnOff',
        type: 'commandOn',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const property = (0, utils_1.postfixWithEndpointName)('state', msg, model, meta);
            return { [property]: 'ON' };
        },
    },
    command_off_state: {
        cluster: 'genOnOff',
        type: 'commandOff',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const property = (0, utils_1.postfixWithEndpointName)('state', msg, model, meta);
            return { [property]: 'OFF' };
        },
    },
    identify: {
        cluster: 'genIdentify',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return { action: (0, utils_1.postfixWithEndpointName)(`identify`, msg, model, meta) };
        },
    },
    cover_position_tilt: {
        cluster: 'closuresWindowCovering',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.invert_cover()],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            // Zigbee officially expects 'open' to be 0 and 'closed' to be 100 whereas
            // HomeAssistant etc. work the other way round.
            // For zigbee-herdsman-converters: open = 100, close = 0
            // ubisys J1 will report 255 if lift or tilt positions are not known, so skip that.
            const metaInvert = model.meta && model.meta.coverInverted;
            const invert = metaInvert ? !options.invert_cover : options.invert_cover;
            const coverStateFromTilt = model.meta && model.meta.coverStateFromTilt;
            if (msg.data.currentPositionLiftPercentage !== undefined && msg.data['currentPositionLiftPercentage'] <= 100) {
                const value = msg.data['currentPositionLiftPercentage'];
                result[(0, utils_1.postfixWithEndpointName)('position', msg, model, meta)] = invert ? value : 100 - value;
                if (!coverStateFromTilt) {
                    result[(0, utils_1.postfixWithEndpointName)('state', msg, model, meta)] = metaInvert
                        ? value === 0
                            ? 'CLOSE'
                            : 'OPEN'
                        : value === 100
                            ? 'CLOSE'
                            : 'OPEN';
                }
            }
            if (msg.data.currentPositionTiltPercentage !== undefined && msg.data['currentPositionTiltPercentage'] <= 100) {
                const value = msg.data['currentPositionTiltPercentage'];
                result[(0, utils_1.postfixWithEndpointName)('tilt', msg, model, meta)] = invert ? value : 100 - value;
                if (coverStateFromTilt) {
                    result[(0, utils_1.postfixWithEndpointName)('state', msg, model, meta)] = metaInvert
                        ? value === 100
                            ? 'OPEN'
                            : 'CLOSE'
                        : value === 0
                            ? 'OPEN'
                            : 'CLOSE';
                }
            }
            if (msg.data.windowCoveringMode !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('cover_mode', msg, model, meta)] = {
                    reversed: (msg.data.windowCoveringMode & (1 << 0)) > 0,
                    calibration: (msg.data.windowCoveringMode & (1 << 1)) > 0,
                    maintenance: (msg.data.windowCoveringMode & (1 << 2)) > 0,
                    led: (msg.data.windowCoveringMode & (1 << 3)) > 0,
                };
            }
            return result;
        },
    },
    cover_position_via_brightness: {
        cluster: 'genLevelCtrl',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.invert_cover()],
        convert: (model, msg, publish, options, meta) => {
            const currentLevel = Number(msg.data['currentLevel']);
            let position = (0, utils_1.mapNumberRange)(currentLevel, 0, 255, 0, 100);
            position = options.invert_cover ? 100 - position : position;
            const state = options.invert_cover ? (position > 0 ? 'CLOSE' : 'OPEN') : position > 0 ? 'OPEN' : 'CLOSE';
            return { state: state, position: position };
        },
    },
    cover_state_via_onoff: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.onOff !== undefined) {
                return { state: msg.data['onOff'] === 1 ? 'OPEN' : 'CLOSE' };
            }
        },
    },
    curtain_position_analog_output: {
        cluster: 'genAnalogOutput',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.invert_cover()],
        convert: (model, msg, publish, options, meta) => {
            let position = (0, utils_1.precisionRound)(msg.data['presentValue'], 2);
            position = options.invert_cover ? 100 - position : position;
            return { position };
        },
    },
    lighting_ballast_configuration: {
        cluster: 'lightingBallastCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.ballastStatus !== undefined) {
                const ballastStatus = msg.data.ballastStatus;
                result['ballast_status_non_operational'] = ballastStatus & 1 ? true : false;
                result['ballast_status_lamp_failure'] = ballastStatus & 2 ? true : false;
            }
            if (msg.data.minLevel !== undefined) {
                result['ballast_minimum_level'] = msg.data.minLevel;
            }
            if (msg.data.maxLevel !== undefined) {
                result['ballast_maximum_level'] = msg.data.maxLevel;
            }
            if (msg.data.powerOnLevel !== undefined) {
                result['ballast_power_on_level'] = msg.data.powerOnLevel;
            }
            if (msg.data.powerOnFadeTime !== undefined) {
                result['ballast_power_on_fade_time'] = msg.data.powerOnFadeTime;
            }
            if (msg.data.intrinsicBallastFactor !== undefined) {
                result['ballast_intrinsic_ballast_factor'] = msg.data.intrinsicBallastFactor;
            }
            if (msg.data.ballastFactorAdjustment !== undefined) {
                result['ballast_ballast_factor_adjustment'] = msg.data.ballastFactorAdjustment;
            }
            if (msg.data.lampQuantity !== undefined) {
                result['ballast_lamp_quantity'] = msg.data.lampQuantity;
            }
            if (msg.data.lampType !== undefined) {
                result['ballast_lamp_type'] = msg.data.lampType;
            }
            if (msg.data.lampManufacturer !== undefined) {
                result['ballast_lamp_manufacturer'] = msg.data.lampManufacturer;
            }
            if (msg.data.lampRatedHours !== undefined) {
                result['ballast_lamp_rated_hours'] = msg.data.lampRatedHours;
            }
            if (msg.data.lampBurnHours !== undefined) {
                result['ballast_lamp_burn_hours'] = msg.data.lampBurnHours;
            }
            if (msg.data.lampAlarmMode !== undefined) {
                const lampAlarmMode = msg.data.lampAlarmMode;
                result['ballast_lamp_alarm_lamp_burn_hours'] = lampAlarmMode & 1 ? true : false;
            }
            if (msg.data.lampBurnHoursTripPoint !== undefined) {
                result['ballast_lamp_burn_hours_trip_point'] = msg.data.lampBurnHoursTripPoint;
            }
            return result;
        },
    },
    checkin_presence: {
        cluster: 'genPollCtrl',
        type: ['commandCheckin'],
        options: [exposes.options.presence_timeout()],
        convert: (model, msg, publish, options, meta) => {
            const useOptionsTimeout = options && options.presence_timeout !== undefined;
            const timeout = useOptionsTimeout ? Number(options.presence_timeout) : 100; // 100 seconds by default
            // Stop existing timer because presence is detected and set a new one.
            clearTimeout(globalStore.getValue(msg.endpoint, 'timer'));
            const timer = setTimeout(() => publish({ presence: false }), timeout * 1000);
            globalStore.putValue(msg.endpoint, 'timer', timer);
            return { presence: true };
        },
    },
    ias_enroll: {
        cluster: 'ssIasZone',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const zoneState = msg.data.zoneState;
            const iasCieAddr = msg.data.iasCieAddr;
            const zoneId = msg.data.zoneId;
            return {
                enrolled: zoneState !== 0,
                ias_cie_address: iasCieAddr,
                zone_id: zoneId,
            };
        },
    },
    ias_wd: {
        cluster: 'ssIasWd',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.maxDuration !== undefined)
                result['max_duration'] = msg.data.maxDuration;
            return result;
        },
    },
    power_source: {
        cluster: 'genBasic',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            if (msg.data.powerSource !== undefined) {
                const value = msg.data['powerSource'];
                const lookup = {
                    0: 'unknown',
                    1: 'mains_single_phase',
                    2: 'mains_three_phase',
                    3: 'battery',
                    4: 'dc_source',
                    5: 'emergency_mains_constantly_powered',
                    6: 'emergency_mains_and_transfer_switch',
                };
                payload.power_source = lookup[value];
                if (['R7051'].includes(model.model)) {
                    payload.ac_connected = value === 2;
                }
                else if (['ZNCLBL01LM'].includes(model.model)) {
                    payload.charging = value === 4;
                }
            }
            return payload;
        },
    },
    // #endregion
    // #region Non-generic converters
    namron_thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const data = msg.data;
            if (data[0x1000] !== undefined) {
                // Display brightness
                const lookup = { 0: 'low', 1: 'mid', 2: 'high' };
                result.lcd_brightness = lookup[data[0x1000]];
            }
            if (data[0x1001] !== undefined) {
                // Button vibration level
                const lookup = { 0: 'off', 1: 'low', 2: 'high' };
                result.button_vibration_level = lookup[data[0x1001]];
            }
            if (data[0x1002] !== undefined) {
                // Floor sensor type
                const lookup = { 1: '10k', 2: '15k', 3: '50k', 4: '100k', 5: '12k' };
                result.floor_sensor_type = lookup[data[0x1002]];
            }
            if (data[0x1003] !== undefined) {
                // Sensor
                const lookup = { 0: 'air', 1: 'floor', 2: 'both' };
                result.sensor = lookup[data[0x1003]];
            }
            if (data[0x1004] !== undefined) {
                // PowerUpStatus
                const lookup = { 0: 'default', 1: 'last_status' };
                result.powerup_status = lookup[data[0x1004]];
            }
            if (data[0x1005] !== undefined) {
                // FloorSensorCalibration
                result.floor_sensor_calibration = (0, utils_1.precisionRound)(data[0x1005], 2) / 10;
            }
            if (data[0x1006] !== undefined) {
                // DryTime
                result.dry_time = data[0x1006];
            }
            if (data[0x1007] !== undefined) {
                // ModeAfterDry
                const lookup = { 0: 'off', 1: 'manual', 2: 'auto', 3: 'away' };
                result.mode_after_dry = lookup[data[0x1007]];
            }
            if (data[0x1008] !== undefined) {
                // TemperatureDisplay
                const lookup = { 0: 'room', 1: 'floor' };
                result.temperature_display = lookup[data[0x1008]];
            }
            if (data[0x1009] !== undefined) {
                // WindowOpenCheck
                result.window_open_check = data[0x1009] / 2;
            }
            if (data[0x100a] !== undefined) {
                // Hysterersis
                result.hysterersis = (0, utils_1.precisionRound)(data[0x100a], 2) / 10;
            }
            if (data[0x100b] !== undefined) {
                // DisplayAutoOffEnable
                result.display_auto_off_enabled = data[0x100b] ? 'enabled' : 'disabled';
            }
            if (data[0x2001] !== undefined) {
                // AlarmAirTempOverValue
                result.alarm_airtemp_overvalue = data[0x2001];
            }
            if (data[0x2002] !== undefined) {
                // Away Mode Set
                result.away_mode = data[0x2002] ? 'ON' : 'OFF';
            }
            return result;
        },
    },
    namron_hvac_user_interface: {
        cluster: 'hvacUserInterfaceCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.keypadLockout !== undefined) {
                // Set as child lock instead as keypadlockout
                result.child_lock = msg.data['keypadLockout'] === 0 ? 'UNLOCK' : 'LOCK';
            }
            return result;
        },
    },
    elko_thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.local_temperature_based_on_sensor()],
        convert: (model, msg, publish, options, meta) => {
            const result = converters1.thermostat.convert(model, msg, publish, options, meta);
            const data = msg.data;
            if (data.localTemp !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['localTemp'], 2) / 100;
                const valuesFloorSensor = ['floor', 'supervisor_floor'];
                const sensorType = meta.state.sensor;
                const floorTemperature = meta.state.floor_temp;
                if (valuesFloorSensor.includes(sensorType) && options.local_temperature_based_on_sensor) {
                    result[(0, utils_1.postfixWithEndpointName)('local_temperature', msg, model, meta)] = floorTemperature / 100;
                }
                else {
                    if (value >= -273.15) {
                        result[(0, utils_1.postfixWithEndpointName)('local_temperature', msg, model, meta)] = value;
                    }
                }
            }
            if (data.elkoDisplayText !== undefined) {
                // Display text
                result.display_text = data['elkoDisplayText'];
            }
            if (data.elkoSensor !== undefined) {
                // Sensor
                const sensorModeLookup = {
                    0: 'air',
                    1: 'floor',
                    3: 'supervisor_floor',
                };
                const value = utils.getFromLookup(data['elkoSensor'], sensorModeLookup);
                result.sensor = value;
            }
            if (data.elkoPowerStatus !== undefined) {
                // Power status
                result.system_mode = data['elkoPowerStatus'] ? 'heat' : 'off';
            }
            if (data.elkoExternalTemp !== undefined) {
                // External temp (floor)
                result.floor_temp = utils.precisionRound(data['elkoExternalTemp'], 2) / 100;
            }
            if (data.elkoRelayState !== undefined) {
                // Relay state
                result.running_state = data['elkoRelayState'] ? 'heat' : 'idle';
            }
            if (data.elkoCalibration !== undefined) {
                // Calibration
                result.local_temperature_calibration = (0, utils_1.precisionRound)(data['elkoCalibration'], 2) / 10;
            }
            if (data.elkoLoad !== undefined) {
                // Load
                result.load = data['elkoLoad'];
            }
            if (data.elkoRegulatorMode !== undefined) {
                // Regulator mode
                result.regulator_mode = data['elkoRegulatorMode'] ? 'regulator' : 'thermostat';
            }
            if (data.elkoMeanPower !== undefined) {
                // Mean power
                result.mean_power = data['elkoMeanPower'];
            }
            if (data.elkoNightSwitching !== undefined) {
                // Night switching
                result.night_switching = data['elkoNightSwitching'] ? 'on' : 'off';
            }
            if (data.elkoFrostGuard !== undefined) {
                // Frost guard
                result.frost_guard = data['elkoFrostGuard'] ? 'on' : 'off';
            }
            if (data.elkoChildLock !== undefined) {
                // Child lock
                result.child_lock = data['elkoChildLock'] ? 'lock' : 'unlock';
            }
            if (data.elkoMaxFloorTemp !== undefined) {
                // Max floor temp
                result.max_floor_temp = data['elkoMaxFloorTemp'];
            }
            return result;
        },
    },
    ias_smoke_alarm_1_develco: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                smoke: (zoneStatus & 1) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
                supervision_reports: (zoneStatus & (1 << 4)) > 0,
                restore_reports: (zoneStatus & (1 << 5)) > 0,
                test: (zoneStatus & (1 << 8)) > 0,
            };
        },
    },
    ts0201_temperature_humidity_alarm: {
        cluster: 'manuSpecificTuya_2',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.alarm_temperature_max !== undefined) {
                result.alarm_temperature_max = msg.data['alarm_temperature_max'];
            }
            if (msg.data.alarm_temperature_min !== undefined) {
                result.alarm_temperature_min = msg.data['alarm_temperature_min'];
            }
            if (msg.data.alarm_humidity_max !== undefined) {
                result.alarm_humidity_max = msg.data['alarm_humidity_max'];
            }
            if (msg.data.alarm_humidity_min !== undefined) {
                result.alarm_humidity_min = msg.data['alarm_humidity_min'];
            }
            if (msg.data.alarm_humidity !== undefined) {
                const sensorAlarmLookup = { '0': 'below_min_humdity', '1': 'over_humidity', '2': 'off' };
                result.alarm_humidity = sensorAlarmLookup[msg.data['alarm_humidity']];
            }
            if (msg.data.alarm_temperature !== undefined) {
                const sensorAlarmLookup = { '0': 'below_min_temperature', '1': 'over_temperature', '2': 'off' };
                result.alarm_temperature = sensorAlarmLookup[msg.data['alarm_temperature']];
            }
            return result;
        },
    },
    tuya_led_controller: {
        cluster: 'lightingColorCtrl',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.color_sync()],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.colorTemperature !== undefined) {
                const value = Number(msg.data['colorTemperature']);
                result.color_temp = (0, utils_1.mapNumberRange)(value, 0, 255, 500, 153);
            }
            if (msg.data.tuyaBrightness !== undefined) {
                result.brightness = msg.data['tuyaBrightness'];
            }
            if (msg.data.tuyaRgbMode !== undefined) {
                if (msg.data['tuyaRgbMode'] === 1) {
                    result.color_mode = constants.colorModeLookup[0];
                }
                else {
                    result.color_mode = constants.colorModeLookup[2];
                }
            }
            result.color = {};
            if (msg.data.currentHue !== undefined) {
                result.color.hue = (0, utils_1.mapNumberRange)(msg.data['currentHue'], 0, 254, 0, 360);
                result.color.h = result.color.hue;
            }
            if (msg.data.currentSaturation !== undefined) {
                result.color.saturation = (0, utils_1.mapNumberRange)(msg.data['currentSaturation'], 0, 254, 0, 100);
                result.color.s = result.color.saturation;
            }
            return Object.assign(result, libColor.syncColorState(result, meta.state, msg.endpoint, options));
        },
    },
    wiser_device_info: {
        cluster: 'wiserDeviceInfo',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const data = msg.data['deviceInfo'].split(',');
            if (data[0] === 'ALG') {
                // TODO What is ALG
                const alg = data.slice(1);
                result['ALG'] = alg.join(',');
                result['occupied_heating_setpoint'] = alg[2] / 10;
                result['local_temperature'] = alg[3] / 10;
                result['pi_heating_demand'] = parseInt(alg[9]);
            }
            else if (data[0] === 'ADC') {
                // TODO What is ADC
                const adc = data.slice(1);
                result['ADC'] = adc.join(',');
                result['occupied_heating_setpoint'] = adc[5] / 100;
                result['local_temperature'] = adc[3] / 10;
            }
            else if (data[0] === 'UI') {
                if (data[1] === 'BoostUp') {
                    result['boost'] = 'Up';
                }
                else if (data[1] === 'BoostDown') {
                    result['boost'] = 'Down';
                }
                else {
                    result['boost'] = 'None';
                }
            }
            else if (data[0] === 'MOT') {
                // Info about the motor
                result['MOT'] = data[1];
            }
            return result;
        },
    },
    tuya_doorbell_button: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const lookup = { 1: 'pressed' };
            const zoneStatus = msg.data.zonestatus;
            return {
                action: lookup[zoneStatus & 1],
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    terncy_knob: {
        cluster: 'manuSpecificClusterAduroSmart',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (typeof msg.data['27'] === 'number') {
                const direction = msg.data['27'] > 0 ? 'clockwise' : 'counterclockwise';
                const number = Math.abs(msg.data['27']) / 12;
                return { action: 'rotate', action_direction: direction, action_number: number };
            }
        },
    },
    DTB190502A1: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const lookupKEY = {
                '0': 'KEY_SYS',
                '1': 'KEY_UP',
                '2': 'KEY_DOWN',
                '3': 'KEY_NONE',
            };
            const lookupLED = { '0': 'OFF', '1': 'ON' };
            return {
                cpu_temperature: (0, utils_1.precisionRound)(msg.data['41361'], 2),
                key_state: lookupKEY[msg.data['41362']],
                led_state: lookupLED[msg.data['41363']],
            };
        },
    },
    ZigUP: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const lookup = {
                '0': 'timer',
                '1': 'key',
                '2': 'dig-in',
            };
            let ds18b20Id = null;
            let ds18b20Value = null;
            if (msg.data['41368']) {
                ds18b20Id = msg.data['41368'].split(':')[0];
                ds18b20Value = (0, utils_1.precisionRound)(msg.data['41368'].split(':')[1], 2);
            }
            return {
                state: msg.data['onOff'] === 1 ? 'ON' : 'OFF',
                cpu_temperature: (0, utils_1.precisionRound)(msg.data['41361'], 2),
                external_temperature: (0, utils_1.precisionRound)(msg.data['41362'], 1),
                external_humidity: (0, utils_1.precisionRound)(msg.data['41363'], 1),
                s0_counts: msg.data['41364'],
                adc_volt: (0, utils_1.precisionRound)(msg.data['41365'], 3),
                dig_input: msg.data['41366'],
                reason: lookup[msg.data['41367']],
                [`${ds18b20Id}`]: ds18b20Value,
            };
        },
    },
    terncy_contact: {
        cluster: 'genBinaryInput',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            return { contact: msg.data['presentValue'] == 0 };
        },
    },
    terncy_temperature: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const temperature = parseFloat(msg.data['measuredValue']) / 10.0;
            return { temperature: temperature };
        },
    },
    ts0216_siren: {
        cluster: 'ssIasWd',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.maxDuration !== undefined)
                result['duration'] = msg.data.maxDuration;
            if (msg.data['2'] !== undefined) {
                result['volume'] = (0, utils_1.mapNumberRange)(msg.data['2'], 100, 10, 0, 100);
            }
            if (msg.data['61440'] !== undefined) {
                result['alarm'] = msg.data['61440'] == 0 ? false : true;
            }
            return result;
        },
    },
    tuya_cover_options_2: {
        cluster: 'closuresWindowCovering',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.moesCalibrationTime !== undefined) {
                const value = parseFloat(msg.data['moesCalibrationTime']) / 100;
                result[(0, utils_1.postfixWithEndpointName)('calibration_time', msg, model, meta)] = value;
            }
            if (msg.data.tuyaMotorReversal !== undefined) {
                const value = msg.data['tuyaMotorReversal'];
                const reversalLookup = { 0: 'OFF', 1: 'ON' };
                result[(0, utils_1.postfixWithEndpointName)('motor_reversal', msg, model, meta)] = reversalLookup[value];
            }
            return result;
        },
    },
    tuya_cover_options: {
        cluster: 'closuresWindowCovering',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.tuyaMovingState !== undefined) {
                const value = msg.data['tuyaMovingState'];
                const movingLookup = { 0: 'UP', 1: 'STOP', 2: 'DOWN' };
                result[(0, utils_1.postfixWithEndpointName)('moving', msg, model, meta)] = movingLookup[value];
            }
            if (msg.data.tuyaCalibration !== undefined) {
                const value = msg.data['tuyaCalibration'];
                const calibrationLookup = { 0: 'ON', 1: 'OFF' };
                result[(0, utils_1.postfixWithEndpointName)('calibration', msg, model, meta)] = calibrationLookup[value];
            }
            if (msg.data.tuyaMotorReversal !== undefined) {
                const value = msg.data['tuyaMotorReversal'];
                const reversalLookup = { 0: 'OFF', 1: 'ON' };
                result[(0, utils_1.postfixWithEndpointName)('motor_reversal', msg, model, meta)] = reversalLookup[value];
            }
            if (msg.data.moesCalibrationTime !== undefined) {
                const value = parseFloat(msg.data['moesCalibrationTime']) / 10.0;
                if (meta.device.manufacturerName === '_TZ3000_cet6ch1r') {
                    const endpoint = msg.endpoint.ID;
                    const calibrationLookup = { 1: 'up', 2: 'down' };
                    result[(0, utils_1.postfixWithEndpointName)(`calibration_time_${calibrationLookup[endpoint]}`, msg, model, meta)] = value;
                }
                else {
                    result[(0, utils_1.postfixWithEndpointName)('calibration_time', msg, model, meta)] = value;
                }
            }
            return result;
        },
    },
    WSZ01_on_off_action: {
        cluster: 65029,
        type: 'raw',
        convert: (model, msg, publish, options, meta) => {
            const clickMapping = { 0: 'release', 1: 'single', 2: 'double', 3: 'hold' };
            return { action: `${clickMapping[msg.data[6]]}` };
        },
    },
    tuya_switch_scene: {
        cluster: 'genOnOff',
        type: 'commandTuyaAction',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            // Since it is a non standard ZCL command, no default response is send from zigbee-herdsman
            // Send the defaultResponse here, otherwise the second button click delays.
            // https://github.com/Koenkk/zigbee2mqtt/issues/8149
            return { action: 'switch_scene', action_scene: msg.data.value };
        },
    },
    livolo_switch_state: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const status = msg.data.onOff;
            return {
                state_left: status & 1 ? 'ON' : 'OFF',
                state_right: status & 2 ? 'ON' : 'OFF',
            };
        },
    },
    livolo_socket_state: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const stateHeader = Buffer.from([122, 209]);
            if (msg.data.indexOf(stateHeader) === 0) {
                const status = msg.data[14];
                return { state: status & 1 ? 'ON' : 'OFF' };
            }
        },
    },
    livolo_new_switch_state: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const stateHeader = Buffer.from([122, 209]);
            if (msg.data.indexOf(stateHeader) === 0) {
                const status = msg.data[14];
                return { state: status & 1 ? 'ON' : 'OFF' };
            }
        },
    },
    livolo_new_switch_state_2gang: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const stateHeader = Buffer.from([122, 209]);
            if (msg.data.indexOf(stateHeader) === 0) {
                if (msg.data[10] === 7) {
                    const status = msg.data[14];
                    return {
                        state_left: status & 1 ? 'ON' : 'OFF',
                        state_right: status & 2 ? 'ON' : 'OFF',
                    };
                }
            }
        },
    },
    livolo_new_switch_state_4gang: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const stateHeader = Buffer.from([122, 209]);
            if (msg.data.indexOf(stateHeader) === 0) {
                if (msg.data[10] === 7) {
                    const status = msg.data[14];
                    return {
                        state_left: status & 1 ? 'ON' : 'OFF',
                        state_right: status & 2 ? 'ON' : 'OFF',
                        state_bottom_left: status & 4 ? 'ON' : 'OFF',
                        state_bottom_right: status & 8 ? 'ON' : 'OFF',
                    };
                }
                if (msg.data[10] === 13) {
                    const status = msg.data[13];
                    return {
                        state_left: status & 1 ? 'ON' : 'OFF',
                        state_right: status & 2 ? 'ON' : 'OFF',
                        state_bottom_left: status & 4 ? 'ON' : 'OFF',
                        state_bottom_right: status & 8 ? 'ON' : 'OFF',
                    };
                }
            }
        },
    },
    livolo_curtain_switch_state: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const stateHeader = Buffer.from([122, 209]);
            if (msg.data.indexOf(stateHeader) === 0) {
                if (msg.data[10] === 5 || msg.data[10] === 2) {
                    const status = msg.data[14];
                    return {
                        state_left: status === 1 ? 'ON' : 'OFF',
                        state_right: status === 0 ? 'ON' : 'OFF',
                    };
                }
            }
        },
    },
    livolo_dimmer_state: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const stateHeader = Buffer.from([122, 209]);
            if (msg.data.indexOf(stateHeader) === 0) {
                if (msg.data[10] === 7) {
                    const status = msg.data[14];
                    return { state: status & 1 ? 'ON' : 'OFF' };
                }
                else if (msg.data[10] === 13) {
                    const status = msg.data[13];
                    return { state: status & 1 ? 'ON' : 'OFF' };
                }
                else if (msg.data[10] === 5) {
                    // TODO: Unknown dp, assumed value type
                    const value = msg.data[14] * 10;
                    return {
                        brightness: (0, utils_1.mapNumberRange)(value, 0, 1000, 0, 255),
                        brightness_percent: (0, utils_1.mapNumberRange)(value, 0, 1000, 0, 100),
                        level: value,
                    };
                }
            }
        },
    },
    livolo_cover_state: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const dp = msg.data[10];
            const defaults = { motor_direction: 'FORWARD', motor_speed: 40 };
            if (msg.data[0] === 0x7a && msg.data[1] === 0xd1) {
                const reportType = msg.data[12];
                switch (dp) {
                    case 0x0c:
                    case 0x0f:
                        if (reportType === 0x04) {
                            // Position report
                            const position = 100 - msg.data[13];
                            const state = position > 0 ? 'OPEN' : 'CLOSE';
                            const moving = dp === 0x0f;
                            return { ...defaults, ...meta.state, position, state, moving };
                        }
                        if (reportType === 0x12) {
                            // Speed report
                            const motorSpeed = msg.data[13];
                            return { ...defaults, ...meta.state, motor_speed: motorSpeed };
                        }
                        else if (reportType === 0x13) {
                            // Direction report
                            const direction = msg.data[13];
                            if (direction < 0x80) {
                                return { ...defaults, ...meta.state, motor_direction: 'FORWARD' };
                            }
                            else {
                                return { ...defaults, ...meta.state, motor_direction: 'REVERSE' };
                            }
                        }
                        break;
                    case 0x02:
                    case 0x03:
                        // Ignore special commands used only when pairing, as these will rather be handled by `onEvent`
                        return null;
                    case 0x08:
                        // Ignore general command acknowledgements, as they provide no useful information.
                        return null;
                    default:
                        // Unknown dps
                        logger_1.logger.debug(`Unhandled DP ${dp} for ${meta.device.manufacturerName}: ${msg.data.toString('hex')}`, NS);
                }
            }
        },
    },
    livolo_hygrometer_state: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const dp = msg.data[10];
            switch (dp) {
                case 14:
                    return {
                        temperature: Number(msg.data[13]),
                    };
                case 12:
                    return {
                        humidity: Number(msg.data[13]),
                    };
            }
        },
    },
    livolo_illuminance_state: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const dp = msg.data[12];
            const noiseLookup = { 1: 'silent', 2: 'normal', 3: 'lively', 4: 'noisy' };
            switch (dp) {
                case 13:
                    return {
                        illuminance: Number(msg.data[13]),
                    };
                case 14:
                    return {
                        noise_detected: msg.data[13] > 2,
                        noise_level: noiseLookup[msg.data[13]],
                    };
            }
        },
    },
    livolo_pir_state: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const stateHeader = Buffer.from([122, 209]);
            if (msg.data.indexOf(stateHeader) === 0) {
                if (msg.data[10] === 7) {
                    const status = msg.data[14];
                    return {
                        occupancy: status & 1 ? true : false,
                    };
                }
            }
        },
    },
    easycode_action: {
        cluster: 'closuresDoorLock',
        type: 'raw',
        convert: (model, msg, publish, options, meta) => {
            const lookup = {
                13: 'lock',
                14: 'zigbee_unlock',
                3: 'rfid_unlock',
                0: 'keypad_unlock',
            };
            const value = lookup[msg.data[4]];
            if (value == 'lock' || value == 'zigbee_unlock') {
                return { action: value };
            }
            else {
                return { action: lookup[msg.data[3]] };
            }
        },
    },
    easycodetouch_action: {
        cluster: 'closuresDoorLock',
        type: 'raw',
        convert: (model, msg, publish, options, meta) => {
            const value = constants.easyCodeTouchActions[(msg.data[3] << 8) | msg.data[4]];
            if (value) {
                return { action: value };
            }
            else {
                logger_1.logger.warning('Unknown lock status with source ' + msg.data[3] + ' and event code ' + msg.data[4], NS);
            }
        },
    },
    livolo_switch_state_raw: {
        cluster: 'genPowerCfg',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            /*
            header                ieee address            info data
            new socket
            [124,210,21,216,128,  199,147,3,24,0,75,18,0,  19,7,0]       after interview
            [122,209,             199,147,3,24,0,75,18,0,  7,1,6,1,0,11] off
            [122,209,             199,147,3,24,0,75,18,0,  7,1,6,1,1,11] on

            new switch
            [124,210,21,216,128,  228,41,3,24,0,75,18,0,  19,1,0]       after interview
            [122,209,             228,41,3,24,0,75,18,0,  7,1,0,1,0,11] off
            [122,209,             228,41,3,24,0,75,18,0,  7,1,0,1,1,11] on

            old switch
            [124,210,21,216,128,  170, 10,2,24,0,75,18,0,  17,0,1] after interview
            [124,210,21,216,0,     18, 15,5,24,0,75,18,0,  34,0,0] left: 0, right: 0
            [124,210,21,216,0,     18, 15,5,24,0,75,18,0,  34,0,1] left: 1, right: 0
            [124,210,21,216,0,     18, 15,5,24,0,75,18,0,  34,0,2] left: 0, right: 1
            [124,210,21,216,0,     18, 15,5,24,0,75,18,0,  34,0,3] left: 1, right: 1

            curtain switch
            [124,210,21,216,128,  110,74,116,33,0,75,18,0,  19,5,0]        after interview
            [122,209,             110,74,116,33,0,75,18,0,  5,1,5,0,2,11]  left: 0, right: 0  (off)
            [122,209,             110,74,116,33,0,75,18,0,  5,1,5,0,1,11]  left: 1, right: 0  (left on)
            [122,209,             110,74,116,33,0,75,18,0,  5,1,5,0,0,11]  left: 0, right: 1  (right on)

            pir sensor
            [124,210,21,216,128,  225,52,225,34,0,75,18,0,  19,13,0]       after interview
            [122,209,             245,94,225,34,0,75,18,0,  7,1,7,1,1,11]  occupancy: true
            [122,209,             245,94,225,34,0,75,18,0,  7,1,7,1,0,11]  occupancy: false

            hygrometer
            [122,209,             191,22,3,24,0,75,18,0, 14,1,8,21,14,11]  temperature: 21 degrees Celsius
            [122,209,             191,22,3,24,0,75,18,0, 12,1,9,73,12,11]  humidity: 73%

            illuminance
            [124,210,21,216,128,  221,0,115,33,0,75,18,0,  19,12,0]          after interview
            [122,209,             221,0,115,33,0,75,18,0,  12,1,14,4,12,11]  noise: 4 (noisy)
            [122,209,             221,0,115,33,0,75,18,0,  12,1,14,3,12,11]  noise: 3 (lively)
            [122,209,             221,0,115,33,0,75,18,0,  12,1,14,2,12,11]  noise: 2 (normal)
            [122,209,             221,0,115,33,0,75,18,0,  12,1,14,1,12,11]  noise: 1 (silent)
            [122,209,             221,0,115,33,0,75,18,0,  12,1,13,20,12,11] lux: 20
            [122,209,             221,0,115,33,0,75,18,0,  2,0,12,199,1,11]  ??
            */
            const malformedHeader = Buffer.from([0x7c, 0xd2, 0x15, 0xd8, 0x00]);
            const infoHeader = Buffer.from([0x7c, 0xd2, 0x15, 0xd8, 0x80]);
            // status of old devices
            if (msg.data.indexOf(malformedHeader) === 0) {
                const status = msg.data[15];
                return {
                    state_left: status & 1 ? 'ON' : 'OFF',
                    state_right: status & 2 ? 'ON' : 'OFF',
                };
            }
            // info about device
            if (msg.data.indexOf(infoHeader) === 0) {
                if (msg.data.includes(Buffer.from([19, 7, 0]), 13)) {
                    // new socket, hack
                    meta.device.modelID = 'TI0001-socket';
                    meta.device.save();
                }
                // No need to detect this switches, will be done by universal procedure
                /* if (msg.data.includes(Buffer.from([19, 1, 0]), 13)) {
                    // new switch, hack
                    meta.device.modelID = 'TI0001-switch';
                    meta.device.save();
                }
                if (msg.data.includes(Buffer.from([19, 2, 0]), 13)) {
                    // new switch, hack
                    meta.device.modelID = 'TI0001-switch-2gang';
                    meta.device.save();
                }*/
                if (msg.data.includes(Buffer.from([19, 5, 0]), 13)) {
                    logger_1.logger.debug('Detected Livolo Curtain Switch', NS);
                    // curtain switch, hack
                    meta.device.modelID = 'TI0001-curtain-switch';
                    meta.device.save();
                }
                if (msg.data.includes(Buffer.from([19, 20, 0]), 13)) {
                    // new dimmer, hack
                    meta.device.modelID = 'TI0001-dimmer';
                    meta.device.save();
                }
                if (msg.data.includes(Buffer.from([19, 21, 0]), 13)) {
                    meta.device.modelID = 'TI0001-cover';
                    meta.device.save();
                }
                if (msg.data.includes(Buffer.from([19, 13, 0]), 13)) {
                    logger_1.logger.debug('Detected Livolo Pir Sensor', NS);
                    meta.device.modelID = 'TI0001-pir';
                    meta.device.save();
                }
                if (msg.data.includes(Buffer.from([19, 15, 0]), 13)) {
                    logger_1.logger.debug('Detected Livolo Digital Hygrometer', NS);
                    meta.device.modelID = 'TI0001-hygrometer';
                    meta.device.save();
                }
                if (msg.data.includes(Buffer.from([19, 12, 0]), 13)) {
                    logger_1.logger.debug('Detected Livolo Digital Illuminance and Sound Sensor', NS);
                    meta.device.modelID = 'TI0001-illuminance';
                    meta.device.save();
                }
            }
        },
    },
    ptvo_switch_uart: {
        cluster: 'genMultistateValue',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            let data = msg.data['stateText'];
            if (typeof data === 'object') {
                let bHex = false;
                let code;
                let index;
                for (index = 0; index < data.length; index += 1) {
                    code = data[index];
                    if (code < 32 || code > 127) {
                        bHex = true;
                        break;
                    }
                }
                if (!bHex) {
                    data = data.toString('latin1');
                }
                else {
                    data = [...data];
                }
            }
            return { action: data };
        },
    },
    ptvo_switch_analog_input: {
        cluster: 'genAnalogInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            const channel = msg.endpoint.ID;
            const name = `l${channel}`;
            const endpoint = msg.endpoint;
            payload[name] = (0, utils_1.precisionRound)(msg.data['presentValue'], 3);
            const cluster = 'genLevelCtrl';
            if (endpoint && (endpoint.supportsInputCluster(cluster) || endpoint.supportsOutputCluster(cluster))) {
                payload['brightness_' + name] = msg.data['presentValue'];
            }
            else if (msg.data.description !== undefined) {
                const data1 = msg.data['description'];
                if (data1) {
                    const data2 = data1.split(',');
                    const devid = data2[1];
                    const unit = data2[0];
                    if (devid) {
                        payload['device_' + name] = devid;
                    }
                    const valRaw = msg.data['presentValue'];
                    if (unit) {
                        let val = (0, utils_1.precisionRound)(valRaw, 1);
                        const nameLookup = {
                            C: 'temperature',
                            '%': 'humidity',
                            m: 'altitude',
                            Pa: 'pressure',
                            ppm: 'quality',
                            psize: 'particle_size',
                            V: 'voltage',
                            A: 'current',
                            Wh: 'energy',
                            W: 'power',
                            Hz: 'frequency',
                            pf: 'power_factor',
                            lx: 'illuminance_lux',
                        };
                        let nameAlt = '';
                        if (unit === 'A' || unit === 'pf') {
                            if (valRaw < 1) {
                                val = (0, utils_1.precisionRound)(valRaw, 3);
                            }
                        }
                        if (unit.startsWith('mcpm') || unit.startsWith('ncpm')) {
                            const num = unit.substr(4, 1);
                            nameAlt = num === 'A' ? unit.substr(0, 4) + '10' : unit;
                            val = (0, utils_1.precisionRound)(valRaw, 2);
                        }
                        else {
                            nameAlt = nameLookup[unit];
                        }
                        if (nameAlt === undefined) {
                            const valueIndex = parseInt(unit, 10);
                            if (!isNaN(valueIndex)) {
                                nameAlt = 'val' + unit;
                            }
                        }
                        if (nameAlt !== undefined) {
                            payload[nameAlt + '_' + name] = val;
                        }
                    }
                }
            }
            return payload;
        },
    },
    keypad20states: {
        cluster: 'genOnOff',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            const button = (0, utils_1.getKey)(model.endpoint(msg.device), msg.endpoint.ID);
            const state = msg.data['onOff'] === 1 ? true : false;
            if (button) {
                return { [button]: state };
            }
        },
    },
    keypad20_battery: {
        cluster: 'genPowerCfg',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            const voltage = msg.data['mainsVoltage'] / 10;
            return {
                battery: (0, utils_1.batteryVoltageToPercentage)(voltage, '3V_2100'),
                voltage: voltage, // @deprecated
                // voltage: voltage / 1000.0,
            };
        },
    },
    plaid_battery: {
        cluster: 'genPowerCfg',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            if (msg.data.mainsVoltage !== undefined) {
                payload.voltage = msg.data['mainsVoltage'];
                if (model.meta && model.meta.battery && model.meta.battery.voltageToPercentage) {
                    payload.battery = (0, utils_1.batteryVoltageToPercentage)(payload.voltage, model.meta.battery.voltageToPercentage);
                }
            }
            return payload;
        },
    },
    heiman_ir_remote: {
        cluster: 'heimanSpecificInfraRedRemote',
        type: ['commandStudyKeyRsp', 'commandCreateIdRsp', 'commandGetIdAndKeyCodeListRsp'],
        convert: (model, msg, publish, options, meta) => {
            switch (msg.type) {
                case 'commandStudyKeyRsp':
                    return {
                        action: 'learn',
                        action_result: msg.data.result === 1 ? 'success' : 'error',
                        action_key_code: msg.data.keyCode,
                        action_id: msg.data.result === 1 ? msg.data.id : undefined,
                    };
                case 'commandCreateIdRsp':
                    return {
                        action: 'create',
                        action_result: msg.data.id === 0xff ? 'error' : 'success',
                        action_model_type: msg.data.modelType,
                        action_id: msg.data.id !== 0xff ? msg.data.id : undefined,
                    };
                case 'commandGetIdAndKeyCodeListRsp': {
                    // See cluster.js with data format description
                    if (msg.data.packetNumber === 1) {
                        // start to collect and merge list
                        // so, we use store instance for temp storage during merging
                        globalStore.putValue(msg.endpoint, 'db', []);
                    }
                    const buffer = msg.data.learnedDevicesList;
                    for (let i = 0; i < msg.data.packetLength;) {
                        const modelDescription = {
                            id: buffer[i],
                            model_type: buffer[i + 1],
                            key_codes: [],
                        };
                        const numberOfKeys = buffer[i + 2];
                        for (let j = i + 3; j < i + 3 + numberOfKeys; j++) {
                            modelDescription.key_codes.push(buffer[j]);
                        }
                        i = i + 3 + numberOfKeys;
                        globalStore.getValue(msg.endpoint, 'db').push(modelDescription);
                    }
                    if (msg.data.packetNumber === msg.data.packetsTotal) {
                        // last packet, all data collected, can publish
                        const result = {
                            devices: globalStore.getValue(msg.endpoint, 'db'),
                        };
                        globalStore.clearValue(msg.endpoint, 'db');
                        return result;
                    }
                    break;
                }
            }
        },
    },
    meazon_meter: {
        cluster: 'seMetering',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            // typo on property name to stick with zcl definition
            if (msg.data.inletTempreature !== undefined) {
                result.inlet_temperature = (0, utils_1.precisionRound)(msg.data['inletTempreature'], 2);
                result.inletTemperature = result.inlet_temperature; // deprecated
            }
            if (msg.data.status !== undefined) {
                result.status = (0, utils_1.precisionRound)(msg.data['status'], 2);
            }
            if (msg.data['8192'] !== undefined) {
                result.line_frequency = (0, utils_1.precisionRound)(parseFloat(msg.data['8192']) / 100.0, 2);
                result.linefrequency = result.line_frequency; // deprecated
            }
            if (msg.data['8193'] !== undefined) {
                result.power = (0, utils_1.precisionRound)(msg.data['8193'], 2);
            }
            if (msg.data['8196'] !== undefined) {
                result.voltage = (0, utils_1.precisionRound)(msg.data['8196'], 2);
            }
            if (msg.data['8213'] !== undefined) {
                result.voltage = (0, utils_1.precisionRound)(msg.data['8213'], 2);
            }
            if (msg.data['8199'] !== undefined) {
                result.current = (0, utils_1.precisionRound)(msg.data['8199'], 2);
            }
            if (msg.data['8216'] !== undefined) {
                result.current = (0, utils_1.precisionRound)(msg.data['8216'], 2);
            }
            if (msg.data['8202'] !== undefined) {
                result.reactive_power = (0, utils_1.precisionRound)(msg.data['8202'], 2);
                result.reactivepower = result.reactive_power; // deprecated
            }
            if (msg.data['12288'] !== undefined) {
                result.energy_consumed = (0, utils_1.precisionRound)(msg.data['12288'], 2); // deprecated
                result.energyconsumed = result.energy_consumed; // deprecated
                result.energy = result.energy_consumed;
            }
            if (msg.data['12291'] !== undefined) {
                result.energy_produced = (0, utils_1.precisionRound)(msg.data['12291'], 2);
                result.energyproduced = result.energy_produced; // deprecated
            }
            if (msg.data['12294'] !== undefined) {
                result.reactive_summation = (0, utils_1.precisionRound)(msg.data['12294'], 2);
                result.reactivesummation = result.reactive_summation; // deprecated
            }
            if (msg.data['16408'] !== undefined) {
                result.measure_serial = (0, utils_1.precisionRound)(msg.data['16408'], 2);
                result.measureserial = result.measure_serial; // deprecated
            }
            return result;
        },
    },
    danfoss_thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.danfossWindowOpenFeatureEnable !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('window_open_feature', msg, model, meta)] = msg.data['danfossWindowOpenFeatureEnable'] === 1;
            }
            if (msg.data.danfossWindowOpenInternal !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('window_open_internal', msg, model, meta)] =
                    constants.danfossWindowOpen[msg.data['danfossWindowOpenInternal']] !== undefined
                        ? constants.danfossWindowOpen[msg.data['danfossWindowOpenInternal']]
                        : msg.data['danfossWindowOpenInternal'];
            }
            if (msg.data.danfossWindowOpenExternal !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('window_open_external', msg, model, meta)] = msg.data['danfossWindowOpenExternal'] === 1;
            }
            if (msg.data.danfossDayOfWeek !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('day_of_week', msg, model, meta)] =
                    constants.thermostatDayOfWeek[msg.data['danfossDayOfWeek']] !== undefined
                        ? constants.thermostatDayOfWeek[msg.data['danfossDayOfWeek']]
                        : msg.data['danfossDayOfWeek'];
            }
            if (msg.data.danfossTriggerTime !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('trigger_time', msg, model, meta)] = msg.data['danfossTriggerTime'];
            }
            if (msg.data.danfossMountedModeActive !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('mounted_mode_active', msg, model, meta)] = msg.data['danfossMountedModeActive'] === 1;
            }
            if (msg.data.danfossMountedModeControl !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('mounted_mode_control', msg, model, meta)] = msg.data['danfossMountedModeControl'] === 1;
            }
            if (msg.data.danfossThermostatOrientation !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('thermostat_vertical_orientation', msg, model, meta)] = msg.data['danfossThermostatOrientation'] === 1;
            }
            if (msg.data.danfossExternalMeasuredRoomSensor !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('external_measured_room_sensor', msg, model, meta)] = msg.data['danfossExternalMeasuredRoomSensor'];
            }
            if (msg.data.danfossRadiatorCovered !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('radiator_covered', msg, model, meta)] = msg.data['danfossRadiatorCovered'] === 1;
            }
            if (msg.data.danfossViewingDirection !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('viewing_direction', msg, model, meta)] = msg.data['danfossViewingDirection'] === 1;
            }
            if (msg.data.danfossAlgorithmScaleFactor !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('algorithm_scale_factor', msg, model, meta)] = msg.data['danfossAlgorithmScaleFactor'];
            }
            if (msg.data.danfossHeatAvailable !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('heat_available', msg, model, meta)] = msg.data['danfossHeatAvailable'] === 1;
            }
            if (msg.data.danfossHeatRequired !== undefined) {
                if (msg.data['danfossHeatRequired'] === 1) {
                    result[(0, utils_1.postfixWithEndpointName)('heat_required', msg, model, meta)] = true;
                    result[(0, utils_1.postfixWithEndpointName)('running_state', msg, model, meta)] = 'heat';
                }
                else {
                    result[(0, utils_1.postfixWithEndpointName)('heat_required', msg, model, meta)] = false;
                    result[(0, utils_1.postfixWithEndpointName)('running_state', msg, model, meta)] = 'idle';
                }
            }
            if (msg.data.danfossLoadBalancingEnable !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('load_balancing_enable', msg, model, meta)] = msg.data['danfossLoadBalancingEnable'] === 1;
            }
            if (msg.data.danfossLoadRoomMean !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('load_room_mean', msg, model, meta)] = msg.data['danfossLoadRoomMean'];
            }
            if (msg.data.danfossLoadEstimate !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('load_estimate', msg, model, meta)] = msg.data['danfossLoadEstimate'];
            }
            if (msg.data.danfossPreheatStatus !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('preheat_status', msg, model, meta)] = msg.data['danfossPreheatStatus'] === 1;
            }
            if (msg.data.danfossAdaptionRunStatus !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('adaptation_run_status', msg, model, meta)] =
                    constants.danfossAdaptionRunStatus[msg.data['danfossAdaptionRunStatus']];
            }
            if (msg.data.danfossAdaptionRunSettings !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('adaptation_run_settings', msg, model, meta)] = msg.data['danfossAdaptionRunSettings'] === 1;
            }
            if (msg.data.danfossAdaptionRunControl !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('adaptation_run_control', msg, model, meta)] =
                    constants.danfossAdaptionRunControl[msg.data['danfossAdaptionRunControl']];
            }
            if (msg.data.danfossRegulationSetpointOffset !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('regulation_setpoint_offset', msg, model, meta)] = msg.data['danfossRegulationSetpointOffset'];
            }
            // Danfoss Icon Converters
            if (msg.data.danfossRoomStatusCode !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('room_status_code', msg, model, meta)] =
                    constants.danfossRoomStatusCode[msg.data['danfossRoomStatusCode']] !== undefined
                        ? constants.danfossRoomStatusCode[msg.data['danfossRoomStatusCode']]
                        : msg.data['danfossRoomStatusCode'];
            }
            if (msg.data.danfossOutputStatus !== undefined) {
                if (msg.data['danfossOutputStatus'] === 1) {
                    result[(0, utils_1.postfixWithEndpointName)('output_status', msg, model, meta)] = 'active';
                    result[(0, utils_1.postfixWithEndpointName)('running_state', msg, model, meta)] = 'heat';
                }
                else {
                    result[(0, utils_1.postfixWithEndpointName)('output_status', msg, model, meta)] = 'inactive';
                    result[(0, utils_1.postfixWithEndpointName)('running_state', msg, model, meta)] = 'idle';
                }
            }
            return result;
        },
    },
    danfoss_thermostat_setpoint_scheduled: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.occupiedHeatingSetpoint !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('occupied_heating_setpoint_scheduled', msg, model, meta)] =
                    (0, utils_1.precisionRound)(msg.data['occupiedHeatingSetpoint'], 2) / 100;
            }
            return result;
        },
    },
    danfoss_icon_floor_sensor: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.danfossRoomFloorSensorMode !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('room_floor_sensor_mode', msg, model, meta)] =
                    constants.danfossRoomFloorSensorMode[msg.data['danfossRoomFloorSensorMode']] !== undefined
                        ? constants.danfossRoomFloorSensorMode[msg.data['danfossRoomFloorSensorMode']]
                        : msg.data['danfossRoomFloorSensorMode'];
            }
            if (msg.data.danfossFloorMinSetpoint !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['danfossFloorMinSetpoint'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('floor_min_setpoint', msg, model, meta)] = value;
                }
            }
            if (msg.data.danfossFloorMaxSetpoint !== undefined) {
                const value = (0, utils_1.precisionRound)(msg.data['danfossFloorMaxSetpoint'], 2) / 100;
                if (value >= -273.15) {
                    result[(0, utils_1.postfixWithEndpointName)('floor_max_setpoint', msg, model, meta)] = value;
                }
            }
            return result;
        },
    },
    danfoss_icon_battery: {
        cluster: 'genPowerCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.batteryPercentageRemaining !== undefined) {
                // Some devices do not comply to the ZCL and report a
                // batteryPercentageRemaining of 100 when the battery is full (should be 200).
                const dontDividePercentage = model.meta && model.meta.battery && model.meta.battery.dontDividePercentage;
                let percentage = msg.data['batteryPercentageRemaining'];
                percentage = dontDividePercentage ? percentage : percentage / 2;
                result[(0, utils_1.postfixWithEndpointName)('battery', msg, model, meta)] = (0, utils_1.precisionRound)(percentage, 2);
            }
            return result;
        },
    },
    danfoss_icon_regulator: {
        cluster: 'haDiagnostic',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.danfossSystemStatusCode !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('system_status_code', msg, model, meta)] =
                    constants.danfossSystemStatusCode[msg.data['danfossSystemStatusCode']] !== undefined
                        ? constants.danfossSystemStatusCode[msg.data['danfossSystemStatusCode']]
                        : msg.data['danfossSystemStatusCode'];
            }
            if (msg.data.danfossSystemStatusWater !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('system_status_water', msg, model, meta)] =
                    constants.danfossSystemStatusWater[msg.data['danfossSystemStatusWater']] !== undefined
                        ? constants.danfossSystemStatusWater[msg.data['danfossSystemStatusWater']]
                        : msg.data['danfossSystemStatusWater'];
            }
            if (msg.data.danfossMultimasterRole !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('multimaster_role', msg, model, meta)] =
                    constants.danfossMultimasterRole[msg.data['danfossMultimasterRole']] !== undefined
                        ? constants.danfossMultimasterRole[msg.data['danfossMultimasterRole']]
                        : msg.data['danfossMultimasterRole'];
            }
            return result;
        },
    },
    danfoss_icon_hvac_user_interface: {
        cluster: 'hvacUserInterfaceCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.keypadLockout !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('keypad_lockout', msg, model, meta)] =
                    constants.keypadLockoutMode[msg.data['keypadLockout']] !== undefined
                        ? constants.keypadLockoutMode[msg.data['keypadLockout']]
                        : msg.data['keypadLockout'];
            }
            if (msg.data.tempDisplayMode !== undefined) {
                result[(0, utils_1.postfixWithEndpointName)('temperature_display_mode', msg, model, meta)] =
                    constants.temperatureDisplayMode[msg.data['tempDisplayMode']] !== undefined
                        ? constants.temperatureDisplayMode[msg.data['tempDisplayMode']]
                        : msg.data['tempDisplayMode'];
            }
            return result;
        },
    },
    orvibo_raw_1: {
        cluster: 23,
        type: 'raw',
        convert: (model, msg, publish, options, meta) => {
            // 25,0,8,3,0,0 - click btn 1
            // 25,0,8,3,0,2 - hold btn 1
            // 25,0,8,3,0,3 - release btn 1
            // 25,0,8,11,0,0 - click btn 2
            // 25,0,8,11,0,2 - hold btn 2
            // 25,0,8,11,0,3 - release btn 2
            // 25,0,8,7,0,0 - click btn 3
            // 25,0,8,7,0,2 - hold btn 3
            // 25,0,8,7,0,3 - release btn 3
            // 25,0,8,15,0,0 - click btn 4
            // 25,0,8,15,0,2 - hold btn 4
            // 25,0,8,15,0,3 - release btn 4
            // TODO: do not know how to get to use 5,6,7,8 buttons
            const buttonLookup = {
                3: 'button_1',
                11: 'button_2',
                7: 'button_3',
                15: 'button_4',
            };
            const actionLookup = {
                0: 'click',
                2: 'hold',
                3: 'release',
            };
            const button = buttonLookup[msg.data[3]];
            const action = actionLookup[msg.data[5]];
            if (button) {
                return { action: `${button}_${action}` };
            }
        },
    },
    orvibo_raw_2: {
        cluster: 23,
        type: 'raw',
        convert: (model, msg, publish, options, meta) => {
            const buttonLookup = {
                1: 'button_1',
                2: 'button_2',
                3: 'button_3',
                4: 'button_4',
                5: 'button_5',
                6: 'button_6',
                7: 'button_7',
            };
            const actionLookup = {
                0: 'click',
                2: 'hold',
                3: 'release',
            };
            const button = buttonLookup[msg.data[3]];
            const action = actionLookup[msg.data[5]];
            if (button) {
                return { action: `${button}_${action}` };
            }
        },
    },
    tint_scene: {
        cluster: 'genBasic',
        type: 'write',
        convert: (model, msg, publish, options, meta) => {
            const payload = { action: `scene_${msg.data['16389']}` };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    tint404011_move_to_color_temp: {
        cluster: 'lightingColorCtrl',
        type: 'commandMoveToColorTemp',
        convert: (model, msg, publish, options, meta) => {
            // The remote has an internal state so store the last action in order to
            // determine the direction of the color temperature change.
            if (!globalStore.hasValue(msg.endpoint, 'last_color_temp')) {
                globalStore.putValue(msg.endpoint, 'last_color_temp', msg.data.colortemp);
            }
            const lastTemp = globalStore.getValue(msg.endpoint, 'last_color_temp');
            globalStore.putValue(msg.endpoint, 'last_color_temp', msg.data.colortemp);
            let direction = 'down';
            if (lastTemp > msg.data.colortemp) {
                direction = 'up';
            }
            else if (lastTemp < msg.data.colortemp) {
                direction = 'down';
            }
            else if (msg.data.colortemp == 370 || msg.data.colortemp == 555) {
                // The remote goes up to 370 in steps and emits 555 on down button hold.
                direction = 'down';
            }
            else if (msg.data.colortemp == 153) {
                direction = 'up';
            }
            const payload = {
                action: (0, utils_1.postfixWithEndpointName)(`color_temperature_move`, msg, model, meta),
                action_color_temperature: msg.data.colortemp,
                action_transition_time: msg.data.transtime,
                action_color_temperature_direction: direction,
            };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    restorable_brightness: {
        cluster: 'genLevelCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.currentLevel !== undefined) {
                // Ignore brightness = 0, which only happens when state is OFF
                if (Number(msg.data['currentLevel']) > 0) {
                    return { brightness: msg.data['currentLevel'] };
                }
                return {};
            }
        },
    },
    ewelink_action: {
        cluster: 'genOnOff',
        type: ['commandOn', 'commandOff', 'commandToggle'],
        convert: (model, msg, publish, options, meta) => {
            const lookup = { commandToggle: 'single', commandOn: 'double', commandOff: 'long' };
            return { action: lookup[msg.type] };
        },
    },
    diyruz_contact: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return { contact: msg.data['onOff'] !== 0 };
        },
    },
    diyruz_rspm: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const power = (0, utils_1.precisionRound)(msg.data['41364'], 2);
            return {
                state: msg.data['onOff'] === 1 ? 'ON' : 'OFF',
                cpu_temperature: (0, utils_1.precisionRound)(msg.data['41361'], 2),
                power: power,
                current: (0, utils_1.precisionRound)(power / 230, 2),
                action: msg.data['41367'] === 1 ? 'hold' : 'release',
            };
        },
    },
    K4003C_binary_input: {
        cluster: 'genBinaryInput',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            return { action: msg.data.presentValue === 1 ? 'off' : 'on' };
        },
    },
    enocean_ptm215z: {
        cluster: 'greenPower',
        type: ['commandNotification', 'commandCommissioningNotification'],
        convert: (model, msg, publish, options, meta) => {
            const commandID = msg.data.commandID;
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model, msg.data.frameCounter, `${msg.device.ieeeAddr}_${commandID}`))
                return;
            if (commandID === 224)
                return; // Skip commissioning command.
            // Button 1: A0 (top left)
            // Button 2: A1 (bottom left)
            // Button 3: B0 (top right)
            // Button 4: B1 (bottom right)
            const lookup = {
                0x10: 'press_1',
                0x14: 'release_1',
                0x11: 'press_2',
                0x15: 'release_2',
                0x13: 'press_3',
                0x17: 'release_3',
                0x12: 'press_4',
                0x16: 'release_4',
                0x64: 'press_1_and_3',
                0x65: 'release_1_and_3',
                0x62: 'press_2_and_4',
                0x63: 'release_2_and_4',
                0x22: 'press_energy_bar',
            };
            const action = lookup[commandID] !== undefined ? lookup[commandID] : `unknown_${commandID}`;
            return { action };
        },
    },
    enocean_ptm215ze: {
        cluster: 'greenPower',
        type: ['commandNotification', 'commandCommissioningNotification'],
        convert: (model, msg, publish, options, meta) => {
            const commandID = msg.data.commandID;
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model, msg.data.frameCounter, `${msg.device.ieeeAddr}_${commandID}`))
                return;
            if (commandID === 224)
                return;
            // Button 1: A0 (top left)
            // Button 2: A1 (bottom left)
            // Button 3: B0 (top right)
            // Button 4: B1 (bottom right)
            const lookup = {
                0x22: 'press_1',
                0x23: 'release_1',
                0x18: 'press_2',
                0x19: 'release_2',
                0x14: 'press_3',
                0x15: 'release_3',
                0x12: 'press_4',
                0x13: 'release_4',
                0x64: 'press_1_and_2',
                0x65: 'release_1_and_2',
                0x62: 'press_1_and_3',
                0x63: 'release_1_and_3',
                0x1e: 'press_1_and_4',
                0x1f: 'release_1_and_4',
                0x1c: 'press_2_and_3',
                0x1d: 'release_2_and_3',
                0x1a: 'press_2_and_4',
                0x1b: 'release_2_and_4',
                0x16: 'press_3_and_4',
                0x17: 'release_3_and_4',
                0x10: 'press_energy_bar',
                0x11: 'release_energy_bar',
                0x0: 'press_or_release_all',
                0x50: 'lock',
                0x51: 'unlock',
                0x52: 'half_open',
                0x53: 'tilt',
            };
            if (lookup[commandID] === undefined) {
                logger_1.logger.error(`PTM 215ZE: missing command '${commandID}'`, NS);
            }
            else {
                return { action: lookup[commandID] };
            }
        },
    },
    enocean_ptm216z: {
        cluster: 'greenPower',
        type: ['commandNotification', 'commandCommissioningNotification'],
        convert: (model, msg, publish, options, meta) => {
            const commandID = msg.data.commandID;
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model, msg.data.frameCounter, `${msg.device.ieeeAddr}_${commandID}`))
                return;
            if (commandID === 224)
                return;
            // Button 1: A0 (top left)
            // Button 2: A1 (bottom left)
            // Button 3: B0 (top right)
            // Button 4: B1 (bottom right)
            const lookup = {
                '105_1': 'press_1',
                '105_2': 'press_2',
                '105_3': 'press_1_and_2',
                '105_4': 'press_3',
                '105_5': 'press_1_and_3',
                '105_6': 'press_3_and_4',
                '105_7': 'press_1_and_2_and_3',
                '105_8': 'press_4',
                '105_9': 'press_1_and_4',
                '105_10': 'press_2_and_4',
                '105_11': 'press_1_and_2_and_4',
                '105_12': 'press_3_and_4',
                '105_13': 'press_1_and_3_and_4',
                '105_14': 'press_2_and_3_and_4',
                '105_15': 'press_all',
                '105_16': 'press_energy_bar',
                '106_0': 'release',
                '104_': 'short_press_2_of_2',
            };
            const ID = `${commandID}_${msg.data.commandFrame.raw?.slice(0, 1).join('_') ?? ''}`;
            if (lookup[ID] === undefined) {
                logger_1.logger.error(`PTM 216Z: missing command '${ID}'`, NS);
            }
            else {
                return { action: lookup[ID] };
            }
        },
    },
    _8840100H_water_leak_alarm: {
        cluster: 'haApplianceEventsAlerts',
        type: 'commandAlertsNotification',
        convert: (model, msg, publish, options, meta) => {
            const alertStatus = msg.data.aalert;
            return {
                water_leak: (alertStatus & (1 << 12)) > 0,
            };
        },
    },
    diyruz_freepad_clicks: {
        cluster: 'genMultistateInput',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            const button = (0, utils_1.getKey)(model.endpoint(msg.device), msg.endpoint.ID);
            const lookup = { 0: 'hold', 1: 'single', 2: 'double', 3: 'triple', 4: 'quadruple', 255: 'release' };
            const clicks = msg.data['presentValue'];
            const action = lookup[clicks] ? lookup[clicks] : `many_${clicks}`;
            return { action: `${button}_${action}` };
        },
    },
    kmpcil_res005_occupancy: {
        cluster: 'genBinaryInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return { occupancy: msg.data['presentValue'] === 1 };
        },
    },
    kmpcil_res005_on_off: {
        cluster: 'genBinaryOutput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return { state: msg.data['presentValue'] == 0 ? 'OFF' : 'ON' };
        },
    },
    _3310_humidity: {
        cluster: 'manuSpecificCentraliteHumidity',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const humidity = parseFloat(msg.data['measuredValue']) / 100.0;
            return { humidity };
        },
    },
    smartthings_acceleration: {
        cluster: 'manuSpecificSamsungAccelerometer',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            if (msg.data.acceleration !== undefined)
                payload.moving = msg.data['acceleration'] === 1;
            // https://github.com/SmartThingsCommunity/SmartThingsPublic/blob/master/devicetypes/smartthings/smartsense-multi-sensor.src/smartsense-multi-sensor.groovy#L222
            /*
                The axes reported by the sensor are mapped differently in the SmartThings DTH.
                Preserving that functionality here.
                xyzResults.x = z
                xyzResults.y = y
                xyzResults.z = -x
            */
            if (msg.data.z_axis !== undefined)
                payload.x_axis = msg.data['z_axis'];
            if (msg.data.y_axis !== undefined)
                payload.y_axis = msg.data['y_axis'];
            if (msg.data.x_axis !== undefined)
                payload.z_axis = -msg.data['x_axis'];
            return payload;
        },
    },
    byun_smoke_false: {
        cluster: 'pHMeasurement',
        type: ['attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.endpoint.ID == 1 && msg.data['measuredValue'] == 0) {
                return { smoke: false };
            }
        },
    },
    byun_smoke_true: {
        cluster: 'ssIasZone',
        type: ['commandStatusChangeNotification'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.endpoint.ID == 1 && msg.data['zonestatus'] == 33) {
                return { smoke: true };
            }
        },
    },
    byun_gas_false: {
        cluster: 1034,
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.endpoint.ID == 1 && msg.data[0] == 24) {
                return { gas: false };
            }
        },
    },
    byun_gas_true: {
        cluster: 'ssIasZone',
        type: ['commandStatusChangeNotification'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.endpoint.ID == 1 && msg.data['zonestatus'] == 33) {
                return { gas: true };
            }
        },
    },
    hue_smart_button_event: {
        cluster: 'manuSpecificPhilips',
        type: 'commandHueNotification',
        convert: (model, msg, publish, options, meta) => {
            // Philips HUE Smart Button "ROM001": these events are always from "button 1"
            const lookup = { 0: 'press', 1: 'hold', 2: 'release', 3: 'release' };
            return { action: lookup[msg.data['type']] };
        },
    },
    legrand_binary_input_moving: {
        cluster: 'genBinaryInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return { action: msg.data.presentValue ? 'moving' : 'stopped' };
        },
    },
    legrand_binary_input_on_off: {
        cluster: 'genBinaryInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const multiEndpoint = model.meta && model.meta.multiEndpoint;
            const property = multiEndpoint ? (0, utils_1.postfixWithEndpointName)('state', msg, model, meta) : 'state';
            return { [property]: msg.data.presentValue ? 'ON' : 'OFF' };
        },
    },
    bticino_4027C_binary_input_moving: {
        cluster: 'genBinaryInput',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.no_position_support()],
        convert: (model, msg, publish, options, meta) => {
            return options.no_position_support
                ? { action: msg.data.presentValue ? 'stopped' : 'moving', position: 50 }
                : { action: msg.data.presentValue ? 'stopped' : 'moving' };
        },
    },
    legrand_scenes: {
        cluster: 'genScenes',
        type: 'commandRecall',
        convert: (model, msg, publish, options, meta) => {
            const lookup = { 0xfff7: 'enter', 0xfff6: 'leave', 0xfff4: 'sleep', 0xfff5: 'wakeup' };
            return { action: lookup[msg.data.groupid] ? lookup[msg.data.groupid] : 'default' };
        },
    },
    legrand_master_switch_center: {
        cluster: 'manuSpecificLegrandDevices',
        type: 'raw',
        convert: (model, msg, publish, options, meta) => {
            if (msg.data &&
                msg.data.length === 6 &&
                msg.data[0] === 0x15 &&
                msg.data[1] === 0x21 &&
                msg.data[2] === 0x10 &&
                msg.data[3] === 0x00 &&
                msg.data[4] === 0x03 &&
                msg.data[5] === 0xff) {
                return { action: 'center' };
            }
        },
    },
    legrand_pilot_wire_mode: {
        cluster: 'manuSpecificLegrandDevices2',
        type: ['readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            const mode = msg.data['0'];
            if (mode === 0x00)
                payload.pilot_wire_mode = 'comfort';
            else if (mode === 0x01)
                payload.pilot_wire_mode = 'comfort_-1';
            else if (mode === 0x02)
                payload.pilot_wire_mode = 'comfort_-2';
            else if (mode === 0x03)
                payload.pilot_wire_mode = 'eco';
            else if (mode === 0x04)
                payload.pilot_wire_mode = 'frost_protection';
            else if (mode === 0x05)
                payload.pilot_wire_mode = 'off';
            else {
                logger_1.logger.warning(`Bad mode : ${mode}`, NS);
                payload.pilot_wire_mode = 'unknown';
            }
            return payload;
        },
    },
    legrand_power_alarm: {
        cluster: 'haElectricalMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            // 0xf000 = 61440
            // This attribute returns usually 2 when power is over the defined threshold.
            if (msg.data['61440'] !== undefined) {
                payload.power_alarm_active_value = msg.data['61440'];
                payload.power_alarm_active = payload.power_alarm_active_value > 0;
            }
            // 0xf001 = 61441
            if (msg.data['61441'] !== undefined) {
                payload.power_alarm_enabled = msg.data['61441'];
            }
            // 0xf002 = 61442, wh = watt hour
            if (msg.data['61442'] !== undefined) {
                payload.power_alarm_wh_threshold = msg.data['61442'];
            }
            return payload;
        },
    },
    legrand_greenpower: {
        cluster: 'greenPower',
        type: ['commandNotification', 'commandCommissioningNotification'],
        convert: (model, msg, publish, options, meta) => {
            const commandID = msg.data.commandID;
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model, msg.data.frameCounter, `${msg.device.ieeeAddr}_${commandID}`))
                return;
            if (commandID === 224)
                return;
            const lookup = {
                0x10: 'home_arrival',
                0x11: 'home_departure', // ZLGP14
                0x12: 'daytime_day',
                0x13: 'daytime_night', // ZLGP16, yes these commandIDs are lower than ZLGP15s'
                0x14: 'press_1',
                0x15: 'press_2',
                0x16: 'press_3',
                0x17: 'press_4', // ZLGP15
                0x22: 'press_once',
                0x20: 'press_twice', // ZLGP17, ZLGP18
                0x34: 'stop',
                0x35: 'up',
                0x36: 'down', // 600087l
            };
            if (lookup[commandID] === undefined) {
                logger_1.logger.error(`Legrand GreenPower: missing command '${commandID}'`, NS);
            }
            else {
                return { action: lookup[commandID] };
            }
        },
    },
    W2_module_carbon_monoxide: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                carbon_monoxide: (zoneStatus & (1 << 8)) > 8,
            };
        },
    },
    command_status_change_notification_action: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const lookup = { 0: 'off', 1: 'single', 2: 'double', 3: 'hold' };
            return { action: lookup[msg.data.zonestatus] };
        },
    },
    ptvo_multistate_action: {
        cluster: 'genMultistateInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const actionLookup = { 0: 'release', 1: 'single', 2: 'double', 3: 'tripple', 4: 'hold' };
            const value = msg.data['presentValue'];
            const action = actionLookup[value];
            return { action: (0, utils_1.postfixWithEndpointName)(action, msg, model, meta) };
        },
    },
    konke_action: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const value = msg.data['onOff'];
            const lookup = { 128: 'single', 129: 'double', 130: 'hold' };
            return lookup[value] ? { action: lookup[value] } : null;
        },
    },
    qlwz_letv8key_switch: {
        cluster: 'genMultistateInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const buttonLookup = { 4: 'up', 2: 'down', 5: 'left', 3: 'right', 8: 'center', 1: 'back', 7: 'play', 6: 'voice' };
            const actionLookup = { 0: 'hold', 1: 'single', 2: 'double', 3: 'tripple' };
            const button = buttonLookup[msg.endpoint.ID];
            const action = actionLookup[msg.data['presentValue']] || msg.data['presentValue'];
            if (button) {
                return { action: `${action}_${button}` };
            }
        },
    },
    keen_home_smart_vent_pressure: {
        cluster: 'msPressureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const pressure = msg.data.measuredValue !== undefined ? msg.data.measuredValue : parseFloat(msg.data['32']) / 1000.0;
            return { pressure };
        },
    },
    U02I007C01_contact: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            if (msg.endpoint.ID != 1)
                return;
            return {
                contact: !((zoneStatus & 1) > 0),
            };
        },
    },
    U02I007C01_water_leak: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            if (msg.endpoint.ID != 2)
                return;
            return {
                water_leak: (zoneStatus & 1) > 0,
            };
        },
    },
    heiman_hcho: {
        cluster: 'msFormaldehyde',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data['measuredValue']) {
                return { hcho: parseFloat(msg.data['measuredValue']) / 1000.0 };
            }
        },
    },
    heiman_air_quality: {
        cluster: 'heimanSpecificAirQuality',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data['batteryState']) {
                const lookup = {
                    0: 'not_charging',
                    1: 'charging',
                    2: 'charged',
                };
                result['battery_state'] = lookup[msg.data['batteryState']];
            }
            if (msg.data['tvocMeasuredValue'])
                result['voc'] = msg.data['tvocMeasuredValue'];
            if (msg.data['aqiMeasuredValue'])
                result['aqi'] = msg.data['aqiMeasuredValue'];
            if (msg.data['pm10measuredValue'])
                result['pm10'] = msg.data['pm10measuredValue'];
            return result;
        },
    },
    scenes_recall_scene_65024: {
        cluster: 65024,
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            return { action: `scene_${msg.data[msg.data.length - 2] - 9}` };
        },
    },
    adeo_button_65024: {
        cluster: 65024,
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const clickMapping = { 1: 'single', 2: 'double', 3: 'hold' };
            return { action: `${clickMapping[msg.data[6]]}` };
        },
    },
    color_stop_raw: {
        cluster: 'lightingColorCtrl',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const payload = { action: (0, utils_1.postfixWithEndpointName)(`color_stop`, msg, model, meta) };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    almond_click: {
        cluster: 'ssIasAce',
        type: ['commandArm'],
        convert: (model, msg, publish, options, meta) => {
            const action = msg.data['armmode'];
            const lookup = { 3: 'single', 0: 'double', 2: 'long' };
            // Workaround to ignore duplicated (false) presses that
            // are 100ms apart, since the button often generates
            // multiple duplicated messages for a single click event.
            if (!globalStore.hasValue(msg.endpoint, 'since')) {
                globalStore.putValue(msg.endpoint, 'since', 0);
            }
            const now = Date.now();
            const since = globalStore.getValue(msg.endpoint, 'since');
            if (now - since > 100 && lookup[action]) {
                globalStore.putValue(msg.endpoint, 'since', now);
                return { action: lookup[action] };
            }
        },
    },
    SAGE206612_state: {
        cluster: 'genOnOff',
        type: ['commandOn', 'commandOff'],
        convert: (model, msg, publish, options, meta) => {
            const timeout = 28;
            if (!globalStore.hasValue(msg.endpoint, 'action')) {
                globalStore.putValue(msg.endpoint, 'action', []);
            }
            const lookup = { commandOn: 'bell1', commandOff: 'bell2' };
            const timer = setTimeout(() => globalStore.getValue(msg.endpoint, 'action').pop(), timeout * 1000);
            const list = globalStore.getValue(msg.endpoint, 'action');
            if (list.length === 0 || list.length > 4) {
                list.push(timer);
                return { action: lookup[msg.type] };
            }
            else if (timeout > 0) {
                list.push(timer);
            }
        },
    },
    ZMCSW032D_cover_position: {
        cluster: 'closuresWindowCovering',
        type: ['attributeReport', 'readResponse'],
        options: [
            exposes.options.invert_cover(),
            e.numeric('time_close', ea.SET).withDescription(`Set the full closing time of the roller shutter (e.g. set it to 20) (value is in s).`),
            e.numeric('time_open', ea.SET).withDescription(`Set the full opening time of the roller shutter (e.g. set it to 21) (value is in s).`),
        ],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const timeCoverSetMiddle = 60;
            // https://github.com/Koenkk/zigbee-herdsman-converters/pull/1336
            // Need to add time_close and time_open in your configuration.yaml after friendly_name (and set your time)
            if (options.time_close !== undefined && options.time_open !== undefined) {
                if (!globalStore.hasValue(msg.endpoint, 'position')) {
                    globalStore.putValue(msg.endpoint, 'position', { lastPreviousAction: -1, CurrentPosition: -1, since: false });
                }
                const entry = globalStore.getValue(msg.endpoint, 'position');
                // ignore if first action is middle and ignore action middle if previous action is middle
                if (msg.data.currentPositionLiftPercentage !== undefined && msg.data['currentPositionLiftPercentage'] == 50) {
                    if ((entry.CurrentPosition == -1 && entry.lastPreviousAction == -1) || entry.lastPreviousAction == 50) {
                        logger_1.logger.warning(`ZMCSW032D ignore action`, NS);
                        return;
                    }
                }
                let currentPosition = entry.CurrentPosition;
                const lastPreviousAction = entry.lastPreviousAction;
                const deltaTimeSec = Math.floor((Date.now() - entry.since) / 1000); // convert to sec
                entry.since = Date.now();
                entry.lastPreviousAction = msg.data['currentPositionLiftPercentage'];
                if (msg.data.currentPositionLiftPercentage !== undefined && msg.data['currentPositionLiftPercentage'] == 50) {
                    if (deltaTimeSec < timeCoverSetMiddle || deltaTimeSec > timeCoverSetMiddle) {
                        if (lastPreviousAction == 100) {
                            // Open
                            currentPosition = currentPosition == -1 ? 0 : currentPosition;
                            currentPosition = currentPosition + (deltaTimeSec * 100) / Number(options.time_open);
                        }
                        else if (lastPreviousAction == 0) {
                            // Close
                            currentPosition = currentPosition == -1 ? 100 : currentPosition;
                            currentPosition = currentPosition - (deltaTimeSec * 100) / Number(options.time_close);
                        }
                        currentPosition = currentPosition > 100 ? 100 : currentPosition;
                        currentPosition = currentPosition < 0 ? 0 : currentPosition;
                    }
                }
                entry.CurrentPosition = currentPosition;
                if (msg.data.currentPositionLiftPercentage !== undefined && msg.data['currentPositionLiftPercentage'] !== 50) {
                    // position cast float to int
                    result.position = currentPosition | 0;
                }
                else {
                    if (deltaTimeSec < timeCoverSetMiddle || deltaTimeSec > timeCoverSetMiddle) {
                        // position cast float to int
                        result.position = currentPosition | 0;
                    }
                    else {
                        entry.CurrentPosition = lastPreviousAction;
                        result.position = lastPreviousAction;
                    }
                }
                result.position = options.invert_cover ? 100 - result.position : result.position;
            }
            else {
                // Previous solution without time_close and time_open
                if (msg.data.currentPositionLiftPercentage !== undefined && msg.data['currentPositionLiftPercentage'] !== 50) {
                    const liftPercentage = msg.data['currentPositionLiftPercentage'];
                    result.position = liftPercentage;
                    result.position = options.invert_cover ? 100 - result.position : result.position;
                }
            }
            // Add the state
            if ('position' in result) {
                result.state = result.position === 0 ? 'CLOSE' : 'OPEN';
            }
            return result;
        },
    },
    PGC410EU_presence: {
        cluster: 'manuSpecificSmartThingsArrivalSensor',
        type: 'commandArrivalSensorNotify',
        options: [exposes.options.presence_timeout()],
        convert: (model, msg, publish, options, meta) => {
            const useOptionsTimeout = options && options.presence_timeout !== undefined;
            const timeout = useOptionsTimeout ? Number(options.presence_timeout) : 100; // 100 seconds by default
            // Stop existing timer because motion is detected and set a new one.
            clearTimeout(globalStore.getValue(msg.endpoint, 'timer'));
            const timer = setTimeout(() => publish({ presence: false }), timeout * 1000);
            globalStore.putValue(msg.endpoint, 'timer', timer);
            return { presence: true };
        },
    },
    STS_PRS_251_presence: {
        cluster: 'genBinaryInput',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.presence_timeout()],
        convert: (model, msg, publish, options, meta) => {
            const useOptionsTimeout = options && options.presence_timeout !== undefined;
            const timeout = useOptionsTimeout ? Number(options.presence_timeout) : 100; // 100 seconds by default
            // Stop existing timer because motion is detected and set a new one.
            clearTimeout(globalStore.getValue(msg.endpoint, 'timer'));
            const timer = setTimeout(() => publish({ presence: false }), timeout * 1000);
            globalStore.putValue(msg.endpoint, 'timer', timer);
            return { presence: true };
        },
    },
    heiman_scenes: {
        cluster: 'heimanSpecificScenes',
        type: ['commandAtHome', 'commandGoOut', 'commandCinema', 'commandRepast', 'commandSleep'],
        convert: (model, msg, publish, options, meta) => {
            const lookup = {
                commandCinema: 'cinema',
                commandAtHome: 'at_home',
                commandSleep: 'sleep',
                commandGoOut: 'go_out',
                commandRepast: 'repast',
            };
            if (lookup[msg.type] !== undefined)
                return { action: lookup[msg.type] };
        },
    },
    javis_lock_report: {
        cluster: 'genBasic',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            const lookup = {
                0: 'pairing',
                1: 'keypad',
                2: 'rfid_card_unlock',
                3: 'touch_unlock',
            };
            const utf8FromStr = (s) => {
                const a = [];
                for (let i = 0, enc = encodeURIComponent(s); i < enc.length;) {
                    if (enc[i] === '%') {
                        a.push(parseInt(enc.substr(i + 1, 2), 16));
                        i += 3;
                    }
                    else {
                        a.push(enc.charCodeAt(i++));
                    }
                }
                return a;
            };
            const data = utf8FromStr(msg['data']['16896']);
            clearTimeout(globalStore.getValue(msg.endpoint, 'timer'));
            const timer = setTimeout(() => publish({ action: 'lock', state: 'LOCK' }), 2 * 1000);
            globalStore.putValue(msg.endpoint, 'timer', timer);
            return {
                action: 'unlock',
                action_user: data[3],
                action_source: data[5],
                action_source_name: lookup[data[5]],
            };
        },
    },
    diyruz_freepad_config: {
        cluster: 'genOnOffSwitchCfg',
        type: ['readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const button = (0, utils_1.getKey)(model.endpoint(msg.device), msg.endpoint.ID);
            const { switchActions, switchType } = msg.data;
            const switchTypesLookup = ['toggle', 'momentary', 'multifunction'];
            const switchActionsLookup = ['on', 'off', 'toggle'];
            return {
                [`switch_type_${button}`]: switchTypesLookup[switchType],
                [`switch_actions_${button}`]: switchActionsLookup[switchActions],
            };
        },
    },
    diyruz_geiger: {
        cluster: 'msIlluminanceMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return {
                radioactive_events_per_minute: msg.data['61441'],
                radiation_dose_per_hour: msg.data['61442'],
            };
        },
    },
    diyruz_geiger_config: {
        cluster: 'msIlluminanceLevelSensing',
        type: 'readResponse',
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data[0xf001] !== undefined) {
                result.led_feedback = ['OFF', 'ON'][msg.data[0xf001]];
            }
            if (msg.data[0xf002] !== undefined) {
                result.buzzer_feedback = ['OFF', 'ON'][msg.data[0xf002]];
            }
            if (msg.data[0xf000] !== undefined) {
                result.sensitivity = msg.data[0xf000];
            }
            if (msg.data[0xf003] !== undefined) {
                result.sensors_count = msg.data[0xf003];
            }
            if (msg.data[0xf004] !== undefined) {
                result.sensors_type = ['СБМ-20/СТС-5/BOI-33', 'СБМ-19/СТС-6', 'Others'][msg.data[0xf004]];
            }
            if (msg.data[0xf005] !== undefined) {
                result.alert_threshold = msg.data[0xf005];
            }
            return result;
        },
    },
    diyruz_airsense_config_co2: {
        cluster: 'msCO2',
        type: 'readResponse',
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data[0x0203] !== undefined) {
                result.led_feedback = ['OFF', 'ON'][msg.data[0x0203]];
            }
            if (msg.data[0x0202] !== undefined) {
                result.enable_abc = ['OFF', 'ON'][msg.data[0x0202]];
            }
            if (msg.data[0x0204] !== undefined) {
                result.threshold1 = msg.data[0x0204];
            }
            if (msg.data[0x0205] !== undefined) {
                result.threshold2 = msg.data[0x0205];
            }
            return result;
        },
    },
    diyruz_airsense_config_temp: {
        cluster: 'msTemperatureMeasurement',
        type: 'readResponse',
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data[0x0210] !== undefined) {
                result.temperature_offset = msg.data[0x0210];
            }
            return result;
        },
    },
    diyruz_airsense_config_pres: {
        cluster: 'msPressureMeasurement',
        type: 'readResponse',
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data[0x0210] !== undefined) {
                result.pressure_offset = msg.data[0x0210];
            }
            return result;
        },
    },
    diyruz_airsense_config_hum: {
        cluster: 'msRelativeHumidity',
        type: 'readResponse',
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data[0x0210] !== undefined) {
                result.humidity_offset = msg.data[0x0210];
            }
            return result;
        },
    },
    diyruz_zintercom_config: {
        cluster: 'closuresDoorLock',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data[0x0050] !== undefined) {
                result.state = ['idle', 'ring', 'talk', 'open', 'drop'][msg.data[0x0050]];
            }
            if (msg.data[0x0051] !== undefined) {
                result.mode = ['never', 'once', 'always', 'drop'][msg.data[0x0051]];
            }
            if (msg.data[0x0052] !== undefined) {
                result.sound = ['OFF', 'ON'][msg.data[0x0052]];
            }
            if (msg.data[0x0053] !== undefined) {
                result.time_ring = msg.data[0x0053];
            }
            if (msg.data[0x0054] !== undefined) {
                result.time_talk = msg.data[0x0054];
            }
            if (msg.data[0x0055] !== undefined) {
                result.time_open = msg.data[0x0055];
            }
            if (msg.data[0x0057] !== undefined) {
                result.time_bell = msg.data[0x0057];
            }
            if (msg.data[0x0056] !== undefined) {
                result.time_report = msg.data[0x0056];
            }
            return result;
        },
    },
    CC2530ROUTER_led: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return { led: msg.data['onOff'] === 1 };
        },
    },
    CC2530ROUTER_meta: {
        cluster: 'genBinaryValue',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const data = msg.data;
            return {
                description: data['description'],
                type: data['inactiveText'],
                rssi: data['presentValue'],
            };
        },
    },
    KAMI_contact: {
        cluster: 'ssIasZone',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            return { contact: msg.data[7] === 0 };
        },
    },
    KAMI_occupancy: {
        cluster: 'msOccupancySensing',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data[7] === 1) {
                return { action: 'motion' };
            }
        },
    },
    DNCKAT_S00X_buttons: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        options: [exposes.options.legacy()],
        convert: (model, msg, publish, options, meta) => {
            const action = msg.data['onOff'] === 1 ? 'release' : 'hold';
            const payload = { action: (0, utils_1.postfixWithEndpointName)(action, msg, model, meta) };
            if ((0, utils_1.isLegacyEnabled)(options)) {
                const key = `button_${(0, utils_1.getKey)(model.endpoint(msg.device), msg.endpoint.ID)}`;
                payload[key] = action;
            }
            return payload;
        },
    },
    hue_motion_sensitivity: {
        cluster: 'msOccupancySensing',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data['48'] !== undefined) {
                const lookup = ['low', 'medium', 'high', 'very_high', 'max'];
                return { motion_sensitivity: lookup[msg.data['48']] };
            }
        },
    },
    hue_motion_led_indication: {
        cluster: 'genBasic',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data['51'] !== undefined) {
                return { led_indication: msg.data['51'] === 1 };
            }
        },
    },
    hue_wall_switch_device_mode: {
        cluster: 'genBasic',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data['52'] !== undefined) {
                const values = ['single_rocker', 'single_push_button', 'dual_rocker', 'dual_push_button'];
                return { device_mode: values[msg.data['52']] };
            }
        },
    },
    CCTSwitch_D0001_levelctrl: {
        cluster: 'genLevelCtrl',
        options: [exposes.options.legacy()],
        type: ['commandMoveToLevel', 'commandMoveToLevelWithOnOff', 'commandMove', 'commandStop'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            if (msg.type === 'commandMove' || msg.type === 'commandStop') {
                const action = 'brightness';
                payload.click = action;
                if (msg.type === 'commandStop') {
                    const direction = globalStore.getValue(msg.endpoint, 'direction');
                    const duration = Date.now() - globalStore.getValue(msg.endpoint, 'start');
                    payload.action = `${action}_${direction}_release`;
                    payload.duration = duration;
                    payload.action_duration = duration;
                }
                else {
                    const direction = msg.data.movemode === 1 ? 'down' : 'up';
                    payload.action = `${action}_${direction}_hold`;
                    globalStore.putValue(msg.endpoint, 'direction', direction);
                    globalStore.putValue(msg.endpoint, 'start', Date.now());
                    payload.rate = msg.data.rate;
                    payload.action_rate = msg.data.rate;
                }
            }
            else {
                // wrap the messages from button2 and button4 into a single function
                // button2 always sends "commandMoveToLevel"
                // button4 sends two messages, with "commandMoveToLevelWithOnOff" coming first in the sequence
                //         so that's the one we key off of to indicate "button4". we will NOT print it in that case,
                //         instead it will be returned as part of the second sequence with
                //         CCTSwitch_D0001_move_to_colortemp_recall below.
                let clk = 'brightness';
                let cmd = null;
                payload.action_brightness = msg.data.level;
                payload.action_transition = parseFloat(msg.data.transtime) / 10.0;
                payload.brightness = msg.data.level;
                payload.transition = parseFloat(msg.data.transtime) / 10.0;
                if (msg.type == 'commandMoveToLevel') {
                    // pressing the brightness button increments/decrements from 13-254.
                    // when it reaches the end (254) it will start decrementing by a step,
                    // and vice versa.
                    const direction = msg.data.level > globalStore.getValue(msg.endpoint, 'last_brightness') ? 'up' : 'down';
                    cmd = `${clk}_${direction}`;
                    globalStore.putValue(msg.endpoint, 'last_brightness', msg.data.level);
                }
                else if (msg.type == 'commandMoveToLevelWithOnOff') {
                    // This is the 'start' of the 4th button sequence.
                    clk = 'memory';
                    globalStore.putValue(msg.endpoint, 'last_move_level', msg.data.level);
                    globalStore.putValue(msg.endpoint, 'last_clk', clk);
                }
                if (clk != 'memory') {
                    globalStore.putValue(msg.endpoint, 'last_seq', msg.meta.zclTransactionSequenceNumber);
                    globalStore.putValue(msg.endpoint, 'last_clk', clk);
                    payload.click = clk;
                    payload.action = cmd;
                }
            }
            if (!(0, utils_1.isLegacyEnabled)(options)) {
                delete payload.click;
                delete payload.duration;
                delete payload.rate;
                delete payload.brightness;
                delete payload.transition;
            }
            return payload;
        },
    },
    CCTSwitch_D0001_lighting: {
        cluster: 'lightingColorCtrl',
        type: ['commandMoveToColorTemp', 'commandMoveColorTemp'],
        options: [exposes.options.legacy()],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            if (msg.type === 'commandMoveColorTemp') {
                const clk = 'colortemp';
                payload.click = clk;
                payload.rate = msg.data.rate;
                payload.action_rate = msg.data.rate;
                if (msg.data.movemode === 0) {
                    const direction = globalStore.getValue(msg.endpoint, 'direction');
                    const duration = Date.now() - globalStore.getValue(msg.endpoint, 'start');
                    payload.action = `${clk}_${direction}_release`;
                    payload.duration = duration;
                    payload.action_duration = duration;
                }
                else {
                    const direction = msg.data.movemode === 3 ? 'down' : 'up';
                    payload.action = `${clk}_${direction}_hold`;
                    payload.rate = msg.data.rate;
                    payload.action_rate = msg.data.rate;
                    // store button and start moment
                    globalStore.putValue(msg.endpoint, 'direction', direction);
                    globalStore.putValue(msg.endpoint, 'start', Date.now());
                }
            }
            else {
                // both button3 and button4 send the command "commandMoveToColorTemp"
                // in order to distinguish between the buttons, use the sequence number and the previous command
                // to determine if this message was immediately preceded by "commandMoveToLevelWithOnOff"
                // if this command follows a "commandMoveToLevelWithOnOff", then it's actually button4's second message
                // and we can ignore it entirely
                const lastClk = globalStore.getValue(msg.endpoint, 'last_clk');
                const lastSeq = globalStore.getValue(msg.endpoint, 'last_seq');
                const seq = msg.meta.zclTransactionSequenceNumber;
                let clk = 'colortemp';
                payload.color_temp = msg.data.colortemp;
                payload.transition = parseFloat(msg.data.transtime) / 10.0;
                payload.action_color_temp = msg.data.colortemp;
                payload.action_transition = parseFloat(msg.data.transtime) / 10.0;
                // because the remote sends two commands for button4, we need to look at the previous command and
                // see if it was the recognized start command for button4 - if so, ignore this second command,
                // because it's not really button3, it's actually button4
                if (lastClk == 'memory') {
                    payload.click = lastClk;
                    payload.action = 'recall';
                    payload.brightness = globalStore.getValue(msg.endpoint, 'last_move_level');
                    payload.action_brightness = globalStore.getValue(msg.endpoint, 'last_move_level');
                    // ensure the "last" message was really the message prior to this one
                    // accounts for missed messages (gap >1) and for the remote's rollover from 127 to 0
                    if ((seq == 0 && lastSeq == 127) || seq - lastSeq == 1) {
                        clk = null;
                    }
                }
                else {
                    // pressing the color temp button increments/decrements from 153-370K.
                    // when it reaches the end (370) it will start decrementing by a step,
                    // and vice versa.
                    const direction = msg.data.colortemp > globalStore.getValue(msg.endpoint, 'last_color_temp') ? 'up' : 'down';
                    const cmd = `${clk}_${direction}`;
                    payload.click = clk;
                    payload.action = cmd;
                    globalStore.putValue(msg.endpoint, 'last_color_temp', msg.data.colortemp);
                }
                if (clk != null) {
                    globalStore.putValue(msg.endpoint, 'last_seq', msg.meta.zclTransactionSequenceNumber);
                    globalStore.putValue(msg.endpoint, 'last_clk', clk);
                }
            }
            if (!(0, utils_1.isLegacyEnabled)(options)) {
                delete payload.click;
                delete payload.rate;
                delete payload.duration;
                delete payload.color_temp;
                delete payload.transition;
                delete payload.brightness;
            }
            return payload;
        },
    },
    hue_wall_switch: {
        cluster: 'manuSpecificPhilips',
        type: 'commandHueNotification',
        convert: (model, msg, publish, options, meta) => {
            const buttonLookup = { 1: 'left', 2: 'right' };
            const button = buttonLookup[msg.data['button']];
            const typeLookup = { 0: 'press', 1: 'hold', 2: 'press_release', 3: 'hold_release' };
            const type = typeLookup[msg.data['type']];
            return { action: `${button}_${type}` };
        },
    },
    hue_dimmer_switch: {
        cluster: 'manuSpecificPhilips',
        type: 'commandHueNotification',
        options: [exposes.options.simulated_brightness()],
        convert: (model, msg, publish, options, meta) => {
            const buttonLookup = { 1: 'on', 2: 'up', 3: 'down', 4: 'off' };
            const button = buttonLookup[msg.data['button']];
            const typeLookup = { 0: 'press', 1: 'hold', 2: 'press_release', 3: 'hold_release' };
            const type = typeLookup[msg.data['type']];
            const payload = { action: `${button}_${type}` };
            // duration
            if (type === 'press')
                globalStore.putValue(msg.endpoint, 'press_start', Date.now());
            else if (type === 'hold' || type === 'release') {
                payload.action_duration = (Date.now() - globalStore.getValue(msg.endpoint, 'press_start')) / 1000;
            }
            // simulated brightness
            if (options.simulated_brightness && (button === 'down' || button === 'up') && type !== 'release') {
                const opts = options.simulated_brightness;
                const deltaOpts = typeof opts === 'object' && opts.delta !== undefined ? opts.delta : 35;
                const delta = button === 'up' ? deltaOpts : deltaOpts * -1;
                const brightness = globalStore.getValue(msg.endpoint, 'brightness', 255) + delta;
                payload.brightness = (0, utils_1.numberWithinRange)(brightness, 0, 255);
                payload.action_brightness_delta = delta;
                globalStore.putValue(msg.endpoint, 'brightness', payload.brightness);
            }
            return payload;
        },
    },
    hue_tap: {
        cluster: 'greenPower',
        type: ['commandNotification', 'commandCommissioningNotification'],
        convert: (model, msg, publish, options, meta) => {
            const commandID = msg.data.commandID;
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model, msg.data.frameCounter, `${msg.device.ieeeAddr}_${commandID}`))
                return;
            if (commandID === 224)
                return;
            const lookup = {
                0x22: 'press_1',
                0x10: 'press_2',
                0x11: 'press_3',
                0x12: 'press_4',
                // Actions below are never generated by a Hue Tap but by a PMT 215Z
                // https://github.com/Koenkk/zigbee2mqtt/issues/18088
                0x62: 'press_3_and_4',
                0x63: 'release_3_and_4',
                0x64: 'press_1_and_2',
                0x65: 'release_1_and_2',
            };
            if (lookup[commandID] === undefined) {
                logger_1.logger.error(`Hue Tap: missing command '${commandID}'`, NS);
            }
            else {
                return { action: lookup[commandID] };
            }
        },
    },
    hue_twilight: {
        cluster: 'manuSpecificPhilips',
        type: 'commandHueNotification',
        convert: (model, msg, publish, options, meta) => {
            const buttonLookup = { 1: 'dot', 2: 'hue' };
            const button = buttonLookup[msg.data['button']];
            const typeLookup = { 0: 'press', 1: 'hold', 2: 'press_release', 3: 'hold_release' };
            const type = typeLookup[msg.data['type']];
            const payload = { action: `${button}_${type}` };
            // duration
            if (type === 'press')
                globalStore.putValue(msg.endpoint, 'press_start', Date.now());
            else if (type === 'hold' || type === 'release') {
                payload.action_duration = (Date.now() - globalStore.getValue(msg.endpoint, 'press_start')) / 1000;
            }
            return payload;
        },
    },
    tuya_relay_din_led_indicator: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const property = 0x8001;
            if (msg.data[property] !== undefined) {
                const dict = { 0x00: 'off', 0x01: 'on_off', 0x02: 'off_on' };
                const value = msg.data[property];
                if (dict[value] !== undefined) {
                    return { [(0, utils_1.postfixWithEndpointName)('indicator_mode', msg, model, meta)]: dict[value] };
                }
            }
        },
    },
    ias_keypad: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return {
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
                restore_reports: (zoneStatus & (1 << 5)) > 0,
            };
        },
    },
    itcmdr_clicks: {
        cluster: 'genMultistateInput',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            const lookup = { 0: 'hold', 1: 'single', 2: 'double', 3: 'triple', 4: 'quadruple', 255: 'release' };
            const clicks = msg.data['presentValue'];
            const action = lookup[clicks] ? lookup[clicks] : `many`;
            return { action };
        },
    },
    ZB003X_attr: {
        cluster: 'ssIasZone',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const data = msg.data;
            const senslookup = { '0': 'low', '1': 'medium', '2': 'high' };
            const keeptimelookup = { '0': 0, '1': 30, '2': 60, '3': 120, '4': 240, '5': 480 };
            if (data && data.currentZoneSensitivityLevel !== undefined) {
                const value = data.currentZoneSensitivityLevel;
                return { sensitivity: senslookup[value] };
            }
            if (data && data['61441'] !== undefined) {
                const value = data['61441'];
                return { keep_time: keeptimelookup[value] };
            }
        },
    },
    ZB003X_occupancy: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            return { occupancy: (zoneStatus & 1) > 0, tamper: (zoneStatus & 4) > 0 };
        },
    },
    idlock: {
        cluster: 'closuresDoorLock',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (0x4000 in msg.data) {
                result.master_pin_mode = msg.data[0x4000] == 1 ? true : false;
            }
            if (0x4001 in msg.data) {
                result.rfid_enable = msg.data[0x4001] == 1 ? true : false;
            }
            if (0x4003 in msg.data) {
                const lookup = {
                    0: 'deactivated',
                    1: 'random_pin_1x_use',
                    5: 'random_pin_1x_use',
                    6: 'random_pin_24_hours',
                    9: 'random_pin_24_hours',
                };
                result.service_mode = lookup[msg.data[0x4003]];
            }
            if (0x4004 in msg.data) {
                const lookup = { 0: 'auto_off_away_off', 1: 'auto_on_away_off', 2: 'auto_off_away_on', 3: 'auto_on_away_on' };
                result.lock_mode = lookup[msg.data[0x4004]];
            }
            if (0x4005 in msg.data) {
                result.relock_enabled = msg.data[0x4005] == 1 ? true : false;
            }
            return result;
        },
    },
    idlock_fw: {
        cluster: 'genBasic',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (0x5000 in msg.data) {
                result.idlock_lock_fw = msg.data[0x5000];
            }
            return result;
        },
    },
    schneider_pilot_mode: {
        cluster: 'schneiderSpecificPilotMode',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const lookup = { 1: 'contactor', 3: 'pilot' };
            if ('pilotMode' in msg.data) {
                result.schneider_pilot_mode = lookup[msg.data['pilotMode']];
            }
            return result;
        },
    },
    schneider_ui_action: {
        cluster: 'wiserDeviceInfo',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const data = msg.data['deviceInfo'].split(',');
            if (data[0] === 'UI' && data[1]) {
                const result = { action: utils.toSnakeCase(data[1]) };
                let screenAwake = globalStore.getValue(msg.endpoint, 'screenAwake');
                screenAwake = screenAwake != undefined ? screenAwake : false;
                const keypadLockedNumber = Number(msg.endpoint.getClusterAttributeValue('hvacUserInterfaceCfg', 'keypadLockout'));
                const keypadLocked = keypadLockedNumber != undefined ? keypadLockedNumber != 0 : false;
                // Emulate UI temperature update
                if (data[1] === 'ScreenWake') {
                    globalStore.putValue(msg.endpoint, 'screenAwake', true);
                }
                else if (data[1] === 'ScreenSleep') {
                    globalStore.putValue(msg.endpoint, 'screenAwake', false);
                }
                else if (screenAwake && !keypadLocked) {
                    let occupiedHeatingSetpoint = Number(msg.endpoint.getClusterAttributeValue('hvacThermostat', 'occupiedHeatingSetpoint'));
                    occupiedHeatingSetpoint = occupiedHeatingSetpoint != null ? occupiedHeatingSetpoint : 400;
                    if (data[1] === 'ButtonPressMinusDown') {
                        occupiedHeatingSetpoint -= 50;
                    }
                    else if (data[1] === 'ButtonPressPlusDown') {
                        occupiedHeatingSetpoint += 50;
                    }
                    msg.endpoint.saveClusterAttributeKeyValue('hvacThermostat', { occupiedHeatingSetpoint: occupiedHeatingSetpoint });
                    result.occupied_heating_setpoint = occupiedHeatingSetpoint / 100;
                }
                return result;
            }
        },
    },
    schneider_temperature: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const temperature = parseFloat(msg.data['measuredValue']) / 100.0;
            const property = (0, utils_1.postfixWithEndpointName)('local_temperature', msg, model, meta);
            return { [property]: temperature };
        },
    },
    wiser_smart_thermostat_client: {
        cluster: 'hvacThermostat',
        type: 'read',
        convert: async (model, msg, publish, options, meta) => {
            const response = {};
            if (msg.data[0] == 0xe010) {
                // Zone Mode
                const lookup = { manual: 1, schedule: 2, energy_saver: 3, holiday: 6 };
                const zonemodeNum = meta.state.zone_mode ? lookup[meta.state.zone_mode] : 1;
                response[0xe010] = { value: zonemodeNum, type: 0x30 };
                await msg.endpoint.readResponse(msg.cluster, msg.meta.zclTransactionSequenceNumber, response, { srcEndpoint: 11 });
            }
        },
    },
    wiser_smart_setpoint_command_client: {
        cluster: 'hvacThermostat',
        type: ['command', 'commandWiserSmartSetSetpoint'],
        convert: (model, msg, publish, options, meta) => {
            const attribute = {};
            const result = {};
            // The UI client on the thermostat also updates the server, so no need to readback/send again on next sync.
            // This also ensures the next client read of setpoint is in sync with the latest commanded value.
            attribute['occupiedHeatingSetpoint'] = msg.data['setpoint'];
            msg.endpoint.saveClusterAttributeKeyValue('hvacThermostat', attribute);
            result['occupied_heating_setpoint'] = parseFloat(msg.data['setpoint']) / 100.0;
            logger_1.logger.debug(`received wiser setpoint command with value: '${msg.data['setpoint']}'`, NS);
            return result;
        },
    },
    rc_110_level_to_scene: {
        cluster: 'genLevelCtrl',
        type: ['commandMoveToLevel', 'commandMoveToLevelWithOnOff'],
        convert: (model, msg, publish, options, meta) => {
            const scenes = { 2: '1', 52: '2', 102: '3', 153: '4', 194: '5', 254: '6' };
            return { action: `scene_${scenes[msg.data.level]}` };
        },
    },
    heiman_doorbell_button: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const lookup = {
                32768: 'pressed',
                32772: 'pressed',
            };
            const zoneStatus = msg.data.zonestatus;
            return {
                action: lookup[zoneStatus],
                tamper: (zoneStatus & (1 << 2)) > 0,
                battery_low: (zoneStatus & (1 << 3)) > 0,
            };
        },
    },
    sihas_people_cnt: {
        cluster: 'genAnalogInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const lookup = { '0': 'idle', '1': 'in', '2': 'out' };
            const value = (0, utils_1.precisionRound)(parseFloat(msg.data['presentValue']), 1);
            const people = (0, utils_1.precisionRound)(msg.data.presentValue, 0);
            let result = null;
            if (value <= 80) {
                result = { people: people, status: lookup[(value * 10) % 10] };
                return result;
            }
        },
    },
    sihas_action: {
        cluster: 'genOnOff',
        type: ['commandOn', 'commandOff', 'commandToggle'],
        convert: (model, msg, publish, options, meta) => {
            const lookup = { commandToggle: 'long', commandOn: 'double', commandOff: 'single' };
            let buttonMapping = null;
            if (model.model === 'SBM300ZB2') {
                buttonMapping = { 1: '1', 2: '2' };
            }
            else if (model.model === 'SBM300ZB3') {
                buttonMapping = { 1: '1', 2: '2', 3: '3' };
            }
            else if (model.model === 'SBM300ZB4') {
                buttonMapping = { 1: '1', 2: '2', 3: '3', 4: '4' };
            }
            else if (model.model === 'SBM300ZC2') {
                buttonMapping = { 1: '1', 2: '2' };
            }
            else if (model.model === 'SBM300ZC3') {
                buttonMapping = { 1: '1', 2: '2', 3: '3' };
            }
            else if (model.model === 'SBM300ZC4') {
                buttonMapping = { 1: '1', 2: '2', 3: '3', 4: '4' };
            }
            else if (model.model === 'MSM-300ZB') {
                buttonMapping = { 1: '1', 2: '2', 3: '3', 4: '4' };
            }
            const button = buttonMapping ? `${buttonMapping[msg.endpoint.ID]}_` : '';
            return { action: `${button}${lookup[msg.type]}` };
        },
    },
    tuya_operation_mode: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.tuyaOperationMode !== undefined) {
                const value = msg.data['tuyaOperationMode'];
                const lookup = { 0: 'command', 1: 'event' };
                return { operation_mode: lookup[value] };
            }
        },
    },
    sunricher_switch2801K2: {
        cluster: 'greenPower',
        type: ['commandNotification', 'commandCommissioningNotification'],
        convert: (model, msg, publish, options, meta) => {
            const commandID = msg.data.commandID;
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model, msg.data.frameCounter, `${msg.device.ieeeAddr}_${commandID}`))
                return;
            if (commandID === 224)
                return;
            const lookup = { 0x21: 'press_on', 0x20: 'press_off', 0x34: 'release', 0x35: 'hold_on', 0x36: 'hold_off' };
            if (lookup[commandID] === undefined) {
                logger_1.logger.error(`Sunricher: missing command '${commandID}'`, NS);
            }
            else {
                return { action: lookup[commandID] };
            }
        },
    },
    sunricher_switch2801K4: {
        cluster: 'greenPower',
        type: ['commandNotification', 'commandCommissioningNotification'],
        convert: (model, msg, publish, options, meta) => {
            const commandID = msg.data.commandID;
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model, msg.data.frameCounter, `${msg.device.ieeeAddr}_${commandID}`))
                return;
            if (commandID === 224)
                return;
            const lookup = {
                0x21: 'press_on',
                0x20: 'press_off',
                0x37: 'press_high',
                0x38: 'press_low',
                0x35: 'hold_high',
                0x36: 'hold_low',
                0x34: 'release',
            };
            if (lookup[commandID] === undefined) {
                logger_1.logger.error(`Sunricher: missing command '${commandID}'`, NS);
            }
            else {
                return { action: lookup[commandID] };
            }
        },
    },
    command_stop_move_raw: {
        cluster: 'lightingColorCtrl',
        type: 'raw',
        convert: (model, msg, publish, options, meta) => {
            // commandStopMove without params
            if (msg.data[2] !== 71)
                return;
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            const movestop = 'stop';
            const action = (0, utils_1.postfixWithEndpointName)(`hue_${movestop}`, msg, model, meta);
            const payload = { action };
            (0, utils_1.addActionGroup)(payload, msg, model);
            return payload;
        },
    },
    tuya_multi_action: {
        cluster: 'genOnOff',
        type: ['commandTuyaAction', 'commandTuyaAction2'],
        convert: (model, msg, publish, options, meta) => {
            if ((0, utils_1.hasAlreadyProcessedMessage)(msg, model))
                return;
            let action;
            if (msg.type == 'commandTuyaAction') {
                const lookup = { 0: 'single', 1: 'double', 2: 'hold' };
                action = lookup[msg.data.value];
            }
            else if (msg.type == 'commandTuyaAction2') {
                const lookup = { 0: 'rotate_right', 1: 'rotate_left' };
                action = lookup[msg.data.value];
            }
            return { action };
        },
    },
    led_on_motion: {
        cluster: 'ssIasZone',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (0x4000 in msg.data) {
                result.led_on_motion = msg.data[0x4000] == 1 ? true : false;
            }
            return result;
        },
    },
    hw_version: {
        cluster: 'genBasic',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.hwVersion !== undefined)
                result['hw_version'] = msg.data.hwVersion;
            return result;
        },
    },
    SNZB02_temperature: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const temperature = parseFloat(msg.data['measuredValue']) / 100.0;
            // https://github.com/Koenkk/zigbee2mqtt/issues/13640
            // SNZB-02 reports stranges values sometimes
            if (temperature > -33 && temperature < 100) {
                const property = (0, utils_1.postfixWithEndpointName)('temperature', msg, model, meta);
                return { [property]: temperature };
            }
        },
    },
    SNZB02_humidity: {
        cluster: 'msRelativeHumidity',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const humidity = parseFloat(msg.data['measuredValue']) / 100.0;
            // https://github.com/Koenkk/zigbee2mqtt/issues/13640
            // SNZB-02 reports stranges values sometimes
            if (humidity >= 0 && humidity <= 99.75) {
                return { humidity };
            }
        },
    },
    awox_colors: {
        cluster: 'lightingColorCtrl',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const buffer = msg.data;
            const commonForColors = buffer[0] === 17 && buffer[2] === 48 && buffer[3] === 0 && buffer[5] === 8 && buffer[6] === 0;
            let color = null;
            if (commonForColors && [255, 254].includes(buffer[4])) {
                color = 'red';
            }
            else if (commonForColors && [42, 41].includes(buffer[4])) {
                color = 'yellow';
            }
            else if (commonForColors && [85, 84].includes(buffer[4])) {
                color = 'green';
            }
            else if (commonForColors && [170, 169].includes(buffer[4])) {
                color = 'blue';
            }
            if (color != null) {
                return { action: color, action_group: msg.groupID };
            }
        },
    },
    awox_refreshColored: {
        cluster: 'lightingColorCtrl',
        type: ['commandMoveHue'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.movemode === 1 && msg.data.rate === 12) {
                return { action: 'refresh_colored', action_group: msg.groupID };
            }
        },
    },
    awox_refresh: {
        cluster: 'genLevelCtrl',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => {
            const buffer = msg.data;
            const isRefresh = buffer[0] === 17 && buffer[2] === 16 && (buffer[3] === 1 || buffer[3] === 0) && buffer[4] === 1;
            const isRefreshLong = buffer[0] === 17 && buffer[2] === 16 && buffer[3] === 1 && buffer[4] === 2;
            if (isRefresh) {
                return { action: 'refresh', action_group: msg.groupID };
            }
            else if (isRefreshLong) {
                return { action: 'refresh_long', action_group: msg.groupID };
            }
        },
    },
    // #endregion
    // #region Ignore converters (these message dont need parsing).
    ignore_onoff_report: {
        cluster: 'genOnOff',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_basic_report: {
        cluster: 'genBasic',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_illuminance_report: {
        cluster: 'msIlluminanceMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_occupancy_report: {
        cluster: 'msOccupancySensing',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_temperature_report: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_humidity_report: {
        cluster: 'msRelativeHumidity',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_pressure_report: {
        cluster: 'msPressureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_analog_report: {
        cluster: 'genAnalogInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_multistate_report: {
        cluster: 'genMultistateInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_power_report: {
        cluster: 'genPowerCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_light_brightness_report: {
        cluster: 'genLevelCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_light_color_colortemp_report: {
        cluster: 'lightingColorCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_closuresWindowCovering_report: {
        cluster: 'closuresWindowCovering',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_thermostat_report: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_iaszone_attreport: {
        cluster: 'ssIasZone',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_iaszone_statuschange: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_iaszone_report: {
        cluster: 'ssIasZone',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_iasace_commandgetpanelstatus: {
        cluster: 'ssIasAce',
        type: ['commandGetPanelStatus'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_genIdentify: {
        cluster: 'genIdentify',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_command_on: {
        cluster: 'genOnOff',
        type: 'commandOn',
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_command_off: {
        cluster: 'genOnOff',
        type: 'commandOff',
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_command_off_with_effect: {
        cluster: 'genOnOff',
        type: 'commandOffWithEffect',
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_command_step: {
        cluster: 'genLevelCtrl',
        type: 'commandStep',
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_command_stop: {
        cluster: 'genLevelCtrl',
        type: 'commandStop',
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_poll_ctrl: {
        cluster: 'genPollCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_genLevelCtrl_report: {
        cluster: 'genLevelCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_genOta: {
        cluster: 'genOta',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_haDiagnostic: {
        cluster: 'haDiagnostic',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_zclversion_read: {
        cluster: 'genBasic',
        type: 'read',
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_time_read: {
        cluster: 'genTime',
        type: 'read',
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_tuya_set_time: {
        cluster: 'manuSpecificTuya',
        type: ['commandMcuSyncTime'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_tuya_raw: {
        cluster: 'manuSpecificTuya',
        type: ['raw'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_metering: {
        cluster: 'seMetering',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    ignore_electrical_measurement: {
        cluster: 'haElectricalMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => { },
    },
    // #endregion
};
const converters2 = {
    command_arm_with_transaction: {
        cluster: 'ssIasAce',
        type: 'commandArm',
        convert: async (model, msg, publish, options, meta) => {
            const payload = converters1.command_arm.convert(model, msg, publish, options, meta);
            if (!payload)
                return;
            payload.action_transaction = msg.meta.zclTransactionSequenceNumber;
            return payload;
        },
    },
    metering_datek: {
        cluster: 'seMetering',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = converters1.metering.convert(model, msg, publish, options, meta);
            // Filter incorrect 0 energy values reported by the device:
            // https://github.com/Koenkk/zigbee2mqtt/issues/7852
            if (result && result.energy === 0) {
                delete result.energy;
            }
            return result;
        },
    },
    EKO09738_metering: {
        /**
         * Elko EKO09738 and EKO09716 reports power in mW, scale to W
         */
        cluster: 'seMetering',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = converters1.metering.convert(model, msg, publish, options, meta);
            if (result && result.power !== undefined) {
                result.power /= 1000;
            }
            return result;
        },
    },
    command_on_presence: {
        cluster: 'genOnOff',
        type: 'commandOn',
        convert: async (model, msg, publish, options, meta) => {
            const payload1 = converters1.checkin_presence.convert(model, msg, publish, options, meta);
            const payload2 = converters1.command_on.convert(model, msg, publish, options, meta);
            return { ...payload1, ...payload2 };
        },
    },
    ias_ace_occupancy_with_timeout: {
        cluster: 'ssIasAce',
        type: 'commandGetPanelStatus',
        options: [exposes.options.occupancy_timeout()],
        convert: (model, msg, publish, options, meta) => {
            msg.data.occupancy = 1;
            return converters1.occupancy_with_timeout.convert(model, msg, publish, options, meta);
        },
    },
    SP600_power: {
        cluster: 'seMetering',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (meta.device.dateCode === '20160120') {
                // Cannot use metering, divisor/multiplier is not according to ZCL.
                // https://github.com/Koenkk/zigbee2mqtt/issues/2233
                // https://github.com/Koenkk/zigbee-herdsman-converters/issues/915
                const result = {};
                if (msg.data.instantaneousDemand !== undefined) {
                    result.power = msg.data['instantaneousDemand'];
                }
                // Summation is reported in Watthours
                if (msg.data.currentSummDelivered !== undefined) {
                    const value = msg.data['currentSummDelivered'];
                    result.energy = value / 1000.0;
                }
                return result;
            }
            else {
                return converters1.metering.convert(model, msg, publish, options, meta);
            }
        },
    },
    stelpro_thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = converters1.thermostat.convert(model, msg, publish, options, meta);
            if (result && msg.data['StelproSystemMode'] === 5) {
                // 'Eco' mode is translated into 'auto' here
                result.system_mode = constants.thermostatSystemModes[1];
            }
            if (result && msg.data.pIHeatingDemand !== undefined) {
                result.running_state = msg.data['pIHeatingDemand'] >= 10 ? 'heat' : 'idle';
            }
            return result;
        },
    },
    viessmann_thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = converters1.thermostat.convert(model, msg, publish, options, meta);
            if (result) {
                // ViessMann TRVs report piHeatingDemand from 0-5
                // NOTE: remove the result for now, but leave it configure for reporting
                //       it will show up in the debug log still to help try and figure out
                //       what this value potentially means.
                delete result.pi_heating_demand;
                // viessmannWindowOpenInternal
                // 0-2, 5: unknown
                // 3: window open (OO on display, no heating)
                // 4: window open (OO on display, heating)
                if (msg.data.viessmannWindowOpenInternal !== undefined) {
                    result.window_open = msg.data['viessmannWindowOpenInternal'] == 3 || msg.data['viessmannWindowOpenInternal'] == 4;
                }
                // viessmannWindowOpenForce (rw, bool)
                if (msg.data.viessmannWindowOpenForce !== undefined) {
                    result.window_open_force = msg.data['viessmannWindowOpenForce'] == 1;
                }
                // viessmannAssemblyMode (ro, bool)
                // 0: TRV installed
                // 1: TRV ready to install (-- on display)
                if (msg.data.viessmannAssemblyMode !== undefined) {
                    result.assembly_mode = msg.data['viessmannAssemblyMode'] == 1;
                }
            }
            return result;
        },
    },
    eurotronic_thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = converters1.thermostat.convert(model, msg, publish, options, meta);
            if (result) {
                if (typeof msg.data[0x4003] == 'number') {
                    result.current_heating_setpoint = (0, utils_1.precisionRound)(msg.data[0x4003], 2) / 100;
                }
                if (typeof msg.data[0x4008] == 'number') {
                    result.child_lock = (msg.data[0x4008] & 0x80) != 0 ? 'LOCK' : 'UNLOCK';
                    result.mirror_display = (msg.data[0x4008] & 0x02) != 0 ? 'ON' : 'OFF';
                    // This seems broken... We need to write 0x20 to turn it off and 0x10 to set
                    // it to auto mode. However, when it reports the flag, it will report 0x10
                    //  when it's off, and nothing at all when it's in auto mode
                    if ((msg.data[0x4008] & 0x10) != 0) {
                        // reports auto -> setting to force_off
                        result.system_mode = constants.thermostatSystemModes[0];
                    }
                    else if ((msg.data[0x4008] & 0x04) != 0) {
                        // always_on
                        result.system_mode = constants.thermostatSystemModes[4];
                    }
                    else {
                        // auto
                        result.system_mode = constants.thermostatSystemModes[1];
                    }
                }
                if (typeof msg.data[0x4002] == 'number') {
                    result.error_status = msg.data[0x4002];
                }
                if (typeof msg.data[0x4000] == 'number') {
                    result.trv_mode = msg.data[0x4000];
                }
                if (typeof msg.data[0x4001] == 'number') {
                    result.valve_position = msg.data[0x4001];
                }
                if (msg.data.pIHeatingDemand !== undefined) {
                    result.running_state = msg.data['pIHeatingDemand'] >= 10 ? 'heat' : 'idle';
                }
            }
            return result;
        },
    },
    terncy_raw: {
        cluster: 'manuSpecificClusterAduroSmart',
        type: 'raw',
        convert: async (model, msg, publish, options, meta) => {
            // 13,40,18,104, 0,8,1 - single
            // 13,40,18,22,  0,17,1
            // 13,40,18,32,  0,18,1
            // 13,40,18,6,   0,16,1
            // 13,40,18,111, 0,4,2 - double
            // 13,40,18,58,  0,7,2
            // 13,40,18,6,   0,2,3 - triple
            // motion messages:
            // 13,40,18,105, 4,167,0,7 - motion on right side
            // 13,40,18,96,  4,27,0,5
            // 13,40,18,101, 4,27,0,7
            // 13,40,18,125, 4,28,0,5
            // 13,40,18,85,  4,28,0,7
            // 13,40,18,3,   4,24,0,5
            // 13,40,18,81,  4,10,1,7
            // 13,40,18,72,  4,30,1,5
            // 13,40,18,24,  4,25,0,40 - motion on left side
            // 13,40,18,47,  4,28,0,56
            // 13,40,18,8,   4,32,0,40
            let value = null;
            if (msg.data[4] == 0) {
                value = msg.data[6];
                if (1 <= value && value <= 3) {
                    const actionLookup = { 1: 'single', 2: 'double', 3: 'triple', 4: 'quadruple' };
                    return { action: actionLookup[value] };
                }
            }
            else if (msg.data[4] == 4) {
                value = msg.data[7];
                const sidelookup = { 5: 'right', 7: 'right', 40: 'left', 56: 'left' };
                if (sidelookup[value]) {
                    msg.data.occupancy = 1;
                    const payload = converters1.occupancy_with_timeout.convert(model, msg, publish, options, meta);
                    if (payload) {
                        payload.action_side = sidelookup[value];
                        payload.side = sidelookup[value]; /* legacy: remove this line (replaced by action_side) */
                    }
                    return payload;
                }
            }
        },
    },
    ZM35HQ_attr: {
        cluster: 'ssIasZone',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            let result = {};
            const data = msg.data;
            if (data && data.zoneStatus !== undefined) {
                const result1 = converters1.ias_occupancy_alarm_1_report.convert(model, msg, publish, options, meta);
                result = { ...result1 };
            }
            if (data && data.currentZoneSensitivityLevel !== undefined) {
                const senslookup = { '0': 'low', '1': 'medium', '2': 'high' };
                result.sensitivity = senslookup[data.currentZoneSensitivityLevel];
            }
            if (data && data['61441'] !== undefined) {
                const keeptimelookup = { '0': 30, '1': 60, '2': 120 };
                result.keep_time = keeptimelookup[data['61441']];
            }
            return result;
        },
    },
    schneider_lighting_ballast_configuration: {
        cluster: 'lightingBallastCfg',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = converters1.lighting_ballast_configuration.convert(model, msg, publish, options, meta);
            const lookup = { 1: 'RC', 2: 'RL' };
            if (result && msg.data[0xe000] !== undefined) {
                result.dimmer_mode = lookup[msg.data[0xe000]];
            }
            return result;
        },
    },
    wiser_lighting_ballast_configuration: {
        cluster: 'lightingBallastCfg',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = converters1.lighting_ballast_configuration.convert(model, msg, publish, options, meta);
            if (result && msg.data.wiserControlMode !== undefined) {
                result.dimmer_mode = constants.wiserDimmerControlMode[msg.data['wiserControlMode']];
            }
            return result;
        },
    },
    wiser_smart_thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = converters1.thermostat.convert(model, msg, publish, options, meta);
            if (result) {
                if (msg.data[0xe010] !== undefined) {
                    // wiserSmartZoneMode
                    const lookup = { 1: 'manual', 2: 'schedule', 3: 'energy_saver', 6: 'holiday' };
                    result['zone_mode'] = lookup[msg.data[0xe010]];
                }
                if (msg.data[0xe011] !== undefined) {
                    // wiserSmartHactConfig
                    const lookup = { 0x00: 'unconfigured', 0x80: 'setpoint_switch', 0x82: 'setpoint_fip', 0x83: 'fip_fip' };
                    result['hact_config'] = lookup[msg.data[0xe011]];
                }
                if (msg.data[0xe020] !== undefined) {
                    // wiserSmartCurrentFilPiloteMode
                    const lookup = { 0: 'comfort', 1: 'comfort_-1', 2: 'comfort_-2', 3: 'energy_saving', 4: 'frost_protection', 5: 'off' };
                    result['fip_setting'] = lookup[msg.data[0xe020]];
                }
                if (msg.data[0xe030] !== undefined) {
                    // wiserSmartValvePosition
                    result['pi_heating_demand'] = msg.data[0xe030];
                }
                if (msg.data[0xe031] !== undefined) {
                    // wiserSmartValveCalibrationStatus
                    const lookup = { 0: 'ongoing', 1: 'successful', 2: 'uncalibrated', 3: 'failed_e1', 4: 'failed_e2', 5: 'failed_e3' };
                    result['valve_calibration_status'] = lookup[msg.data[0xe031]];
                }
                // Radiator thermostats command changes from UI, but report value periodically for sync,
                // force an update of the value if it doesn't match the current existing value
                if (meta.device.modelID === 'EH-ZB-VACT' &&
                    msg.data.occupiedHeatingSetpoint !== undefined &&
                    meta.state.occupied_heating_setpoint !== undefined) {
                    if (result.occupied_heating_setpoint != meta.state.occupied_heating_setpoint) {
                        const lookup = { manual: 1, schedule: 2, energy_saver: 3, holiday: 6 };
                        const zonemodeNum = lookup[Number(meta.state.zone_mode)];
                        const setpoint = Number((Math.round(Number((Number(meta.state.occupied_heating_setpoint) * 2).toFixed(1))) / 2).toFixed(1)) * 100;
                        const payload = {
                            operatingmode: 0,
                            zonemode: zonemodeNum,
                            setpoint: setpoint,
                            reserved: 0xff,
                        };
                        await msg.endpoint.command('hvacThermostat', 'wiserSmartSetSetpoint', payload, {
                            srcEndpoint: 11,
                            disableDefaultResponse: true,
                        });
                        logger_1.logger.debug(`syncing vact setpoint was: '${result.occupied_heating_setpoint}' now: '${meta.state.occupied_heating_setpoint}'`, NS);
                    }
                }
                else {
                    publish(result);
                }
            }
        },
    },
    nodon_pilot_wire_mode: {
        cluster: 'manuSpecificNodOnPilotWire',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            const mode = msg.data['mode'];
            if (mode === 0x00)
                payload.pilot_wire_mode = 'off';
            else if (mode === 0x01)
                payload.pilot_wire_mode = 'comfort';
            else if (mode === 0x02)
                payload.pilot_wire_mode = 'eco';
            else if (mode === 0x03)
                payload.pilot_wire_mode = 'frost_protection';
            else if (mode === 0x04)
                payload.pilot_wire_mode = 'comfort_-1';
            else if (mode === 0x05)
                payload.pilot_wire_mode = 'comfort_-2';
            else {
                logger_1.logger.warning(`wrong mode : ${mode}`, NS);
                payload.pilot_wire_mode = 'unknown';
            }
            return payload;
        },
    },
    TS110E: {
        cluster: 'genLevelCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data['64515'] !== undefined) {
                result['min_brightness'] = utils.mapNumberRange(msg.data['64515'], 0, 1000, 1, 255);
            }
            if (msg.data['64516'] !== undefined) {
                result['max_brightness'] = utils.mapNumberRange(msg.data['64516'], 0, 1000, 1, 255);
            }
            if (msg.data['61440'] !== undefined) {
                const propertyName = utils.postfixWithEndpointName('brightness', msg, model, meta);
                result[propertyName] = utils.mapNumberRange(msg.data['61440'], 0, 1000, 0, 255);
            }
            return result;
        },
    },
    TS110E_light_type: {
        cluster: 'genLevelCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data['64514'] !== undefined) {
                const lookup = { 0: 'led', 1: 'incandescent', 2: 'halogen' };
                result['light_type'] = lookup[msg.data['64514']];
            }
            return result;
        },
    },
    TS110E_switch_type: {
        cluster: 'genLevelCtrl',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data['64514'] !== undefined) {
                const lookup = { 0: 'momentary', 1: 'toggle', 2: 'state' };
                const propertyName = utils.postfixWithEndpointName('switch_type', msg, model, meta);
                result[propertyName] = lookup[msg.data['64514']];
            }
            return result;
        },
    },
};
const converters = { ...converters1, ...converters2 };
exports.default = converters;
module.exports = converters;
//# sourceMappingURL=fromZigbee.js.map