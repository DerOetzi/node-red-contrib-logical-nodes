import { NodeAPI, Node, NodeDef } from 'node-red';

// Typdefinition für das Node-Konfigurationsobjekt
interface BooleanNodeConfig extends NodeDef {
    topic: string;
    topicType: string;
}

module.exports = function (RED: NodeAPI) {
    function BooleanNode(this: Node, config: BooleanNodeConfig): void {
        RED.nodes.createNode(this, config);
        const node = this;

        node.status({ fill: "grey", shape: "ring", text: "no message" });

        node.on('input', (msg: any) => {
            const result = msg.payload;
            const topicValue = RED.util.evaluateNodeProperty(config.topic, config.topicType, this, msg);

            msg.topic = topicValue;

            node.status({ fill: result === true ? "green" : "red", shape: "dot", text: result.toString() });
            
            if (result === true) {
                node.send([msg, null]); 
            } else {
                node.send([null, msg]); 
            }
        });
    }

    RED.nodes.registerType('boolean', BooleanNode);
};
