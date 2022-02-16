---
sidebar_position: 1
title: Introduction
---

# Technical overview

Interep consists mainly of four components:

-   **Web application** ([reputation-service](https://github.com/Interep/reputation-service)): A simple web app to allow users to join or leave groups supported by InterRep.
-   **APIs** ([reputation-service](https://github.com/Interep/reputation-service), [subgraph](https://github.com/InterRep/subgraph)): A set of APIs for interacting with InterRep. Developers can use them to integrate groups into their applications.
-   **Smart contracts** ([contracts](https://github.com/Interep/contracts)): A set of Solidity smart contracts used to manage the onchain InterRep groups.
-   **JS libraries** ([interep.js](https://github.com/Interep/interep.js)): A monorepo of JavaScript libraries, some used by our backend, and others created to make InterRep integration easier.

Interep is a system in which **reputation**, defined as recognition by other people of some characteristic or ability, plays a key role. In terms of social media reputation, though, reputation must be calculated on the basis of certain parameters and criteria. Let's first see how InterRep calculates it in the next section.
