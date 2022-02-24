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
// The identity commitment is necessary for the creation of a Merkle proof.
const identityCommitment = identity.genIdentityCommitment().toString()
```

## Merkle proof

A Merkle proof is needed to generate a valid Semaphore proof. Since each Interep group is actually a Merkle tree where leaves correspond to user identity commitments, it will be sufficient to use the [Interep API](/api) in case of an offchain group, or the [Interep subgraph](/subgraph) in case the group is onchain.

### Offchain groups

If the generated Semaphore identity refers to an offchain provider you can use the API of the Interep server. It will provide a Merkle proof ready to be used.

```typescript
// Merkle proof of a member of the 'gold' group of the Github provider.
const response = await fetch(`https://kovan.interep.link/api//groups/github/gold/${identityCommitment}/proof`)

const { data: merkleProof } = await response.json()
```

### Onchain groups

If the generated Semaphore identity refers to an onchain group you can use the Interep subgraph to get the identity commitments of that group and generate a Merkle proof.

```typescript
import { utils } from "ethers"
import { generateMerkleProof } from "@zk-kit/protocols"

const groupId = "<group-id>"
const query = `{
    members(where: { group: "${groupId}" }) {
        identityCommitment
    }
}`

const response = await fetch("https://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        query
    })
})

const { data } = await response.json()
const identityCommitments = data.members.map((member) => member.identityCommitment).reverse()

const zeroValue = utils.solidityKeccak256(["string"], ["Semaphore"])
const merkleProof = generateMerkleProof(20, BigInt(zeroValue), 2, identityCommitments, identityCommitment)
```

## Semaphore proofs

Creating Semaphore proofs requires some static files, in the future these files will be hosted on a server and made public. For now you can use the ones used in the [Semaphore repository](https://github.com/appliedzkp/semaphore/tree/main/build/snark) for testing.

```typescript
import { Semaphore } from "@zk-kit/protocols"

const signal = "Hello world"
const externalNullifier = 1n

const witness = Semaphore.genWitness(
    identity.getTrapdoor(),
    identity.getNullifier(),
    merkleProof,
    externalNullifier,
    signal
)

const fullProof = await Semaphore.genProof(witness, "./semaphore.wasm", "./semaphore_final.zkey")
const solidityProof = Semaphore.packToSolidityProof(fullProof)
```

## Onchain verifier

Finally, you can call your contract function, which will use Interep to verify that the proof is correct. You can pass the Interep [contract address](https://kovan.etherscan.io/address/0x06bcD633988c1CE7Bd134DbE2C12119b6f3E4bD1) from outside and use the [Solidity interface](https://github.com/interep-project/contracts/blob/main/contracts/interfaces/IInterep.sol) to call contract functions.
