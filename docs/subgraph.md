---
sidebar_position: 6
---

# Subgraph

The Graph is an indexing protocol for querying networks like Ethereum and IPFS. Anyone can build and publish open APIs, called subgraphs, making data easily accessible.

The onchain InterRep groups and their members can be queried using GraphQL queries with our subgraph, available at https://thegraph.com/hosted-service/subgraph/interrep/kovan. In addition to the onchain groups, it is also possible to query our offchain groups. However, they do not contain all their group members but only the Merkle tree roots added at regular intervals.

You can use various GraphQL [client libraries](https://thegraph.com/docs/developer/querying-from-your-app) to query the subgraph and populate your app with the data indexed by the subgraph.

:::tip
If you don't know GraphQL, you can try running some queries using the Graph Explorer and its [GraphQL playground](https://thegraph.com/hosted-service/subgraph/interrep/kovan?selected=playground). You can find some examples [here](https://thegraph.com/docs/developer/graphql-api).
:::

## Endpoints

-   **Queries** (HTTP): https://api.thegraph.com/subgraphs/name/interrep/kovan
-   **Subscriptions** (WS): wss://api.thegraph.com/subgraphs/name/interrep/kovan

## Schema

## Entities

#### Group

-   `id`: unique identifier among all group entities,
-   `provider`: provider of the group (e.g name of a DAO),
-   `name`: name of the group (e.g. name of DAO team),
-   `depth`: depth of the merkle tree used for the group,
-   `size`: number of members (or number of tree leaves),
-   `members`: list of members of the group.

#### Member

-   `id`: unique identifier among all group entities,
-   `identityCommitment`: Semaphore identity commitment,
-   `root`: root hash of the tree used for the group,
-   `index`: index of the tree leaf,
-   `group`: link to the group entity.

#### OffchainGroup

-   `id`: unique identifier among all offchain group entities,
-   `provider`: provider of the group (e.g twitter),
-   `name`: name of the group (e.g. gold),
-   `roots`: list of the Merkle tree roots saved at regular intervals.

## Example Queries

### All members for the first 10 groups

```graphql
{
    groups(first: 10) {
        provider
        name
        depth
        members {
            identityCommitment
            index
        }
    }
}
```

### Sample of members

```graphql
{
    members(first: 5) {
        identityCommitment
        root
        index
        group {
            provider
            name
        }
    }
}
```

### Groups by identity commitment

It can be useful when you want all groups of a certain provider to which a user belongs.

```graphql
{
    members(
        where: { identityCommitment: "2066509069781532083082870363092240900543210735798842041673598797369005529920" }
    ) {
        group {
            provider
            name
            depth
            size
        }
    }
}
```
