---
sidebar_position: 1
slug: /
---

# Introduction

InterRep is a system which allows people to export cryptographic proofs of their reputation accrued on social networks or other sites (e.g. Twitter, Github) and to put these proofs on a decentralized platform (i.e. Ethereum) in order to allow decentralized applications or services to verify them efficiently without transmitting sensitive data. The current version allows users to cryptographically link (or possibly unlink) their Ethereum account with their Twitter account in order to create an onchain badge (represented as an NFT) when certain pre-established reputation criteria are met. One of the next milestones will allow users to create client-side zero-knowledge proofs with Semaphore in order to allow users to prove that they have a certain reputation or meet certain requirements without revealing their identity.

## What is the problem we are trying to solve?

Since reputation is key to creating trust and it is difficult to obtain, giving people the opportunity to export their reputation across platforms (e.g. social networks) would expand the compounding benefits of trusted human interactions across the web. Many platforms today use public attestations to avoid sybil attacks and to confirm their users' identities, thereby forcing users to give out their personal information in order to certify their identities. This makes this kind of mechanism inefficient and unsuitable to protect users' data. Because DApps require a decentralized trust model to establish the authenticity of the binding which links a public key to its owner, due to the fact that in a web-of-trust scheme there is no trusted third party as there is in a centralized PKI infrastructure, it is difficult to represent the owner of a public key with a digital identity that reflects their real identity (as Alex Preukschat and Drummond Reed explain in their [book](https://www.manning.com/books/self-sovereign-identity)).

## What is the goal of InterRep?

Even if we urgently need Web 3.0 as soon as possible, the majority of people's data still resides within centralized platforms. The aim of InterRep is to create a bridge between Web 2.0 and Web 3.0, giving users the possibility to transfer their pre-existing reputation from the most used platforms to a decentralized platform in a privacy-focused context. This allows users to export cryptographic proofs of their reputation and DApps or services to verify them efficiently without having to acquire sensitive data. Portable reputation can help prevent sybil attacks and can therefore make it easier for DApps or other services to manage the identities of their users.

## What has been done so far?

The current version of InterRep lets users link a reputable Twitter account to an Ethereum address, without retaining a readable record of this association but instead encrypting it with the user's public key. If the user meets the defined [Twitter reputation criteria](https://github.com/ra-phael/interRep-contracts/wiki/Twitter-Reputation-Criteria) they can create a badge, that is an NFT which certifies the user's reputation and which can be used as collateral in other applications. The user can then revoke an InterRep Twitter badge by burning the NFT and unlinking the accounts. Users can interact with the system through a simple [web application](https://interrep.link/), whereas a [centralized reputation service](https://github.com/InterRep/reputation-service) saves the encrypted association between the Ethereum and the Twitter account of the user, as well as creating the user's badge and checking that only one badge can be issued per Twitter account. Applications can make use of InterRep through its APIs, which return a Twitter account’s reputation based on publicly available data. This approach decreases the level of decentralization in order to gain more privacy, but there are many ways to improve both decentralization and privacy still in the making.

InterRep is therefore currently made up of two main components:

* [Reputation service](https://github.com/InterRep/reputation-service): It's currently a node.js server built with [Next.js](https://next.js.org/) with a [MongoDB](https://www.mongodb.com/) database and a [React](https://reactjs.org/) frontend. It exposes a set of APIs to allow external services to interact with it and it uses OAuth with [NextAuth.js](https://next-auth.js.org/) to allow users to sign in with their Twitter account and [Metamask](https://metamask.io/) to allow users to connect with an Ethereum account. Backend and frontend interact with Ethereum with [Ethers.js](https://github.com/ethers-io/ethers.js/) and the only data saved on the server are related to the encrypted links between the Ethereum accounts and the Twitter accounts.
* [Reputation badge contract](https://github.com/ra-phael/interRep-contracts): It's a Solidity ERC721 contract (NFT). We have used [this](https://github.com/paulrberg/solidity-template) template to write the contract and the [OpenZeppelin](https://openzeppelin.com/) library to manage its ownership and to make it upgradeable. 

The article "[Introducing InterRep](https://jaygraber.medium.com/introducing-interrep-255d3f56682)" by Raphael Roullet and Jay Graber gives an overview of the project. In the contract repository [wiki](https://github.com/ra-phael/interRep-contracts/wiki) there is also a [guide](https://github.com/ra-phael/interRep-contracts/wiki/How-To-Use-InterRep) for using the application and a [technical overview](https://github.com/ra-phael/interRep-contracts/wiki/Technical-Overview) of the current system.

## What are the next steps?

Privacy is at the heart of the project and our main next step is to further improve the system in order to allow people to share as little data as possible. [Semaphore](https://semaphore.appliedzkp.org/) is a zero-knowledge gadget which allows Ethereum users to prove their membership of a set which they had previously joined without revealing their original identity. Our idea is to create a semaphore group where users can add their own commitment identity deriving it from their Ethereum ECDSA key based on their Twitter reputation. Decentralized applications and services can then use this group to allow users to prove they have a high reputation on Twitter without revealing their identity.

Our goal is to give the possibility to as many users as possible to export their reputation from Web 2.0 to Web 3.0. Another important step is therefore to extend our service to other Web 2.0 platforms: [Github](https://github.com/), [Reddit](https://www.reddit.com/) and [Aadhaar](https://uidai.gov.in). 

Another interesting integration is [The Graph](https://thegraph.com/), a decentralized protocol for indexing and querying data from networks like Ethereum. Our APIs currently reside in a centralized service and creating a subgraph with The Graph will allow us to make part of our APIs available with a decentralized and efficient system.

Finally, we believe it is important to make the project modular and well organized. Another goal is therefore to better organize our repositories.
