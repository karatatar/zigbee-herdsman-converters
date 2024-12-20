import * as exposes from './exposes';
import { Definition, Fz, KeyValueNumberString, Publish, Tz, Zh } from './types';
interface KeyValueAny {
    [s: string]: any;
}
declare function getDataValue(dpValue: any): any;
declare function getTypeName(dpValue: any): string;
declare function logUnexpectedDataPoint(where: string, msg: KeyValueAny, dpValue: any, meta: Fz.Meta): void;
declare function logUnexpectedDataType(where: any, msg: any, dpValue: any, meta: Fz.Meta, expectedDataType?: any): void;
declare function getDataPointNames(dpValue: any): string[];
declare function getCoverStateEnums(manufacturerName: string): any;
declare function convertDecimalValueTo4ByteHexArray(value: number): number[];
declare function sendDataPoints(entity: Zh.Endpoint | Zh.Group, dpValues: any, cmd?: string, seq?: number): Promise<number>;
declare function convertStringToHexArray(value: string): number[];
declare function dpValueFromIntValue(dp: number, value: number): {
    dp: number;
    datatype: number;
    data: number[];
};
declare function dpValueFromBool(dp: number, value: boolean | number): {
    dp: number;
    datatype: number;
    data: number[];
};
declare function dpValueFromEnum(dp: number, value: number): {
    dp: number;
    datatype: number;
    data: number[];
};
declare function dpValueFromStringBuffer(dp: number, stringBuffer: string): {
    dp: number;
    datatype: number;
    data: string;
};
declare function dpValueFromRaw(dp: number, rawBuffer: any): {
    dp: number;
    datatype: number;
    data: any;
};
declare function dpValueFromBitmap(dp: number, bitmapBuffer: any): {
    dp: number;
    datatype: number;
    data: any;
};
declare function sendDataPoint(entity: Zh.Endpoint | Zh.Group, dpValue: any, cmd?: string, seq?: number): Promise<number>;
declare function sendDataPointValue(entity: Zh.Endpoint | Zh.Group, dp: number, value: any, cmd?: string, seq?: number): Promise<number>;
declare function sendDataPointBool(entity: Zh.Endpoint | Zh.Group, dp: number, value: boolean | number, cmd?: string, seq?: number): Promise<number>;
declare function sendDataPointEnum(entity: Zh.Endpoint | Zh.Group, dp: number, value: number, cmd?: string, seq?: number): Promise<number>;
declare function sendDataPointRaw(entity: Zh.Endpoint | Zh.Group, dp: number, value: any, cmd?: string, seq?: number): Promise<number>;
declare function sendDataPointBitmap(entity: Zh.Endpoint | Zh.Group, dp: number, value: any, cmd?: string, seq?: number): Promise<number>;
declare function sendDataPointStringBuffer(entity: Zh.Endpoint | Zh.Group, dp: number, value: any, cmd?: string, seq?: number): Promise<number>;
declare function convertRawToCycleTimer(value: any): {
    timernr: number;
    starttime: string;
    endtime: string;
    irrigationDuration: number;
    pauseDuration: number;
    weekdays: string;
    active: number;
};
declare function logDataPoint(where: string, msg: KeyValueAny, dpValue: any, meta: any): void;
declare const thermostatSystemModes2: KeyValueAny;
declare const thermostatSystemModes3: KeyValueAny;
declare const thermostatSystemModes4: KeyValueNumberString;
declare const thermostatPresets: KeyValueNumberString;
declare const msLookups: KeyValueAny;
declare const ZMLookups: KeyValueAny;
declare const moesSwitch: KeyValueAny;
declare const tuyaHPSCheckingResult: KeyValueAny;
declare function convertWeekdaysTo1ByteHexArray(weekdays: string): number | number[];
declare function convertRawToTimer(value: any): {
    timernr: number;
    time: string;
    duration: number;
    weekdays: string;
    active: string;
};
declare function logUnexpectedDataValue(where: string, msg: KeyValueAny, dpValue: any, meta: Fz.Meta, valueKind: any, expectedMinValue?: any, expectedMaxValue?: any): void;
declare function isCoverInverted(manufacturerName: string): boolean;
declare function convertDecimalValueTo2ByteHexArray(value: any): number[];
declare function convertTimeTo2ByteHexArray(time: string): number[];
declare const dataPoints: {
    wateringTimer: {
        valve_state_auto_shutdown: number;
        water_flow: number;
        shutdown_timer: number;
        remaining_watering_time: number;
        valve_state: number;
        last_watering_duration: number;
        battery: number;
    };
    state: number;
    heatingSetpoint: number;
    coverPosition: number;
    dimmerLevel: number;
    dimmerMinLevel: number;
    localTemp: number;
    coverArrived: number;
    occupancy: number;
    mode: number;
    fanMode: number;
    dimmerMaxLevel: number;
    motorDirection: number;
    config: number;
    childLock: number;
    coverChange: number;
    runningState: number;
    valveDetection: number;
    battery: number;
    tempCalibration: number;
    waterLeak: number;
    minTemp: number;
    maxTemp: number;
    windowDetection: number;
    boostTime: number;
    coverSpeed: number;
    forceMode: number;
    comfortTemp: number;
    ecoTemp: number;
    valvePos: number;
    batteryLow: number;
    weekFormat: number;
    scheduleWorkday: number;
    scheduleHoliday: number;
    awayTemp: number;
    windowOpen: number;
    autoLock: number;
    awayDays: number;
    eardaDimmerLevel: number;
    siterwellWindowDetection: number;
    moesHold: number;
    moesScheduleEnable: number;
    moesHeatingSetpoint: number;
    moesMaxTempLimit: number;
    moesMaxTemp: number;
    moesDeadZoneTemp: number;
    moesLocalTemp: number;
    moesMinTempLimit: number;
    moesTempCalibration: number;
    moesValve: number;
    moesChildLock: number;
    moesSensor: number;
    moesSchedule: number;
    etopErrorStatus: number;
    moesSsystemMode: number;
    moesSheatingSetpoint: number;
    moesSlocalTemp: number;
    moesSboostHeating: number;
    moesSboostHeatingCountdown: number;
    moesSreset: number;
    moesSwindowDetectionFunktion_A2: number;
    moesSwindowDetection: number;
    moesSchildLock: number;
    moesSbattery: number;
    moesSschedule: number;
    moesSvalvePosition: number;
    moesSboostHeatingCountdownTimeSet: number;
    moesScompensationTempSet: number;
    moesSecoMode: number;
    moesSecoModeTempSet: number;
    moesSmaxTempSet: number;
    moesSminTempSet: number;
    moesCoverCalibration: number;
    moesCoverBacklight: number;
    moesCoverMotorReversal: number;
    neoOccupancy: number;
    neoPowerType: number;
    neoMelody: number;
    neoDuration: number;
    neoTamper: number;
    neoAlarm: number;
    neoTemp: number;
    neoTempScale: number;
    neoHumidity: number;
    neoMinTemp: number;
    neoMaxTemp: number;
    neoMinHumidity: number;
    neoMaxHumidity: number;
    neoUnknown2: number;
    neoTempAlarm: number;
    neoTempHumidityAlarm: number;
    neoHumidityAlarm: number;
    neoUnknown3: number;
    neoVolume: number;
    neoAOBattPerc: number;
    neoAOMelody: number;
    neoAODuration: number;
    neoAOAlarm: number;
    neoAOVolume: number;
    saswellHeating: number;
    saswellWindowDetection: number;
    saswellFrostDetection: number;
    saswellTempCalibration: number;
    saswellChildLock: number;
    saswellState: number;
    saswellLocalTemp: number;
    saswellHeatingSetpoint: number;
    saswellValvePos: number;
    saswellBatteryLow: number;
    saswellAwayMode: number;
    saswellScheduleMode: number;
    saswellScheduleEnable: number;
    saswellScheduleSet: number;
    saswellSetpointHistoryDay: number;
    saswellTimeSync: number;
    saswellSetpointHistoryWeek: number;
    saswellSetpointHistoryMonth: number;
    saswellSetpointHistoryYear: number;
    saswellLocalHistoryDay: number;
    saswellLocalHistoryWeek: number;
    saswellLocalHistoryMonth: number;
    saswellLocalHistoryYear: number;
    saswellMotorHistoryDay: number;
    saswellMotorHistoryWeek: number;
    saswellMotorHistoryMonth: number;
    saswellMotorHistoryYear: number;
    saswellScheduleSunday: number;
    saswellScheduleMonday: number;
    saswellScheduleTuesday: number;
    saswellScheduleWednesday: number;
    saswellScheduleThursday: number;
    saswellScheduleFriday: number;
    saswellScheduleSaturday: number;
    saswellAntiScaling: number;
    hyHeating: number;
    hyExternalTemp: number;
    hyAwayDays: number;
    hyAwayTemp: number;
    hyMaxTempProtection: number;
    hyMinTempProtection: number;
    hyTempCalibration: number;
    hyHysteresis: number;
    hyProtectionHysteresis: number;
    hyProtectionMaxTemp: number;
    hyProtectionMinTemp: number;
    hyMaxTemp: number;
    hyMinTemp: number;
    hySensor: number;
    hyPowerOnBehavior: number;
    hyWeekFormat: number;
    hyWorkdaySchedule1: number;
    hyWorkdaySchedule2: number;
    hyHolidaySchedule1: number;
    hyHolidaySchedule2: number;
    hyState: number;
    hyHeatingSetpoint: number;
    hyLocalTemp: number;
    hyMode: number;
    hyChildLock: number;
    hyAlarm: number;
    silvercrestChangeMode: number;
    silvercrestSetBrightness: number;
    silvercrestSetColorTemp: number;
    silvercrestSetColor: number;
    silvercrestSetEffect: number;
    fantemPowerSupplyMode: number;
    fantemReportingTime: number;
    fantemExtSwitchType: number;
    fantemTempCalibration: number;
    fantemHumidityCalibration: number;
    fantemLoadDetectionMode: number;
    fantemLuxCalibration: number;
    fantemExtSwitchStatus: number;
    fantemTemp: number;
    fantemHumidity: number;
    fantemMotionEnable: number;
    fantemControlMode: number;
    fantemBattery: number;
    fantemLedEnable: number;
    fantemReportingEnable: number;
    fantemLoadType: number;
    fantemLoadDimmable: number;
    wooxSwitch: number;
    wooxBattery: number;
    wooxSmokeTest: number;
    frankEverTimer: number;
    frankEverTreshold: number;
    dinrailPowerMeterTotalEnergy: number;
    dinrailPowerMeterCurrent: number;
    dinrailPowerMeterPower: number;
    dinrailPowerMeterVoltage: number;
    dinrailPowerMeterTotalEnergy2: number;
    dinrailPowerMeterPower2: number;
    tuyaSabCO2: number;
    tuyaSabTemp: number;
    tuyaSabHumidity: number;
    tuyaSabVOC: number;
    tuyaSabFormaldehyd: number;
    tuyaSahkMP25: number;
    tuyaSahkCO2: number;
    tuyaSahkFormaldehyd: number;
    tuyaSabCOalarm: number;
    tuyaSabCO: number;
    moes105DimmerState1: number;
    moes105DimmerLevel1: number;
    moes105DimmerState2: number;
    moes105DimmerLevel2: number;
    trsPresenceState: number;
    trsSensitivity: number;
    trsMotionState: number;
    trsIlluminanceLux: number;
    trsDetectionData: number;
    trsScene: number;
    trsMotionDirection: number;
    trsMotionSpeed: number;
    trsfPresenceState: number;
    trsfSensitivity: number;
    trsfMotionState: number;
    trsfIlluminanceLux: number;
    trsfTumbleSwitch: number;
    trsfTumbleAlarmTime: number;
    trsfScene: number;
    trsfMotionDirection: number;
    trsfMotionSpeed: number;
    trsfFallDownStatus: number;
    trsfStaticDwellAlarm: number;
    trsfFallSensitivity: number;
    msVSensitivity: number;
    msOSensitivity: number;
    msVacancyDelay: number;
    msMode: number;
    msVacantConfirmTime: number;
    msReferenceLuminance: number;
    msLightOnLuminancePrefer: number;
    msLightOffLuminancePrefer: number;
    msLuminanceLevel: number;
    msLedStatus: number;
    tvMode: number;
    tvWindowDetection: number;
    tvFrostDetection: number;
    tvHeatingSetpoint: number;
    tvLocalTemp: number;
    tvTempCalibration: number;
    tvWorkingDay: number;
    tvHolidayTemp: number;
    tvBattery: number;
    tvChildLock: number;
    tvErrorStatus: number;
    tvHolidayMode: number;
    tvBoostTime: number;
    tvOpenWindowTemp: number;
    tvComfortTemp: number;
    tvEcoTemp: number;
    tvWeekSchedule: number;
    tvHeatingStop: number;
    tvMondaySchedule: number;
    tvWednesdaySchedule: number;
    tvFridaySchedule: number;
    tvSundaySchedule: number;
    tvTuesdaySchedule: number;
    tvThursdaySchedule: number;
    tvSaturdaySchedule: number;
    tvBoostMode: number;
    hochCountdownTimer: number;
    hochFaultCode: number;
    hochRelayStatus: number;
    hochChildLock: number;
    hochVoltage: number;
    hochCurrent: number;
    hochActivePower: number;
    hochLeakageCurrent: number;
    hochTemperature: number;
    hochRemainingEnergy: number;
    hochRechargeEnergy: number;
    hochCostParameters: number;
    hochLeakageParameters: number;
    hochVoltageThreshold: number;
    hochCurrentThreshold: number;
    hochTemperatureThreshold: number;
    hochTotalActivePower: number;
    hochEquipmentNumberType: number;
    hochClearEnergy: number;
    hochLocking: number;
    hochTotalReverseActivePower: number;
    hochHistoricalVoltage: number;
    hochHistoricalCurrent: number;
    nousTemperature: number;
    nousHumidity: number;
    nousBattery: number;
    nousTempUnitConvert: number;
    nousMaxTemp: number;
    nousMinTemp: number;
    nousMaxHumi: number;
    nousMinHumi: number;
    nousTempAlarm: number;
    nousHumiAlarm: number;
    nousHumiSensitivity: number;
    nousTempSensitivity: number;
    nousTempReportInterval: number;
    nousHumiReportInterval: number;
    tthTemperature: number;
    tthHumidity: number;
    tthBatteryLevel: number;
    tthBattery: number;
    thitBatteryPercentage: number;
    thitIlluminanceLux: number;
    tIlluminanceLux: number;
    thitHumidity: number;
    thitTemperature: number;
    tuyaVibration: number;
    wlsWaterLeak: number;
    wlsBatteryPercentage: number;
    evanellMode: number;
    evanellHeatingSetpoint: number;
    evanellLocalTemp: number;
    evanellBattery: number;
    evanellChildLock: number;
    AM02Control: number;
    AM02PercentControl: number;
    AM02PercentState: number;
    AM02Mode: number;
    AM02Direction: number;
    AM02WorkState: number;
    AM02CountdownLeft: number;
    AM02TimeTotal: number;
    AM02SituationSet: number;
    AM02Fault: number;
    AM02Border: number;
    AM02MotorWorkingMode: number;
    AM02AddRemoter: number;
    garageDoorTrigger: number;
    garageDoorContact: number;
    garageDoorStatus: number;
    moesSwitchPowerOnBehavior: number;
    moesSwitchIndicateLight: number;
    x5hState: number;
    x5hMode: number;
    x5hWorkingStatus: number;
    x5hSound: number;
    x5hFrostProtection: number;
    x5hSetTemp: number;
    x5hSetTempCeiling: number;
    x5hCurrentTemp: number;
    x5hTempCorrection: number;
    x5hWeeklyProcedure: number;
    x5hWorkingDaySetting: number;
    x5hFactoryReset: number;
    x5hChildLock: number;
    x5hSensorSelection: number;
    x5hFaultAlarm: number;
    x5hTempDiff: number;
    x5hProtectionTempLimit: number;
    x5hOutputReverse: number;
    x5hBackplaneBrightness: number;
    connecteState: number;
    connecteMode: number;
    connecteHeatingSetpoint: number;
    connecteLocalTemp: number;
    connecteTempCalibration: number;
    connecteChildLock: number;
    connecteTempFloor: number;
    connecteSensorType: number;
    connecteHysteresis: number;
    connecteRunningState: number;
    connecteTempProgram: number;
    connecteOpenWindow: number;
    connecteMaxProtectTemp: number;
    tshpsPresenceState: number;
    tshpscSensitivity: number;
    tshpsMinimumRange: number;
    tshpsMaximumRange: number;
    tshpsTargetDistance: number;
    tshpsDetectionDelay: number;
    tshpsFadingTime: number;
    tshpsIlluminanceLux: number;
    tshpsCLI: number;
    tshpsSelfTest: number;
    lmsState: number;
    lmsBattery: number;
    lmsSensitivity: number;
    lmsKeepTime: number;
    lmsIlluminance: number;
    alectoSmokeState: number;
    alectoSmokeValue: number;
    alectoSelfChecking: number;
    alectoCheckingResult: number;
    alectoSmokeTest: number;
    alectoLifecycle: number;
    alectoBatteryState: number;
    alectoBatteryPercentage: number;
    alectoSilence: number;
    bacFanMode: number;
    HPSZInductionState: number;
    HPSZPresenceTime: number;
    HPSZLeavingTime: number;
    HPSZLEDState: number;
    giexWaterValve: {
        battery: number;
        currentTemperature: number;
        cycleIrrigationInterval: number;
        cycleIrrigationNumTimes: number;
        irrigationEndTime: number;
        irrigationStartTime: number;
        irrigationTarget: number;
        lastIrrigationDuration: number;
        mode: number;
        state: number;
        waterConsumed: number;
    };
    zsHeatingSetpoint: number;
    zsChildLock: number;
    zsTempCalibration: number;
    zsLocalTemp: number;
    zsBatteryVoltage: number;
    zsComfortTemp: number;
    zsEcoTemp: number;
    zsHeatingSetpointAuto: number;
    zsOpenwindowTemp: number;
    zsOpenwindowTime: number;
    zsErrorStatus: number;
    zsMode: number;
    zsAwaySetting: number;
    zsBinaryOne: number;
    zsBinaryTwo: number;
    zsScheduleMonday: number;
    zsScheduleTuesday: number;
    zsScheduleWednesday: number;
    zsScheduleThursday: number;
    zsScheduleFriday: number;
    zsScheduleSaturday: number;
    zsScheduleSunday: number;
};
declare function firstDpValue(msg: any, meta: any, converterName: any): any;
declare function getMetaValue(entity: any, definition: any, key: string, groupStrategy?: string): any;
declare const tuyaGetDataValue: (dataType: any, data: any) => any;
declare const ictcg1: (model: any, msg: any, publish: any, options: any, action: any) => any;
declare const giexWaterValve: {
    battery: string;
    currentTemperature: string;
    cycleIrrigationInterval: string;
    cycleIrrigationNumTimes: string;
    irrigationEndTime: string;
    irrigationStartTime: string;
    irrigationTarget: string;
    lastIrrigationDuration: string;
    mode: string;
    state: string;
    waterConsumed: string;
};
declare const thermostatControlSequenceOfOperations: {
    [s: number]: string;
};
declare const thermostatSystemModes: {
    [s: number]: string;
};
declare const fromZigbee: {
    tuya_thermostat_weekly_schedule_1: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            weekly_schedule: {
                days: string[];
                transitions: {
                    time: any;
                    heating_setpoint: string;
                }[];
            };
        } | {
            weekly_schedule: {
                [x: number]: {
                    dayofweek: number;
                    numoftrans: any;
                    mode: number;
                    transitions: {
                        transitionTime: any;
                        heatSetpoint: string;
                    }[];
                };
            };
        };
    };
    TS0222: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    watering_timer: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    ZM35HQ_battery: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            battery: any;
        };
    };
    ZMRM02: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            battery: any;
            action?: undefined;
        } | {
            action: string;
            battery?: undefined;
        };
    };
    SA12IZL: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    R7049_status: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    woox_R7060: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            state: string;
            battery?: undefined;
        } | {
            battery: any;
            state?: undefined;
        };
    };
    hpsz: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            presence: boolean;
            duration_of_attendance?: undefined;
            duration_of_absence?: undefined;
            led_state?: undefined;
        } | {
            duration_of_attendance: any;
            presence?: undefined;
            duration_of_absence?: undefined;
            led_state?: undefined;
        } | {
            duration_of_absence: any;
            presence?: undefined;
            duration_of_attendance?: undefined;
            led_state?: undefined;
        } | {
            led_state: any;
            presence?: undefined;
            duration_of_attendance?: undefined;
            duration_of_absence?: undefined;
        };
    };
    zb_sm_cover: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    x5h_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            system_mode: string;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            running_state: string;
            system_mode?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            sound: string;
            system_mode?: undefined;
            running_state?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            frost_protection: string;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            week: any;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            factory_reset: string;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            deadzone_temperature: number;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            heating_temp_limit: any;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            brightness_state: any;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            schedule: string;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            child_lock: string;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            current_heating_setpoint: number;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            upper_temp: any;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            local_temperature: number;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            local_temperature_calibration: number;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            preset?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            preset: any;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            sensor?: undefined;
            output_reverse?: undefined;
        } | {
            sensor: any;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            output_reverse?: undefined;
        } | {
            output_reverse: any;
            system_mode?: undefined;
            running_state?: undefined;
            sound?: undefined;
            frost_protection?: undefined;
            week?: undefined;
            factory_reset?: undefined;
            deadzone_temperature?: undefined;
            heating_temp_limit?: undefined;
            brightness_state?: undefined;
            schedule?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            upper_temp?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            preset?: undefined;
            sensor?: undefined;
        };
    };
    zs_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    giexWaterValve: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            [x: string]: any;
        };
    };
    tuya_alecto_smoke: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            smoke_state: any;
            smoke_value?: undefined;
            self_checking?: undefined;
            checking_result?: undefined;
            smoke_test?: undefined;
            lifecycle?: undefined;
            battery?: undefined;
            battery_state?: undefined;
            silence?: undefined;
        } | {
            smoke_value: any;
            smoke_state?: undefined;
            self_checking?: undefined;
            checking_result?: undefined;
            smoke_test?: undefined;
            lifecycle?: undefined;
            battery?: undefined;
            battery_state?: undefined;
            silence?: undefined;
        } | {
            self_checking: any;
            smoke_state?: undefined;
            smoke_value?: undefined;
            checking_result?: undefined;
            smoke_test?: undefined;
            lifecycle?: undefined;
            battery?: undefined;
            battery_state?: undefined;
            silence?: undefined;
        } | {
            checking_result: any;
            smoke_state?: undefined;
            smoke_value?: undefined;
            self_checking?: undefined;
            smoke_test?: undefined;
            lifecycle?: undefined;
            battery?: undefined;
            battery_state?: undefined;
            silence?: undefined;
        } | {
            smoke_test: any;
            smoke_state?: undefined;
            smoke_value?: undefined;
            self_checking?: undefined;
            checking_result?: undefined;
            lifecycle?: undefined;
            battery?: undefined;
            battery_state?: undefined;
            silence?: undefined;
        } | {
            lifecycle: any;
            smoke_state?: undefined;
            smoke_value?: undefined;
            self_checking?: undefined;
            checking_result?: undefined;
            smoke_test?: undefined;
            battery?: undefined;
            battery_state?: undefined;
            silence?: undefined;
        } | {
            battery: any;
            smoke_state?: undefined;
            smoke_value?: undefined;
            self_checking?: undefined;
            checking_result?: undefined;
            smoke_test?: undefined;
            lifecycle?: undefined;
            battery_state?: undefined;
            silence?: undefined;
        } | {
            battery_state: any;
            smoke_state?: undefined;
            smoke_value?: undefined;
            self_checking?: undefined;
            checking_result?: undefined;
            smoke_test?: undefined;
            lifecycle?: undefined;
            battery?: undefined;
            silence?: undefined;
        } | {
            silence: any;
            smoke_state?: undefined;
            smoke_value?: undefined;
            self_checking?: undefined;
            checking_result?: undefined;
            smoke_test?: undefined;
            lifecycle?: undefined;
            battery?: undefined;
            battery_state?: undefined;
        };
    };
    SmartButton_skip: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    konke_click: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => any;
    };
    terncy_raw: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: any;
        };
    };
    CCTSwitch_D0001_on_off: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    ptvo_switch_buttons: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    ZGRC013_brightness_onoff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    ZGRC013_brightness_stop: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    ZGRC013_scene: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    ZGRC013_cmdOn: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    ZGRC013_cmdOff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    ZGRC013_brightness: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    CTR_U_scene: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    st_button_state: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: any;
        };
    };
    cover_stop: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    cover_open: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    cover_close: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    TS0218_click: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    scenes_recall_click: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: any;
        };
    };
    AV2010_34_click: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: any;
        };
    };
    genOnOff_cmdOn: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    genOnOff_cmdOff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            click: string;
        };
    };
    RM01_on_click: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    RM01_off_click: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    RM01_down_hold: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    RM01_up_hold: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    RM01_stop: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    cmd_move: {
        cluster: string;
        type: string;
        options: (exposes.Binary | exposes.Composite)[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
            rate: any;
        };
    };
    cmd_move_with_onoff: {
        cluster: string;
        type: string;
        options: (exposes.Binary | exposes.Composite)[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
            rate: any;
        };
    };
    cmd_stop: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        } | {
            action: string;
            brightness: any;
        };
    };
    cmd_stop_with_onoff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        } | {
            action: string;
            brightness: any;
        };
    };
    cmd_move_to_level_with_onoff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    immax_07046L_arm: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    KEF1PA_arm: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    CTR_U_brightness_updown_click: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    CTR_U_brightness_updown_hold: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
            rate: any;
        };
    };
    CTR_U_brightness_updown_release: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    osram_lightify_switch_cmdOn: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    osram_lightify_switch_cmdOff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    osram_lightify_switch_cmdMoveWithOnOff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
        };
    };
    osram_lightify_switch_AC0251100NJ_cmdStop: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: any;
        };
    };
    osram_lightify_switch_cmdMove: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
        };
    };
    osram_lightify_switch_cmdMoveHue: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
        };
    };
    osram_lightify_switch_cmdMoveToSaturation: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_saturation: any;
            action_transition_time: any;
        } | {
            action: string;
        };
    };
    osram_lightify_switch_cmdMoveToLevelWithOnOff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    osram_lightify_switch_cmdMoveToColorTemp: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_color_temperature: any;
            action_transition_time: any;
        };
    };
    osram_lightify_switch_73743_cmdStop: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    osram_lightify_switch_AB371860355_cmdOn: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    osram_lightify_switch_AB371860355_cmdOff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    osram_lightify_switch_AB371860355_cmdStepColorTemp: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    osram_lightify_switch_AB371860355_cmdMoveWithOnOff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
        };
    };
    osram_lightify_switch_AB371860355_cmdMove: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
        };
    };
    osram_lightify_switch_AB371860355_cmdStop: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    osram_lightify_switch_AB371860355_cmdMoveHue: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
        };
    };
    osram_lightify_switch_AB371860355_cmdMoveSat: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_saturation: any;
            action_transition_time: any;
        } | {
            action: string;
        };
    };
    insta_scene_click: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    insta_down_hold: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    insta_up_hold: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    insta_stop: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    tint404011_brightness_updown_click: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny | {
            action: string;
            step_size: any;
            transition_time: any;
        };
    };
    tint404011_brightness_updown_hold: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
            rate: any;
        };
    };
    tint404011_brightness_updown_release: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    tint404011_move_to_color_temp: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_color_temperature: any;
            action_transition_time: any;
            action_color_temperature_direction: string;
        } | {
            action: string;
            action_color_temperature: any;
            transition_time: any;
        };
    };
    tint404011_move_to_color: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_color: {
                x: number;
                y: number;
            };
            action_transition_time: any;
        } | {
            action_color: {
                x: number;
                y: number;
            };
            action: string;
            transition_time: any;
        };
    };
    heiman_smart_controller_armmode: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    LZL4B_onoff: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    eria_81825_updown: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    ZYCT202_stop: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        } | {
            action: string;
            action_group: number;
        };
    };
    ZYCT202_up_down: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_rate: any;
        } | {
            action: string;
            action_group: number;
        };
    };
    STS_PRS_251_beeping: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    dimmer_passthru_brightness: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    bitron_thermostat_att_report: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    thermostat_att_report: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    stelpro_thermostat: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => Promise<import("./types").KeyValueAny> | KeyValueAny;
    };
    viessmann_thermostat_att_report: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => Promise<import("./types").KeyValueAny> | KeyValueAny;
    };
    wiser_thermostat: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    hvac_user_interface: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    thermostat_weekly_schedule_rsp: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    terncy_knob: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
            action_direction: string;
            action_number: number;
        } | {
            action: string;
            direction: string;
            number: number;
        };
    };
    wiser_itrv_battery: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    ubisys_c4_scenes: {
        cluster: string;
        type: string;
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    ubisys_c4_onoff: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    ubisys_c4_level: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    ubisys_c4_cover: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            action: string;
        };
    };
    hue_dimmer_switch: {
        cluster: string;
        type: string;
        options: (exposes.Binary | exposes.Composite)[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => import("./types").KeyValueAny;
    };
    blitzwolf_occupancy_with_timeout: {
        cluster: string;
        type: string;
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    moes_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            program: {
                weekdays_p1_hour: any;
                weekdays_p1_minute: any;
                weekdays_p1_temperature: number;
                weekdays_p2_hour: any;
                weekdays_p2_minute: any;
                weekdays_p2_temperature: number;
                weekdays_p3_hour: any;
                weekdays_p3_minute: any;
                weekdays_p3_temperature: number;
                weekdays_p4_hour: any;
                weekdays_p4_minute: any;
                weekdays_p4_temperature: number;
                saturday_p1_hour: any;
                saturday_p1_minute: any;
                saturday_p1_temperature: number;
                saturday_p2_hour: any;
                saturday_p2_minute: any;
                saturday_p2_temperature: number;
                saturday_p3_hour: any;
                saturday_p3_minute: any;
                saturday_p3_temperature: number;
                saturday_p4_hour: any;
                saturday_p4_minute: any;
                saturday_p4_temperature: number;
                sunday_p1_hour: any;
                sunday_p1_minute: any;
                sunday_p1_temperature: number;
                sunday_p2_hour: any;
                sunday_p2_minute: any;
                sunday_p2_temperature: number;
                sunday_p3_hour: any;
                sunday_p3_minute: any;
                sunday_p3_temperature: number;
                sunday_p4_hour: any;
                sunday_p4_minute: any;
                sunday_p4_temperature: number;
            };
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            system_mode: any;
            program?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            preset_mode: string;
            preset: string;
            program?: undefined;
            system_mode?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            child_lock: string;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            current_heating_setpoint: any;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            min_temperature_limit: any;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            max_temperature_limit: any;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            max_temperature: any;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            deadzone_temperature: any;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            local_temperature: number;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            local_temperature_calibration: any;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            heat: string;
            running_state: string;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            sensor?: undefined;
            fan_mode?: undefined;
        } | {
            sensor: string;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            fan_mode?: undefined;
        } | {
            fan_mode: any;
            program?: undefined;
            system_mode?: undefined;
            preset_mode?: undefined;
            preset?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            min_temperature_limit?: undefined;
            max_temperature_limit?: undefined;
            max_temperature?: undefined;
            deadzone_temperature?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            heat?: undefined;
            running_state?: undefined;
            sensor?: undefined;
        };
    };
    moesS_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            preset: any;
            system_mode: string;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            current_heating_setpoint: any;
            preset?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            local_temperature: number;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            boost_heating: string;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            boost_heating_countdown: any;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            running_state: string;
            valve_state: string;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            window_detection: string;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            window: string;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            child_lock: string;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            battery: any;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            boost_heating_countdown_time_set: any;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            position: any;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            local_temperature?: any;
            local_temperature_calibration: any;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            eco_mode: string;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            eco_temperature: any;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            max_temperature: any;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            min_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            min_temperature: any;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            programming_mode?: undefined;
        } | {
            programming_mode: string;
            preset?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            boost_heating?: undefined;
            boost_heating_countdown?: undefined;
            running_state?: undefined;
            valve_state?: undefined;
            window_detection?: undefined;
            window?: undefined;
            child_lock?: undefined;
            battery?: undefined;
            boost_heating_countdown_time_set?: undefined;
            position?: undefined;
            eco_mode?: undefined;
            eco_temperature?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
        };
    };
    tuya_air_quality: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            temperature: number;
            humidity?: undefined;
            co2?: undefined;
            formaldehyd?: undefined;
            pm25?: undefined;
            voc?: undefined;
        } | {
            humidity: number;
            temperature?: undefined;
            co2?: undefined;
            formaldehyd?: undefined;
            pm25?: undefined;
            voc?: undefined;
        } | {
            co2: any;
            temperature?: undefined;
            humidity?: undefined;
            formaldehyd?: undefined;
            pm25?: undefined;
            voc?: undefined;
        } | {
            formaldehyd: any;
            temperature?: undefined;
            humidity?: undefined;
            co2?: undefined;
            pm25?: undefined;
            voc?: undefined;
        } | {
            pm25: any;
            temperature?: undefined;
            humidity?: undefined;
            co2?: undefined;
            formaldehyd?: undefined;
            voc?: undefined;
        } | {
            voc: any;
            temperature?: undefined;
            humidity?: undefined;
            co2?: undefined;
            formaldehyd?: undefined;
            pm25?: undefined;
        };
    };
    tuya_CO: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            co: number;
            carbon_monoxide?: undefined;
        } | {
            carbon_monoxide: string;
            co?: undefined;
        };
    };
    connecte_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            state: string;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            system_mode: string;
            away_mode: string;
            state?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            current_heating_setpoint: any;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            local_temperature: any;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            local_temperature_calibration: any;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            child_lock: string;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            external_temperature: any;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            sensor: any;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            hysteresis: any;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            running_state: string;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            window_detection?: undefined;
            max_temperature_protection?: undefined;
        } | {
            window_detection: string;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            max_temperature_protection?: undefined;
        } | {
            max_temperature_protection: any;
            state?: undefined;
            system_mode?: undefined;
            away_mode?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            sensor?: undefined;
            hysteresis?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
        };
    };
    saswell_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            heating: string;
            running_state: string;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            window_detection: string;
            heating?: undefined;
            running_state?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            frost_detection: string;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            local_temperature_calibration: any;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            child_lock: string;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            system_mode: string;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            local_temperature: number;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            current_heating_setpoint: number;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            battery_low: boolean;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            away_mode: string;
            preset_mode: string;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            schedule_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            schedule_mode: any;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            anti_scaling?: undefined;
        } | {
            anti_scaling: string;
            heating?: undefined;
            running_state?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature_calibration?: undefined;
            child_lock?: undefined;
            system_mode?: undefined;
            local_temperature?: undefined;
            current_heating_setpoint?: undefined;
            battery_low?: undefined;
            away_mode?: undefined;
            preset_mode?: undefined;
            schedule_mode?: undefined;
        };
    };
    evanell_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    etop_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            system_mode: string;
            high_temperature?: undefined;
            low_temperature?: undefined;
            internal_sensor_error?: undefined;
            external_sensor_error?: undefined;
            battery_low?: undefined;
            device_offline?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            away_mode?: undefined;
            preset?: undefined;
            running_state?: undefined;
        } | {
            system_mode?: undefined;
            high_temperature?: undefined;
            low_temperature?: undefined;
            internal_sensor_error?: undefined;
            external_sensor_error?: undefined;
            battery_low?: undefined;
            device_offline?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            away_mode?: undefined;
            preset?: undefined;
            running_state?: undefined;
        } | {
            high_temperature: string;
            low_temperature: string;
            internal_sensor_error: string;
            external_sensor_error: string;
            battery_low: boolean;
            device_offline: string;
            system_mode?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            away_mode?: undefined;
            preset?: undefined;
            running_state?: undefined;
        } | {
            child_lock: string;
            system_mode?: undefined;
            high_temperature?: undefined;
            low_temperature?: undefined;
            internal_sensor_error?: undefined;
            external_sensor_error?: undefined;
            battery_low?: undefined;
            device_offline?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            away_mode?: undefined;
            preset?: undefined;
            running_state?: undefined;
        } | {
            current_heating_setpoint: string;
            system_mode?: undefined;
            high_temperature?: undefined;
            low_temperature?: undefined;
            internal_sensor_error?: undefined;
            external_sensor_error?: undefined;
            battery_low?: undefined;
            device_offline?: undefined;
            child_lock?: undefined;
            local_temperature?: undefined;
            away_mode?: undefined;
            preset?: undefined;
            running_state?: undefined;
        } | {
            local_temperature: string;
            system_mode?: undefined;
            high_temperature?: undefined;
            low_temperature?: undefined;
            internal_sensor_error?: undefined;
            external_sensor_error?: undefined;
            battery_low?: undefined;
            device_offline?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            away_mode?: undefined;
            preset?: undefined;
            running_state?: undefined;
        } | {
            system_mode: string;
            away_mode: string;
            preset: string;
            high_temperature?: undefined;
            low_temperature?: undefined;
            internal_sensor_error?: undefined;
            external_sensor_error?: undefined;
            battery_low?: undefined;
            device_offline?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            running_state?: undefined;
        } | {
            running_state: string;
            system_mode?: undefined;
            high_temperature?: undefined;
            low_temperature?: undefined;
            internal_sensor_error?: undefined;
            external_sensor_error?: undefined;
            battery_low?: undefined;
            device_offline?: undefined;
            child_lock?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            away_mode?: undefined;
            preset?: undefined;
        };
    };
    tuya_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    tuya_dimmer: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            state: string;
            brightness?: undefined;
            min_brightness?: undefined;
            max_brightness?: undefined;
            level?: undefined;
        } | {
            brightness: number;
            state?: undefined;
            min_brightness?: undefined;
            max_brightness?: undefined;
            level?: undefined;
        } | {
            min_brightness: number;
            state?: undefined;
            brightness?: undefined;
            max_brightness?: undefined;
            level?: undefined;
        } | {
            max_brightness: number;
            state?: undefined;
            brightness?: undefined;
            min_brightness?: undefined;
            level?: undefined;
        } | {
            brightness: number;
            level: any;
            state?: undefined;
            min_brightness?: undefined;
            max_brightness?: undefined;
        };
    };
    tuya_motion_sensor: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            occupancy: any;
            reference_luminance?: undefined;
            o_sensitivity?: undefined;
            v_sensitivity?: undefined;
            led_status?: undefined;
            vacancy_delay?: undefined;
            light_on_luminance_prefer?: undefined;
            light_off_luminance_prefer?: undefined;
            mode?: undefined;
            vacant_confirm_time?: undefined;
            luminance_level?: undefined;
        } | {
            reference_luminance: any;
            occupancy?: undefined;
            o_sensitivity?: undefined;
            v_sensitivity?: undefined;
            led_status?: undefined;
            vacancy_delay?: undefined;
            light_on_luminance_prefer?: undefined;
            light_off_luminance_prefer?: undefined;
            mode?: undefined;
            vacant_confirm_time?: undefined;
            luminance_level?: undefined;
        } | {
            o_sensitivity: any;
            occupancy?: undefined;
            reference_luminance?: undefined;
            v_sensitivity?: undefined;
            led_status?: undefined;
            vacancy_delay?: undefined;
            light_on_luminance_prefer?: undefined;
            light_off_luminance_prefer?: undefined;
            mode?: undefined;
            vacant_confirm_time?: undefined;
            luminance_level?: undefined;
        } | {
            v_sensitivity: any;
            occupancy?: undefined;
            reference_luminance?: undefined;
            o_sensitivity?: undefined;
            led_status?: undefined;
            vacancy_delay?: undefined;
            light_on_luminance_prefer?: undefined;
            light_off_luminance_prefer?: undefined;
            mode?: undefined;
            vacant_confirm_time?: undefined;
            luminance_level?: undefined;
        } | {
            led_status: any;
            occupancy?: undefined;
            reference_luminance?: undefined;
            o_sensitivity?: undefined;
            v_sensitivity?: undefined;
            vacancy_delay?: undefined;
            light_on_luminance_prefer?: undefined;
            light_off_luminance_prefer?: undefined;
            mode?: undefined;
            vacant_confirm_time?: undefined;
            luminance_level?: undefined;
        } | {
            vacancy_delay: any;
            occupancy?: undefined;
            reference_luminance?: undefined;
            o_sensitivity?: undefined;
            v_sensitivity?: undefined;
            led_status?: undefined;
            light_on_luminance_prefer?: undefined;
            light_off_luminance_prefer?: undefined;
            mode?: undefined;
            vacant_confirm_time?: undefined;
            luminance_level?: undefined;
        } | {
            light_on_luminance_prefer: any;
            occupancy?: undefined;
            reference_luminance?: undefined;
            o_sensitivity?: undefined;
            v_sensitivity?: undefined;
            led_status?: undefined;
            vacancy_delay?: undefined;
            light_off_luminance_prefer?: undefined;
            mode?: undefined;
            vacant_confirm_time?: undefined;
            luminance_level?: undefined;
        } | {
            light_off_luminance_prefer: any;
            occupancy?: undefined;
            reference_luminance?: undefined;
            o_sensitivity?: undefined;
            v_sensitivity?: undefined;
            led_status?: undefined;
            vacancy_delay?: undefined;
            light_on_luminance_prefer?: undefined;
            mode?: undefined;
            vacant_confirm_time?: undefined;
            luminance_level?: undefined;
        } | {
            mode: any;
            occupancy?: undefined;
            reference_luminance?: undefined;
            o_sensitivity?: undefined;
            v_sensitivity?: undefined;
            led_status?: undefined;
            vacancy_delay?: undefined;
            light_on_luminance_prefer?: undefined;
            light_off_luminance_prefer?: undefined;
            vacant_confirm_time?: undefined;
            luminance_level?: undefined;
        } | {
            vacant_confirm_time: any;
            occupancy?: undefined;
            reference_luminance?: undefined;
            o_sensitivity?: undefined;
            v_sensitivity?: undefined;
            led_status?: undefined;
            vacancy_delay?: undefined;
            light_on_luminance_prefer?: undefined;
            light_off_luminance_prefer?: undefined;
            mode?: undefined;
            luminance_level?: undefined;
        } | {
            luminance_level: any;
            occupancy?: undefined;
            reference_luminance?: undefined;
            o_sensitivity?: undefined;
            v_sensitivity?: undefined;
            led_status?: undefined;
            vacancy_delay?: undefined;
            light_on_luminance_prefer?: undefined;
            light_off_luminance_prefer?: undefined;
            mode?: undefined;
            vacant_confirm_time?: undefined;
        };
    };
    tuya_smart_vibration_sensor: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    matsee_garage_door_opener: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    moes_thermostat_tv: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            system_mode: string;
            preset: string;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            window_detection: any;
            system_mode?: undefined;
            preset?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            frost_detection: any;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            current_heating_setpoint: string;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            local_temperature: string;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            local_temperature_calibration: string;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            holiday_temperature: string;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            battery: any;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            child_lock: any;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            error: any;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            holiday_mode: any;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            boost_heating_countdown: any;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            open_window_temperature: string;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            comfort_temperature: string;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            eco_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            eco_temperature: string;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            heating_stop?: undefined;
        } | {
            system_mode: string;
            heating_stop: boolean;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
        } | {
            heating_stop: boolean;
            system_mode?: undefined;
            preset?: undefined;
            window_detection?: undefined;
            frost_detection?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            local_temperature_calibration?: undefined;
            holiday_temperature?: undefined;
            battery?: undefined;
            child_lock?: undefined;
            error?: undefined;
            holiday_mode?: undefined;
            boost_heating_countdown?: undefined;
            open_window_temperature?: undefined;
            comfort_temperature?: undefined;
            eco_temperature?: undefined;
        };
    };
    hoch_din: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    tuya_light_wz5: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    ZMAM02_cover: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            running: boolean;
            position: number;
            state: string;
            motor_speed?: undefined;
            motor_working_mode?: undefined;
            border?: undefined;
            motor_direction?: undefined;
            mode?: undefined;
        } | {
            running: boolean;
            position?: undefined;
            state?: undefined;
            motor_speed?: undefined;
            motor_working_mode?: undefined;
            border?: undefined;
            motor_direction?: undefined;
            mode?: undefined;
        } | {
            motor_speed: any;
            running?: undefined;
            position?: undefined;
            state?: undefined;
            motor_working_mode?: undefined;
            border?: undefined;
            motor_direction?: undefined;
            mode?: undefined;
        } | {
            motor_working_mode: string;
            running?: undefined;
            position?: undefined;
            state?: undefined;
            motor_speed?: undefined;
            border?: undefined;
            motor_direction?: undefined;
            mode?: undefined;
        } | {
            border: string;
            running?: undefined;
            position?: undefined;
            state?: undefined;
            motor_speed?: undefined;
            motor_working_mode?: undefined;
            motor_direction?: undefined;
            mode?: undefined;
        } | {
            motor_direction: string;
            running?: undefined;
            position?: undefined;
            state?: undefined;
            motor_speed?: undefined;
            motor_working_mode?: undefined;
            border?: undefined;
            mode?: undefined;
        } | {
            mode: string;
            running?: undefined;
            position?: undefined;
            state?: undefined;
            motor_speed?: undefined;
            motor_working_mode?: undefined;
            border?: undefined;
            motor_direction?: undefined;
        };
    };
    tm081: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            contact: boolean;
            battery?: undefined;
        } | {
            battery: any;
            contact?: undefined;
        };
    };
    tuya_remote: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    tuya_smart_human_presense_sensor: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            presence: any;
            radar_sensitivity?: undefined;
            minimum_range?: undefined;
            maximum_range?: undefined;
            target_distance?: undefined;
            detection_delay?: undefined;
            fading_time?: undefined;
            illuminance_lux?: undefined;
            cli?: undefined;
            self_test?: undefined;
        } | {
            radar_sensitivity: any;
            presence?: undefined;
            minimum_range?: undefined;
            maximum_range?: undefined;
            target_distance?: undefined;
            detection_delay?: undefined;
            fading_time?: undefined;
            illuminance_lux?: undefined;
            cli?: undefined;
            self_test?: undefined;
        } | {
            minimum_range: number;
            presence?: undefined;
            radar_sensitivity?: undefined;
            maximum_range?: undefined;
            target_distance?: undefined;
            detection_delay?: undefined;
            fading_time?: undefined;
            illuminance_lux?: undefined;
            cli?: undefined;
            self_test?: undefined;
        } | {
            maximum_range: number;
            presence?: undefined;
            radar_sensitivity?: undefined;
            minimum_range?: undefined;
            target_distance?: undefined;
            detection_delay?: undefined;
            fading_time?: undefined;
            illuminance_lux?: undefined;
            cli?: undefined;
            self_test?: undefined;
        } | {
            target_distance: number;
            presence?: undefined;
            radar_sensitivity?: undefined;
            minimum_range?: undefined;
            maximum_range?: undefined;
            detection_delay?: undefined;
            fading_time?: undefined;
            illuminance_lux?: undefined;
            cli?: undefined;
            self_test?: undefined;
        } | {
            detection_delay: number;
            presence?: undefined;
            radar_sensitivity?: undefined;
            minimum_range?: undefined;
            maximum_range?: undefined;
            target_distance?: undefined;
            fading_time?: undefined;
            illuminance_lux?: undefined;
            cli?: undefined;
            self_test?: undefined;
        } | {
            fading_time: number;
            presence?: undefined;
            radar_sensitivity?: undefined;
            minimum_range?: undefined;
            maximum_range?: undefined;
            target_distance?: undefined;
            detection_delay?: undefined;
            illuminance_lux?: undefined;
            cli?: undefined;
            self_test?: undefined;
        } | {
            illuminance_lux: any;
            presence?: undefined;
            radar_sensitivity?: undefined;
            minimum_range?: undefined;
            maximum_range?: undefined;
            target_distance?: undefined;
            detection_delay?: undefined;
            fading_time?: undefined;
            cli?: undefined;
            self_test?: undefined;
        } | {
            cli: any;
            presence?: undefined;
            radar_sensitivity?: undefined;
            minimum_range?: undefined;
            maximum_range?: undefined;
            target_distance?: undefined;
            detection_delay?: undefined;
            fading_time?: undefined;
            illuminance_lux?: undefined;
            self_test?: undefined;
        } | {
            self_test: any;
            presence?: undefined;
            radar_sensitivity?: undefined;
            minimum_range?: undefined;
            maximum_range?: undefined;
            target_distance?: undefined;
            detection_delay?: undefined;
            fading_time?: undefined;
            illuminance_lux?: undefined;
            cli?: undefined;
        };
    };
    ZG204ZL_lms: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    moes_cover: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            position: any;
            state?: undefined;
            running?: undefined;
            backlight?: undefined;
            calibration?: undefined;
            motor_reversal?: undefined;
        } | {
            state: any;
            running: any;
            position?: undefined;
            backlight?: undefined;
            calibration?: undefined;
            motor_reversal?: undefined;
        } | {
            backlight: string;
            position?: undefined;
            state?: undefined;
            running?: undefined;
            calibration?: undefined;
            motor_reversal?: undefined;
        } | {
            calibration: any;
            position?: undefined;
            state?: undefined;
            running?: undefined;
            backlight?: undefined;
            motor_reversal?: undefined;
        } | {
            motor_reversal: any;
            position?: undefined;
            state?: undefined;
            running?: undefined;
            backlight?: undefined;
            calibration?: undefined;
        };
    };
    tuya_temperature_humidity_sensor: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            temperature: number;
            humidity?: undefined;
            battery_level?: undefined;
            battery_low?: undefined;
            battery?: undefined;
        } | {
            humidity: number;
            temperature?: undefined;
            battery_level?: undefined;
            battery_low?: undefined;
            battery?: undefined;
        } | {
            battery_level: any;
            battery_low: boolean;
            temperature?: undefined;
            humidity?: undefined;
            battery?: undefined;
        } | {
            battery: any;
            temperature?: undefined;
            humidity?: undefined;
            battery_level?: undefined;
            battery_low?: undefined;
        };
    };
    nous_lcd_temperature_humidity_sensor: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    tuya_illuminance_temperature_humidity_sensor: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            temperature: number;
            humidity?: undefined;
            battery?: undefined;
            illuminance_lux?: undefined;
        } | {
            humidity: any;
            temperature?: undefined;
            battery?: undefined;
            illuminance_lux?: undefined;
        } | {
            battery: any;
            temperature?: undefined;
            humidity?: undefined;
            illuminance_lux?: undefined;
        } | {
            illuminance_lux: any;
            temperature?: undefined;
            humidity?: undefined;
            battery?: undefined;
        };
    };
    tuya_illuminance_sensor: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: KeyValueAny, publish: Publish, options: KeyValueAny, meta: Fz.Meta) => {
            brightness_state: any;
            illuminance_lux?: undefined;
        } | {
            illuminance_lux: any;
            brightness_state?: undefined;
        };
    };
    hy_thermostat: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            workdays: {
                hour: any;
                minute: any;
                temperature: any;
            }[];
            range: string;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            holidays: {
                hour: any;
                minute: any;
                temperature: any;
            }[];
            range: string;
            workdays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            heating: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            max_temperature_protection: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            min_temperature_protection: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            state: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            child_lock: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            external_temperature: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            away_preset_days: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            away_preset_temperature: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            local_temperature_calibration: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            hysteresis: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            hysteresis_for_protection: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            max_temperature_for_protection: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            min_temperature_for_protection: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            max_temperature: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            min_temperature: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            current_heating_setpoint: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            local_temperature: string;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            sensor_type: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            power_on_behavior: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            week?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            week: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            system_mode?: undefined;
            alarm?: undefined;
        } | {
            system_mode: any;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            alarm?: undefined;
        } | {
            alarm: boolean;
            workdays?: undefined;
            range?: undefined;
            holidays?: undefined;
            heating?: undefined;
            max_temperature_protection?: undefined;
            min_temperature_protection?: undefined;
            state?: undefined;
            child_lock?: undefined;
            external_temperature?: undefined;
            away_preset_days?: undefined;
            away_preset_temperature?: undefined;
            local_temperature_calibration?: undefined;
            hysteresis?: undefined;
            hysteresis_for_protection?: undefined;
            max_temperature_for_protection?: undefined;
            min_temperature_for_protection?: undefined;
            max_temperature?: undefined;
            min_temperature?: undefined;
            current_heating_setpoint?: undefined;
            local_temperature?: undefined;
            sensor_type?: undefined;
            power_on_behavior?: undefined;
            week?: undefined;
            system_mode?: undefined;
        };
    };
    neo_nas_pd07: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            occupancy: boolean;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            power_type: any;
            battery_low: boolean;
            occupancy?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            tamper: boolean;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            temperature: number;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            humidity: any;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            temperature_min: any;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            temperature_max: any;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            humidity_min: any;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            humidity_max: any;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            temperature_scale: string;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            unknown_111: string;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_112?: undefined;
            alarm?: undefined;
        } | {
            unknown_112: string;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            alarm?: undefined;
        } | {
            alarm: any;
            occupancy?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            tamper?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            temperature_scale?: undefined;
            unknown_111?: undefined;
            unknown_112?: undefined;
        };
    };
    neo_t_h_alarm: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            alarm: any;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            temperature_alarm: any;
            alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            humidity_alarm: any;
            alarm?: undefined;
            temperature_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            duration: any;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            temperature: number;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            humidity: any;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            temperature_min: any;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            temperature_max: any;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            humidity_min: any;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            humidity_max: any;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            power_type: any;
            battery_low: boolean;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            melody: any;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            volume?: undefined;
        } | {
            volume: any;
            alarm?: undefined;
            temperature_alarm?: undefined;
            humidity_alarm?: undefined;
            duration?: undefined;
            temperature?: undefined;
            humidity?: undefined;
            temperature_min?: undefined;
            temperature_max?: undefined;
            humidity_min?: undefined;
            humidity_max?: undefined;
            power_type?: undefined;
            battery_low?: undefined;
            melody?: undefined;
        };
    };
    neo_alarm: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            alarm: any;
            duration?: undefined;
            battpercentage?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            duration: any;
            alarm?: undefined;
            battpercentage?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            battpercentage: any;
            alarm?: undefined;
            duration?: undefined;
            melody?: undefined;
            volume?: undefined;
        } | {
            melody: any;
            alarm?: undefined;
            duration?: undefined;
            battpercentage?: undefined;
            volume?: undefined;
        } | {
            volume: any;
            alarm?: undefined;
            duration?: undefined;
            battpercentage?: undefined;
            melody?: undefined;
        };
    };
    ZB006X_settings: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            power_supply_mode: any;
            switch_type?: undefined;
            load_detection_mode?: undefined;
            switch_status?: undefined;
            control_mode?: undefined;
            load_type?: undefined;
            load_dimmable?: undefined;
        } | {
            switch_type: any;
            power_supply_mode?: undefined;
            load_detection_mode?: undefined;
            switch_status?: undefined;
            control_mode?: undefined;
            load_type?: undefined;
            load_dimmable?: undefined;
        } | {
            load_detection_mode: any;
            power_supply_mode?: undefined;
            switch_type?: undefined;
            switch_status?: undefined;
            control_mode?: undefined;
            load_type?: undefined;
            load_dimmable?: undefined;
        } | {
            switch_status: any;
            power_supply_mode?: undefined;
            switch_type?: undefined;
            load_detection_mode?: undefined;
            control_mode?: undefined;
            load_type?: undefined;
            load_dimmable?: undefined;
        } | {
            control_mode: any;
            power_supply_mode?: undefined;
            switch_type?: undefined;
            load_detection_mode?: undefined;
            switch_status?: undefined;
            load_type?: undefined;
            load_dimmable?: undefined;
        } | {
            load_type: any;
            power_supply_mode?: undefined;
            switch_type?: undefined;
            load_detection_mode?: undefined;
            switch_status?: undefined;
            control_mode?: undefined;
            load_dimmable?: undefined;
        } | {
            load_dimmable: any;
            power_supply_mode?: undefined;
            switch_type?: undefined;
            load_detection_mode?: undefined;
            switch_status?: undefined;
            control_mode?: undefined;
            load_type?: undefined;
        };
    };
    tuya_cover: {
        cluster: string;
        type: string[];
        options: exposes.Binary[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    moes_switch: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            power_on_behavior: any;
            indicate_light?: undefined;
        } | {
            indicate_light: any;
            power_on_behavior?: undefined;
        };
    };
    tuya_water_leak: {
        cluster: string;
        type: string;
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            water_leak: any;
        };
    };
    wls100z_water_leak: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    silvercrest_smart_led_string: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    frankever_valve: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            state: string;
            threshold?: undefined;
            timer?: undefined;
        } | {
            threshold: any;
            state?: undefined;
            timer?: undefined;
        } | {
            timer: number;
            state?: undefined;
            threshold?: undefined;
        };
    };
    tuya_woox_smoke: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            battery_low: boolean;
            smoke?: undefined;
        } | {
            smoke: any;
            battery_low?: undefined;
        };
    };
    tuya_switch: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            [x: string]: string;
            state?: undefined;
        } | {
            state: string;
        };
    };
    tuya_dinrail_switch: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            state: string;
            energy?: undefined;
            current?: undefined;
            power?: undefined;
            voltage?: undefined;
        } | {
            energy: number;
            state?: undefined;
            current?: undefined;
            power?: undefined;
            voltage?: undefined;
        } | {
            current: number;
            state?: undefined;
            energy?: undefined;
            power?: undefined;
            voltage?: undefined;
        } | {
            power: number;
            state?: undefined;
            energy?: undefined;
            current?: undefined;
            voltage?: undefined;
        } | {
            voltage: number;
            state?: undefined;
            energy?: undefined;
            current?: undefined;
            power?: undefined;
        };
    };
    ZVG1: {
        cluster: string;
        type: string;
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => KeyValueAny;
    };
    ZB003X: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            temperature: number;
            humidity?: undefined;
            battery2?: undefined;
            reporting_time?: undefined;
            temperature_calibration?: undefined;
            humidity_calibration?: undefined;
            illuminance_calibration?: undefined;
            pir_enable?: undefined;
            led_enable?: undefined;
            reporting_enable?: undefined;
        } | {
            humidity: any;
            temperature?: undefined;
            battery2?: undefined;
            reporting_time?: undefined;
            temperature_calibration?: undefined;
            humidity_calibration?: undefined;
            illuminance_calibration?: undefined;
            pir_enable?: undefined;
            led_enable?: undefined;
            reporting_enable?: undefined;
        } | {
            battery2: any;
            temperature?: undefined;
            humidity?: undefined;
            reporting_time?: undefined;
            temperature_calibration?: undefined;
            humidity_calibration?: undefined;
            illuminance_calibration?: undefined;
            pir_enable?: undefined;
            led_enable?: undefined;
            reporting_enable?: undefined;
        } | {
            reporting_time: any;
            temperature?: undefined;
            humidity?: undefined;
            battery2?: undefined;
            temperature_calibration?: undefined;
            humidity_calibration?: undefined;
            illuminance_calibration?: undefined;
            pir_enable?: undefined;
            led_enable?: undefined;
            reporting_enable?: undefined;
        } | {
            temperature_calibration: string;
            temperature?: undefined;
            humidity?: undefined;
            battery2?: undefined;
            reporting_time?: undefined;
            humidity_calibration?: undefined;
            illuminance_calibration?: undefined;
            pir_enable?: undefined;
            led_enable?: undefined;
            reporting_enable?: undefined;
        } | {
            humidity_calibration: any;
            temperature?: undefined;
            humidity?: undefined;
            battery2?: undefined;
            reporting_time?: undefined;
            temperature_calibration?: undefined;
            illuminance_calibration?: undefined;
            pir_enable?: undefined;
            led_enable?: undefined;
            reporting_enable?: undefined;
        } | {
            illuminance_calibration: any;
            temperature?: undefined;
            humidity?: undefined;
            battery2?: undefined;
            reporting_time?: undefined;
            temperature_calibration?: undefined;
            humidity_calibration?: undefined;
            pir_enable?: undefined;
            led_enable?: undefined;
            reporting_enable?: undefined;
        } | {
            pir_enable: any;
            temperature?: undefined;
            humidity?: undefined;
            battery2?: undefined;
            reporting_time?: undefined;
            temperature_calibration?: undefined;
            humidity_calibration?: undefined;
            illuminance_calibration?: undefined;
            led_enable?: undefined;
            reporting_enable?: undefined;
        } | {
            led_enable: boolean;
            temperature?: undefined;
            humidity?: undefined;
            battery2?: undefined;
            reporting_time?: undefined;
            temperature_calibration?: undefined;
            humidity_calibration?: undefined;
            illuminance_calibration?: undefined;
            pir_enable?: undefined;
            reporting_enable?: undefined;
        } | {
            reporting_enable: any;
            temperature?: undefined;
            humidity?: undefined;
            battery2?: undefined;
            reporting_time?: undefined;
            temperature_calibration?: undefined;
            humidity_calibration?: undefined;
            illuminance_calibration?: undefined;
            pir_enable?: undefined;
            led_enable?: undefined;
        };
    };
    tuya_thermostat_weekly_schedule_2: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            weekly_schedule: {
                days: string[];
                transitions: {
                    time: any;
                    heating_setpoint: string;
                }[];
            };
        };
    };
    tuya_data_point_dump: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => void;
    };
    javis_microwave_sensor: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            states: any;
            occupancy: boolean;
            sensitivity?: undefined;
            illuminance_lux?: undefined;
            illuminance_calibration?: undefined;
            keep_time?: undefined;
            led_enable?: undefined;
        } | {
            sensitivity: any;
            states?: undefined;
            occupancy?: undefined;
            illuminance_lux?: undefined;
            illuminance_calibration?: undefined;
            keep_time?: undefined;
            led_enable?: undefined;
        } | {
            illuminance_lux: any;
            states?: undefined;
            occupancy?: undefined;
            sensitivity?: undefined;
            illuminance_calibration?: undefined;
            keep_time?: undefined;
            led_enable?: undefined;
        } | {
            illuminance_calibration: any;
            states?: undefined;
            occupancy?: undefined;
            sensitivity?: undefined;
            illuminance_lux?: undefined;
            keep_time?: undefined;
            led_enable?: undefined;
        } | {
            keep_time: any;
            states?: undefined;
            occupancy?: undefined;
            sensitivity?: undefined;
            illuminance_lux?: undefined;
            illuminance_calibration?: undefined;
            led_enable?: undefined;
        } | {
            led_enable: boolean;
            states?: undefined;
            occupancy?: undefined;
            sensitivity?: undefined;
            illuminance_lux?: undefined;
            illuminance_calibration?: undefined;
            keep_time?: undefined;
        };
    };
    SLUXZB: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: Publish, options: import("./types").KeyValue, meta: Fz.Meta) => {
            illuminance_lux: any;
            battery?: undefined;
            brightness_level?: undefined;
        } | {
            battery: any;
            illuminance_lux?: undefined;
            brightness_level?: undefined;
        } | {
            brightness_level: any;
            illuminance_lux?: undefined;
            battery?: undefined;
        };
    };
};
declare const toZigbee: {
    zb_sm_cover: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    x5h_thermostat: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_child_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_binary_one: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_binary_two: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_current_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_current_heating_setpoint_auto: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_comfort_temp: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_openwindow_temp: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_openwindow_time: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_eco_temp: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_preset_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_system_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_local_temperature_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_away_setting: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: KeyValueAny, meta: Tz.Meta) => Promise<void>;
    };
    zs_thermostat_local_schedule: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    giexWaterValve: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: any;
            };
        }>;
    };
    tuya_alecto_smoke: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    matsee_garage_door_opener: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                trigger: unknown;
            };
        }>;
    };
    connecte_thermostat: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_child_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_current_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_deadzone_temperature: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_min_temperature_limit: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_max_temperature_limit: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_mode2: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_standby: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_program_schedule: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_system_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                system_mode: string;
            };
        }>;
    };
    moesS_thermostat_preset: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_current_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_boost_heating: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_window_detection: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_child_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_boostHeatingCountdownTimeSet: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_temperature_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_moesSecoMode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_eco_temperature: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_max_temperature: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_min_temperature: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    moesS_thermostat_schedule_programming: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: string, meta: Tz.Meta) => Promise<void>;
    };
    hgkg_thermostat_standby: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moes_switch: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_sensor: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    tuya_dimmer_state: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_dimmer_level: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    tuya_switch_state: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<{
            state: {
                state: any;
            };
        }>;
    };
    frankever_threshold: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<{
            state: {
                threshold: number;
            };
        }>;
    };
    frankever_timer: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<{
            state: {
                timer: number;
            };
        }>;
    };
    ZVG1_timer: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<{
            state: {
                timer: number;
            };
        }>;
    };
    ZVG1_weather_delay: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: string, meta: Tz.Meta) => Promise<void>;
    };
    ZVG1_cycle_timer: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: string, meta: Tz.Meta) => Promise<KeyValueAny>;
    };
    ZVG1_normal_schedule_timer: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: string, meta: Tz.Meta) => Promise<KeyValueAny>;
    };
    etop_thermostat_system_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    etop_thermostat_away_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_weekly_schedule: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_child_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_window_detection: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    siterwell_thermostat_window_detection: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_valve_detection: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_current_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_system_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_preset: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_away_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_fan_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_bac_fan_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_auto_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: number, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_min_temp: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_max_temp: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_boost_time: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_comfort_temp: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_eco_temp: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_force: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_force_to_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_away_preset: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_window_detect: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: KeyValueAny, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_schedule: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_schedule_programming_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    tuya_thermostat_week: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<{
            state: {
                week: any;
            };
        }>;
    };
    tuya_cover_options: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    neo_nas_pd07: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    neo_t_h_alarm: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    neo_alarm: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    nous_lcd_temperature_humidity_sensor: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    saswell_thermostat_current_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    saswell_thermostat_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    saswell_thermostat_away: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    saswell_thermostat_child_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    saswell_thermostat_window_detection: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    saswell_thermostat_frost_detection: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    saswell_thermostat_anti_scaling: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    saswell_thermostat_calibration: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    evanell_thermostat_current_heating_setpoint: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    evanell_thermostat_system_mode: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    evanell_thermostat_child_lock: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    silvercrest_smart_led_string: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    tuya_data_point_test: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: string, meta: Tz.Meta) => Promise<void>;
    };
    hy_thermostat: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    ZB003X: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    ZB006X_settings: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    tuya_motion_sensor: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    javis_microwave_sensor: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    moes_thermostat_tv: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    tuya_light_wz5: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<{
            state: KeyValueAny;
        }>;
    };
    ZMAM02_cover: {
        key: string[];
        options: exposes.Binary[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    tuya_smart_human_presense_sensor: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    ZG204ZL_lms: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
        convertGet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, meta: Tz.Meta) => Promise<void>;
    };
    moes_cover: {
        key: string[];
        options: exposes.Binary[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<{
            state: {
                position: any;
                backlight?: undefined;
                motor_reversal?: undefined;
            };
        } | {
            state: {
                backlight: any;
                position?: undefined;
                motor_reversal?: undefined;
            };
        } | {
            state: {
                motor_reversal: any;
                position?: undefined;
                backlight?: undefined;
            };
        }>;
    };
    hoch_din: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<{
            state: {
                state: any;
                child_lock?: undefined;
                countdown_timer?: undefined;
                power_on_behavior?: undefined;
                trip?: undefined;
            };
        } | {
            state: {
                child_lock: any;
                state?: undefined;
                countdown_timer?: undefined;
                power_on_behavior?: undefined;
                trip?: undefined;
            };
        } | {
            state: {
                countdown_timer: any;
                state?: undefined;
                child_lock?: undefined;
                power_on_behavior?: undefined;
                trip?: undefined;
            };
        } | {
            state: {
                power_on_behavior: any;
                state?: undefined;
                child_lock?: undefined;
                countdown_timer?: undefined;
                trip?: undefined;
            };
        } | {
            state: {
                trip: string;
                state?: undefined;
                child_lock?: undefined;
                countdown_timer?: undefined;
                power_on_behavior?: undefined;
            };
        }>;
    };
    SA12IZL_silence_siren: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    SA12IZL_alarm: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    R7049_silenceSiren: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    R7049_testAlarm: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    R7049_alarm: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    valve_state: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    shutdown_timer: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    valve_state_auto_shutdown: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: unknown, meta: Tz.Meta) => Promise<void>;
    };
    hpsz: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
    tuya_cover_control: {
        key: string[];
        options: exposes.Binary[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model").Endpoint | import("zigbee-herdsman/dist/controller/model").Group, key: string, value: any, meta: Tz.Meta) => Promise<void>;
    };
};
export { fromZigbee as fz, fromZigbee, toZigbee as tz, toZigbee, thermostatControlSequenceOfOperations, thermostatSystemModes, tuyaHPSCheckingResult, thermostatSystemModes2, thermostatSystemModes3, thermostatSystemModes4, thermostatPresets, giexWaterValve, msLookups, ZMLookups, firstDpValue, dpValueFromEnum, dataPoints, dpValueFromBool, dpValueFromIntValue, dpValueFromRaw, dpValueFromBitmap, dpValueFromStringBuffer, moesSwitch, getDataValue, getTypeName, logUnexpectedDataPoint, logUnexpectedDataType, getDataPointNames, getCoverStateEnums, convertDecimalValueTo4ByteHexArray, sendDataPoints, convertStringToHexArray, sendDataPoint, sendDataPointValue, sendDataPointBool, sendDataPointEnum, sendDataPointRaw, sendDataPointBitmap, sendDataPointStringBuffer, convertRawToCycleTimer, logDataPoint, convertWeekdaysTo1ByteHexArray, convertRawToTimer, logUnexpectedDataValue, isCoverInverted, convertDecimalValueTo2ByteHexArray, convertTimeTo2ByteHexArray, getMetaValue, tuyaGetDataValue, ictcg1, };
//# sourceMappingURL=legacy.d.ts.map