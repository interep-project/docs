---
sidebar_position: 3
title: Semaphore proofs
---

# Creating Semaphore proofs

If you've read the guides on how to use onchain or offchain groups you may now be wondering how you can allow users to create Semaphore proofs, and how to verify that these proofs are valid.

In this section, we will learn how to get all the parameters for creating valid Semaphore proofs and how to use the Interep contract to correctly verify these proofs.

:::caution
Before going any further, if you are not familiar with Semaphore, read the [official documentation](https://semaphore.appliedzkp.org).
:::

## Semaphore identity

Since only a user belonging to an Interep group can create a valid proof, it is necessary for users to re-generate a Semaphore identity with [`@interep/identity`](https://github.com/interep-project/interep.js/tree/main/packages/identity).

1. Get the Ethereum account signer from Metamask:

```typescript
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = await detectEthereumProvider()
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()
```

2. Create the Semaphore identity:

```typescript
import createIdentity from "@interep/identity"

const sign = (message) => signer.signMessage(message)

// The second parameter can be an offchain provider or an onchain group id.
const identity = await createIdentity(sign, "<provider-or-group-id>")
```

## Semaphore proof

Once users have generated their Semaphore identities, these can be used to create Semaphore proofs with [`@interep/proof`](https://github.com/interep-project/interep.js/tree/main/packages/proof).

Creating Semaphore proofs also requires some zero-knowledge static files. In the future these files will be hosted on a server and made public, but for now you can use the ones used in the [Semaphore repository](https://github.com/appliedzkp/semaphore/tree/main/build/snark) for testing.

```typescript
import createProof from "@interep/proof"

const groupId = BigInt(formatBytes32String("<group-id>"))
// const groupId = { provider: "<group-provider>", name: "<group-name>" } for offchain groups.

const externalNullifier = 1
const signal = "Hello World"

const zkFiles = {
    wasmFilePath: "./semaphore.wasm",
    zkeyFilePath: "./semaphore_final.zkey"
}

const { publicSignals, solidityProof } = await createProof(identity, groupId, externalNullifier, signal, zkFiles)
```

## Onchain verification

Finally, you can verify Semaphore proofs and use anonymous user signals in your app.

1. Check our supported networks and contract addresses in our [repository](https://github.com/interep-project/contracts) and create your contract:

```solidity
import "./IInterep.sol";

contract MyContract {

    IInterep interep;

    constructor(address interepAddress) {
        interep = IInterep(interepAddress);
    }

   function myFunction(
        uint256 groupId,
        string calldata signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) public {
        interep.verifyProof(groupId, signal, nullifierHash, externalNullifier, proof);

        // Use the anonymous user signal here...
    }
}
```

1. Call your function passing Semaphore proofs:

```typescript
import Interep from "./Interep.json" // Interep contract interface.
import { Contract, providers, Wallet } from "ethers"

const contract = new Contract("<interep-contract-address>", Interep.abi)
const provider = new providers.JsonRpcProvider("https://kovan.infura.io/v3/<infura-api-key>")
const adminWallet = Wallet.fromMnemonic("<admin-mnemonic>").connect(provider)

await contract
    .connect(adminWallet)
    .myFunction(groupId, signal, publicSignals.nullifierHash, publicSignals.externalNullifier, solidityProof)
```

:::info
Check our available Interep [contract addresses](https://github.com/interep-project/contracts#deployed-contracts) and generate the Interep contract interface (ABI) running `yarn compile` in our [repository](https://github.com/interep-project/contracts).
:::
