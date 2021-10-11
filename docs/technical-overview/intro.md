---
sidebar_position: 1
title: Introduction
---

# Technical overview

InterRep consists mainly of three components:

-   **Web application** ([reputation-service](https://github.com/InterRep/reputation-service)): React web application to sign in with one of our supported providers and to calculate reputation. The application can be used by users and allows them to join Semaphore groups and create reputation badges by minting ERC721 tokens and using Metamask to interact with Ethereum.
-   **Reputation service** ([reputation-service](https://github.com/InterRep/reputation-service)): A Node.js server that anonymously manages Semaphore groups and the encrypted attestation of the Ethereum/Web2 accounts. The reputation service provides APIs that can be used by Dapps or external services to integrate InterRep. One of the future goals is to make this component as decentralized as possible.
-   **Smart contracts** ([contracts](https://github.com/InterRep/contracts)): A set of Solidity smart contracts used to manage Semaphore groups and ERC721 tokens (badges).

InterRep is a system in which **reputation** plays a key role. The main features (Semaphore groups and reputation badges) allow users' reputations to be exported and certified. Reputation, however, must be calculated on the basis of certain parameters and criteria. Let's first see how InterRep calculates reputation in the next section.
