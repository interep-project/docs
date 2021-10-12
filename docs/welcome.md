---
sidebar_position: 1
slug: /
---

# 👋🏼 Welcome

:::caution
This documentation refers to the latest version of InterRep ([kovan.interrep.link](https://kovan.interrep.link)), which is still at an early stage. The production environment ([interrep.link](https://interrep.link)) still refers to the old MVP version and it will be updated soon.
:::

InterRep is a system which allows people to export cryptographic proofs of their **reputation** accrued on social networks or other services and to put these proofs on a **decentralized** platform (i.e. Ethereum), in order to allow decentralized applications or services to verify users' reputation efficiently and without sensitive data.

The current version allows users with a high reputation on social platforms (e.g. Twitter, Github or Reddit) to cryptographically link their Ethereum account with their social network accounts and to create an onchain **badge** (represented as an NFT).

In addition, users, based on their reputation score, can join **groups** anonymously so that external services can use InterRep to verify, for example, the authenticity of their users while guaranteeing their privacy.

## What is our goal?

Since reputation is the key to creating **trust** and it is difficult to obtain, giving people the opportunity to export their reputation across platforms (e.g. social networks) would expand the compounding benefits of trusted human interactions across the web.

Many platforms today use public attestations to avoid sybil attacks and to confirm their users' identities, thereby forcing users to give out their personal information in order to certify their identities. This makes this kind of mechanism inefficient and unsuitable to protect users' data.

Even if we urgently need a Web3 as soon as possible, the majority of people's data still resides within centralized platforms. The aim of InterRep is to create a **bridge** between Web2 and Web3, giving users the possibility to transfer their pre-existing reputation from the most used platforms to decentralized platforms in a privacy-focused context. Portable reputation can help prevent sybil attacks and can therefore make it easier for DApps or other services to manage the **identities** of their users.

## Features

### Reputation badges

InterRep allows users **link** a reputable Web2 account (e.g. Twitter, Github, Reddit) to an Ethereum account without retaining a readable record of this association but instead encrypting it with the user's public key. Users can link their accounts only if they have a certain reputation, which is calculated using pre-defined **[criteria](/technical-overview/reputation-criteria/intro)** based on parameters provided by social platforms. The link between the accounts is then represented by a **badge**, i.e. a non-fungible token (NFT) minted by InterRep which certifies the user's reputation and which can be used, for example, as collateral in other applications. The user can then revoke a badge by burning the NFT and unlinking the accounts.

### Semaphore groups

**Privacy** is at the heart of the project and our main next steps are to further improve the system in order to allow people to export their reputation **anonymously**. InterRep allows users to join Semaphore groups based on their reputation on Web2 platforms. Basically, users create a Semaphore identity commitment using their Ethereum account with Metamask, which is then added to the group corresponding to the user's Web2 platform and reputation. InterRep then provides APIs to allow external applications to use these groups to verify their users' reputation without knowing their identity.

:::info
[Semaphore](https://semaphore.appliedzkp.org/) is a zero-knowledge gadget which allows Ethereum users to prove their membership of a set which they had previously joined without revealing their original identity.
:::

## Getting started

InterRep consists of several components. If you want to learn more about the way it works, go to our [technical overview](/technical-overview/intro). If you have a service that needs a system to prevent sybil attacks or to verify the authenticity of users, read our [tutorial](/tutorials/semaphore-groups) on how to integrate our Semaphore groups.

Our Web application is live on [kovan.interrep.link](https://kovan.interrep.link), but be aware that it is in a testing phase.
