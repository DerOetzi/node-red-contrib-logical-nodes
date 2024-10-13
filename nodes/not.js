"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (RED) {
    function NotNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.status({ fill: "grey", shape: "ring", text: "no message" });
        node.on('input', (msg) => {
            // Verneinung des eingehenden Payloads
            const result = !msg.payload;
            const topicValue = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);
            if (config.newMsg) {
                msg = { payload: result, topic: topicValue };
            }
            else {
                msg.payload = result;
                msg.topic = topicValue;
            }
            node.status({ fill: result ? "green" : "red", shape: "dot", text: result.toString() });
            node.send(msg);
        });
    }
    RED.nodes.registerType('not', NotNode);
};
