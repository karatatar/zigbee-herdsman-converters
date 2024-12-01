"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presets = exports.options = exports.access = exports.Climate = exports.Fan = exports.Cover = exports.Light = exports.Composite = exports.Text = exports.Enum = exports.Numeric = exports.List = exports.Binary = exports.Lock = exports.Switch = exports.Base = void 0;
const assert_1 = __importDefault(require("assert"));
const utils_1 = require("./utils");
class Base {
    name;
    label;
    access;
    type;
    endpoint;
    property;
    description;
    features;
    category;
    withEndpoint(endpointName) {
        this.endpoint = endpointName;
        if (this.property) {
            this.property = `${this.property}_${this.endpoint}`;
        }
        if (this.features) {
            for (const feature of this.features) {
                if (feature.property) {
                    feature.property = `${feature.property}_${endpointName}`;
                    feature.endpoint = endpointName;
                }
            }
        }
        return this;
    }
    withAccess(a) {
        (0, assert_1.default)(this.access !== undefined, 'Cannot add access if not defined yet');
        this.access = a;
        this.validateCategory();
        return this;
    }
    withProperty(property) {
        this.property = property;
        return this;
    }
    withLabel(label) {
        this.label = label;
        return this;
    }
    withDescription(description) {
        this.description = description;
        return this;
    }
    withCategory(category) {
        this.category = category;
        this.validateCategory();
        return this;
    }
    validateCategory() {
        switch (this.category) {
            case 'config':
                (0, assert_1.default)(this.access & a.SET, 'Config expose must be settable');
                break;
            case 'diagnostic':
                (0, assert_1.default)(!(this.access & a.SET), 'Diagnostic expose must not be settable');
                break;
        }
    }
    addFeature(feature) {
        (0, assert_1.default)(this.features, 'Does not have any features');
        if (this.endpoint)
            feature.withEndpoint(this.endpoint);
        this.features.push(feature);
    }
    removeFeature(feature) {
        (0, assert_1.default)(this.features, 'Does not have any features');
        const f = this.features.find((f) => f.name === feature);
        (0, assert_1.default)(f, `Does not have feature '${feature}'`);
        this.features.splice(this.features.indexOf(f), 1);
        return this;
    }
    setAccess(feature, a) {
        (0, assert_1.default)(this.features, 'Does not have any features');
        const f = this.features.find((f) => f.name === feature);
        (0, assert_1.default)(f.access !== a, `Access mode not changed for '${f.name}'`);
        f.access = a;
        f.validateCategory();
        return this;
    }
    copy(target) {
        target.name = this.name;
        target.label = this.label;
        target.access = this.access;
        target.type = this.type;
        target.endpoint = this.endpoint;
        target.property = this.property;
        target.description = this.description;
        if (target.features) {
            target.features = this.features.map((f) => f.clone());
        }
        target.category = this.category;
    }
}
exports.Base = Base;
class Switch extends Base {
    features = [];
    constructor() {
        super();
        this.type = 'switch';
    }
    withState(property, toggle, description, access = a.ALL, value_on = 'ON', value_off = 'OFF') {
        const feature = new Binary('state', access, value_on, value_off).withProperty(property).withDescription(description);
        if (toggle) {
            feature.withValueToggle('TOGGLE');
        }
        this.addFeature(feature);
        return this;
    }
    clone() {
        const clone = new Switch();
        this.copy(clone);
        return clone;
    }
}
exports.Switch = Switch;
class Lock extends Base {
    features = [];
    constructor() {
        super();
        this.type = 'lock';
    }
    withState(property, valueOn, valueOff, description, access = a.ALL) {
        this.addFeature(new Binary('state', access, valueOn, valueOff).withProperty(property).withDescription(description));
        return this;
    }
    withLockState(property, description) {
        this.addFeature(new Enum('lock_state', exports.access.STATE, ['not_fully_locked', 'locked', 'unlocked']).withProperty(property).withDescription(description));
        return this;
    }
    clone() {
        const clone = new Lock();
        this.copy(clone);
        return clone;
    }
}
exports.Lock = Lock;
class Binary extends Base {
    property = '';
    value_on;
    value_off;
    value_toggle;
    constructor(name, access, valueOn, valueOff) {
        super();
        this.type = 'binary';
        this.name = name;
        this.label = (0, utils_1.getLabelFromName)(name);
        this.property = name;
        this.access = access;
        this.value_on = valueOn;
        this.value_off = valueOff;
    }
    clone() {
        const clone = new Binary(this.name, this.access, this.value_on, this.value_off);
        clone.value_toggle = this.value_toggle;
        this.copy(clone);
        return clone;
    }
    withValueToggle(value) {
        this.value_toggle = value;
        return this;
    }
}
exports.Binary = Binary;
class List extends Base {
    property = '';
    item_type;
    length_min;
    length_max;
    constructor(name, access, itemType) {
        super();
        this.type = 'list';
        this.name = name;
        this.label = (0, utils_1.getLabelFromName)(name);
        this.property = name;
        this.access = access;
        this.item_type = itemType;
        delete this.item_type.property;
    }
    withLengthMin(value) {
        this.length_min = value;
        return this;
    }
    withLengthMax(value) {
        this.length_max = value;
        return this;
    }
    clone() {
        const clone = new List(this.name, this.access, this.item_type.clone());
        clone.length_min = this.length_min;
        clone.length_max = this.length_max;
        this.copy(clone);
        return clone;
    }
}
exports.List = List;
class Numeric extends Base {
    property = '';
    unit;
    value_max;
    value_min;
    value_step;
    presets;
    constructor(name, access) {
        super();
        this.type = 'numeric';
        this.name = name;
        this.label = (0, utils_1.getLabelFromName)(name);
        this.property = name;
        this.access = access;
    }
    withUnit(unit) {
        this.unit = unit;
        return this;
    }
    withValueMax(value) {
        this.value_max = value;
        return this;
    }
    withValueMin(value) {
        this.value_min = value;
        return this;
    }
    withValueStep(value) {
        this.value_step = value;
        return this;
    }
    withPreset(name, value, description) {
        if (!this.presets)
            this.presets = [];
        this.presets.push({ name, value, description });
        return this;
    }
    clone() {
        const clone = new Numeric(this.name, this.access);
        this.copy(clone);
        clone.unit = this.unit;
        clone.value_max = this.value_max;
        clone.value_min = this.value_min;
        clone.value_step = this.value_step;
        if (this.presets) {
            clone.presets = { ...this.presets };
        }
        return clone;
    }
}
exports.Numeric = Numeric;
class Enum extends Base {
    property = '';
    values;
    constructor(name, access, values) {
        super();
        this.type = 'enum';
        this.name = name;
        this.label = (0, utils_1.getLabelFromName)(name);
        this.property = name;
        this.access = access;
        this.values = values;
    }
    clone() {
        const clone = new Enum(this.name, this.access, [...this.values]);
        this.copy(clone);
        return clone;
    }
}
exports.Enum = Enum;
class Text extends Base {
    property = '';
    constructor(name, access) {
        super();
        this.type = 'text';
        this.name = name;
        this.label = (0, utils_1.getLabelFromName)(name);
        this.property = name;
        this.access = access;
    }
    clone() {
        const clone = new Text(this.name, this.access);
        this.copy(clone);
        return clone;
    }
}
exports.Text = Text;
class Composite extends Base {
    property = '';
    features = [];
    constructor(name, property, access) {
        super();
        this.type = 'composite';
        this.property = property;
        this.name = name;
        this.label = (0, utils_1.getLabelFromName)(name);
        this.access = access;
    }
    withFeature(feature) {
        this.addFeature(feature);
        return this;
    }
    clone() {
        const clone = new Composite(this.name, this.property, this.access);
        this.copy(clone);
        return clone;
    }
}
exports.Composite = Composite;
class Light extends Base {
    features = [];
    constructor() {
        super();
        this.type = 'light';
        this.addFeature(new Binary('state', exports.access.ALL, 'ON', 'OFF').withValueToggle('TOGGLE').withDescription('On/off state of this light'));
    }
    withBrightness() {
        this.addFeature(new Numeric('brightness', exports.access.ALL).withValueMin(0).withValueMax(254).withDescription('Brightness of this light'));
        return this;
    }
    withMinBrightness() {
        this.addFeature(new Numeric('min_brightness', exports.access.ALL).withValueMin(1).withValueMax(255).withDescription('Minimum light brightness'));
        return this;
    }
    withMaxBrightness() {
        this.addFeature(new Numeric('max_brightness', exports.access.ALL).withValueMin(1).withValueMax(255).withDescription('Maximum light brightness'));
        return this;
    }
    withLevelConfig(disableFeatures = []) {
        let levelConfig = new Composite('level_config', 'level_config', exports.access.ALL);
        if (!disableFeatures.includes('on_off_transition_time')) {
            levelConfig = levelConfig.withFeature(new Numeric('on_off_transition_time', exports.access.ALL)
                .withLabel('ON/OFF transition time')
                .withDescription('Represents the time taken to move to or from the target level when On of Off commands are received by an On/Off cluster'));
        }
        if (!disableFeatures.includes('on_transition_time')) {
            levelConfig = levelConfig.withFeature(new Numeric('on_transition_time', exports.access.ALL)
                .withLabel('ON transition time')
                .withPreset('disabled', 'disabled', 'Use on_off_transition_time value')
                .withDescription('Represents the time taken to move the current level from the minimum level to the maximum level when an On command is received'));
        }
        if (!disableFeatures.includes('off_transition_time')) {
            levelConfig = levelConfig.withFeature(new Numeric('off_transition_time', exports.access.ALL)
                .withLabel('OFF transition time')
                .withPreset('disabled', 'disabled', 'Use on_off_transition_time value')
                .withDescription('Represents the time taken to move the current level from the maximum level to the minimum level when an Off command is received'));
        }
        if (!disableFeatures.includes('execute_if_off')) {
            levelConfig = levelConfig.withFeature(new Binary('execute_if_off', exports.access.ALL, true, false).withDescription('this setting can affect the "on_level", "current_level_startup" or "brightness" setting'));
        }
        if (!disableFeatures.includes('on_level')) {
            levelConfig = levelConfig.withFeature(new Numeric('on_level', exports.access.ALL)
                .withValueMin(1)
                .withValueMax(254)
                .withPreset('previous', 'previous', 'Use previous value')
                .withDescription('Specifies the level that shall be applied, when an on/toggle command causes the light to turn on.'));
        }
        if (!disableFeatures.includes('current_level_startup')) {
            levelConfig = levelConfig.withFeature(new Numeric('current_level_startup', exports.access.ALL)
                .withValueMin(1)
                .withValueMax(254)
                .withPreset('minimum', 'minimum', 'Use minimum permitted value')
                .withPreset('previous', 'previous', 'Use previous value')
                .withDescription('Defines the desired startup level for a device when it is supplied with power'));
        }
        levelConfig = levelConfig.withDescription('Configure genLevelCtrl');
        this.addFeature(levelConfig);
        return this;
    }
    withColorTemp(range) {
        const rangeProvided = range !== undefined;
        if (range === undefined) {
            range = [150, 500];
        }
        const feature = new Numeric('color_temp', exports.access.ALL)
            .withUnit('mired')
            .withValueMin(range[0])
            .withValueMax(range[1])
            .withDescription('Color temperature of this light');
        if (process.env.ZHC_TEST) {
            // @ts-expect-error ignore
            feature._colorTempRangeProvided = rangeProvided;
        }
        [
            { name: 'coolest', value: range[0], description: 'Coolest temperature supported' },
            { name: 'cool', value: 250, description: 'Cool temperature (250 mireds / 4000 Kelvin)' },
            { name: 'neutral', value: 370, description: 'Neutral temperature (370 mireds / 2700 Kelvin)' },
            { name: 'warm', value: 454, description: 'Warm temperature (454 mireds / 2200 Kelvin)' },
            { name: 'warmest', value: range[1], description: 'Warmest temperature supported' },
        ]
            .filter((p) => p.value >= range[0] && p.value <= range[1])
            .forEach((p) => feature.withPreset(p.name, p.value, p.description));
        this.addFeature(feature);
        return this;
    }
    withColorTempStartup(range) {
        if (range === undefined) {
            range = [150, 500];
        }
        const feature = new Numeric('color_temp_startup', exports.access.ALL)
            .withUnit('mired')
            .withValueMin(range[0])
            .withValueMax(range[1])
            .withDescription('Color temperature after cold power on of this light');
        [
            { name: 'coolest', value: range[0], description: 'Coolest temperature supported' },
            { name: 'cool', value: 250, description: 'Cool temperature (250 mireds / 4000 Kelvin)' },
            { name: 'neutral', value: 370, description: 'Neutral temperature (370 mireds / 2700 Kelvin)' },
            { name: 'warm', value: 454, description: 'Warm temperature (454 mireds / 2200 Kelvin)' },
            { name: 'warmest', value: range[1], description: 'Warmest temperature supported' },
        ]
            .filter((p) => p.value >= range[0] && p.value <= range[1])
            .forEach((p) => feature.withPreset(p.name, p.value, p.description));
        feature.withPreset('previous', 65535, 'Restore previous color_temp on cold power on');
        this.addFeature(feature);
        return this;
    }
    withColor(types) {
        for (const type of types) {
            if (type === 'xy') {
                const colorXY = new Composite('color_xy', 'color', exports.access.ALL)
                    .withLabel('Color (X/Y)')
                    .withFeature(new Numeric('x', exports.access.ALL))
                    .withFeature(new Numeric('y', exports.access.ALL))
                    .withDescription('Color of this light in the CIE 1931 color space (x/y)');
                this.addFeature(colorXY);
            }
            else if (type === 'hs') {
                const colorHS = new Composite('color_hs', 'color', exports.access.ALL)
                    .withLabel('Color (HS)')
                    .withFeature(new Numeric('hue', exports.access.ALL))
                    .withFeature(new Numeric('saturation', exports.access.ALL))
                    .withDescription('Color of this light expressed as hue/saturation');
                this.addFeature(colorHS);
            }
            else {
                (0, assert_1.default)(false, `Unsupported color type ${type}`);
            }
        }
        return this;
    }
    clone() {
        const clone = new Light();
        this.copy(clone);
        return clone;
    }
}
exports.Light = Light;
class Cover extends Base {
    features = [];
    constructor() {
        super();
        this.type = 'cover';
        this.addFeature(new Enum('state', a.STATE_SET, ['OPEN', 'CLOSE', 'STOP']));
    }
    withPosition() {
        this.addFeature(new Numeric('position', exports.access.ALL).withValueMin(0).withValueMax(100).withDescription('Position of this cover').withUnit('%'));
        return this;
    }
    withTilt() {
        this.addFeature(new Numeric('tilt', exports.access.ALL).withValueMin(0).withValueMax(100).withDescription('Tilt of this cover').withUnit('%'));
        return this;
    }
    clone() {
        const clone = new Cover();
        this.copy(clone);
        return clone;
    }
}
exports.Cover = Cover;
class Fan extends Base {
    features = [];
    constructor() {
        super();
        this.type = 'fan';
        this.addFeature(new Binary('state', exports.access.ALL, 'ON', 'OFF').withDescription('On/off state of this fan').withProperty('fan_state'));
    }
    withModes(modes, access = a.ALL) {
        this.addFeature(new Enum('mode', access, modes).withProperty('fan_mode').withDescription('Mode of this fan'));
        return this;
    }
    clone() {
        const clone = new Fan();
        this.copy(clone);
        return clone;
    }
}
exports.Fan = Fan;
class Climate extends Base {
    features = [];
    constructor() {
        super();
        this.type = 'climate';
    }
    withSetpoint(property, min, max, step, access = a.ALL) {
        (0, assert_1.default)([
            'occupied_heating_setpoint',
            'current_heating_setpoint',
            'occupied_cooling_setpoint',
            'unoccupied_heating_setpoint',
            'unoccupied_cooling_setpoint',
        ].includes(property));
        this.addFeature(new Numeric(property, access)
            .withValueMin(min)
            .withValueMax(max)
            .withValueStep(step)
            .withUnit('°C')
            .withDescription('Temperature setpoint'));
        return this;
    }
    withLocalTemperature(access = a.STATE_GET, description = 'Current temperature measured on the device') {
        this.addFeature(new Numeric('local_temperature', access).withUnit('°C').withDescription(description));
        return this;
    }
    withLocalTemperatureCalibration(min = -12.8, max = 12.7, step = 0.1, access = a.ALL) {
        // For devices following the ZCL local_temperature_calibration is an int8, so min = -12.8 and max 12.7
        this.addFeature(new Numeric('local_temperature_calibration', access)
            .withValueMin(min)
            .withValueMax(max)
            .withValueStep(step)
            .withUnit('°C')
            .withDescription('Offset to add/subtract to the local temperature'));
        return this;
    }
    withSystemMode(modes, access = a.ALL, description = 'Mode of this device') {
        const allowed = ['off', 'heat', 'cool', 'auto', 'dry', 'fan_only', 'sleep', 'emergency_heating'];
        modes.forEach((m) => (0, assert_1.default)(allowed.includes(m)));
        this.addFeature(new Enum('system_mode', access, modes).withDescription(description));
        return this;
    }
    withRunningState(modes, access = a.STATE_GET) {
        const allowed = ['idle', 'heat', 'cool', 'fan_only'];
        modes.forEach((m) => (0, assert_1.default)(allowed.includes(m)));
        this.addFeature(new Enum('running_state', access, modes).withDescription('The current running state'));
        return this;
    }
    withRunningMode(modes, access = a.STATE_GET) {
        const allowed = ['off', 'cool', 'heat'];
        modes.forEach((m) => (0, assert_1.default)(allowed.includes(m)));
        this.addFeature(new Enum('running_mode', access, modes).withDescription('The current running mode'));
        return this;
    }
    withFanMode(modes, access = a.ALL) {
        const allowed = ['off', 'low', 'medium', 'high', 'on', 'auto', 'smart'];
        modes.forEach((m) => (0, assert_1.default)(allowed.includes(m)));
        this.addFeature(new Enum('fan_mode', access, modes).withDescription('Mode of the fan'));
        return this;
    }
    withSwingMode(modes, access = a.ALL) {
        this.addFeature(new Enum('swing_mode', access, modes).withDescription('Swing mode'));
        return this;
    }
    withPreset(modes, description = 'Mode of this device (similar to system_mode)') {
        this.addFeature(new Enum('preset', exports.access.STATE_SET, modes).withDescription(description));
        return this;
    }
    withPiHeatingDemand(access = a.STATE) {
        this.addFeature(new Numeric('pi_heating_demand', access)
            .withLabel('PI heating demand')
            .withValueMin(0)
            .withValueMax(100)
            .withUnit('%')
            .withDescription('Position of the valve (= demanded heat) where 0% is fully closed and 100% is fully open'));
        return this;
    }
    withControlSequenceOfOperation(modes, access = a.STATE) {
        const allowed = [
            'cooling_only',
            'cooling_with_reheat',
            'heating_only',
            'heating_with_reheat',
            'cooling_and_heating_4-pipes',
            'cooling_and_heating_4-pipes_with_reheat',
        ];
        modes.forEach((m) => (0, assert_1.default)(allowed.includes(m)));
        this.addFeature(new Enum('control_sequence_of_operation', access, modes).withDescription('Operating environment of the thermostat'));
        return this;
    }
    withAcLouverPosition(positions, access = a.ALL) {
        const allowed = ['fully_open', 'fully_closed', 'half_open', 'quarter_open', 'three_quarters_open'];
        positions.forEach((m) => (0, assert_1.default)(allowed.includes(m)));
        this.addFeature(new Enum('ac_louver_position', access, positions).withLabel('AC louver position').withDescription('AC louver position of this device'));
        return this;
    }
    withWeeklySchedule(modes, access = a.ALL) {
        const allowed = ['heat', 'cool'];
        modes.forEach((m) => (0, assert_1.default)(allowed.includes(m)));
        const featureDayOfWeek = new List('dayofweek', a.SET, new Composite('day', 'dayofweek', a.SET).withFeature(new Enum('day', a.SET, ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'away_or_vacation'])))
            .withLabel('Day of week')
            .withLengthMin(1)
            .withLengthMax(8)
            .withDescription('Days on which the schedule will be active.');
        const featureTransitionTime = new Composite('time', 'transitionTime', a.SET)
            .withFeature(new Numeric('hour', a.SET))
            .withFeature(new Numeric('minute', a.SET))
            .withDescription('Trigger transition X minutes after 00:00.');
        const featureTransitionHeatSetPoint = new Numeric('heatSetpoint', a.SET).withLabel('Heat setpoint').withDescription('Target heat setpoint');
        const featureTransitionCoolSetPoint = new Numeric('coolSetpoint', a.SET).withLabel('Cool setpoint').withDescription('Target cool setpoint');
        let featureTransition = new Composite('transition', 'transition', a.SET).withFeature(featureTransitionTime);
        if (modes.includes('heat'))
            featureTransition = featureTransition.withFeature(featureTransitionHeatSetPoint);
        if (modes.includes('cool'))
            featureTransition = featureTransition.withFeature(featureTransitionCoolSetPoint);
        const featureTransitions = new List('transitions', a.SET, featureTransition).withLengthMin(1).withLengthMax(10);
        const schedule = new Composite('schedule', 'weekly_schedule', access).withFeature(featureDayOfWeek).withFeature(featureTransitions);
        this.addFeature(schedule);
        return this;
    }
    clone() {
        const clone = new Climate();
        this.copy(clone);
        return clone;
    }
}
exports.Climate = Climate;
/**
 * The access property is a 3-bit bitmask.
 */
exports.access = {
    /**
     * Bit 0: The property can be found in the published state of this device
     */
    STATE: 0b001,
    /**
     * Bit 1: The property can be set with a /set command
     */
    SET: 0b010,
    /**
     * Bit 2: The property can be retrieved with a /get command
     */
    GET: 0b100,
    /**
     * Bitwise inclusive OR of STATE and SET : 0b001 | 0b010
     */
    STATE_SET: 0b011,
    /**
     * Bitwise inclusive OR of STATE and GET : 0b001 | 0b100
     */
    STATE_GET: 0b101,
    /**
     * Bitwise inclusive OR of STATE and GET and SET : 0b001 | 0b100 | 0b010
     */
    ALL: 0b111,
};
const a = exports.access;
exports.options = {
    calibration: (name, type = 'absolute') => new Numeric(`${name}_calibration`, exports.access.SET).withDescription(`Calibrates the ${name} value (${type} offset), takes into effect on next report of device.`),
    precision: (name) => new Numeric(`${name}_precision`, exports.access.SET)
        .withValueMin(0)
        .withValueMax(3)
        .withDescription(`Number of digits after decimal point for ${name}, takes into effect on next report of device. This option can only decrease the precision, not increase it.`),
    invert_cover: () => new Binary(`invert_cover`, exports.access.SET, true, false).withDescription(`Inverts the cover position, false: open=100,close=0, true: open=0,close=100 (default false).`),
    color_sync: () => new Binary(`color_sync`, exports.access.SET, true, false).withDescription(`When enabled colors will be synced, e.g. if the light supports both color x/y and color temperature a conversion from color x/y to color temperature will be done when setting the x/y color (default true).`),
    thermostat_unit: () => new Enum('thermostat_unit', exports.access.SET, ['celsius', 'fahrenheit']).withDescription('Controls the temperature unit of the thermostat (default celsius).'),
    expose_pin: () => new Binary(`expose_pin`, exports.access.SET, true, false)
        .withLabel('Expose PIN')
        .withDescription(`Expose pin of this lock in the published payload (default false).`),
    occupancy_timeout: () => new Numeric(`occupancy_timeout`, exports.access.SET)
        .withValueMin(0)
        .withDescription('Time in seconds after which occupancy is cleared after detecting it (default 90 seconds).'),
    occupancy_timeout_2: () => new Numeric(`occupancy_timeout`, exports.access.SET)
        .withValueMin(0)
        .withValueStep(0.1)
        .withUnit('s')
        .withDescription('Time in seconds after which occupancy is cleared after detecting it (default is "detection_interval" + 2 seconds). The value must be equal to or greater than "detection_interval", and it can also be a fraction.'),
    vibration_timeout: () => new Numeric(`vibration_timeout`, exports.access.SET)
        .withValueMin(0)
        .withDescription('Time in seconds after which vibration is cleared after detecting it (default 90 seconds).'),
    simulated_brightness: (extraNote = '') => new Composite('simulated_brightness', 'simulated_brightness', exports.access.SET)
        .withDescription(`Simulate a brightness value. If this device provides a brightness_move_up or brightness_move_down action it is possible to specify the update interval and delta. The action_brightness_delta indicates the delta for each interval. ${extraNote}`)
        .withFeature(new Numeric('delta', exports.access.SET).withValueMin(0).withDescription('Delta per interval, 20 by default'))
        .withFeature(new Numeric('interval', exports.access.SET).withValueMin(0).withUnit('ms').withDescription('Interval duration')),
    no_occupancy_since_true: () => new List(`no_occupancy_since`, exports.access.SET, new Numeric('time', exports.access.STATE_SET)).withDescription('Sends a message the last time occupancy (occupancy: true) was detected. When setting this for example to [10, 60] a `{"no_occupancy_since": 10}` will be send after 10 seconds and a `{"no_occupancy_since": 60}` after 60 seconds.'),
    no_occupancy_since_false: () => new List(`no_occupancy_since`, exports.access.SET, new Numeric('time', exports.access.STATE_SET)).withDescription('Sends a message after the last time no occupancy (occupancy: false) was detected. When setting this for example to [10, 60] a `{"no_occupancy_since": 10}` will be send after 10 seconds and a `{"no_occupancy_since": 60}` after 60 seconds.'),
    presence_timeout: () => new Numeric(`presence_timeout`, exports.access.SET)
        .withValueMin(0)
        .withDescription('Time in seconds after which presence is cleared after detecting it (default 100 seconds).'),
    no_position_support: () => new Binary('no_position_support', exports.access.SET, true, false).withDescription('Set to true when your device only reports position 0, 100 and 50 (in this case your device has an older firmware) (default false).'),
    transition: () => new Numeric(`transition`, exports.access.SET)
        .withValueMin(0)
        .withDescription('Controls the transition time (in seconds) of on/off, brightness, color temperature (if applicable) and color (if applicable) changes. Defaults to `0` (no transition).'),
    legacy: () => new Binary(`legacy`, exports.access.SET, true, false).withDescription(`Set to false to disable the legacy integration (highly recommended), will change structure of the published payload (default true).`),
    measurement_poll_interval: (extraNote = '') => new Numeric(`measurement_poll_interval`, exports.access.SET)
        .withValueMin(-1)
        .withDescription(`This device does not support reporting electric measurements so it is polled instead. The default poll interval is 60 seconds, set to -1 to disable.${extraNote}`),
    illuminance_below_threshold_check: () => new Binary(`illuminance_below_threshold_check`, exports.access.SET, true, false).withDescription(`Set to false to also send messages when illuminance is above threshold in night mode (default true).`),
    state_action: () => new Binary(`state_action`, exports.access.SET, true, false).withDescription(`State actions will also be published as 'action' when true (default false).`),
    identify_timeout: () => new Numeric('identify_timeout', exports.access.SET)
        .withDescription('Sets duration of identification procedure in seconds (i.e., how long device would flash). Value ranges from 1 to 30 seconds (default 3).')
        .withValueMin(1)
        .withValueMax(30),
    cover_position_tilt_disable_report: () => new Binary(`cover_position_tilt_disable_report`, exports.access.SET, true, false).withDescription(`Do not publish set cover target position as a normal 'position' value (default false).`),
    local_temperature_based_on_sensor: () => new Binary(`local_temperature_based_on_sensor`, exports.access.SET, true, false)
        .withLabel('Local temperature sensor reporting')
        .withDescription(`Base local temperature on sensor choice (default false).`),
};
exports.presets = {
    // Generic
    binary: (name, access, valueOn, valueOff) => new Binary(name, access, valueOn, valueOff),
    climate: () => new Climate(),
    composite: (name, property, access) => new Composite(name, property, access),
    cover: () => new Cover(),
    enum: (name, access, values) => new Enum(name, access, values),
    light: () => new Light(),
    numeric: (name, access) => new Numeric(name, access),
    text: (name, access) => new Text(name, access),
    list: (name, access, itemType) => new List(name, access, itemType),
    switch_: () => new Switch(),
    // Specific
    ac_frequency: () => new Numeric('ac_frequency', exports.access.STATE).withLabel('AC frequency').withUnit('Hz').withDescription('Measured electrical AC frequency'),
    action: (values) => new Enum('action', exports.access.STATE, values).withDescription('Triggered action (e.g. a button click)').withCategory('diagnostic'),
    action_duration: () => new Numeric('action_duration', exports.access.STATE).withUnit('s').withDescription('Triggered action duration in seconds').withCategory('diagnostic'),
    action_group: () => new Numeric('action_group', exports.access.STATE).withDescription('Group where the action was triggered on'),
    angle: (name) => new Numeric(name, exports.access.STATE).withValueMin(-360).withValueMax(360).withUnit('°'),
    angle_axis: (name) => new Numeric(name, exports.access.STATE).withValueMin(-90).withValueMax(90).withUnit('°'),
    aqi: () => new Numeric('aqi', exports.access.STATE).withDescription('Air quality index'),
    auto_lock: () => new Switch().withLabel('Auto lock').withState('auto_lock', false, 'Enable/disable auto lock', exports.access.STATE_SET, 'AUTO', 'MANUAL'),
    auto_off: (offTime) => new Binary('auto_off', exports.access.ALL, true, false)
        .withLabel('Auto OFF')
        .withDescription(`Turn the device automatically off when attached device consumes less than 2W for ${offTime} minutes`)
        .withCategory('config'),
    auto_relock_time: () => new Numeric('auto_relock_time', exports.access.ALL)
        .withValueMin(0)
        .withUnit('s')
        .withDescription('The number of seconds to wait after unlocking a lock before it automatically locks again. 0=disabled'),
    away_mode: () => new Switch().withLabel('Away mode').withState('away_mode', false, 'Enable/disable away mode', exports.access.STATE_SET),
    away_preset_days: () => new Numeric('away_preset_days', exports.access.STATE_SET).withDescription('Away preset days').withValueMin(0).withValueMax(100),
    away_preset_temperature: () => new Numeric('away_preset_temperature', exports.access.STATE_SET)
        .withUnit('°C')
        .withDescription('Away preset temperature')
        .withValueMin(-10)
        .withValueMax(35)
        .withCategory('config'),
    battery: () => new Numeric('battery', exports.access.STATE)
        .withUnit('%')
        .withDescription('Remaining battery in %, can take up to 24 hours before reported')
        .withValueMin(0)
        .withValueMax(100)
        .withCategory('diagnostic'),
    battery_low: () => new Binary('battery_low', exports.access.STATE, true, false)
        .withDescription('Indicates if the battery of this device is almost empty')
        .withCategory('diagnostic'),
    battery_voltage: () => new Numeric('voltage', exports.access.STATE).withUnit('mV').withDescription('Voltage of the battery in millivolts').withCategory('diagnostic'),
    boost_time: () => new Numeric('boost_time', exports.access.STATE_SET).withUnit('s').withDescription('Boost time').withValueMin(0).withValueMax(900),
    button_lock: () => new Binary('button_lock', exports.access.ALL, 'ON', 'OFF').withDescription('Disables the physical switch button').withCategory('config'),
    calibrated: () => new Binary('calibrated', exports.access.STATE, true, false).withDescription('Indicates if this device is calibrated').withCategory('diagnostic'),
    carbon_monoxide: () => new Binary('carbon_monoxide', exports.access.STATE, true, false).withDescription('Indicates if CO (carbon monoxide) is detected'),
    child_lock: () => new Lock()
        .withLabel('Child lock')
        .withState('child_lock', 'LOCK', 'UNLOCK', 'Enables/disables physical input on the device', exports.access.STATE_SET),
    child_lock_bool: () => new Binary('child_lock', exports.access.ALL, true, false).withDescription('Unlocks/locks physical input on the device').withCategory('config'),
    co2: () => new Numeric('co2', exports.access.STATE).withLabel('CO2').withUnit('ppm').withDescription('The measured CO2 (carbon dioxide) value'),
    co: () => new Numeric('co', exports.access.STATE).withLabel('CO').withUnit('ppm').withDescription('The measured CO (carbon monoxide) value'),
    comfort_temperature: () => new Numeric('comfort_temperature', exports.access.STATE_SET).withUnit('°C').withDescription('Comfort temperature').withValueMin(0).withValueMax(30),
    consumer_connected: () => new Binary('consumer_connected', exports.access.STATE, true, false)
        .withDescription('Indicates whether a plug is physically attached. Device does not have to pull power or even be connected electrically (state of this binary switch can be ON even if main power switch is OFF)')
        .withCategory('diagnostic'),
    contact: () => new Binary('contact', exports.access.STATE, false, true).withDescription('Indicates if the contact is closed (= true) or open (= false)'),
    cover_position: () => new Cover().withPosition(),
    cover_position_tilt: () => new Cover().withPosition().withTilt(),
    cover_tilt: () => new Cover().withTilt(),
    cover_mode: () => new Composite('cover_mode', 'cover_mode', exports.access.ALL)
        .withFeature(new Binary('reversed', exports.access.ALL, true, false).withDescription('Reversal of the motor rotating direction'))
        .withFeature(new Binary('calibration', exports.access.ALL, true, false).withDescription('Set the cover calibration mode'))
        .withFeature(new Binary('maintenance', exports.access.ALL, true, false).withDescription('Set the cover maintenance mode, enabling will disable the cover motor'))
        .withFeature(new Binary('led', exports.access.ALL, true, false).withDescription('Set the LED')),
    cpu_temperature: () => new Numeric('cpu_temperature', exports.access.STATE).withLabel('CPU temperature').withUnit('°C').withDescription('Temperature of the CPU'),
    cube_side: (name) => new Numeric(name, exports.access.STATE).withDescription('Side of the cube').withValueMin(0).withValueMax(6).withValueStep(1),
    current: () => new Numeric('current', exports.access.STATE).withUnit('A').withDescription('Instantaneous measured electrical current').withCategory('diagnostic'),
    current_phase_b: () => new Numeric('current_phase_b', exports.access.STATE)
        .withLabel('Current phase B')
        .withUnit('A')
        .withDescription('Instantaneous measured electrical current on phase B'),
    current_phase_c: () => new Numeric('current_phase_c', exports.access.STATE)
        .withLabel('Current phase C')
        .withUnit('A')
        .withDescription('Instantaneous measured electrical current on phase C'),
    deadzone_temperature: () => new Numeric('deadzone_temperature', exports.access.STATE_SET)
        .withUnit('°C')
        .withDescription('The delta between local_temperature and current_heating_setpoint to trigger Heat')
        .withValueMin(0)
        .withValueMax(5)
        .withValueStep(1),
    detection_interval: () => new Numeric('detection_interval', exports.access.ALL)
        .withValueMin(2)
        .withValueMax(65535)
        .withUnit('s')
        .withDescription('Time interval between action detection.')
        .withCategory('config'),
    device_temperature: () => new Numeric('device_temperature', exports.access.STATE).withUnit('°C').withDescription('Temperature of the device').withCategory('diagnostic'),
    eco2: () => new Numeric('eco2', exports.access.STATE).withLabel('eCO2').withLabel('PPM').withUnit('ppm').withDescription('Measured eCO2 value'),
    eco_mode: () => new Binary('eco_mode', exports.access.STATE_SET, 'ON', 'OFF').withDescription('ECO mode (energy saving mode)'),
    eco_temperature: () => new Numeric('eco_temperature', exports.access.STATE_SET).withUnit('°C').withDescription('Eco temperature').withValueMin(0).withValueMax(35),
    effect: () => new Enum('effect', exports.access.SET, ['blink', 'breathe', 'okay', 'channel_change', 'finish_effect', 'stop_effect']).withDescription('Triggers an effect on the light (e.g. make light blink for a few seconds)'),
    energy: () => new Numeric('energy', exports.access.STATE).withUnit('kWh').withDescription('Sum of consumed energy'),
    produced_energy: () => new Numeric('produced_energy', exports.access.STATE).withUnit('kWh').withDescription('Sum of produced energy'),
    energy_produced: () => new Numeric('energy_produced', exports.access.STATE).withUnit('kWh').withDescription('Sum of produced energy'),
    fan: () => new Fan(),
    flip_indicator_light: () => new Binary('flip_indicator_light', exports.access.ALL, 'ON', 'OFF')
        .withDescription('After turn on, the indicator light turns on while switch is off, and vice versa')
        .withCategory('config'),
    force: () => new Enum('force', exports.access.STATE_SET, ['normal', 'open', 'close']).withDescription('Force the valve position'),
    formaldehyd: () => new Numeric('formaldehyd', exports.access.STATE).withDescription('The measured formaldehyd value').withUnit('mg/m³'),
    gas: () => new Binary('gas', exports.access.STATE, true, false).withDescription('Indicates whether the device detected gas'),
    hcho: () => new Numeric('hcho', exports.access.STATE).withLabel('HCHO').withUnit('mg/m³').withDescription('Measured HCHO value'),
    holiday_temperature: () => new Numeric('holiday_temperature', exports.access.STATE_SET).withUnit('°C').withDescription('Holiday temperature').withValueMin(0).withValueMax(30),
    humidity: () => new Numeric('humidity', exports.access.STATE).withUnit('%').withDescription('Measured relative humidity'),
    illuminance: () => new Numeric('illuminance', exports.access.STATE).withDescription('Raw measured illuminance'),
    illuminance_lux: () => new Numeric('illuminance_lux', exports.access.STATE).withLabel('Illuminance (lux)').withUnit('lx').withDescription('Measured illuminance in lux'),
    brightness_state: () => new Enum('brightness_state', exports.access.STATE, ['low', 'middle', 'high', 'strong']).withDescription('Brightness state'),
    keypad_lockout: () => new Enum('keypad_lockout', exports.access.ALL, ['unlock', 'lock1', 'lock2']).withDescription('Enables/disables physical input on the device'),
    led_disabled_night: () => new Binary('led_disabled_night', exports.access.ALL, true, false)
        .withLabel('LED disabled night')
        .withDescription('Enable/disable the LED at night')
        .withCategory('config'),
    light_brightness: () => new Light().withBrightness(),
    light_brightness_color: (preferHueAndSaturation) => new Light().withBrightness().withColor(preferHueAndSaturation ? ['hs', 'xy'] : ['xy', 'hs']),
    light_brightness_colorhs: () => new Light().withBrightness().withColor(['hs']),
    light_brightness_colortemp: (colorTempRange) => new Light().withBrightness().withColorTemp(colorTempRange).withColorTempStartup(colorTempRange),
    light_brightness_colortemp_color: (colorTempRange, preferHueAndSaturation) => new Light()
        .withBrightness()
        .withColorTemp(colorTempRange)
        .withColorTempStartup(colorTempRange)
        .withColor(preferHueAndSaturation ? ['hs', 'xy'] : ['xy', 'hs']),
    light_brightness_colortemp_colorhs: (colorTempRange) => new Light().withBrightness().withColorTemp(colorTempRange).withColorTempStartup(colorTempRange).withColor(['hs']),
    light_brightness_colortemp_colorxy: (colorTempRange) => new Light().withBrightness().withColorTemp(colorTempRange).withColorTempStartup(colorTempRange).withColor(['xy']),
    light_brightness_colorxy: () => new Light().withBrightness().withColor(['xy']),
    light_colorhs: () => new Light().withColor(['hs']),
    light_color_options: () => new Composite('color_options', 'color_options', exports.access.ALL)
        .withDescription('Advanced color behavior')
        .withFeature(new Binary('execute_if_off', exports.access.SET, true, false).withDescription('Controls whether color and color temperature can be set while light is off'))
        .withCategory('config'),
    linkquality: () => new Numeric('linkquality', exports.access.STATE)
        .withUnit('lqi')
        .withDescription('Link quality (signal strength)')
        .withValueMin(0)
        .withValueMax(255)
        .withCategory('diagnostic'),
    local_temperature: () => new Numeric('local_temperature', exports.access.STATE_GET).withUnit('°C').withDescription('Current temperature measured on the device'),
    lock: () => new Lock().withState('state', 'LOCK', 'UNLOCK', 'State of the lock').withLockState('lock_state', 'Actual state of the lock'),
    lock_action: () => new Enum('action', exports.access.STATE, [
        'unknown',
        'lock',
        'unlock',
        'lock_failure_invalid_pin_or_id',
        'lock_failure_invalid_schedule',
        'unlock_failure_invalid_pin_or_id',
        'unlock_failure_invalid_schedule',
        'one_touch_lock',
        'key_lock',
        'key_unlock',
        'auto_lock',
        'schedule_lock',
        'schedule_unlock',
        'manual_lock',
        'manual_unlock',
        'non_access_user_operational_event',
    ]).withDescription('Triggered action on the lock'),
    lock_action_source_name: () => new Enum('action_source_name', exports.access.STATE, ['keypad', 'rfid', 'manual', 'rf']).withDescription('Source of the triggered action on the lock'),
    lock_action_user: () => new Numeric('action_user', exports.access.STATE).withDescription('ID of user that triggered the action on the lock'),
    max_cool_setpoint_limit: (min, max, step) => new Numeric('max_cool_setpoint_limit', exports.access.ALL)
        .withUnit('°C')
        .withDescription('Maximum Cooling set point limit')
        .withValueMin(min)
        .withValueMax(max)
        .withValueStep(step),
    min_cool_setpoint_limit: (min, max, step) => new Numeric('min_cool_setpoint_limit', exports.access.ALL)
        .withUnit('°C')
        .withDescription('Minimum Cooling point limit')
        .withValueMin(min)
        .withValueMax(max)
        .withValueStep(step),
    max_heat_setpoint_limit: (min, max, step) => new Numeric('max_heat_setpoint_limit', exports.access.ALL)
        .withUnit('°C')
        .withDescription('Maximum Heating set point limit')
        .withValueMin(min)
        .withValueMax(max)
        .withValueStep(step),
    min_heat_setpoint_limit: (min, max, step) => new Numeric('min_heat_setpoint_limit', exports.access.ALL)
        .withUnit('°C')
        .withDescription('Minimum Heating set point limit')
        .withValueMin(min)
        .withValueMax(max)
        .withValueStep(step),
    max_temperature: () => new Numeric('max_temperature', exports.access.STATE_SET).withUnit('°C').withDescription('Maximum temperature').withValueMin(15).withValueMax(35),
    max_temperature_limit: () => new Numeric('max_temperature_limit', exports.access.STATE_SET)
        .withUnit('°C')
        .withDescription('Maximum temperature limit. Cuts the thermostat out regardless of air temperature if the external floor sensor exceeds this temperature. Only used by the thermostat when in AL sensor mode.')
        .withValueMin(0)
        .withValueMax(35),
    min_temperature_limit: () => new Numeric('min_temperature_limit', exports.access.STATE_SET)
        .withUnit('°C')
        .withDescription('Minimum temperature limit for frost protection. Turns the thermostat on regardless of setpoint if the temperature drops below this.')
        .withValueMin(1)
        .withValueMax(5),
    min_temperature: () => new Numeric('min_temperature', exports.access.STATE_SET).withUnit('°C').withDescription('Minimum temperature').withValueMin(1).withValueMax(15),
    mode_switch_select: (mode_switch_names) => new Enum('mode_switch', exports.access.ALL, mode_switch_names).withDescription('Select mode switch to use').withCategory('config'),
    motion_sensitivity_select: (motion_sensitivity_names) => new Enum('motion_sensitivity', exports.access.ALL, motion_sensitivity_names)
        .withDescription('Select motion sensitivity to use')
        .withCategory('config'),
    noise: () => new Numeric('noise', exports.access.STATE).withUnit('dBA').withDescription('The measured noise value'),
    noise_detected: () => new Binary('noise_detected', exports.access.STATE, true, false).withDescription('Indicates whether the device detected noise'),
    occupancy: () => new Binary('occupancy', exports.access.STATE, true, false).withDescription('Indicates whether the device detected occupancy'),
    occupancy_level: () => new Numeric('occupancy_level', exports.access.STATE).withDescription('The measured occupancy value'),
    open_window: () => new Binary('open_window', exports.access.STATE_SET, 'ON', 'OFF').withDescription('Enables/disables the status on the device'),
    open_window_temperature: () => new Numeric('open_window_temperature', exports.access.STATE_SET)
        .withUnit('°C')
        .withDescription('Open window temperature')
        .withValueMin(0)
        .withValueMax(35),
    operation_mode_select: (operation_mode_names) => new Enum('operation_mode', exports.access.ALL, operation_mode_names).withDescription('Select operation mode to use').withCategory('config'),
    overload_protection: (min, max) => new Numeric('overload_protection', exports.access.ALL)
        .withUnit('W')
        .withValueMin(min)
        .withValueMax(max)
        .withDescription('Maximum allowed load, turns off if exceeded')
        .withCategory('config'),
    pm1: () => new Numeric('pm1', exports.access.STATE).withLabel('PM1').withUnit('µg/m³').withDescription('Measured PM1 (particulate matter) concentration'),
    pm10: () => new Numeric('pm10', exports.access.STATE).withLabel('PM10').withUnit('µg/m³').withDescription('Measured PM10 (particulate matter) concentration'),
    pm25: () => new Numeric('pm25', exports.access.STATE).withLabel('PM25').withUnit('µg/m³').withDescription('Measured PM2.5 (particulate matter) concentration'),
    position: () => new Numeric('position', exports.access.STATE).withUnit('%').withDescription('Position'),
    power: () => new Numeric('power', exports.access.STATE).withUnit('W').withDescription('Instantaneous measured power').withCategory('diagnostic'),
    power_phase_b: () => new Numeric('power_phase_b', exports.access.STATE)
        .withUnit('W')
        .withDescription('Instantaneous measured power on phase B')
        .withCategory('diagnostic'),
    power_phase_c: () => new Numeric('power_phase_c', exports.access.STATE)
        .withUnit('W')
        .withDescription('Instantaneous measured power on phase C')
        .withCategory('diagnostic'),
    power_factor: () => new Numeric('power_factor', exports.access.STATE).withDescription('Instantaneous measured power factor'),
    power_factor_phase_b: () => new Numeric('power_factor_phase_b', exports.access.STATE).withDescription('Instantaneous measured power factor on phase B'),
    power_factor_phase_c: () => new Numeric('power_factor_phase_c', exports.access.STATE).withDescription('Instantaneous measured power factor on phase C'),
    power_apparent: () => new Numeric('power_apparent', exports.access.STATE).withUnit('VA').withDescription('Instantaneous measured apparent power'),
    power_apparent_phase_b: () => new Numeric('power_apparent_phase_b', exports.access.STATE).withUnit('VA').withDescription('Instantaneous measured apparent power on phase B'),
    power_apparent_phase_c: () => new Numeric('power_apparent_phase_c', exports.access.STATE).withUnit('VA').withDescription('Instantaneous measured apparent power on phase C'),
    power_on_behavior: (values = ['off', 'previous', 'on']) => new Enum('power_on_behavior', exports.access.ALL, values)
        .withLabel('Power-on behavior')
        .withDescription('Controls the behavior when the device is powered on after power loss')
        .withCategory('config'),
    power_outage_count: (resetsWhenPairing = true) => new Numeric('power_outage_count', exports.access.STATE)
        .withDescription('Number of power outages' + (resetsWhenPairing ? ' (since last pairing)' : ''))
        .withCategory('diagnostic'),
    power_outage_memory: () => new Binary('power_outage_memory', exports.access.ALL, true, false)
        .withDescription('Enable/disable the power outage memory, this recovers the on/off mode after power failure')
        .withCategory('config'),
    power_reactive: () => new Numeric('power_reactive', exports.access.STATE).withUnit('VAR').withDescription('Instantaneous measured reactive power'),
    power_reactive_phase_b: () => new Numeric('power_reactive_phase_b', exports.access.STATE).withUnit('VAR').withDescription('Instantaneous measured reactive power on phase B'),
    power_reactive_phase_c: () => new Numeric('power_reactive_phase_c', exports.access.STATE).withUnit('VAR').withDescription('Instantaneous measured reactive power on phase C'),
    presence: () => new Binary('presence', exports.access.STATE, true, false).withDescription('Indicates whether the device detected presence'),
    pressure: () => new Numeric('pressure', exports.access.STATE).withUnit('hPa').withDescription('The measured atmospheric pressure'),
    programming_operation_mode: (values = ['setpoint', 'schedule', 'schedule_with_preheat', 'eco']) => new Enum('programming_operation_mode', exports.access.ALL, values).withDescription('Controls how programming affects the thermostat. Possible values: setpoint (only use specified setpoint), schedule (follow programmed setpoint schedule), schedule_with_preheat (follow programmed setpoint schedule with pre-heating). Changing this value does not clear programmed schedules.'),
    setup: () => new Binary('setup', exports.access.STATE, true, false).withDescription('Indicates if the device is in setup mode').withCategory('diagnostic'),
    schedule: () => new Binary('schedule', exports.access.ALL, true, false)
        .withDescription('When enabled, the device will change its state based on your schedule settings')
        .withCategory('config'),
    schedule_settings: () => new Text('schedule_settings', exports.access.ALL).withDescription('Allows schedule configuration').withCategory('config'),
    external_temperature_input: () => new Numeric('external_temperature_input', exports.access.ALL)
        .withUnit('°C')
        .withValueMin(0)
        .withValueMax(55)
        .withDescription('Input for remote temperature sensor')
        .withCategory('config'),
    smoke: () => new Binary('smoke', exports.access.STATE, true, false).withDescription('Indicates whether the device detected smoke'),
    soil_moisture: () => new Numeric('soil_moisture', exports.access.STATE).withUnit('%').withDescription('Measured soil moisture value'),
    sos: () => new Binary('sos', exports.access.STATE, true, false).withLabel('SOS').withDescription('SOS alarm'),
    sound_volume: () => new Enum('sound_volume', exports.access.ALL, ['silent_mode', 'low_volume', 'high_volume']).withDescription('Sound volume of the lock'),
    switch: (description = 'On/off state of the switch') => new Switch().withState('state', true, description),
    switch_type: () => new Enum('switch_type', exports.access.ALL, ['toggle', 'momentary']).withDescription('Wall switch type'),
    door_state: () => new Enum('door_state', exports.access.STATE, [
        'open',
        'closed',
        'error_jammed',
        'error_forced_open',
        'error_unspecified',
        'undefined',
    ]).withDescription('State of the door'),
    tamper: () => new Binary('tamper', exports.access.STATE, true, false).withDescription('Indicates whether the device is tampered'),
    temperature: () => new Numeric('temperature', exports.access.STATE).withUnit('°C').withDescription('Measured temperature value'),
    temperature_sensor_select: (sensor_names) => new Enum('sensor', exports.access.STATE_SET, sensor_names).withDescription('Select temperature sensor to use').withCategory('config'),
    test: () => new Binary('test', exports.access.STATE, true, false).withDescription('Indicates whether the device is being tested'),
    trigger_count: (sinceScheduledReport = true) => new Numeric('trigger_count', exports.access.STATE)
        .withDescription('Indicates how many times the sensor was triggered' + (sinceScheduledReport ? ' (since last scheduled report)' : ''))
        .withCategory('diagnostic'),
    trigger_indicator: () => new Binary('trigger_indicator', exports.access.ALL, true, false).withDescription('Enables trigger indication').withCategory('config'),
    valve_alarm: () => new Binary('valve_alarm', exports.access.STATE, true, false).withCategory('diagnostic'),
    valve_position: () => new Numeric('position', exports.access.ALL).withValueMin(0).withValueMax(100).withDescription('Position of the valve'),
    valve_switch: () => new Binary('state', exports.access.ALL, 'OPEN', 'CLOSE').withDescription('Valve state if open or closed'),
    valve_state: () => new Binary('valve_state', exports.access.STATE, 'OPEN', 'CLOSED').withDescription('Valve state if open or closed'),
    valve_detection: () => new Switch().withLabel('Valve detection').withState('valve_detection', true, 'Valve detection').setAccess('state', exports.access.STATE_SET), // left for compatability, do not use
    valve_detection_bool: () => new Binary('valve_detection', exports.access.ALL, true, false)
        .withDescription('Determines if temperature control abnormalities should be detected')
        .withCategory('config'),
    vibration: () => new Binary('vibration', exports.access.STATE, true, false).withDescription('Indicates whether the device detected vibration'),
    tilt: () => new Binary('tilt', exports.access.STATE, true, false).withDescription('Indicates whether the device detected tilt'),
    voc: () => new Numeric('voc', exports.access.STATE).withLabel('VOC').withUnit('µg/m³').withDescription('Measured VOC value'),
    voc_index: () => new Numeric('voc_index', exports.access.STATE).withLabel('VOC index').withDescription('VOC index'),
    voltage: () => new Numeric('voltage', exports.access.STATE).withUnit('V').withDescription('Measured electrical potential value').withCategory('diagnostic'),
    voltage_phase_b: () => new Numeric('voltage_phase_b', exports.access.STATE)
        .withLabel('Voltage phase B')
        .withUnit('V')
        .withDescription('Measured electrical potential value on phase B'),
    voltage_phase_c: () => new Numeric('voltage_phase_c', exports.access.STATE)
        .withLabel('Voltage phase C')
        .withUnit('V')
        .withDescription('Measured electrical potential value on phase C'),
    water_leak: () => new Binary('water_leak', exports.access.STATE, true, false).withDescription('Indicates whether the device detected a water leak'),
    pilot_wire_mode: (values = ['comfort', 'eco', 'frost_protection', 'off', 'comfort_-1', 'comfort_-2']) => new Enum('pilot_wire_mode', exports.access.ALL, ['comfort', 'eco', 'frost_protection', 'off', 'comfort_-1', 'comfort_-2']).withDescription('Controls the target temperature of the heater, with respect to the temperature set on that heater. Possible values: comfort (target temperature = heater set temperature) eco (target temperature = heater set temperature - 3.5°C), frost_protection (target temperature = 7 to 8°C), off (heater stops heating), and the less commonly used comfort_-1 (target temperature = heater set temperature - 1°C), comfort_-2 (target temperature = heater set temperature - 2°C),.'),
    rain: () => new Binary('rain', exports.access.STATE, true, false).withDescription('Indicates whether the device detected rainfall'),
    warning: () => new Composite('warning', 'warning', exports.access.SET)
        .withFeature(new Enum('mode', exports.access.SET, [
        'stop',
        'burglar',
        'fire',
        'emergency',
        'police_panic',
        'fire_panic',
        'emergency_panic',
    ]).withDescription('Mode of the warning (sound effect)'))
        .withFeature(new Enum('level', exports.access.SET, ['low', 'medium', 'high', 'very_high']).withDescription('Sound level'))
        .withFeature(new Enum('strobe_level', exports.access.SET, ['low', 'medium', 'high', 'very_high']).withDescription('Intensity of the strobe'))
        .withFeature(new Binary('strobe', exports.access.SET, true, false).withDescription('Turn on/off the strobe (light) during warning'))
        .withFeature(new Numeric('strobe_duty_cycle', exports.access.SET).withValueMax(10).withValueMin(0).withDescription('Length of the flash cycle'))
        .withFeature(new Numeric('duration', exports.access.SET).withUnit('s').withDescription('Duration in seconds of the alarm')),
    week: () => new Enum('week', exports.access.STATE_SET, ['5+2', '6+1', '7']).withDescription('Week format user for schedule'),
    window_detection: () => new Switch()
        .withLabel('Window detection')
        .withState('window_detection', true, 'Enables/disables window detection on the device', exports.access.STATE_SET), // left for compatability, do not use
    window_detection_bool: () => new Binary('window_detection', exports.access.ALL, true, false)
        .withDescription('Enables/disables window detection on the device')
        .withCategory('config'),
    window_open: () => new Binary('window_open', exports.access.STATE, true, false).withDescription('Indicates if window is open').withCategory('diagnostic'),
    moving: () => new Binary('moving', exports.access.STATE, true, false).withDescription('Indicates if the device is moving'),
    x_axis: () => new Numeric('x_axis', exports.access.STATE).withDescription('Accelerometer X value'),
    y_axis: () => new Numeric('y_axis', exports.access.STATE).withDescription('Accelerometer Y value'),
    z_axis: () => new Numeric('z_axis', exports.access.STATE).withDescription('Accelerometer Z value'),
    pincode: () => new Composite('pin_code', 'pin_code', exports.access.ALL)
        .withFeature(new Numeric('user', exports.access.SET).withDescription('User ID to set or clear the pincode for'))
        .withFeature(new Enum('user_type', exports.access.SET, ['unrestricted', 'year_day_schedule', 'week_day_schedule', 'master', 'non_access']).withDescription('Type of user, unrestricted: owner (default), (year|week)_day_schedule: user has ability to open lock based on specific time period, master: user has ability to both program and operate the door lock, non_access: user is recognized by the lock but does not have the ability to open the lock'))
        .withFeature(new Binary('user_enabled', exports.access.SET, true, false).withDescription('Whether the user is enabled/disabled'))
        .withFeature(new Numeric('pin_code', exports.access.SET).withLabel('PIN code').withDescription('Pincode to set, set pincode to null to clear')),
    squawk: () => new Composite('squawk', 'squawk', exports.access.SET)
        .withFeature(new Enum('state', exports.access.SET, ['system_is_armed', 'system_is_disarmed']).withDescription('Set Squawk state'))
        .withFeature(new Enum('level', exports.access.SET, ['low', 'medium', 'high', 'very_high']).withDescription('Sound level'))
        .withFeature(new Binary('strobe', exports.access.SET, true, false).withDescription('Turn on/off the strobe (light) for Squawk')),
    identify_duration: () => new Numeric('identify', exports.access.SET)
        .withValueMin(0)
        .withValueMax(30)
        .withUnit('seconds')
        .withDescription('Duration of flashing')
        .withCategory('config'),
    identify: () => new Enum('identify', exports.access.SET, ['identify']).withDescription('Ititiate device identification').withCategory('config'),
    min_brightness: () => new Numeric('min_brightness', exports.access.ALL).withValueMin(1).withValueMax(255).withDescription('Minimum light brightness'),
    max_brightness: () => new Numeric('max_brightness', exports.access.ALL).withValueMin(1).withValueMax(255).withDescription('Maximum light brightness'),
};
exports.binary = (name, access, valueOn, valueOff) => new Binary(name, access, valueOn, valueOff);
exports.climate = () => new Climate();
exports.composite = (name, property, access) => new Composite(name, property, access);
exports.cover = () => new Cover();
exports.enum = (name, access, values) => new Enum(name, access, values);
exports.light = () => new Light();
exports.numeric = (name, access) => new Numeric(name, access);
exports.switch = () => new Switch();
exports.text = (name, access) => new Text(name, access);
exports.list = (name, access, itemType) => new List(name, access, itemType);
exports.lock = () => new Lock();
//# sourceMappingURL=exposes.js.map