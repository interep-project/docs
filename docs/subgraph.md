---
sidebar_position: 6
---

# Subgraph

The Graph is an indexing protocol for querying networks like Ethereum and IPFS. Anyone can build and publish open APIs, called subgraphs, making data easily accessible.

The onchain Interep groups and their members can be queried using GraphQL queries with our subgraph, available at https://thegraph.com/hosted-service/subgraph/interep-project/interep-groups-kovan. In addition to the onchain groups, it is also possible to query our offchain groups. However, they do not contain all their group members but only the Merkle tree root and depth.

You can use various GraphQL [client libraries](https://thegraph.com/docs/developer/querying-from-your-app) to query the subgraph and populate your app with the data indexed by the subgraph.

:::tip
If you don't know GraphQL, you can try running some queries using the Graph Explorer and its [GraphQL playground](https://thegraph.com/hosted-service/subgraph/interep/kovan?selected=playground). You can find some examples [here](https://thegraph.com/docs/developer/graphql-api).
:::

## Endpoints

-   **Queries** (HTTP): https://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan
-   **Subscriptions** (WS): wss://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan

## Schema

## Entities

#### OnchainGroup

-   `id`: unique identifier among all onchain group entities,
-   `depth`: depth of the Merkle tree used for the group,
-   `size`: number of members (or number of tree leaves),
-   `members`: list of members of the group.

#### Member

-   `id`: unique identifier among all member entities,
-   `identityCommitment`: Semaphore identity commitment,
-   `root`: root hash of the tree when adding this member,
-   `index`: index of the tree leaf,
-   `group`: link to the onchain group entity.

#### OffchainGroup

-   `id`: unique identifier among all offchain group entities,
-   `depth`: depth of the merkle tree used for the group,
-   `root`: root hash of the tree used for the group,

## Example Queries

### All members for the first 10 onchain groups

```graphql
{
    onchainGroups(first: 10) {
        id
        depth
        members {
            identityCommitment
            index
        }
    }
}
```

### Sample of onchain members

```graphql
{
    members(first: 5) {
        identityCommitment
        root
        index
        group {
            id
        }
    }
}
```

### Onchain groups by identity commitment

It can be useful when you want all groups of a certain provider to which a user belongs.

```graphql
{
    members(
        where: { identityCommitment: "2066509069781532083082870363092240900543210735798842041673598797369005529920" }
    ) {
        onchainGroups {
            id
            depth
            size
        }
    }
}
```
