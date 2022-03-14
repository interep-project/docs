---
sidebar_position: 1
title: Offchain groups
---

# Using offchain groups

In this section, we will learn how to integrate the Interep offchain groups in your application.

Interep allows users to join offchain groups based on certain parameters. Each offchain group has a provider and a name, and it can be used by users to anonymously perform tasks that require them to prove, for example, that they have a certain reputation on Twitter or that they belong to a certain Telegram group.

:::caution
Before going any further, if you are not familiar with Semaphore, read the [official documentation](https://semaphore.appliedzkp.org).
:::

## OAuth tokens

If you want to allow a user to join a OAuth provider group (i.e. Twitter, Github or Reddit) directly from your app without going through the Interep app, you will need to create a OAuth authentication system to generate a valid access token in order to calculate the users' reputation and to add their identity commitment to an Interep group.

:::caution
For Web3 providers (i.e POAP) you can skip the first two steps. As we will see later, it is sufficient to sign the identity commitment with Metamask and send the signature and the address of the Ethereum account used to sign. The flow of the Email and Telegram providers cannot currently be onboarded.
:::

## User's reputation

Once you have generated a valid OAuth token and you are able to obtain the user's account data you can calculate their reputation with [`@interep/reputation`](https://github.com/interep-project/interep.js/tree/main/packages/reputation).

```typescript
import { calculateReputation, OAuthProvider } from "@interep/reputation"

// 'getGithubUserByToken' is an example function.
const { id, plan, followers, receivedStars } = await getGithubUserByToken(token)

const reputation = calculateReputation(OAuthProvider.GITHUB, {
    proPlan: plan.name === "pro",
    followers,
    receivedStars
})

console.log(reputation) // gold
```

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

const identity = await createIdentity(sign, "<provider>")
const identityCommitment = identity.genIdentityCommitment().toString()
```

:::caution
While the identity commitment can be public, the Semaphore identity must remain private, as it contains the parameters necessary to create Semaphore proofs.
:::

## New members

You can now add a member to a OAuth group by using a OAuth token and the correct user's reputation:

```typescript
await api.addMember({
    provider: "github",
    name: reputation,
    identityCommitment,
    authenticationHeader: `token ${token}`
})
```

Or you can add a member to a Web3 group by using the user Ethereum address and the signature of their identity commitment:

```typescript
const userSignature = await signer.signMessage(identityCommitment)
const userAddress = await signer.getAddress()

await api.addMember({
    provider: "poap",
    name: "devcon4",
    identityCommitment,
    userAddress,
    userSignature
})
```

:::tip
The POST methods of the Interep APIs are restricted to a list of domains defined in a whitelist. If you want to add your app domain please contact us or open a pull request. You can find the configuration file [here](https://github.com/interep-project/reputation-service/blob/main/src/config.ts).
:::
