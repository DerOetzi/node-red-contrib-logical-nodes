"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (RED) {
    // Definition der AndNode-Funktion
    function AndNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const topics = {}; // Objekte zur Speicherung der Topics und Payloads
        node.on('input', (msg) => {
            // Speichere Payload nach Topic
            topics[msg.topic] = msg.payload;
            // Verunde alle Payloads
            const result = Object.values(topics).reduce((a, b) => a && b, true);
            // Setze das topic in der Nachricht, falls konfiguriert
            msg.topic = config.topic || msg.topic;
            msg.payload = result;
            // Setze den Status basierend auf dem Ergebnis
            if (result) {
                node.status({ fill: "green", shape: "dot", text: "true" });
            }
            else {
                node.status({ fill: "red", shape: "dot", text: "false" });
            }
            // Sende die Nachricht weiter
            node.send(msg);
        });
    }
    // Registrierung des Node-Typs in Node-RED
    RED.nodes.registerType('and', AndNode);
};
