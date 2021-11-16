---
sidebar_position: 6
---

# Subgraph

Groups and group members can be queried using GraphQL queries with our subgraph, available at https://thegraph.com/hosted-service/subgraph/interrep/kovan. Using our [GraphQL endpoint](https://api.thegraph.com/subgraphs/name/interrep/kovan), you can use various GraphQL [client libraries](https://thegraph.com/docs/developer/querying-from-your-app) to query the subgraph and populate your app with the data indexed by the subgraph.

:::tip
If you don't know GraphQL, you can try running some queries using the Graph Explorer and its [GraphQL playground](https://thegraph.com/hosted-service/subgraph/interrep/kovan?selected=playground). You can find some examples [here](https://thegraph.com/docs/developer/graphql-api).
:::

## Schema

## Entities

#### Group

-   `id`: unique identifier among all group entities,
-   `provider`: provider of the group (e.g twitter),
-   `name`: name of the group,
-   `depth`: depth of the merkle tree used for the group,
-   `size`: number of members (or number of tree leaves),
-   `members`: list of members of the group.

#### Member

-   `id`: unique identifier among all group entities,
-   `identityCommitment`: Semaphore identity commitment,
-   `root`: root hash of the tree used for the group,
-   `index`: index of the tree leaf,
-   `group`: link to the group entity.

## Example Queries

### Query all members for the first 10 groups

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

### Query a sample of members

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
