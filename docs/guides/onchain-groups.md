---
title: Onchain groups
---

# Using onchain groups

In this section, we will learn how to use our Interep onchain groups.

Interep allows develepers to manage their own onchain groups. Anyone can create their own group using our [Interep contracts](https://github.com/interep-project/contracts) and assigning the role of group admin to an address, which can be a simple wallet or a multisig wallet (e.g. a DAO). The admin can then add or remove members, and those members can prove that they belong to the onchain group anonymously with a Semaphore zero-knowledge proof.

:::info
Interep contracts are currently deployed on Kovan. In the following steps we assume that you already have the [address](https://github.com/interep-project/contracts#deployed-contracts) and the latest ABI of our contracts, that you can generate by running `yarn compile` in our [repository](https://github.com/interep-project/contracts).
:::

:::caution
Before going any further, if you are not familiar with Semaphore, read the [official documentation](https://semaphore.appliedzkp.org).
:::

## Create a group

Anyone can create a group by calling the Solidity [`createGroup`](https://github.com/interep-project/contracts/blob/main/contracts/InterepGroups.sol#L39) function. You can create a script yourself or we will do it for you.

```typescript
import Interep from "./Interep.json" // Contract interface.
import { utils, Contract, providers, Wallet } from "ethers"

const contract = new Contract("<interep-contract-address>", Interep.abi)
const provider = new providers.JsonRpcProvider("https://kovan.infura.io/v3/<infura-api-key>")
const adminWallet = Wallet.fromMnemonic("<admin-mnemonic>")

const groupId = utils.formatBytes32String("<app-name>")
const treeDepth = 20
const adminAddress = await adminWallet.getAddress()

await contract.connect(adminWallet).createGroup(groupId, treeDepth, adminAddress)
```

:::info
This step will soon be made easier and integrated into our app.
:::

## Create Semaphore identities

Members of the groups are actually leaves of a Merkle tree. Since each leaf is equivalent to a Semaphore identity commitment, adding a new member will require allowing the user to create their own Semaphore identity, with which the identity commitment can be generated.

The code below allows a Semaphore identity to be generated deterministically from a message signed with the user's Ethereum account. While the identity commitment can be public, the Semaphore identity must remain private, as it contains the parameters necessary for the creation of zero-knowledge Semaphore proofs.

```typescript
import createIdentity from "@interep/identity"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = await detectEthereumProvider()
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()

function sign(message: string): Promise<string> {
    return signer.signMessage(message)
}

const identity = await createIdentity(sign, "<app-name>")
const identityCommitment = identity.genIdentityCommitment().toString()
```

## Add new members

Adding members is at this point very simple. The group admin (in a server) can call the contract function to add a member to the previously created group.

```typescript
await contract.connect(adminWallet).addMember(groupId, identityCommitment)
```
