---
sidebar_position: 6
---

# Onchain groups

In addition to the providers described above Interep allows you to create fully onchain managed groups. Root hashes are computed with an incremental Merkle tree onchain, while identity commitments can be accessed with events (i.e. Ethereum logs). Interep also provides a [subgraph](/api/#subgraph) where data about onchain groups and their members can be accessed.

Onchain groups clearly provide an additional level of integrity, as they are fully decentralized. However, the criteria by which group members are added are in this case not defined and managed by Interep, but by external group admins.

:::tip
If you want to learn more about contracts you can explore the code [here](https://github.com/interep-project/contracts/blob/main/contracts/Groups.sol). Any feedback is more than appreciated!
:::

## Flow

1. A DAO or anyone interested asks Interep to create an onchain group with a default address as admin (the address can be relative to a simple account or to a multisig wallet);
2. the admin uses the contract functions to add or remove group members;
3. anyone can use the groups/trees to create zero knowledge proofs with Semaphore or simple proofs of membership.

![Onchain groups flow](/img/onchain_groups_flow.svg)

## Use cases

### 1. DAO groups

A DAO can create an Interep onchain group to allow its members to anonymously prove that they are part of the organization in order to access external services.
