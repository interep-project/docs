---
title: What is Interep?
sidebar_position: 1
slug: /
---

# What is Interep?

:::caution
This documentation refers to the latest version of Interep ([kovan.interep.link](https://kovan.interep.link)), which is still at an early stage.
:::

## Overview

One of the biggest problems in online communities is the ease with which fake accounts can be created, which, in turn, reduces the quality of information and interactions on the network. The possibilty to create numerous fake identities at a low cost makes the reputation system vulnerable to sybil-attacks.

Reputation is key to building trust in a system and it can often be used as a guarantee of authenticity. Nevertheless it is difficult to obtain and share a user's reputation without exposing their data. Many platforms today use public attestations to avoid sybil attacks, thereby forcing users to give out their personal information in order to certify their identities. This makes this kind of mechanism inefficient and unsuitable to protect users' data.

Giving people the opportunity to export their reputation across platforms (e.g. social networks) without exposing their personal data would expand the compounding benefits of trusted human interactions across the web, while making it much more difficult to create fake accounts.

Interep provides special groups that can be used by DApps or services to verify users' reputations without exposing their identities. Users can join these groups based on the existing memberships they have on external groups (e.g. Telegram groups), or through their social media reputations (e.g Twitter groups), or via other specific user properties. Interep only checks if the users met the criteria to join the groups, without storing any sensitive data. In order to join groups each user must create a unique identifier using an Ethereum account and Semaphore. Semaphore, then, allows users to prove that their identifier is part of a specific group.

:::info
[Semaphore](https://semaphore.appliedzkp.org/) is a zero-knowledge gadget which allows Ethereum users to prove their membership of a set which they had previously joined without revealing their original identity.
:::

## Getting started

Interep consists of several components. If you want to learn more about the way it works, go to our [technical overview](/technical-reference/intro). If you have an application or a service that needs a system to prevent sybil attacks or to verify the authenticity of users, read our guides on how to integrate our groups.
