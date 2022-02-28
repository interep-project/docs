---
title: Semaphore proofs
---

# Creating Semaphore proofs

If you've read the guides on how to use onchain or offchain groups you may now be wondering how you can allow users to create Semaphore proofs, and how to verify that these proofs are valid.

In this section, we will learn how to get all the parameters for creating a Semaphore proof and how to use the Interep contract to correctly verify these proofs.

:::caution
Before going any further, if you are not familiar with Semaphore, read the [official documentation](https://semaphore.appliedzkp.org).
:::

## Semaphore identity

Since only a user belonging to an Interep group can create a valid proof, it is necessary for users to re-generate a Semaphore identity with Metamask.

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

// The second parameter can be on offchain provider or an onchain group id.
const identity = await createIdentity(sign, "<provider-or-group-id>")
```

## Semaphore proof

Creating Semaphore proofs requires some static files, but in the future these files will be hosted on a server and made public. For now you can use the ones used in the [Semaphore repository](https://github.com/appliedzkp/semaphore/tree/main/build/snark) for testing.

```typescript
import createProof from "@interep/proof"

const groupId = 1
const signal = "Hello world"
const externalNullifier = 1n

const proof = createProof(
    identity,
    {
        id: groupId // For onchain groups.
        // Or 'provider' and 'name' for offchain groups.
    },
    externalNullifier,
    signal,
    {
        wasm: "./semaphore.wasm"
        zkey: "./semaphore_final.zkey"
    }
)
```

## Onchain verifier

Finally, you can call your contract function, which will use Interep to verify that the proof is correct. You can pass the Interep [contract address](https://kovan.etherscan.io/address/0x06bcD633988c1CE7Bd134DbE2C12119b6f3E4bD1) from outside and use the [Solidity interface](https://github.com/interep-project/contracts/blob/main/contracts/interfaces/IInterep.sol) to call contract functions.
