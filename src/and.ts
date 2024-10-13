import { NodeAPI, Node, NodeDef } from 'node-red';

// Typdefinition für das Node-Konfigurationsobjekt
interface AndNodeConfig extends NodeDef {
    topic: string;
}

module.exports = function (RED: NodeAPI) {
    // Definition der AndNode-Funktion
    function AndNode(this: Node, config: AndNodeConfig): void {
        RED.nodes.createNode(this, config);
        const node = this;
        const topics: Record<string, any> = {};  // Objekte zur Speicherung der Topics und Payloads

        node.on('input', (msg: any) => {
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
            } else {
                node.status({ fill: "red", shape: "dot", text: "false" });
            }

            // Sende die Nachricht weiter
            node.send(msg);
        });
    }

    // Registrierung des Node-Typs in Node-RED
    RED.nodes.registerType('and', AndNode);
};
