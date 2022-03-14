---
sidebar_position: 2
title: Onchain groups
---

# Using onchain groups

In this section, we will learn how to use the Interep onchain groups.

Interep allows develepers to manage their own onchain groups. Anyone can create their own group using the [Interep contracts](https://github.com/interep-project/contracts) and assigning the role of group admin to an address, which can be a simple wallet or a multisig wallet (e.g. a DAO). The admin can then add or remove members, who can in turn create Semaphore proofs.

:::caution
Before going any further, if you are not familiar with Semaphore, read the [official documentation](https://semaphore.appliedzkp.org).
:::

## Group creation

Anyone can create an onchain group by interacting with the [Interep contracts](https://github.com/interep-project/contracts).

1. Set up your contract instance:

```typescript
import Interep from "./Interep.json" // Contract interface.
import { utils, Contract, providers, Wallet } from "ethers"

const provider = new providers.JsonRpcProvider("https://kovan.infura.io/v3/<infura-api-key>")
const adminWallet = Wallet.fromMnemonic("<admin-mnemonic>").connect(provider)
const contract = new Contract("<interep-contract-address>", Interep.abi, adminWallet)
```

:::info
Check the available Interep [contract addresses](https://github.com/interep-project/contracts#deployed-contracts) and generate the Interep contract interface (ABI) running `yarn compile` in the [repository](https://github.com/interep-project/contracts).
:::

2. Call the `createGroup` contract function:

```typescript
import { utils } from "ethers"

const groupId = utils.formatBytes32String("<app-name>")
const treeDepth = 20
const adminAddress = await adminWallet.getAddress()

await contract.createGroup(groupId, treeDepth, adminAddress)
```

:::info
These steps will soon be integrated into the Interep web app.
:::

## Semaphore identity

In order for a user to join a group they must create their own Semaphore identity with [`@interep/identity`](https://github.com/interep-project/interep.js/tree/main/packages/identity).

1. Get the Ethereum account signer from Metamask:

```typescript
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = await detectEthereumProvider()
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()
```

2. Create the Semaphore identity and the identity commitment:

```typescript
import createIdentity from "@interep/identity"

const sign = (message) => signer.signMessage(message)

// The second parameter can be an offchain provider or an onchain group id.
const identity = await createIdentity(sign, "<provider-or-group-id>")
const identityCommitment = identity.genIdentityCommitment().toString()
```

:::caution
While the identity commitment can be public, the Semaphore identity must remain private, as it contains the parameters necessary to create Semaphore proofs.
:::

## New members

The identity commitment can now be sent to a server, where the group admin can call the `addMember` contract function to add a new member.

```typescript
await contract.addMember(groupId, identityCommitment)
```
