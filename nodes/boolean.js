"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (RED) {
    function BooleanNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.on('input', (msg) => {
            const topicValue = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);
            // Setze das Topic für die Nachricht
            msg.topic = topicValue;
            // Basierend auf dem Payload routen
            if (msg.payload === true) {
                node.send([msg, null]); // Weiterleitung an den ersten Ausgang für true
            }
            else {
                node.send([null, msg]); // Weiterleitung an den zweiten Ausgang für false
            }
        });
    }
    RED.nodes.registerType('boolean', BooleanNode);
};
