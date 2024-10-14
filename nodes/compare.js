"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (RED) {
    function CompareNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.status({ fill: "grey", shape: "ring", text: "no message" });
        node.on('input', (msg) => {
            // Evaluieren der property und des Vergleichswertes
            const propertyValue = RED.util.evaluateNodeProperty(config.property, config.propertyType, this, msg);
            const compareValue = RED.util.evaluateNodeProperty(config.value, config.valueType, this, msg);
            let result = false;
            // Vergleichslogik
            switch (config.operator) {
                case 'eq':
                    result = propertyValue === compareValue;
                    break;
                case 'neq':
                    result = propertyValue !== compareValue;
                    break;
                case 'lt':
                    result = propertyValue < compareValue;
                    break;
                case 'lte':
                    result = propertyValue <= compareValue;
                    break;
                case 'gt':
                    result = propertyValue > compareValue;
                    break;
                case 'gte':
                    result = propertyValue >= compareValue;
                    break;
                case 'true':
                    result = propertyValue === true;
                    break;
                case 'false':
                    result = propertyValue === false;
                    break;
                case 'empty':
                    result = propertyValue === '' || propertyValue === null || propertyValue === undefined;
                    break;
                case 'not_empty':
                    result = propertyValue !== '' && propertyValue !== null && propertyValue !== undefined;
                    break;
                default:
                    node.error(`Invalid operator: ${config.operator}`);
                    return;
            }
            const topicValue = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);
            node.status({ fill: result ? "green" : "red", shape: "dot", text: result.toString() });
            if (config.newMsg) {
                msg = { payload: result, topic: topicValue };
            }
            else {
                msg.payload = result;
                msg.topic = topicValue;
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('compare', CompareNode);
};
