# node-red-contrib-logical-nodes

**Version**: 0.1.0

## Description

`node-red-contrib-logical-nodes` is a collection of logical nodes for Node-RED. This package includes logical **AND**, **OR**, and **NOT** nodes that allow you to perform basic logical operations on incoming messages.

## Nodes

- **AND Node**: Performs a logical AND operation on the payloads from different topics. Outputs `true` only when all values are `true`.
- **OR Node**: Performs a logical OR operation. Outputs `true` when at least one value is `true`.
- **NOT Node**: Inverts the boolean value of the incoming payload.

## Installation

You can install this package directly within Node-RED by using the **Manage Palette** option or via npm:

```bash
npm install node-red-contrib-logical-nodes
