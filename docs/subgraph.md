---
sidebar_position: 6
---

# Subgraph

Groups and group membership details can be queried using GraphQL queries using a subgraph, available at https://thegraph.com/hosted-service/subgraph/glamperd/interrep-groups-kovan. The list of Semaphore identity commitments in each group is available.  


## Schema

`Group` and `Member` entities are provided. 

### Group
- ID
- Provider
- Name
- LeafCount: The total number of merkle tree leaves currently occupied
- MemberCount: The total number of active identity commitments in the group

### Member
- Identity commitment: The Semaphore identity commitment
- Root Hash: The merkle tree root hash after adding this member
- Leaf Index: The merkle tree leaf index
- Group: Link to the Group entity

## Example Queries

### Query all members for the first 10 groups

```
{
  groups(first: 10) {
    id
    provider
    name
    leafCount
    memberCount
    members {
      identityCommitment
      leafIndex
    }
  }
}
```

### Query a sample of members

```
{
  members(first: 5) {
    id
    identityCommitment
    rootHash
    leafIndex
    group {
      provider
      name
    }
  }
}
```
