---
sidebar_position: 1
slug: /
---

# 👋🏼 Welcome

:::caution
This documentation refers to the latest version of InterRep ([kovan.interrep.link](https://kovan.interrep.link)), which is still at an early stage. The production environment ([interrep.link](https://interrep.link)) still refers to the old MVP version and it will be updated soon.
:::

## Overview

One of the biggest problems in online communities is the ease with which it is possible to create fake accounts, which reduce the quality of information and interactions. And if a high number of new fake identities can be generated at low cost a reputation system can be vulnerable to so-called sybil-attacks.

Reputation is the key to building trust in a system and it can often be used as a guarantee of authenticity. But it is difficult to obtain and to share without exposing your data. Many platforms today use public attestations to avoid sybil attacks, thereby forcing users to give out their personal information in order to certify their identities. This makes this kind of mechanism inefficient and unsuitable to protect users' data.

Giving people the opportunity to export their reputation across platforms (e.g. social networks) without exposing their personal data would expand the compounding benefits of trusted human interactions across the web, and it would make it much more difficult to create fake accounts.

InterRep provides special groups that can be used by DApps or services to verify users' reputation without exposing their identities. Users can join these groups based on their membership in external groups (e.g. Telegram groups), their reputation in social networks (e.g Twitter groups), or other specific user properties. InterRep only checks that the criteria for joining the group are valid, without saving any sensitive data. What is added in the groups is basically a unique identifier created by the user with their Ethereum account and Semaphore. Only the user, then, will be able to prove that their identifier is part of a group.

:::info
[Semaphore](https://semaphore.appliedzkp.org/) is a zero-knowledge gadget which allows Ethereum users to prove their membership of a set which they had previously joined without revealing their original identity.
:::

## Getting started

InterRep consists of several components. If you want to learn more about the way it works, go to our [technical overview](/technical-overview/intro). If you have a service that needs a system to prevent sybil attacks or to verify the authenticity of users, read our [tutorial](/tutorials/interrep-groups) on how to integrate our groups.
