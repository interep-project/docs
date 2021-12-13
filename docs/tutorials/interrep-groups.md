---
title: InterRep groups
---

# Using InterRep groups

In this section, we will learn how to integrate our InterRep groups in your application.

InterRep allows users to join groups anonymously, so that these groups can then be used by DApps and external services to allow, for example, only certain categories of users to authenticate or to unlock certain features based on the user's group. Each group has a certain provider and a name (which coincides with the reputation when there is a OAuth provider). A user with a gold reputation on Twitter can, for example, join the relevant group and access another application by proving that they are part of the group and therefore have a gold reputation.

The groups are basically composed of a set of Semaphore identity commitments organized in Merkle trees. Thanks to Semaphore it is possible to create a zero-knowledge proof to prove that a user is a member of the group (or a leaf of the tree) without revealing their identity.

In the following steps we will use [`@interrep/api`](https://github.com/InterRep/interrep.js/tree/main/packages/api), a JavaScript library to wrap our REST APIs. If you want to use our API directly, you can find them in the [API](/api) section.

:::caution
Before going any further, if you are not familiar with Semaphore, read the [official documentation](https://semaphore.appliedzkp.org).
:::

:::info
If you want to integrate the whole onboarding flow into your UI, follow all the steps. Otherwise, if you want to redirect the user to our app to allow him/her to join a group, follow the steps in the following order: 3, 5, 6.
:::

## 1. Generate a OAuth token

If you want to allow a user to join a group directly from your app without going through the InterRep app, you will need to create a OAuth authentication system to generate a valid access token in order to calculate the users' reputation and to add their identity commitment to a InterRep group. You can get the list of our supported providers with our [`@interrep/api`](https://github.com/InterRep/interrep.js/tree/main/packages/api) package.

```typescript
import { API } from "@interrep/api"

const api = new API()
const providers = await api.getProviders()

console.log(providers) // ["twitter", "github", "reddit", "poap", "telegram"]
```

:::info
You only need to create a token if the provider is a OAuth provider (e.g. Twitter, Reddit, Github). For the Web3 providers (e.g POAP) you can skip the steps 1 and 2. As we will see later, it is sufficient to sign the identity commitment with Metamask and send the signature and the address of the Ethereum account used to sign.
:::

## 2. Calculate the user's reputation

Once you have generated a valid OAuth token and are able to obtain the user's account data you can calculate their reputation with our [`@interrep/reputation`](https://github.com/InterRep/interrep.js/tree/main/packages/reputation) package.

```typescript
import { calculateReputation, OAuthProvider } from "@interrep/reputation"

// 'getGithubUserByToken' is an example function.
const { id, plan, followers, receivedStars } = await getGithubUserByToken(token)

const reputation = calculateReputation(OAuthProvider.GITHUB, {
    proPlan: plan.name === "pro",
    followers,
    receivedStars
})

console.log(reputation) // gold
```

## 3. Create the identity commitment

Creating an Semaphore identity commitment is quite simple. InterRep provides an [`@interrep/identity`](https://github.com/InterRep/interrep.js/tree/main/packages/identity) package to create a Semaphore identity ([`@libsem/identity`](https://github.com/appliedzkp/libsemaphore/tree/master/packages/identity)). You will also need [Metamask](https://metamask.io/) and [Ethers.js](https://github.com/ethers-io/ethers.js/) (or [Web3.js](https://github.com/ChainSafe/web3.js)) to sign the InterRep message. If you want to see how `@interrep/identity` works you can try our [demo](https://js.interrep.link/identity/).

```typescript
import createIdentity from "@interrep/identity"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = await detectEthereumProvider()
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()

function sign(message: string): Promise<string> {
    return signer.signMessage(message)
}

const identity = await createIdentity(sign, "github")
const identityCommitment = identity.genIdentityCommitment().toString()
```

## 4. Add the identity commitment to a group

To add an identity commitment to a group you need a OAuth token if there is a OAuth provider or the signature of the identity commitment and the Ethereum account address if there is a Web3 provider.

The POST methods of our APIs are restricted to a list of domains defined in a whitelist. If you want to add your own domain please contact us or open a pull request. You can find the configuration file [here](https://github.com/InterRep/reputation-service/blob/main/src/config.ts).

```typescript title="Adding identity commitments to groups with reputation providers (e.g Github)."
await api.addIdentityCommitment({
    provider: "github",
    name: reputation,
    identityCommitment,
    authenticationHeader: `token ${token}`
})
```

```typescript title="Adding identity commitments to groups with Web3 providers (e.g POAP)."
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = await detectEthereumProvider()
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()

const userSignature = await signer.signMessage(identityCommitment)
const userAddress = await signer.getAddress()

await api.addIdentityCommitment({
    provider: "poap",
    name: "DEVCON_4",
    identityCommitment,
    userAddress,
    userSignature
})
```

:::info
If you need to get our supported groups you can use the `api.getGroups()` function.
:::

## 5. Get the Merkle tree path

After the user is part of a group, you can obtain the Merkle tree path needed to generate the proof of membership with Semaphore.

```typescript
const path = await api.getMerkleTreePath({
    provider: "github",
    name: reputation,
    identityCommitment
})
```

## 6. Create a zero-knowledge proof

At this point you have all the necessary parameters to generate a zero-knowledge proof with Semaphore.
