---
sidebar_position: 1
title: Introduction
---

# Groups

Interep allows users to join groups based on reputation gained on social networks or other platforms. Groups are basically sets of user identities organized as Merkle trees. What makes these groups extremely useful is the fact that users can prove that they belong to them without revealing their identity. This is possible thanks to the use of so-called ZK-Snarks and Semaphore.

This important feature can therefore be divided into two important steps: a first step in which users can join groups, and a second step in which those users can generate their anonymous proof to prove that they belong to a group.

So let's see how Interep enables this feature and how these technologies are used.

:::info
In cryptography and computer science, a hash tree or [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) is a tree in which every "leaf" (node) is labelled with the cryptographic hash of a data block, and every node that is not a leaf (called a branch, inner node, or inode) is labelled with the cryptographic hash of the labels of its child nodes.
:::

## Joining a group

In the first phase Interep allows users to join groups with the web application or via [API](/api), that can be used by external services. Although there are different types of groups, the way users are added is the same. Each user uses their Ethereum account to generate an identity commitment that uniquely represents the user and the type of group they wish to join.

Group types are defined by identity providers, i.e. the services from which the information necessary to certify a certain reputation or certain properties is obtained. Whereas the users Ethereum account is used to sign a message with the identity provider and to generate a Semaphore identity.

Interep uses the [@interep/identity](https://github.com/interep-project/interep.js/tree/main/packages/identity) package to generate identities, while the [reputation-service](https://github.com/interep-project/reputation-service) takes care of adding the identity commitments in the Merkle tree associated with the group.

:::info
Interep does not save any association between Ethereum accounts and Web2 providers.
:::

## Generating a proof

In the second phase Interep provides [APIs](/api#groups) to allow external services to use groups to authenticate users who belong to a certain group without revealing their identity. The APIs allow, for example, to obtain a list of groups with the size of each one (i.e. number of users of the group), to verify if an identity commitment belongs to a group or to obtain a Merkle proof related to the leaf of a tree (i.e. identity commitment of a group).

Merkle proofs can therefore be used to create zero-knowledge proofs with Semaphore.

:::info
A Merkle proof, or proof of membership, is the tree data needed to verify that a leaf belongs to the tree. Merkle trees allow you to do this type of verification in a very efficient and secure manner. Demonstrating that a leaf node is a part of a given binary Merkle tree, for example, requires computing a number of hashes proportional to the logarithm of the number of leaf nodes in the tree.
:::

## Providers

Group types, as mentioned earlier, are defined by providers. Each provider has its own flow in the system and differs essentially in the ways in which it is verified that a user meets certain properties (e.g. social reputation).

The next paragraphs discuss in more detail the different providers currently supported by Interep.
