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
exports.calibrateAndPrecisionRoundOptionsDefaultPrecision = void 0;
exports.isLegacyEnabled = isLegacyEnabled;
exports.flatten = flatten;
exports.onEventPoll = onEventPoll;
exports.precisionRound = precisionRound;
exports.toLocalISOString = toLocalISOString;
exports.numberWithinRange = numberWithinRange;
exports.mapNumberRange = mapNumberRange;
exports.hasAlreadyProcessedMessage = hasAlreadyProcessedMessage;
exports.calibrateAndPrecisionRoundOptionsIsPercentual = calibrateAndPrecisionRoundOptionsIsPercentual;
exports.calibrateAndPrecisionRoundOptions = calibrateAndPrecisionRoundOptions;
exports.toPercentage = toPercentage;
exports.addActionGroup = addActionGroup;
exports.getEndpointName = getEndpointName;
exports.postfixWithEndpointName = postfixWithEndpointName;
exports.exposeEndpoints = exposeEndpoints;
exports.enforceEndpoint = enforceEndpoint;
exports.getKey = getKey;
exports.batteryVoltageToPercentage = batteryVoltageToPercentage;
exports.getMetaValue = getMetaValue;
exports.hasEndpoints = hasEndpoints;
exports.isInRange = isInRange;
exports.replaceToZigbeeConvertersInArray = replaceToZigbeeConvertersInArray;
exports.filterObject = filterObject;
exports.sleep = sleep;
exports.toSnakeCase = toSnakeCase;
exports.toCamelCase = toCamelCase;
exports.getLabelFromName = getLabelFromName;
exports.saveSceneState = saveSceneState;
exports.deleteSceneState = deleteSceneState;
exports.getSceneState = getSceneState;
exports.getEntityOrFirstGroupMember = getEntityOrFirstGroupMember;
exports.getTransition = getTransition;
exports.getOptions = getOptions;
exports.getMetaValues = getMetaValues;
exports.getObjectProperty = getObjectProperty;
exports.validateValue = validateValue;
exports.getClusterAttributeValue = getClusterAttributeValue;
exports.normalizeCelsiusVersionOfFahrenheit = normalizeCelsiusVersionOfFahrenheit;
exports.noOccupancySince = noOccupancySince;
exports.attachOutputCluster = attachOutputCluster;
exports.printNumberAsHex = printNumberAsHex;
exports.printNumbersAsHexSequence = printNumbersAsHexSequence;
exports.assertObject = assertObject;
exports.assertArray = assertArray;
exports.assertString = assertString;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.isBoolean = isBoolean;
exports.assertNumber = assertNumber;
exports.toNumber = toNumber;
exports.getFromLookup = getFromLookup;
exports.getFromLookupByValue = getFromLookupByValue;
exports.configureSetPowerSourceWhenUnknown = configureSetPowerSourceWhenUnknown;
exports.assertEndpoint = assertEndpoint;
exports.assertGroup = assertGroup;
exports.isEndpoint = isEndpoint;
exports.isDevice = isDevice;
exports.isGroup = isGroup;
exports.isNumericExpose = isNumericExpose;
exports.isLightExpose = isLightExpose;
exports.splitArrayIntoChunks = splitArrayIntoChunks;
const zigbee_herdsman_1 = require("zigbee-herdsman");
const logger_1 = require("./logger");
const globalStore = __importStar(require("./store"));
const NS = 'zhc:utils';
function isLegacyEnabled(options) {
    return options.legacy === undefined || options.legacy;
}
function flatten(arr) {
    return [].concat(...arr);
}
function onEventPoll(type, data, device, options, key, defaultIntervalSeconds, poll) {
    if (type === 'stop') {
        clearTimeout(globalStore.getValue(device, key));
        globalStore.clearValue(device, key);
    }
    else if (!globalStore.hasValue(device, key)) {
        const optionsKey = `${key}_poll_interval`;
        const seconds = toNumber(options[optionsKey] || defaultIntervalSeconds, optionsKey);
        if (seconds <= 0) {
            logger_1.logger.debug(`Not polling '${key}' for '${device.ieeeAddr}' since poll interval is <= 0 (got ${seconds})`, NS);
        }
        else {
            logger_1.logger.debug(`Polling '${key}' for '${device.ieeeAddr}' at an interval of ${seconds}`, NS);
            const setTimer = () => {
                const timer = setTimeout(async () => {
                    try {
                        await poll();
                    }
                    catch {
                        /* Do nothing*/
                    }
                    setTimer();
                }, seconds * 1000);
                globalStore.putValue(device, key, timer);
            };
            setTimer();
        }
    }
}
function precisionRound(number, precision) {
    if (typeof precision === 'number') {
        const factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
    else if (typeof precision === 'object') {
        const thresholds = Object.keys(precision)
            .map(Number)
            .sort((a, b) => b - a);
        for (const t of thresholds) {
            if (!isNaN(t) && number >= t) {
                return precisionRound(number, precision[t]);
            }
        }
    }
    return number;
}
function toLocalISOString(dDate) {
    const tzOffset = -dDate.getTimezoneOffset();
    const plusOrMinus = tzOffset >= 0 ? '+' : '-';
    const pad = function (num) {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };
    return (dDate.getFullYear() +
        '-' +
        pad(dDate.getMonth() + 1) +
        '-' +
        pad(dDate.getDate()) +
        'T' +
        pad(dDate.getHours()) +
        ':' +
        pad(dDate.getMinutes()) +
        ':' +
        pad(dDate.getSeconds()) +
        plusOrMinus +
        pad(tzOffset / 60) +
        ':' +
        pad(tzOffset % 60));
}
function numberWithinRange(number, min, max) {
    if (number > max) {
        return max;
    }
    else if (number < min) {
        return min;
    }
    else {
        return number;
    }
}
/**
 * Maps number from one range to another. In other words it performs a linear interpolation.
 * Note that this function can interpolate values outside source range (linear extrapolation).
 * @param value - value to map
 * @param fromLow - source range lower value
 * @param fromHigh - source range upper value
 * @param toLow - target range lower value
 * @param toHigh - target range upper value
 * @param number - of decimal places to which result should be rounded
 * @returns value mapped to new range
 */
function mapNumberRange(value, fromLow, fromHigh, toLow, toHigh, precision = 0) {
    const mappedValue = toLow + ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow);
    return precisionRound(mappedValue, precision);
}
const transactionStore = {};
function hasAlreadyProcessedMessage(msg, model, ID = null, key = null) {
    if (model.meta && model.meta.publishDuplicateTransaction)
        return false;
    const currentID = ID !== null ? ID : msg.meta.zclTransactionSequenceNumber;
    key = key || msg.device.ieeeAddr + '-' + msg.endpoint.ID;
    if (transactionStore[key]?.includes(currentID))
        return true;
    // Keep last 5, as they might come in different order: https://github.com/Koenkk/zigbee2mqtt/issues/20024
    transactionStore[key] = [currentID, ...(transactionStore[key] ?? [])].slice(0, 5);
    return false;
}
exports.calibrateAndPrecisionRoundOptionsDefaultPrecision = {
    ac_frequency: 0,
    temperature: 2,
    humidity: 2,
    pressure: 1,
    pm25: 0,
    power: 2,
    current: 2,
    current_phase_b: 2,
    current_phase_c: 2,
    voltage: 2,
    voltage_phase_b: 2,
    voltage_phase_c: 2,
    power_phase_b: 2,
    power_phase_c: 2,
    energy: 2,
    device_temperature: 0,
    soil_moisture: 2,
    co2: 0,
    illuminance: 0,
    illuminance_lux: 0,
    voc: 0,
    formaldehyd: 0,
    co: 0,
};
function calibrateAndPrecisionRoundOptionsIsPercentual(type) {
    return (type.startsWith('current') ||
        type.startsWith('energy') ||
        type.startsWith('voltage') ||
        type.startsWith('power') ||
        type.startsWith('illuminance'));
}
function calibrateAndPrecisionRoundOptions(number, options, type) {
    // Calibrate
    const calibrateKey = `${type}_calibration`;
    let calibrationOffset = toNumber(options && options[calibrateKey] !== undefined ? options[calibrateKey] : 0, calibrateKey);
    if (calibrateAndPrecisionRoundOptionsIsPercentual(type)) {
        // linear calibration because measured value is zero based
        // +/- percent
        calibrationOffset = (number * calibrationOffset) / 100;
    }
    number = number + calibrationOffset;
    // Precision round
    const precisionKey = `${type}_precision`;
    const defaultValue = exports.calibrateAndPrecisionRoundOptionsDefaultPrecision[type] || 0;
    const precision = toNumber(options && options[precisionKey] !== undefined ? options[precisionKey] : defaultValue, precisionKey);
    return precisionRound(number, precision);
}
function toPercentage(value, min, max) {
    if (value > max) {
        value = max;
    }
    else if (value < min) {
        value = min;
    }
    const normalised = (value - min) / (max - min);
    return Math.round(normalised * 100);
}
function addActionGroup(payload, msg, definition) {
    const disableActionGroup = definition.meta && definition.meta.disableActionGroup;
    if (!disableActionGroup && msg.groupID) {
        payload.action_group = msg.groupID;
    }
}
function getEndpointName(msg, definition, meta) {
    if (!definition.endpoint) {
        throw new Error(`Definition '${definition.model}' has not endpoint defined`);
    }
    return getKey(definition.endpoint(meta.device), msg.endpoint.ID);
}
function postfixWithEndpointName(value, msg, definition, meta) {
    // Prevent breaking change https://github.com/Koenkk/zigbee2mqtt/issues/13451
    if (!meta) {
        logger_1.logger.warning(`No meta passed to postfixWithEndpointName, update your external converter!`, NS);
        // @ts-expect-error ignore
        meta = { device: null };
    }
    if (definition.meta &&
        definition.meta.multiEndpoint &&
        (!definition.meta.multiEndpointSkip || !definition.meta.multiEndpointSkip.includes(value))) {
        const endpointName = definition.endpoint !== undefined ? getKey(definition.endpoint(meta.device), msg.endpoint.ID) : msg.endpoint.ID;
        // NOTE: endpointName can be undefined if we have a definition.endpoint and the endpoint is
        //       not listed.
        if (endpointName)
            return `${value}_${endpointName}`;
    }
    return value;
}
function exposeEndpoints(expose, endpointNames) {
    return endpointNames ? endpointNames.map((ep) => expose.clone().withEndpoint(ep)) : [expose];
}
function enforceEndpoint(entity, key, meta) {
    // @ts-expect-error ignore
    const multiEndpointEnforce = getMetaValue(entity, meta.mapped, 'multiEndpointEnforce', 'allEqual', []);
    if (multiEndpointEnforce && isObject(multiEndpointEnforce) && multiEndpointEnforce[key] !== undefined) {
        const endpoint = entity.getDevice().getEndpoint(multiEndpointEnforce[key]);
        if (endpoint)
            return endpoint;
    }
    return entity;
}
function getKey(object, value, fallback, convertTo) {
    for (const key in object) {
        // @ts-expect-error ignore
        if (object[key] === value) {
            return convertTo ? convertTo(key) : key;
        }
    }
    return fallback;
}
function batteryVoltageToPercentage(voltage, option) {
    if (option === '3V_2100') {
        let percentage = 100; // >= 3000
        if (voltage < 2100) {
            percentage = 0;
        }
        else if (voltage < 2440) {
            percentage = 6 - ((2440 - voltage) * 6) / 340;
        }
        else if (voltage < 2740) {
            percentage = 18 - ((2740 - voltage) * 12) / 300;
        }
        else if (voltage < 2900) {
            percentage = 42 - ((2900 - voltage) * 24) / 160;
        }
        else if (voltage < 3000) {
            percentage = 100 - ((3000 - voltage) * 58) / 100;
        }
        return Math.round(percentage);
    }
    else if (option === '3V_1500_2800') {
        const percentage = 235 - 370000 / (voltage + 1);
        return Math.round(Math.min(Math.max(percentage, 0), 100));
    }
    else if (typeof option === 'object') {
        // Generic converter that expects an option object with min and max values
        // I.E. meta: {battery: {voltageToPercentage: {min: 1900, max: 3000}}}
        return toPercentage(voltage + (option.vOffset ?? 0), option.min, option.max);
    }
    else {
        // only to cover case where a BatteryVoltage is missing in this switch
        throw new Error(`Unhandled battery voltage to percentage option: ${option}`);
    }
}
// groupStrategy: allEqual: return only if all members in the groups have the same meta property value
//                first: return the first property
//                {atLeastOnce}: returns `atLeastOnce` value when at least one of the group members has this value
function getMetaValue(entity, definition, key, groupStrategy = 'first', defaultValue = undefined) {
    // In case meta is a function, the first argument should be a `Zh.Entity`.
    if (isGroup(entity) && entity.members.length > 0) {
        const values = [];
        for (let i = 0; i < entity.members.length; i++) {
            const memberMetaMeta = getMetaValues(definition[i], entity.members[i]);
            if (memberMetaMeta?.[key] !== undefined) {
                const value = typeof memberMetaMeta[key] === 'function' ? memberMetaMeta[key](entity.members[i]) : memberMetaMeta[key];
                if (groupStrategy === 'first') {
                    return value;
                }
                else if (typeof groupStrategy === 'object' && value === groupStrategy.atLeastOnce) {
                    return groupStrategy.atLeastOnce;
                }
                values.push(value);
            }
            else {
                values.push(defaultValue);
            }
        }
        if (groupStrategy === 'allEqual' && new Set(values).size === 1) {
            return values[0];
        }
    }
    else {
        const definitionMeta = getMetaValues(definition, entity);
        if (definitionMeta?.[key] !== undefined) {
            return typeof definitionMeta[key] === 'function' ? definitionMeta[key](entity) : definitionMeta[key];
        }
    }
    return defaultValue;
}
function hasEndpoints(device, endpoints) {
    const eps = device.endpoints.map((e) => e.ID);
    for (const endpoint of endpoints) {
        if (!eps.includes(endpoint)) {
            return false;
        }
    }
    return true;
}
function isInRange(min, max, value) {
    return value >= min && value <= max;
}
function replaceToZigbeeConvertersInArray(arr, oldElements, newElements, errorIfNotInArray = true) {
    const clone = [...arr];
    for (let i = 0; i < oldElements.length; i++) {
        const index = clone.findIndex((t) => t.key === oldElements[i].key);
        if (index !== -1) {
            clone[index] = newElements[i];
        }
        else {
            if (errorIfNotInArray) {
                throw new Error('Element not in array');
            }
        }
    }
    return clone;
}
function filterObject(obj, keys) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (keys.includes(key)) {
            result[key] = value;
        }
    }
    return result;
}
async function sleep(ms) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
}
function toSnakeCase(value) {
    if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
            const keySnakeCase = toSnakeCase(key);
            if (key !== keySnakeCase) {
                // @ts-expect-error ignore
                value[keySnakeCase] = value[key];
                delete value[key];
            }
        }
        return value;
    }
    else {
        return value
            .replace(/\.?([A-Z])/g, (x, y) => '_' + y.toLowerCase())
            .replace(/^_/, '')
            .replace('_i_d', '_id');
    }
}
function toCamelCase(value) {
    if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
            const keyCamelCase = toCamelCase(key);
            if (key !== keyCamelCase) {
                // @ts-expect-error ignore
                value[keyCamelCase] = value[key];
                delete value[key];
            }
        }
        return value;
    }
    else {
        return value.replace(/_([a-z])/g, (x, y) => y.toUpperCase());
    }
}
function getLabelFromName(name) {
    const label = name.replace(/_/g, ' ');
    return label[0].toUpperCase() + label.slice(1);
}
function saveSceneState(entity, sceneID, groupID, state, name) {
    const attributes = ['state', 'brightness', 'color', 'color_temp', 'color_mode'];
    if (entity.meta.scenes === undefined)
        entity.meta.scenes = {};
    const metaKey = `${sceneID}_${groupID}`;
    entity.meta.scenes[metaKey] = { name, state: filterObject(state, attributes) };
    entity.save();
}
function deleteSceneState(entity, sceneID = null, groupID = null) {
    if (entity.meta.scenes) {
        if (sceneID == null && groupID == null) {
            entity.meta.scenes = {};
        }
        else {
            const metaKey = `${sceneID}_${groupID}`;
            if (entity.meta.scenes[metaKey] !== undefined) {
                delete entity.meta.scenes[metaKey];
            }
        }
        entity.save();
    }
}
function getSceneState(entity, sceneID, groupID) {
    const metaKey = `${sceneID}_${groupID}`;
    if (entity.meta.scenes !== undefined && entity.meta.scenes[metaKey] !== undefined) {
        return entity.meta.scenes[metaKey].state;
    }
    return null;
}
function getEntityOrFirstGroupMember(entity) {
    if (isGroup(entity)) {
        return entity.members.length > 0 ? entity.members[0] : null;
    }
    else {
        return entity;
    }
}
function getTransition(entity, key, meta) {
    const { options, message } = meta;
    let manufacturerIDs = [];
    if (isGroup(entity)) {
        manufacturerIDs = entity.members.map((m) => m.getDevice().manufacturerID);
    }
    else if (isEndpoint(entity)) {
        manufacturerIDs = [entity.getDevice().manufacturerID];
    }
    if (manufacturerIDs.includes(4476)) {
        /**
         * When setting both brightness and color temperature with a transition, the brightness is skipped
         * for IKEA TRADFRI bulbs.
         * To workaround this we skip the transition for the brightness as it is applied first.
         * https://github.com/Koenkk/zigbee2mqtt/issues/1810
         */
        if (key === 'brightness' && (message.color !== undefined || message.color_temp !== undefined)) {
            return { time: 0, specified: false };
        }
    }
    if (message.transition !== undefined) {
        const time = toNumber(message.transition, 'transition');
        return { time: time * 10, specified: true };
    }
    else if (options.transition !== undefined && options.transition !== '') {
        const transition = toNumber(options.transition, 'transition');
        return { time: transition * 10, specified: true };
    }
    else {
        return { time: 0, specified: false };
    }
}
function getOptions(definition, entity, options = {}) {
    const allowed = ['disableDefaultResponse', 'timeout'];
    return getMetaValues(definition, entity, allowed, options);
}
function getMetaValues(definitions, entity, allowed, options = {}) {
    const result = { ...options };
    for (const definition of Array.isArray(definitions) ? definitions : [definitions]) {
        if (definition && definition.meta) {
            for (const key of Object.keys(definition.meta)) {
                if (allowed == null || allowed.includes(key)) {
                    // @ts-expect-error ignore
                    const value = definition.meta[key];
                    if (typeof value === 'function') {
                        if (isEndpoint(entity)) {
                            result[key] = value(entity);
                        }
                    }
                    else {
                        result[key] = value;
                    }
                }
            }
        }
    }
    return result;
}
function getObjectProperty(object, key, defaultValue) {
    return object && object[key] !== undefined ? object[key] : defaultValue;
}
function validateValue(value, allowed) {
    if (!allowed.includes(value)) {
        throw new Error(`'${value}' not allowed, choose between: ${allowed}`);
    }
}
async function getClusterAttributeValue(endpoint, cluster, attribute, fallback = undefined) {
    try {
        if (endpoint.getClusterAttributeValue(cluster, attribute) == null) {
            await endpoint.read(cluster, [attribute]);
        }
        return endpoint.getClusterAttributeValue(cluster, attribute);
    }
    catch (error) {
        if (fallback !== undefined)
            return fallback;
        throw error;
    }
}
function normalizeCelsiusVersionOfFahrenheit(value) {
    const fahrenheit = value * 1.8 + 32;
    const roundedFahrenheit = Number((Math.round(Number((fahrenheit * 2).toFixed(1))) / 2).toFixed(1));
    return Number(((roundedFahrenheit - 32) / 1.8).toFixed(2));
}
function noOccupancySince(endpoint, options, publish, action) {
    if (options && options.no_occupancy_since) {
        if (action == 'start') {
            globalStore.getValue(endpoint, 'no_occupancy_since_timers', []).forEach((t) => clearTimeout(t));
            globalStore.putValue(endpoint, 'no_occupancy_since_timers', []);
            options.no_occupancy_since.forEach((since) => {
                const timer = setTimeout(() => {
                    publish({ no_occupancy_since: since });
                }, since * 1000);
                globalStore.getValue(endpoint, 'no_occupancy_since_timers').push(timer);
            });
        }
        else if (action === 'stop') {
            globalStore.getValue(endpoint, 'no_occupancy_since_timers', []).forEach((t) => clearTimeout(t));
            globalStore.putValue(endpoint, 'no_occupancy_since_timers', []);
        }
    }
}
function attachOutputCluster(device, clusterKey) {
    const clusterId = zigbee_herdsman_1.Zcl.Utils.getCluster(clusterKey, device.manufacturerID, device.customClusters).ID;
    const endpoint = device.getEndpoint(1);
    if (!endpoint.outputClusters.includes(clusterId)) {
        endpoint.outputClusters.push(clusterId);
        device.save();
    }
}
function printNumberAsHex(value, hexLength) {
    const hexValue = value.toString(16).padStart(hexLength, '0');
    return `0x${hexValue}`;
}
function printNumbersAsHexSequence(numbers, hexLength) {
    return numbers.map((v) => v.toString(16).padStart(hexLength, '0')).join(':');
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assertObject(value, property) {
    const isObject = typeof value === 'object' && !Array.isArray(value) && value !== null;
    if (!isObject) {
        throw new Error(`${property} is not a object, got ${typeof value} (${JSON.stringify(value)})`);
    }
}
function assertArray(value, property) {
    property = property ? `'${property}'` : 'Value';
    if (!Array.isArray(value))
        throw new Error(`${property} is not an array, got ${typeof value} (${value.toString()})`);
}
function assertString(value, property) {
    property = property ? `'${property}'` : 'Value';
    if (typeof value !== 'string')
        throw new Error(`${property} is not a string, got ${typeof value} (${value.toString()})`);
}
function isNumber(value) {
    return typeof value === 'number';
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObject(value) {
    return typeof value === 'object' && !Array.isArray(value);
}
function isString(value) {
    return typeof value === 'string';
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function assertNumber(value, property) {
    property = property ? `'${property}'` : 'Value';
    if (typeof value !== 'number' || Number.isNaN(value))
        throw new Error(`${property} is not a number, got ${typeof value} (${value?.toString()})`);
}
function toNumber(value, property) {
    property = property ? `'${property}'` : 'Value';
    // @ts-expect-error ignore
    const result = parseFloat(value);
    if (Number.isNaN(result)) {
        throw new Error(`${property} is not a number, got ${typeof value} (${value.toString()})`);
    }
    return result;
}
function getFromLookup(value, lookup, defaultValue = undefined, keyIsBool = false) {
    if (!keyIsBool) {
        if (typeof value === 'string') {
            for (const key of [value, value.toLowerCase(), value.toUpperCase()]) {
                if (lookup[key] !== undefined) {
                    return lookup[key];
                }
            }
        }
        else if (typeof value === 'number') {
            if (lookup[value] !== undefined) {
                return lookup[value];
            }
        }
        else {
            throw new Error(`Expected string or number, got: ${typeof value}`);
        }
    }
    else {
        // Silly hack, but boolean is not supported as index
        if (typeof value === 'boolean') {
            const stringValue = value.toString();
            for (const key of [stringValue, stringValue.toLowerCase(), stringValue.toUpperCase()]) {
                if (lookup[key] !== undefined) {
                    return lookup[key];
                }
            }
        }
        else {
            throw new Error(`Expected boolean, got: ${typeof value}`);
        }
    }
    if (defaultValue === undefined) {
        throw new Error(`Value: '${value}' not found in: [${Object.keys(lookup).join(', ')}]`);
    }
    return defaultValue;
}
function getFromLookupByValue(value, lookup, defaultValue = undefined) {
    for (const entry of Object.entries(lookup)) {
        if (entry[1] === value) {
            return entry[0];
        }
    }
    if (defaultValue === undefined) {
        throw new Error(`Expected one of: ${Object.values(lookup).join(', ')}, got: '${value}'`);
    }
    return defaultValue;
}
function configureSetPowerSourceWhenUnknown(powerSource) {
    return async (device) => {
        if (!device.powerSource || device.powerSource === 'Unknown') {
            logger_1.logger.debug(`Device has no power source, forcing to '${powerSource}'`, NS);
            device.powerSource = powerSource;
            device.save();
        }
    };
}
function assertEndpoint(obj) {
    if (obj?.constructor?.name?.toLowerCase() !== 'endpoint')
        throw new Error('Not an endpoint');
}
function assertGroup(obj) {
    if (obj?.constructor?.name?.toLowerCase() !== 'group')
        throw new Error('Not a group');
}
function isEndpoint(obj) {
    return obj.constructor.name.toLowerCase() === 'endpoint';
}
function isDevice(obj) {
    return obj.constructor.name.toLowerCase() === 'device';
}
function isGroup(obj) {
    return obj.constructor.name.toLowerCase() === 'group';
}
function isNumericExpose(expose) {
    return expose?.type === 'numeric';
}
function isLightExpose(expose) {
    return expose?.type === 'light';
}
function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}
exports.noOccupancySince = noOccupancySince;
exports.getOptions = getOptions;
exports.isLegacyEnabled = isLegacyEnabled;
exports.precisionRound = precisionRound;
exports.toLocalISOString = toLocalISOString;
exports.numberWithinRange = numberWithinRange;
exports.mapNumberRange = mapNumberRange;
exports.hasAlreadyProcessedMessage = hasAlreadyProcessedMessage;
exports.calibrateAndPrecisionRoundOptions = calibrateAndPrecisionRoundOptions;
exports.calibrateAndPrecisionRoundOptionsIsPercentual = calibrateAndPrecisionRoundOptionsIsPercentual;
exports.calibrateAndPrecisionRoundOptionsDefaultPrecision = exports.calibrateAndPrecisionRoundOptionsDefaultPrecision;
exports.toPercentage = toPercentage;
exports.addActionGroup = addActionGroup;
exports.postfixWithEndpointName = postfixWithEndpointName;
exports.enforceEndpoint = enforceEndpoint;
exports.getKey = getKey;
exports.getObjectProperty = getObjectProperty;
exports.batteryVoltageToPercentage = batteryVoltageToPercentage;
exports.getEntityOrFirstGroupMember = getEntityOrFirstGroupMember;
exports.getTransition = getTransition;
exports.getMetaValue = getMetaValue;
exports.validateValue = validateValue;
exports.hasEndpoints = hasEndpoints;
exports.isInRange = isInRange;
exports.filterObject = filterObject;
exports.saveSceneState = saveSceneState;
exports.sleep = sleep;
exports.toSnakeCase = toSnakeCase;
exports.toCamelCase = toCamelCase;
exports.getLabelFromName = getLabelFromName;
exports.normalizeCelsiusVersionOfFahrenheit = normalizeCelsiusVersionOfFahrenheit;
exports.deleteSceneState = deleteSceneState;
exports.getSceneState = getSceneState;
exports.attachOutputCluster = attachOutputCluster;
exports.printNumberAsHex = printNumberAsHex;
exports.printNumbersAsHexSequence = printNumbersAsHexSequence;
exports.getFromLookup = getFromLookup;
//# sourceMappingURL=utils.js.map