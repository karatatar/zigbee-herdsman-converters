import * as exposes from './exposes';
import * as modernExtend from './modernExtend';
import { Expose, Fz, KeyValue, KeyValueAny, ModernExtend, OnEvent, OnEventData, OnEventType, Publish, Range, Tuya, Tz, Zh } from './types';
export declare const dataTypes: {
    raw: number;
    bool: number;
    number: number;
    string: number;
    enum: number;
    bitmap: number;
};
export declare function convertBufferToNumber(chunks: Buffer | number[]): number;
interface OnEventArgs {
    queryOnDeviceAnnounce?: boolean;
    timeStart?: '1970' | '2000';
    respondToMcuVersionResponse?: boolean;
    queryIntervalSeconds?: number;
}
export declare function onEvent(args?: OnEventArgs): OnEvent;
export declare function convertDecimalValueTo4ByteHexArray(value: number): number[];
export declare function onEventMeasurementPoll(type: OnEventType, data: OnEventData, device: Zh.Device, options: KeyValue, electricalMeasurement?: boolean, metering?: boolean): Promise<void>;
export declare function onEventSetTime(type: OnEventType, data: KeyValue, device: Zh.Device): Promise<void>;
export declare function onEventSetLocalTime(type: OnEventType, data: KeyValue, device: Zh.Device): Promise<void>;
export declare function sendDataPointValue(entity: Zh.Group | Zh.Endpoint, dp: number, value: number, cmd?: string, seq?: number): Promise<number>;
export declare function sendDataPointBool(entity: Zh.Group | Zh.Endpoint, dp: number, value: boolean, cmd?: string, seq?: number): Promise<number>;
export declare function sendDataPointEnum(entity: Zh.Group | Zh.Endpoint, dp: number, value: number, cmd?: string, seq?: number): Promise<number>;
export declare function sendDataPointRaw(entity: Zh.Group | Zh.Endpoint, dp: number, value: number[], cmd?: string, seq?: number): Promise<number>;
export declare function sendDataPointBitmap(entity: Zh.Group | Zh.Endpoint, dp: number, value: number, cmd?: string, seq?: number): Promise<number>;
export declare function sendDataPointStringBuffer(entity: Zh.Group | Zh.Endpoint, dp: number, value: string, cmd?: string, seq?: number): Promise<number>;
declare const tuyaExposes: {
    lightType: () => exposes.Enum;
    lightBrightnessWithMinMax: () => exposes.Light;
    lightBrightness: () => exposes.Light;
    countdown: () => exposes.Numeric;
    switch: () => exposes.Switch;
    selfTest: () => exposes.Binary;
    selfTestResult: () => exposes.Enum;
    faultAlarm: () => exposes.Binary;
    silence: () => exposes.Binary;
    frostProtection: (extraNote?: string) => exposes.Binary;
    errorStatus: () => exposes.Numeric;
    scheduleAllDays: (access: number, format: string) => exposes.Text[];
    temperatureUnit: () => exposes.Enum;
    temperatureCalibration: () => exposes.Numeric;
    humidityCalibration: () => exposes.Numeric;
    gasValue: () => exposes.Numeric;
    energyWithPhase: (phase: string) => exposes.Numeric;
    energyProducedWithPhase: (phase: string) => exposes.Numeric;
    energyFlowWithPhase: (phase: string, more: [string]) => exposes.Enum;
    voltageWithPhase: (phase: string) => exposes.Numeric;
    powerWithPhase: (phase: string) => exposes.Numeric;
    currentWithPhase: (phase: string) => exposes.Numeric;
    powerFactorWithPhase: (phase: string) => exposes.Numeric;
    switchType: () => exposes.Enum;
    backlightModeLowMediumHigh: () => exposes.Enum;
    backlightModeOffNormalInverted: () => exposes.Enum;
    backlightModeOffOn: () => exposes.Binary;
    indicatorMode: () => exposes.Enum;
    indicatorModeNoneRelayPos: () => exposes.Enum;
    powerOutageMemory: () => exposes.Enum;
    batteryState: () => exposes.Enum;
    doNotDisturb: () => exposes.Binary;
    colorPowerOnBehavior: () => exposes.Enum;
    switchMode: () => exposes.Enum;
    switchMode2: () => exposes.Enum;
    lightMode: () => exposes.Enum;
    inchingSwitch: (quantity: number) => exposes.Composite;
};
export { tuyaExposes as exposes };
export declare const skip: {
    stateOnAndBrightnessPresent: (meta: Tz.Meta) => boolean;
};
export declare const configureMagicPacket: (device: Zh.Device, coordinatorEndpoint: Zh.Endpoint) => Promise<void>;
export declare const fingerprint: (modelID: string, manufacturerNames: string[]) => {
    modelID: string;
    manufacturerName: string;
}[];
export declare const whitelabel: (vendor: string, model: string, description: string, manufacturerNames: string[]) => {
    vendor: string;
    model: string;
    description: string;
    fingerprint: {
        manufacturerName: string;
    }[];
};
declare class Base {
    value: number;
    constructor(value: number);
    valueOf(): number;
}
export declare class Enum extends Base {
    constructor(value: number);
}
declare const enumConstructor: (value: number) => Enum;
export { enumConstructor as enum };
export declare class Bitmap extends Base {
    constructor(value: number);
}
type LookupMap = {
    [s: string]: number | boolean | Enum | string;
};
export declare const valueConverterBasic: {
    lookup: (map: LookupMap | ((options: KeyValue, device: Zh.Device) => LookupMap), fallbackValue?: number | boolean | KeyValue | string | null) => {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    scale: (min1: number, max1: number, min2: number, max2: number) => {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    raw: () => {
        to: (v: string | number | boolean) => string | number | boolean;
        from: (v: string | number | boolean) => string | number | boolean;
    };
    divideBy: (value: number) => {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    divideByFromOnly: (value: number) => {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    trueFalse: (valueTrue: number | Enum) => {
        from: (v: number) => boolean;
    };
};
export declare const valueConverter: {
    trueFalse0: {
        from: (v: number) => boolean;
    };
    trueFalse1: {
        from: (v: number) => boolean;
    };
    trueFalseInvert: {
        to: (v: boolean) => boolean;
        from: (v: boolean) => boolean;
    };
    trueFalseEnum0: {
        from: (v: number) => boolean;
    };
    trueFalseEnum1: {
        from: (v: number) => boolean;
    };
    onOff: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    powerOnBehavior: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    powerOnBehaviorEnum: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    switchType: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    switchType2: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    backlightModeOffNormalInverted: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    backlightModeOffLowMediumHigh: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    lightType: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    countdown: {
        to: (v: string | number | boolean) => string | number | boolean;
        from: (v: string | number | boolean) => string | number | boolean;
    };
    scale0_254to0_1000: {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    scale0_1to0_1000: {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    divideBy100: {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    temperatureUnit: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    temperatureUnitEnum: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    batteryState: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    divideBy10: {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    divideBy1000: {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    divideBy10FromOnly: {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    switchMode: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    switchMode2: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    lightMode: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    raw: {
        to: (v: string | number | boolean) => string | number | boolean;
        from: (v: string | number | boolean) => string | number | boolean;
    };
    localTemperatureCalibration: {
        from: (value: number) => number;
        to: (value: number) => number;
    };
    setLimit: {
        to: (v: number) => number;
        from: (v: number) => number;
    };
    coverPosition: {
        to: (v: number, meta: Tz.Meta) => Promise<number>;
        from: (v: number, meta: Fz.Meta, options: KeyValue, publish: Publish) => number;
    };
    coverPositionInverted: {
        to: (v: number, meta: Tz.Meta) => Promise<number>;
        from: (v: number, meta: Fz.Meta, options: KeyValue, publish: Publish) => number;
    };
    tubularMotorDirection: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    plus1: {
        from: (v: number) => number;
        to: (v: number) => number;
    };
    static: (value: string | number) => {
        from: (v: string | number) => string | number;
    };
    phaseVariant1: {
        from: (v: string) => {
            voltage: number;
            current: number;
        };
    };
    phaseVariant2: {
        from: (v: string) => {
            voltage: number;
            current: number;
            power: number;
        };
    };
    phaseVariant2WithPhase: (phase: string) => {
        from: (v: string) => {
            [x: string]: number;
        };
    };
    phaseVariant3: {
        from: (v: string) => {
            voltage: number;
            current: number;
            power: number;
        };
    };
    power: {
        from: (v: number) => number;
    };
    threshold: {
        from: (v: string) => {
            threshold_1_protection: unknown;
            threshold_1: unknown;
            threshold_1_value: number;
            threshold_2_protection: unknown;
            threshold_2: unknown;
            threshold_2_value: number;
        };
    };
    threshold_2: {
        to: (v: number, meta: Tz.Meta) => Promise<void>;
        from: (v: string) => KeyValue;
    };
    threshold_3: {
        to: (v: number, meta: Tz.Meta) => Promise<void>;
        from: (v: string) => KeyValue;
    };
    selfTestResult: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    lockUnlock: {
        to: (v: string, meta: Tz.Meta) => string | number | boolean | Enum;
        from: (v: number, _meta: Fz.Meta, options: KeyValue) => string | number | boolean | KeyValue;
    };
    localTempCalibration1: {
        from: (v: number) => number;
        to: (v: number) => number;
    };
    localTempCalibration2: {
        from: (v: number) => number;
        to: (v: number) => number;
    };
    localTempCalibration3: {
        from: (v: number) => number;
        to: (v: number) => number;
    };
    thermostatHolidayStartStop: {
        from: (v: string) => string;
        to: (v: string) => string;
    };
    thermostatScheduleDaySingleDP: {
        from: (v: number[]) => string;
        to: (v: KeyValue, meta: Tz.Meta) => unknown[];
    };
    thermostatScheduleDayMultiDP: {
        from: (v: string) => string;
        to: (v: string) => number[];
    };
    thermostatScheduleDayMultiDPWithDayNumber: (dayNum: number) => {
        from: (v: string) => string;
        to: (v: string) => number[];
    };
    thermostatScheduleDayMultiDP_TRV602Z: {
        from: (v: string) => string;
        to: (v: string) => number[];
    };
    thermostatScheduleDayMultiDP_TRV602Z_WithDayNumber: (dayNum: number) => {
        from: (v: string) => string;
        to: (v: string) => number[];
    };
    tv02Preset: () => {
        from: (v: number) => "auto" | "manual" | "holiday";
        to: (v: string, meta: Tz.Meta) => Enum;
    };
    thermostatSystemModeAndPreset: (toKey: string) => {
        from: (v: string) => {
            preset: string;
            system_mode: string;
        };
        to: (v: string) => Enum;
    };
    ZWT07_schedule: {
        from: (value: number[], meta: Fz.Meta, options: KeyValue) => string;
        to: (value: string, meta: Tz.Meta) => Promise<number[]>;
    };
    thermostatGtz10SystemModeAndPreset: (toKey: string) => {
        from: (v: string) => {
            preset: never;
            system_mode: never;
        };
        to: (v: string) => Enum;
    };
    ZWT198_schedule: {
        from: (value: number[], meta: Fz.Meta, options: KeyValue) => {
            schedule_weekday: string;
            schedule_holiday: string;
        };
        to: (v: string, meta: Tz.Meta) => Promise<void>;
    };
    TV02SystemMode: {
        to: (v: number, meta: Tz.Meta) => Promise<void>;
        from: (v: boolean) => {
            system_mode: string;
            heating_stop: string;
        };
    };
    TV02FrostProtection: {
        to: (v: unknown, meta: Tz.Meta) => Promise<void>;
        from: (v: unknown) => {
            frost_protection: string;
        };
    };
    inverse: {
        to: (v: boolean) => boolean;
        from: (v: boolean) => boolean;
    };
    onOffNotStrict: {
        from: (v: string) => "ON" | "OFF";
        to: (v: string) => v is "ON";
    };
    errorOrBatteryLow: {
        from: (v: number) => {
            battery_low: boolean;
            error?: undefined;
        } | {
            error: number;
            battery_low?: undefined;
        };
    };
    inchingSwitch: {
        to: (value: KeyValueAny) => string;
        from: (value: string) => KeyValue;
    };
};
declare const tuyaTz: {
    power_on_behavior_1: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, meta: Tz.Meta) => Promise<void>;
    };
    power_on_behavior_2: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, meta: Tz.Meta) => Promise<void>;
    };
    switch_type: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, meta: Tz.Meta) => Promise<void>;
    };
    backlight_indicator_mode_1: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, meta: Tz.Meta) => Promise<void>;
    };
    backlight_indicator_mode_2: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, meta: Tz.Meta) => Promise<void>;
    };
    child_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    min_brightness_attribute: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                min_brightness: number;
            };
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, meta: Tz.Meta) => Promise<void>;
    };
    min_brightness_command: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                min_brightness: number;
            };
        }>;
    };
    color_power_on_behavior: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                color_power_on_behavior: unknown;
            };
        }>;
    };
    datapoints: {
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: KeyValue;
        }>;
    };
    do_not_disturb: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                do_not_disturb: unknown;
            };
        }>;
    };
    on_off_countdown: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: KeyValue;
        }>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, meta: Tz.Meta) => Promise<void>;
    };
    inchingSwitch: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: KeyValue, meta: Tz.Meta) => Promise<{
            state: {
                inching_control_set: KeyValue;
            };
        }>;
    };
};
export { tuyaTz as tz };
declare const tuyaFz: {
    brightness: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            [x: string]: number;
        };
    };
    gateway_connection_status: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => Promise<void>;
    };
    power_on_behavior_1: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            [x: string]: unknown;
        };
    };
    power_on_behavior_2: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            [x: string]: unknown;
        };
    };
    power_outage_memory: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            [x: string]: unknown;
        };
    };
    switch_type: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            switch_type: unknown;
        };
    };
    backlight_mode_low_medium_high: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            backlight_mode: unknown;
        };
    };
    backlight_mode_off_normal_inverted: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            backlight_mode: string;
        };
    };
    backlight_mode_off_on: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            backlight_mode: string;
        };
    };
    indicator_mode: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            indicator_mode: string;
        };
    };
    child_lock: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            child_lock: string;
        };
    };
    min_brightness_attribute: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            [x: string]: number;
        };
    };
    datapoints: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => KeyValue;
    };
    on_off_action: {
        cluster: string;
        type: string;
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    on_off_countdown: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => KeyValue;
    };
    inchingSwitch: {
        cluster: string;
        type: string[];
        convert: (model: import("./types").Definition, msg: Fz.Message, publish: Publish, options: KeyValue, meta: Fz.Meta) => KeyValue;
    };
};
export { tuyaFz as fz };
export declare function getHandlersForDP(name: string, dp: number, type: number, converter: Tuya.ValueConverterSingle, readOnly?: boolean, skip?: (meta: Tz.Meta) => boolean, endpoint?: string, useGlobalSequence?: boolean): [Fz.Converter[], Tz.Converter[]];
export interface TuyaDPEnumLookupArgs {
    name: string;
    dp: number;
    type?: number;
    lookup?: KeyValue;
    description?: string;
    readOnly?: boolean;
    endpoint?: string;
    skip?: (meta: Tz.Meta) => boolean;
    expose?: Expose;
}
export interface TuyaDPBinaryArgs {
    name: string;
    dp: number;
    type: number;
    valueOn: [string | boolean, unknown];
    valueOff: [string | boolean, unknown];
    description?: string;
    readOnly?: boolean;
    endpoint?: string;
    skip?: (meta: Tz.Meta) => boolean;
    expose?: Expose;
}
export interface TuyaDPNumericArgs {
    name: string;
    dp: number;
    type: number;
    description?: string;
    readOnly?: boolean;
    endpoint?: string;
    unit?: string;
    skip?: (meta: Tz.Meta) => boolean;
    valueMin?: number;
    valueMax?: number;
    valueStep?: number;
    scale?: number | [number, number, number, number];
    expose?: exposes.Numeric;
}
export interface TuyaDPLightArgs {
    state: {
        dp: number;
        type: number;
        valueOn: [string | boolean, unknown];
        valueOff: [string | boolean, unknown];
        skip?: (meta: Tz.Meta) => boolean;
    };
    brightness: {
        dp: number;
        type: number;
        scale?: number | [number, number, number, number];
    };
    max?: {
        dp: number;
        type: number;
        scale?: number | [number, number, number, number];
    };
    min?: {
        dp: number;
        type: number;
        scale?: number | [number, number, number, number];
    };
    colorTemp?: {
        dp: number;
        type: number;
        range: Range;
        scale?: number | [number, number, number, number];
    };
    endpoint?: string;
}
declare const tuyaModernExtend: {
    tuyaBase(args?: {
        onEvent?: OnEventArgs;
        dp: true;
    }): ModernExtend;
    dpEnumLookup(args: Partial<TuyaDPEnumLookupArgs>): ModernExtend;
    dpBinary(args: Partial<TuyaDPBinaryArgs>): ModernExtend;
    dpNumeric(args: Partial<TuyaDPNumericArgs>): ModernExtend;
    dpLight(args: TuyaDPLightArgs): ModernExtend;
    dpTemperature(args?: Partial<TuyaDPNumericArgs>): ModernExtend;
    dpHumidity(args?: Partial<TuyaDPNumericArgs>): ModernExtend;
    dpBattery(args?: Partial<TuyaDPNumericArgs>): ModernExtend;
    dpBatteryState(args?: Partial<TuyaDPEnumLookupArgs>): ModernExtend;
    dpTemperatureUnit(args?: Partial<TuyaDPEnumLookupArgs>): ModernExtend;
    dpContact(args?: Partial<TuyaDPBinaryArgs>, invert?: boolean): ModernExtend;
    dpAction(args?: Partial<TuyaDPEnumLookupArgs>): ModernExtend;
    dpIlluminance(args?: Partial<TuyaDPNumericArgs>): ModernExtend;
    dpGas(args?: Partial<TuyaDPBinaryArgs>, invert?: boolean): ModernExtend;
    dpOnOff(args?: Partial<TuyaDPBinaryArgs>): ModernExtend;
    dpPowerOnBehavior(args?: Partial<TuyaDPEnumLookupArgs>): ModernExtend;
    tuyaLight(args?: modernExtend.LightArgs & {
        minBrightness?: "none" | "attribute" | "command";
        switchType?: boolean;
    }): ModernExtend;
    tuyaOnOff: (args?: {
        endpoints?: string[];
        powerOutageMemory?: boolean;
        powerOnBehavior2?: boolean;
        switchType?: boolean;
        backlightModeLowMediumHigh?: boolean;
        indicatorMode?: boolean;
        backlightModeOffNormalInverted?: boolean;
        backlightModeOffOn?: boolean;
        electricalMeasurements?: boolean;
        electricalMeasurementsFzConverter?: Fz.Converter;
        childLock?: boolean;
        switchMode?: boolean;
        onOffCountdown?: boolean;
        inchingSwitch?: boolean;
    }) => ModernExtend;
    dpBacklightMode(args?: Partial<TuyaDPEnumLookupArgs>): ModernExtend;
    combineActions(actions: ModernExtend[]): ModernExtend;
    tuyaSwitchMode: (args?: Partial<modernExtend.EnumLookupArgs>) => ModernExtend;
    tuyaLedIndicator(): ModernExtend;
    tuyaMagicPacket(): ModernExtend;
    tuyaOnOffAction(args?: Partial<modernExtend.ActionEnumLookupArgs>): ModernExtend;
    tuyaOnOffActionLegacy(args: {
        actions: ("single" | "double" | "hold")[];
        endpointNames?: string[];
    }): ModernExtend;
    dpChildLock(args?: Partial<TuyaDPBinaryArgs>): ModernExtend;
};
export { tuyaModernExtend as modernExtend };
declare const tuyaClusters: {
    addTuyaCommonPrivateCluster: () => ModernExtend;
};
export { tuyaClusters as clusters };
//# sourceMappingURL=tuya.d.ts.map