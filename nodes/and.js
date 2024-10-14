"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (RED) {
    function AndNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const context = this.context();
        const msgCount = config.msgCount || 1;
        node.status({ fill: "grey", shape: "ring", text: "no message" });
        node.on('input', (msg) => {
            const topics = context.get('topics') || {};
            topics[msg.topic] = msg.payload;
            context.set('topics', topics);
            if (Object.keys(topics).length >= msgCount) {
                const result = Object.values(topics).every((value) => value === true);
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
    RED.nodes.registerType('and', AndNode);
};
