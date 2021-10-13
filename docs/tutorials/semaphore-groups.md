---
title: Semaphore groups
---

# Using Semaphore groups

In this section, we will learn how to integrate our Semaphore groups in your application.

InterRep allows users to join groups anonymously, so that these groups can then be used by DApps and external services to allow, for example, only certain categories of users to authenticate or to unlock certain features based on the user's group. Each group has a certain provider and a name (which coincides with the reputation when there is a Web2 provider). A user with a GOLD reputation on Twitter can, for example, join the relevant group and access another application by proving that they are part of the group and therefore have a GOLD reputation.

The groups are basically composed of a set of Semaphore identity commitments organized in Merkle trees. Thanks to Semaphore it is possible to create a zero-knowledge proof to prove that a user is a member of the group (or a leaf of the tree) without revealing their identity.

:::caution
Before going any further, if you are not familiar with Semaphore, read the [official documentation](https://semaphore.appliedzkp.org).
:::

:::info
If you want to integrate the whole onboarding flow into your UI, follow all the steps. Otherwise, if you want to redirect the user to our app to allow him/her to join a group, follow the steps in this order: 3, 5, 6.
:::

## 1. Generate a OAuth token

If you want to allow a user to join a group directly from your app without going through the InterRep app, you will need to create a OAuth authentication system to generate a valid access token in order to calculate the users' reputation and to add their identity commitment to a Semaphore group. You can get the list of our supported providers with our [`/api/providers`](/api#apiproviders) API.

```typescript
const response = await fetch("https://kovan.interrep.link/api/providers")
const { data } = await response.json()

console.log(data) // ["twitter", "github", "reddit", "poap"]
```

:::info
You only need to create a token if the provider is a Web2 provider (e.g. Twitter, Reddit, Github). For the other Web3 providers you can skip the steps 1 and 2. As we will see later, it is sufficient to sign the identity commitment with Metamask and send the signature and the address of the Ethereum account used to sign.
:::

## 2. Calculate the user's reputation

Once you have generated a valid OAuth token and are able to obtain the user's account data you can calculate their reputation with our [`@interrep/reputation-criteria`](https://github.com/InterRep/interrep.js/tree/main/packages/reputation-criteria) package.

```typescript
const { id, plan, followers, receivedStars } = await getGithubUserByToken(token)

const reputation = calculateReputation(Web2Provider.GITHUB, {
    proPlan: plan.name === "pro",
    followers,
    receivedStars
})

console.log(reputation) // GOLD
```

## 3. Create the identity commitment

Creating a Semaphore identity commitment is quite simple. InterRep provides an [`@interrep/semethid`](https://github.com/InterRep/interrep.js/tree/main/packages/semethid) package to create a Semaphore identity. You will also need [Metamask](https://metamask.io/) and [Ethers.js](https://github.com/ethers-io/ethers.js/) (or [Web3.js](https://github.com/ChainSafe/web3.js)) to sign the InterRep message and [Circomlib](https://github.com/iden3/circomlib) to generate the identity commitment. If you want to see how `@interrep/semethid` works you can try our [demo](https://js.interrep.link/semethid/).

```typescript
import { babyJub, poseidon } from "circomlib"
import semethid from "@interrep/semethid"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = await detectEthereumProvider()
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()

function sign(message: string): Promise<string> {
    return signer.signMessage(message)
}

const identity = await semethid(sign, "github")
const identityCommitment = poseidon([
    babyJub.mulPointEscalar(identity.keypair.pubKey, 8)[0],
    identity.identityNullifier,
    identity.identityTrapdoor
]).toString()

console.log(identityCommitment)
// 14271763308400718165336499097156975241954733520325982997864342600795471836726
```

## 4. Add the identity commitment to a group

To add an identity commitment to a group you can use our [`/api/groups/:provider/:name/:identityCommitment`](/api#apigroupsprovidernameidentitycommitment) API. The POST methods of our APIs are restricted to a list of domains defined in a whitelist. If you want to add your own domain please contact us or open a pull request. You can find the configuration file [here](https://github.com/InterRep/reputation-service/blob/main/src/config.ts).

```typescript title="Adding identity commitments to groups with Web2 providers (e.g Github)."
const headers = new Headers({ Authorization: `token ${token}` })
const url = `https://kovan.interrep.link/api/groups/github/${reputation}/${identityCommitment}`
const userResponse = await fetch(url, { method: "POST", headers })
const { data } = await response.json()

// The new root hash of the Merkle tree.
console.log(data) // 13331146992410411304059858900317123658895005918277453009197229807340014528595
```

```typescript title="Adding identity commitments to groups with Web3 providers (e.g POAP)."
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = await detectEthereumProvider()
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()

const userSignature = await signer.signMessage(identityCommitment)
const userAddress = await signer.getAddress()

const url = `https://kovan.interrep.link/api/groups/poap/DEVCON_4/${identityCommitment}`
const userResponse = await fetch(url, {
    method: "POST",
    body: {
        userSignature,
        userAddress
    }
})
const { data } = await response.json()

// The new root hash of the Merkle tree.
console.log(data) // 82613880268183407374852357075976609371175688755676981206018884971008854919953
```

:::info
If you need to see our supported groups you can use our [`/api/groups`](/api#apigroups) API.
:::

## 5. Get the Merkle tree path

After the user is part of a group, simply use our [`/api/groups/:provider/:name/:identityCommitment/path`](/api#apigroupsprovidernameidentitycommitmentpath) API to obtain the tree path needed to generate the proof of membership with Semaphore.

```typescript
const url = `https://kovan.interrep.link/api/groups/github/${reputation}/${identityCommitment}/path`
const userResponse = await fetch(url)
const { data } = await response.json()

console.log(data)
/*{
    pathElements: [
        "0",
        "14744269619966411208579211824598458697587494354926760081771325075741142829156",
        "7423237065226347324353380772367382631490014989348495481811164164159255474657",
        "11286972368698509976183087595462810875513684078608517520839298933882497716792",
        "3607627140608796879659380071776844901612302623152076817094415224584923813162",
        "19712377064642672829441595136074946683621277828620209496774504837737984048981",
        "20775607673010627194014556968476266066927294572720319469184847051418138353016",
        "3396914609616007258851405644437304192397291162432396347162513310381425243293",
        "21551820661461729022865262380882070649935529853313286572328683688269863701601",
        "6573136701248752079028194407151022595060682063033565181951145966236778420039",
        "12413880268183407374852357075976609371175688755676981206018884971008854919922",
        "14271763308400718165336499097156975241954733520325982997864342600795471836726",
        "20066985985293572387227381049700832219069292839614107140851619262827735677018",
        "9394776414966240069580838672673694685292165040808226440647796406499139370960",
        "11331146992410411304059858900317123658895005918277453009197229807340014528524",
        "15819538789928229930262697811477882737253464456578333862691129291651619515538"
    ],
    indices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    root: "14292921841668459321530999124084402502172700548060824366716414263194752155209"
}*/
```

## 6. Create a zero-knowledge proof

At this point you have all the necessary parameters to generate a zero-knowledge proof with Semaphore.
