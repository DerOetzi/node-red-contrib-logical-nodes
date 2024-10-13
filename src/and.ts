import { NodeAPI, Node, NodeDef } from 'node-red';

// Typdefinition für das Node-Konfigurationsobjekt
interface AndNodeConfig extends NodeDef {
    topic: string;
    topicType: string;  
    newMsg: boolean;  
    msgCount: number; 
}

module.exports = function (RED: NodeAPI) {
    function AndNode(this: Node, config: AndNodeConfig): void {
        RED.nodes.createNode(this, config);
        const node = this;
        const topics: Record<string, any> = {};
        const msgCount = config.msgCount || 1;

        node.status({ fill: "grey", shape: "ring", text: "no message" });

        node.on('input', (msg: any) => {
            topics[msg.topic] = msg.payload;

            if (Object.keys(topics).length >= msgCount) {
                const result = Object.values(topics).every((value: any) => value === true);

                const topicValue = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);

                if (config.newMsg) {
                    msg = { payload: result, topic: topicValue };
                } else {
                    msg.payload = result;
                    msg.topic = topicValue;
                }

                node.status({ fill: result ? "green" : "red", shape: "dot", text: result.toString() });
                node.send(msg);
            } else {
                node.status({ fill: "yellow", shape: "ring", text: "waiting" });
            }
        });
    }

    RED.nodes.registerType('and', AndNode);
};
