# node-red-contrib-logical-nodes

**Version**: 0.4.1

## Description

`node-red-contrib-logical-nodes` is a collection of logical nodes for Node-RED. This package includes logical **AND**, **OR**, **NOT**, **Boolean**, and **Compare** nodes that allow you to perform basic logical operations on incoming messages.

## Nodes

### AND Node

Performs a logical AND operation on the payloads from different topics. Outputs `true` only when all values are `true`.

- **msgCount**: The number of distinct topics required before the output is triggered.
- **newMsg**: Generates a new message with the result if set to `true`.
- **topic**: Specifies the topic for the output message.

### OR Node

Performs a logical OR operation. Outputs `true` when at least one value is `true`.

- **msgCount**: The number of distinct topics required before the output is triggered.
- **newMsg**: Similar behavior as in AND Node.
- **topic**: Specifies the topic for the output message.

### NOT Node

Inverts the boolean value of the incoming payload.

- **newMsg**: Generates a new message instead of modifying the existing one.
- **topic**: Specifies the topic for the output message.

### Boolean Node

Routes the message to different outputs based on the boolean payload. If the payload is `true`, the message is routed to the first output; if `false`, to the second output.

- **topic**: Specifies the topic for the output message.

### Compare Node

Evaluates a property from the incoming message and compares it to a value using a variety of operators (e.g., `==`, `!=`, `<`, `>`, `is true`, `is false`, etc.).

- **newMsg**: Generates a new message with the result if set to `true`.
- **topic**: Specifies the topic for the output message.
- **property**: The property of the message to be compared (e.g., `msg.payload`).
- **operator**: The comparison operator. Available operators include `==`, `!=`, `>`, `<`, `>=`, `<=`, `is true`, `is false`, `is empty`, `is not empty`.
- **value**: The value to compare against (for relevant operators).

## Installation

Install this package directly within Node-RED using the **Manage Palette** option or via npm:

```bash
npm install @deroetzi/node-red-contrib-logical-nodes
```
