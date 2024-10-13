"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (RED) {
    function OrNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const topics = {};
        const msgCount = config.msgCount || 1;
        node.status({ fill: "grey", shape: "ring", text: "no message" });
        node.on('input', (msg) => {
            topics[msg.topic] = msg.payload;
            if (Object.keys(topics).length >= msgCount) {
                const result = Object.values(topics).some((value) => value === true);
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
            }
            else {
                node.status({ fill: "yellow", shape: "ring", text: "waiting" });
            }
        });
    }
    RED.nodes.registerType('or', OrNode);
};
