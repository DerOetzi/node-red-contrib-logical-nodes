import { NodeAPI, Node, NodeDef } from 'node-red';

// Typdefinition für das Node-Konfigurationsobjekt
interface OrNodeConfig extends NodeDef {
    topic: string;
    topicType: string;  
    newMsg: boolean;  
    msgCount: number; 
}

module.exports = function (RED: NodeAPI) {
    function OrNode(this: Node, config: OrNodeConfig): void {
        RED.nodes.createNode(this, config);
        const node = this;
        const context = node.context();
        const msgCount = config.msgCount || 1;

        node.status({ fill: "grey", shape: "ring", text: "no message" });

        node.on('input', (msg: any) => {
            const topics: Record<string, any> = context.get('topics') || {}
            topics[msg.topic] = msg.payload;
            context.set('topics', topics);

            if (Object.keys(topics).length >= msgCount) {
                const result = Object.values(topics).some((value: any) => value === true);

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

    RED.nodes.registerType('or', OrNode);
};
