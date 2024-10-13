import { NodeAPI, Node, NodeDef } from 'node-red';

// Typdefinition für das Node-Konfigurationsobjekt
interface NotNodeConfig extends NodeDef {
    topic: string;
    topicType: string;
    newMsg: boolean;
}

module.exports = function (RED: NodeAPI) {
    function NotNode(this: Node, config: NotNodeConfig): void {
        RED.nodes.createNode(this, config);
        const node = this;

        node.status({ fill: "grey", shape: "ring", text: "no message" });

        node.on('input', (msg: any) => {
            // Verneinung des eingehenden Payloads
            const result = !msg.payload;

            const topicValue = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);

            if (config.newMsg) {
                msg = { payload: result, topic: topicValue };
            } else {
                msg.payload = result;
                msg.topic = topicValue;
            }

            node.status({ fill: result ? "green" : "red", shape: "dot", text: result.toString() });
            node.send(msg);
        });
    }

    RED.nodes.registerType('not', NotNode);
};
