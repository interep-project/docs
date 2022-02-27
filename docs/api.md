---
sidebar_position: 5
---

# API

Interep provides HTTP endpoints to interact with our reputation service and HTTP/WS endpoints to access onchain data with our subgraph.

## Reputation service

Interep servers manage offchain groups and provide APIs to get data about supported groups and associated Merkle trees.

### Providers

Providers are the services that allow Interep to get identities that meet certain criteria (e.g. group membership, social reputation, or ownership of tokens or emails).

#### `/api/providers`

**GET** - Returns all the Interep supported providers.

```bash title="Shell"
curl https://kovan.interep.link/api/providers
```

```json title="Response"
{ "data": ["twitter", "github", "reddit", "poap", "email", "telegram"] }
```

#### `/api/providers/:provider/:identityCommitment`

**GET** - Returns true if an identity commitment belongs to any provider group.

```bash title="Shell"
curl https://kovan.interep.link/api/providers/github/5389624958916554855745402699919973897274778066321592214684792070525465486554
```

```json title="Response"
{ "data": true }
```

### Groups

Groups contain the identity commitments of users who decide to join them. Each group has a size (i.e. the number of active identity commitments) and the root hash of the group tree. You can add or remove identity commitments and get specific data for each group.

#### `/api/groups`

**GET** - Returns all the Interep groups.

```bash title="Shell"
curl https://kovan.interep.link/api/groups
```

```json title="Response"
{
    "data": [
        {
            "provider": "twitter",
            "name": "gold",
            "root": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "numberOfLeaves": 0,
            "size": 0
        },
        {
            "provider": "poap",
            "name": "devcon5",
            "root": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "numberOfLeaves": 0,
            "size": 0
        },
        {
            "provider": "telegram",
            "name": "-1001396261340",
            "root": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "numberOfLeaves": 0,
            "size": 0
        },
        {
            "provider": "email",
            "name": "hotmail",
            "root": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "numberOfLeaves": 0,
            "size": 0
        },
        ...
    ]
}
```

#### `/api/groups/:provider/:name`

**GET** - Returns a specific Interep group.

```bash title="Shell"
curl https://kovan.interep.link/api/groups/github/gold
```

```json title="Response"
{
    "data": {
        "provider": "github",
        "name": "gold",
        "root": "3539596833905557328479676245499052267688962849195984401151716846778908697643",
        "numberOfLeaves": 1,
        "size": 1
    }
}
```

#### `/api/groups/:provider/:name/:identityCommitment`

**GET** - Returns true if an identity commitment belongs to a group.

```bash title="Shell"
curl https://kovan.interep.link/api/groups/github/gold/5389624958916554855745402699919973897274778066321592214684792070525465486554
```

```json title="Response"
{ "data": true }
```

**POST** - Adds an identity commitment to a group and return true (for OAuth groups only). Your domain must be whitelisted to use this API.

```bash title="Shell"
curl -X POST -H "Authorization: token OAUTH-TOKEN" \
https://kovan.interep.link/api/groups/github/gold/5389624958916554855745402699919973897274778066321592214684792070525465486554
```

```json title="Response"
{ "data": true }
```

**DELETE** - Deletes an identity commitment from a group and return true (for OAuth groups only). Your domain must be whitelisted to use this API.

```bash title="Shell"
curl -X DELETE -H "Authorization: token OAUTH-TOKEN" \
https://kovan.interep.link/api/groups/github/gold/5389624958916554855745402699919973897274778066321592214684792070525465486554
```

```json title="Response"
{ "data": true }
```

#### `/api/groups/:provider/:name/:identityCommitment/proof`

**GET** - Returns a Merkle tree proof.

```bash title="Shell"
curl https://kovan.interep.link/api/groups/github/gold/6014393454173820032764441533619576647480292883965697181546606218195926726207/proof
```

```json title="Response"
{
    "data": {
        "leaf": "6014393454173820032764441533619576647480292883965697181546606218195926726207",
        "root": "3689873171999483269047322566015997033293730148774246308387372366523680155983",
        "siblings": [
            "0",
            "14744269619966411208579211824598458697587494354926760081771325075741142829156",
            "7423237065226347324353380772367382631490014989348495481811164164159255474657",
            "11286972368698509976183087595462810875513684078608517520839298933882497716792",
            "3607627140608796879659380071776844901612302623152076817094415224584923813162",
            "19712377064642672829441595136074946683621277828620209496774504837737984048981",
            "20775607673010627194014556968476266066927294572720319469184847051418138353016",
            "3396914609616007258851405644437304192397291162432396347162513310381425243293",
            "21551820661461729022865262380882070649935529853313286572328683688269863701601",
            "6573136701248752079028194407151022595060682063033565181951145966236778420039",
            "12413880268183407374852357075976609371175688755676981206018884971008854919922",
            "14271763308400718165336499097156975241954733520325982997864342600795471836726",
            "20066985985293572387227381049700832219069292839614107140851619262827735677018",
            "9394776414966240069580838672673694685292165040808226440647796406499139370960",
            "11331146992410411304059858900317123658895005918277453009197229807340014528524",
            "15819538789928229930262697811477882737253464456578333862691129291651619515538",
            "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "21035245323335827719745544373081896983162834604456827698288649288827293579666",
            "6939770416153240137322503476966641397417391950902474480970945462551409848591",
            "10941962436777715901943463195175331263348098796018438960955633645115732864202"
        ],
        "pathIndices": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}
```

### Trees

Merkle trees are used as a data structure for groups. Each group has a tree, which is created when the first identity commitment is added. Identity commitments are therefore the leaves of the Merkle trees.

#### `/api/trees/:root`

**GET** - Returns the leaves of a tree.

```bash title="Shell"
curl https://kovan.interep.link/api/trees/3539596833905557328479676245499052267688962849195984401151716846778908697643?limit=2
```

```json title="Response"
{ "data": ["0", "15227719113467049976699670018631375748328892669189551254396131971022633202277"] }
```

#### `/api/trees/:root/:leaf`

**GET** - Returns true if a leaf belongs to a tree.

```bash title="Shell"
curl https://kovan.interep.link/api/trees/3539596833905557328479676245499052267688962849195984401151716846778908697643/15227719113467049976699670018631375748328892669189551254396131971022633202277
```

```json title="Response"
{ "data": true }
```

#### `/api/trees/batches`

**GET** - Returns all the root batches.

```bash title="Shell"
curl https://kovan.interep.link/api/trees/batches
```

```json title="Response"
{
    "data": [
        {
            "group": { "provider": "github", "name": "gold" },
            "roots": ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
            "transaction": {
                "hash": "0x1dec16b1c76a0a1fc9b4c7c898ae0ba72f496868fb7d2fe447fefe5eeaf676c1",
                "blockNumber": 10
            }
        },
        {
            "group": { "provider": "github", "name": "gold" },
            "roots": [
                "19217088683336594659449020493828377907203207941212636669271704950158751593251",
                "3539596833905557328479676245499052267688962849195984401151716846778908697643"
            ],
            "transaction": {
                "hash": "0xd1890bb9bda0adc650aefe974ccfe26665fe471c8a9f5306591bcc0c71088ced",
                "blockNumber": 11
            }
        }
    ]
}
```

#### `/api/trees/batches/:root`

**GET** - Returns the batch to which a root hash belongs.

```bash title="Shell"
curl https://kovan.interep.link/api/trees/batches/3539596833905557328479676245499052267688962849195984401151716846778908697643
```

```json title="Response"
{
    "data": {
        "group": { "provider": "github", "name": "gold" },
        "roots": [
            "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "3539596833905557328479676245499052267688962849195984401151716846778908697643"
        ],
        "transaction": {
            "hash": "0xd1890bb9bda0adc650aefe974ccfe26665fe471c8a9f5306591bcc0c71088ced",
            "blockNumber": 11
        }
    }
}
```

## Subgraph

The Graph is an indexing protocol for querying networks like Ethereum and IPFS. Anyone can build and publish open APIs, called subgraphs, making data easily accessible. You can use various GraphQL [client libraries](https://thegraph.com/docs/developer/querying-from-your-app) to query the subgraph and populate your app with the data indexed by the subgraph.

Our [Interep subgraph](https://thegraph.com/hosted-service/subgraph/interep-project/interep-groups-kovan) allow you to get data from the [Interep smart contract](https://github.com/interep-group/contracts).

:::tip
If you don't know GraphQL, you can try running some queries using the Graph Explorer and its [GraphQL playground](https://thegraph.com/hosted-service/subgraph/interep-project/interep-groups-kovan?selected=playground). You can find some examples [here](https://thegraph.com/docs/developer/graphql-api).
:::

### Endpoints

-   **Queries** (HTTP): https://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan
-   **Subscriptions** (WS): wss://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan

### Schema

### Entities

##### OnchainGroup

-   `id`: unique identifier among all onchain group entities,
-   `depth`: depth of the Merkle tree used for the group,
-   `size`: number of members (or number of tree leaves),
-   `admin`: admin of the group,
-   `members`: list of members of the group.

##### Member

-   `id`: unique identifier among all member entities,
-   `identityCommitment`: Semaphore identity commitment,
-   `root`: root hash of the tree when adding this member,
-   `index`: index of the tree leaf,
-   `group`: link to the onchain group entity.

##### OffchainGroup

-   `id`: unique identifier among all offchain group entities,
-   `depth`: depth of the merkle tree used for the group,
-   `root`: root hash of the tree used for the group,

### Example Queries

#### All members for the first 10 onchain groups

```graphql
{
    onchainGroups(first: 10) {
        id
        depth
        admin
        members {
            identityCommitment
            index
        }
    }
}
```

#### Sample of onchain members

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

#### Onchain groups by identity commitment

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
