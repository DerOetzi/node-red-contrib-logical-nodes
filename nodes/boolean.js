"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (RED) {
    function BooleanNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.status({ fill: "grey", shape: "ring", text: "no message" });
        node.on('input', (msg) => {
            const result = msg.payload;
            const topicValue = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);
            msg.topic = topicValue;
            node.status({ fill: result === true ? "green" : "red", shape: "dot", text: result.toString() });
            if (result === true) {
                node.send([msg, null]);
            }
            else {
                node.send([null, msg]);
            }
        });
    }
    RED.nodes.registerType('boolean', BooleanNode);
};
