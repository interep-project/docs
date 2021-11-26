---
sidebar_position: 1
title: Introduction
---

# Technical overview

InterRep consists mainly of four components:

-   **Web application** ([reputation-service](https://github.com/InterRep/reputation-service)): A React web app to join one of our supported groups with Semaphore or to create reputation bedges by minting ERC721 tokens.
-   **APIs** ([reputation-service](https://github.com/InterRep/reputation-service), [subgraph](https://github.com/InterRep/subgraph)): A set of APIs provided to obtain group data. Although for some operations, such as adding users to groups in the contract, the admin is still required, one of our goals is to gradually move to a subgraph with [The Graph](https://thegraph.com/) in order to make this component more decentralized.
-   **Smart contracts** ([contracts](https://github.com/InterRep/contracts)): A set of Solidity smart contracts used to manage InterRep groups and ERC721 tokens (badges).
-   **Libraries** ([interrep.js](https://github.com/InterRep/interrep.js)): A monorepo of InterRep JavaScript libraries, some used by our backend, and others created to make InterRep integration easier.

InterRep is a system in which **reputation**, defined as recognition by other people of some characteristic or ability, plays a key role. In terms of social media reputation, though, reputation must be calculated on the basis of certain parameters and criteria. Let's first see how InterRep calculates it in the next section.
