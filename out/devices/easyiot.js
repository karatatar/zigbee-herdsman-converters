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
const iconv = __importStar(require("iconv-lite"));
const exposes = __importStar(require("../lib/exposes"));
const logger_1 = require("../lib/logger");
const modernExtend_1 = require("../lib/modernExtend");
const reporting = __importStar(require("../lib/reporting"));
const NS = 'zhc:easyiot';
const ea = exposes.access;
const e = exposes.presets;
const fzLocal = {
    easyiot_ir_recv_command: {
        cluster: 'tunneling',
        type: ['commandTransferDataResp'],
        convert: (model, msg, publish, options, meta) => {
            logger_1.logger.debug(`"easyiot_ir_recv_command" received (msg:${JSON.stringify(msg.data)})`, NS);
            const hexString = msg.data.data.toString('hex');
            logger_1.logger.debug(`"easyiot_ir_recv_command" received command ${hexString}`, NS);
            return { last_received_command: hexString };
        },
    },
    easyiot_tts_recv_status: {
        cluster: 'tunneling',
        type: ['commandTransferDataResp'],
        convert: (model, msg, publish, options, meta) => {
            logger_1.logger.debug(`"easyiot_tts_recv_status" received (msg:${JSON.stringify(msg.data)})`, NS);
            const hexString = msg.data.data.toString('hex');
            logger_1.logger.debug(`"easyiot_tts_recv_status" received status ${hexString}`, NS);
            return { last_received_status: hexString };
        },
    },
    easyiot_sp1000_recv_status: {
        cluster: 'tunneling',
        type: ['commandTransferDataResp'],
        convert: (model, msg, publish, options, meta) => {
            logger_1.logger.debug(`"easyiot_tts_recv_status" received (msg:${JSON.stringify(msg.data)})`, NS);
            const hexString = msg.data.data.toString('hex');
            logger_1.logger.debug(`"easyiot_tts_recv_status" received status ${hexString}`, NS);
            if (msg.data.data[0] == 0x80 && msg.data.data[1] == 0) {
                const result = msg.data.data[4];
                return { last_received_status: result };
            }
        },
    },
    easyiot_action: {
        cluster: 'genOnOff',
        type: ['commandOn', 'commandOff', 'commandToggle'],
        convert: (model, msg, publish, options, meta) => {
            const lookup = { commandToggle: 'single', commandOn: 'double', commandOff: 'long' };
            let buttonMapping = null;
            if (model.model === 'ZB-WB01') {
                buttonMapping = { 1: '1' };
            }
            else if (model.model === 'ZB-WB02') {
                buttonMapping = { 1: '1', 2: '2' };
            }
            else if (model.model === 'ZB-WB03') {
                buttonMapping = { 1: '1', 2: '2', 3: '3' };
            }
            else if (model.model === 'ZB-WB08') {
                buttonMapping = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8' };
            }
            const button = buttonMapping ? `${buttonMapping[msg.endpoint.ID]}_` : '';
            return { action: `${button}${lookup[msg.type]}` };
        },
    },
};
const tzLocal = {
    easyiot_ir_send_command: {
        key: ['send_command'],
        convertSet: async (entity, key, value, meta) => {
            if (!value) {
                throw new Error(`There is no IR code to send`);
            }
            logger_1.logger.debug(`Sending IR code: ${value}`, NS);
            await entity.command('tunneling', 'transferData', {
                tunnelID: 0x0000,
                data: Buffer.from(value, 'hex'),
            }, { disableDefaultResponse: true });
            logger_1.logger.debug(`Sending IR command success.`, NS);
        },
    },
    easyiot_tts_send_command: {
        key: ['send_tts'],
        convertSet: async (entity, key, value, meta) => {
            if (!value) {
                throw new Error(`There is no text to send`);
            }
            logger_1.logger.debug(`Sending IR code: ${value}`, NS);
            const frameHeader = Buffer.from([0xfd]);
            const gb2312Buffer = iconv.encode(value, 'GB2312');
            const dataLength = gb2312Buffer.length + 2;
            const dataLengthBuffer = Buffer.alloc(2);
            dataLengthBuffer.writeUInt16BE(dataLength, 0);
            const commandByte = Buffer.from([0x01, 0x01]);
            const protocolFrame = Buffer.concat([frameHeader, dataLengthBuffer, commandByte, gb2312Buffer]);
            await entity.command('tunneling', 'transferData', {
                tunnelID: 0x0000,
                data: protocolFrame,
            }, { disableDefaultResponse: true });
            logger_1.logger.debug(`Sending IR command success.`, NS);
        },
    },
    easyiot_sp1000_play_voice: {
        key: ['play_voice'],
        convertSet: async (entity, key, value, meta) => {
            if (!value) {
                throw new Error(`There is no text to send`);
            }
            logger_1.logger.debug(`Sending IR code: ${value}`, NS);
            const frameCmd = Buffer.from([0x01, 0x00]);
            const dataLen = Buffer.from([0x02]);
            const dataType = Buffer.from([0x21]);
            const playId = Buffer.from([value & 0xff, (value >> 8) & 0xff]);
            const protocolFrame = Buffer.concat([frameCmd, dataLen, dataType, playId]);
            await entity.command('tunneling', 'transferData', {
                tunnelID: 0x0001,
                data: protocolFrame,
            }, { disableDefaultResponse: true });
            logger_1.logger.debug(`Sending IR command success.`, NS);
        },
    },
    easyiot_sp1000_set_volume: {
        key: ['set_volume'],
        convertSet: async (entity, key, value, meta) => {
            if (!value) {
                throw new Error(`There is no text to send`);
            }
            logger_1.logger.debug(`Sending IR code: ${value}`, NS);
            const frameCmd = Buffer.from([0x02, 0x00]);
            const dataLen = Buffer.from([0x01]);
            const dataType = Buffer.from([0x20]);
            const volume = Buffer.from([value & 0xff]);
            const protocolFrame = Buffer.concat([frameCmd, dataLen, dataType, volume]);
            await entity.command('tunneling', 'transferData', {
                tunnelID: 0x0001,
                data: protocolFrame,
            }, { disableDefaultResponse: true });
            logger_1.logger.debug(`Sending IR command success.`, NS);
        },
    },
};
const definitions = [
    {
        fingerprint: [{ modelID: 'ZB-IR01', manufacturerName: 'easyiot' }],
        model: 'ZB-IR01',
        vendor: 'easyiot',
        description: 'This is an infrared remote control equipped with a local code library,' +
            'supporting devices such as air conditioners, televisions, projectors, and more.',
        fromZigbee: [fzLocal.easyiot_ir_recv_command],
        toZigbee: [tzLocal.easyiot_ir_send_command],
        exposes: [
            e.text('last_received_command', ea.STATE).withDescription('Received infrared control command'),
            e.text('send_command', ea.SET).withDescription('Send infrared control command'),
        ],
    },
    {
        fingerprint: [{ modelID: 'ZB-TTS01', manufacturerName: 'easyiot' }],
        model: 'ZB-TTS01',
        vendor: 'easyiot',
        description: 'This is a Simplified Chinese (GB2312) TTS converter that can convert GB2312 encoded text to speech',
        fromZigbee: [fzLocal.easyiot_tts_recv_status],
        toZigbee: [tzLocal.easyiot_tts_send_command],
        exposes: [
            e.text('last_received_status', ea.STATE).withDescription('status'),
            e.text('send_tts', ea.SET).withDescription('Please enter text'),
        ],
    },
    {
        fingerprint: [{ modelID: 'ZB-SP1000', manufacturerName: 'easyiot' }],
        model: 'ZB-SP1000',
        vendor: 'easyiot',
        description: 'ZB-SP1000 is an MP3 player that can support 1,000 voices.',
        fromZigbee: [fzLocal.easyiot_sp1000_recv_status],
        toZigbee: [tzLocal.easyiot_sp1000_play_voice, tzLocal.easyiot_sp1000_set_volume],
        exposes: [
            e.numeric('play_voice', ea.SET).withDescription('Please enter ID(1-999)').withValueMin(1).withValueMax(999).withValueStep(1),
            e.numeric('set_volume', ea.SET).withDescription('Please enter volume(1-30)').withValueMin(1).withValueMax(30).withValueStep(1),
            e.text('last_received_status', ea.STATE).withDescription('status'),
        ],
    },
    {
        fingerprint: [{ modelID: 'ZB-RS485', manufacturerName: 'easyiot' }],
        model: 'ZB-RS485',
        vendor: 'easyiot',
        description: 'Zigbee to RS485 controller',
        fromZigbee: [fzLocal.easyiot_ir_recv_command],
        toZigbee: [tzLocal.easyiot_ir_send_command],
        exposes: [
            e.text('last_received_command', ea.STATE).withDescription('Received data'),
            e.text('send_command', ea.SET).withDescription('Send data'),
        ],
    },
    {
        zigbeeModel: ['ZB-PM01'],
        model: 'ZB-PM01',
        vendor: 'easyiot',
        description: 'Smart circuit breaker with Metering',
        extend: [(0, modernExtend_1.onOff)({ powerOnBehavior: false }), (0, modernExtend_1.electricityMeter)()],
    },
    {
        zigbeeModel: ['ZB-WC01'],
        model: 'ZB-WC01',
        vendor: 'easyiot',
        description: 'Curtain motor',
        extend: [(0, modernExtend_1.windowCovering)({ controls: ['lift'], configureReporting: false })],
    },
    {
        zigbeeModel: ['ZB-WB01'],
        model: 'ZB-WB01',
        vendor: 'easyiot',
        description: '1-button remote control',
        fromZigbee: [fzLocal.easyiot_action],
        toZigbee: [],
        exposes: [e.action(['1_single', '1_double', '1_long']), e.battery()],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint, { min: 30, max: 1800, change: 1 });
        },
    },
    {
        zigbeeModel: ['ZB-WB02'],
        model: 'ZB-WB02',
        vendor: 'easyiot',
        description: '2-button remote control',
        fromZigbee: [fzLocal.easyiot_action],
        toZigbee: [],
        exposes: [e.action(['1_single', '1_double', '1_long', '2_single', '2_double', '2_long']), e.battery()],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint, { min: 30, max: 1800, change: 1 });
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
        },
    },
    {
        zigbeeModel: ['ZB-WB03'],
        model: 'ZB-WB03',
        vendor: 'easyiot',
        description: '3-button remote control',
        fromZigbee: [fzLocal.easyiot_action],
        toZigbee: [],
        exposes: [e.action(['1_single', '1_double', '1_long', '2_single', '2_double', '2_long', '3_single', '3_double', '3_long']), e.battery()],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint, { min: 30, max: 1800, change: 1 });
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, ['genOnOff']);
        },
    },
    {
        zigbeeModel: ['ZB-WB08'],
        model: 'ZB-WB08',
        vendor: 'easyiot',
        description: '8-button remote control',
        fromZigbee: [fzLocal.easyiot_action],
        toZigbee: [],
        exposes: [
            e.action([
                '1_single',
                '1_double',
                '1_long',
                '2_single',
                '2_double',
                '2_long',
                '3_single',
                '3_double',
                '3_long',
                '4_single',
                '4_double',
                '4_long',
                '5_single',
                '5_double',
                '5_long',
                '6_single',
                '6_double',
                '6_long',
                '7_single',
                '7_double',
                '7_long',
                '8_single',
                '8_double',
                '8_long',
            ]),
            e.battery(),
        ],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint, { min: 30, max: 1800, change: 1 });
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(4), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(5), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(6), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(7), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(8), coordinatorEndpoint, ['genOnOff']);
        },
    },
    {
        fingerprint: [{ modelID: 'ZB-PSW04', manufacturerName: 'easyiot' }],
        model: 'ZB-PSW04',
        vendor: 'easyiot',
        description: 'Zigbee 4-channel relay',
        extend: [
            (0, modernExtend_1.deviceEndpoints)({ endpoints: { l1: 1, l2: 2, l3: 3, l4: 4 } }),
            (0, modernExtend_1.onOff)({ endpointNames: ['l1', 'l2', 'l3', 'l4'], configureReporting: false, powerOnBehavior: false }),
        ],
    },
    {
        fingerprint: [{ modelID: 'ZB-SW08', manufacturerName: 'easyiot' }],
        model: 'ZB-SW08',
        vendor: 'easyiot',
        description: 'Zigbee 8-channel relay',
        extend: [
            (0, modernExtend_1.deviceEndpoints)({ endpoints: { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7, l8: 8 } }),
            (0, modernExtend_1.onOff)({ endpointNames: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8'], configureReporting: false, powerOnBehavior: false }),
        ],
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=easyiot.js.map