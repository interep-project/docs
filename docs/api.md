---
sidebar_position: 5
---

# API

Interep provides HTTP endpoints to interact with the reputation service and HTTP/WS endpoints to access onchain data with a subgraph.

:::tip
If you want to use the reputation service APIs with a JavaScript library you can also use [`@interep/api`](https://github.com/Interep-project/interep.js/tree/main/packages/api).
:::

:::info
Interep APIs are currently available for the following Ethereum networks: `kovan`, `goerli`.
:::

## Reputation service

Interep servers manage offchain groups and provide APIs to get data about supported groups and associated Merkle trees.

### Providers

Providers are the services that allow Interep to get identities that meet certain criteria (e.g. group membership, social reputation, or ownership of tokens or emails).

#### `/api/v1/providers`

**GET** - Returns all the Interep supported providers.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/providers
```

```json title="Response"
{ "data": ["twitter", "github", "reddit", "poap", "email", "telegram"] }
```

#### `/api/v1/providers/:provider/:member`

**GET** - Returns true if an identity commitment belongs to any provider group.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/providers/github/5389624958916554855745402699919973897274778066321592214684792070525465486554
```

```json title="Response"
{ "data": true }
```

### Groups

Groups contain the identity commitments of users who decide to join them (i.e members). Each group has a size (i.e. the number of active members) and the root hash of the group tree. You can add or remove members and get specific data for each group.

#### `/api/v1/groups`

**GET** - Returns all the Interep groups.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/groups
```

```json title="Response"
{
    "data": [
        {
            "provider": "twitter",
            "name": "gold",
            "depth": 20,
            "root": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "onchainRoot": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "numberOfLeaves": 0,
            "size": 0
        },
        {
            "provider": "poap",
            "name": "devcon5",
            "depth": 20,
            "root": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "onchainRoot": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "numberOfLeaves": 0,
            "size": 0
        },
        {
            "provider": "telegram",
            "name": "-1001396261340",
            "depth": 20,
            "root": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "onchainRoot": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "numberOfLeaves": 0,
            "size": 0
        },
        {
            "provider": "email",
            "name": "hotmail",
            "depth": 20,
            "root": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "onchainRoot": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "numberOfLeaves": 0,
            "size": 0
        },
        ...
    ]
}
```

#### `/api/v1/groups/:provider/:name`

**GET** - Returns a specific Interep group.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/groups/github/gold
```

```json title="Response"
{
    "data": {
        "provider": "github",
        "name": "gold",
        "depth": 20,
        "root": "3539596833905557328479676245499052267688962849195984401151716846778908697643",
        "onchainRoot": "3539596833905557328479676245499052267688962849195984401151716846778908697643",
        "numberOfLeaves": 1,
        "size": 1
    }
}
```

#### `/api/v1/groups/:provider/:name/members?limit=0&offset=0`

**GET** - Returns the group members.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/groups/github/gold/members?limit=0&offset=0
```

```json title="Response"
{
    "data": [
        "6014393454173820032764441533619576647480292883965697181546606218195926726207",
        "21605618534090961454558107749130073320045509650908077266704421832011347336358"
    ]
}
```

#### `/api/v1/groups/:provider/:name/:member`

**GET** - Returns true if an identity commitment belongs to a group.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/groups/github/gold/5389624958916554855745402699919973897274778066321592214684792070525465486554
```

```json title="Response"
{ "data": true }
```

**POST** - Adds a member to a group and return true (for OAuth groups only). Your domain must be whitelisted to use this API.

```bash title="Shell"
curl -X POST -H "Authorization: token OAUTH-TOKEN" \
https://kovan.interep.link/api/v1/groups/github/gold/5389624958916554855745402699919973897274778066321592214684792070525465486554
```

```json title="Response"
{ "data": true }
```

#### `/api/v1/groups/:provider/:name/:member/proof`

**GET** - Returns a Merkle tree proof.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/groups/github/gold/6014393454173820032764441533619576647480292883965697181546606218195926726207/proof
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

Merkle trees are used as a data structure for groups. Each group has a tree, which is created when the first identity commitment is added. Members, or identity commitments, are therefore the leaves of the Merkle trees. You can access the same data as the `groups` APIs but using the last root of the Merkle trees.

#### `/api/v1/trees/:root`

**GET** - Returns the leaves of a tree.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/trees/3539596833905557328479676245499052267688962849195984401151716846778908697643?limit=2
```

```json title="Response"
{ "data": ["0", "15227719113467049976699670018631375748328892669189551254396131971022633202277"] }
```

#### `/api/v1/trees/:root/:leaf`

**GET** - Returns true if a leaf belongs to a tree.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/trees/3539596833905557328479676245499052267688962849195984401151716846778908697643/15227719113467049976699670018631375748328892669189551254396131971022633202277
```

```json title="Response"
{ "data": true }
```

### Batches

To ensure the integrity of the Interep offchain trees, their root hashes are saved at regular intervals. The batches contain the intermediate roots.

#### `/api/v1/batches`

**GET** - Returns all the root batches.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/batches
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

#### `/api/v1/batches/:root`

**GET** - Returns the batch to which a root hash belongs.

```bash title="Shell"
curl https://kovan.interep.link/api/v1/batches/3539596833905557328479676245499052267688962849195984401151716846778908697643
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
If you don't know GraphQL, you can try running some queries using the Graph Explorer and its [GraphQL playground](https://thegraph.com/hosted-service/subgraph/interep-project/interep-groups-kovan?selected=playground) (Kovan). You can find some examples [here](https://thegraph.com/docs/developer/graphql-api).
:::

### Endpoints

#### Kovan

-   **Queries** (HTTP): https://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan
-   **Subscriptions** (WS): wss://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan

#### Goerli

-   **Queries** (HTTP): https://api.thegraph.com/subgraphs/name/interep-project/interep-groups-goerli
-   **Subscriptions** (WS): wss://api.thegraph.com/subgraphs/name/interep-project/interep-groups-goerli

### Schema

### Entities

##### Group

-   `id`: unique identifier among all group entities,
-   `provider`: Interep group provider (e.g. `twitter`),
-   `name`: Interep group name (e.g. `gold`),
-   `depth`: Merkle tree depth,
-   `root`: Merkle tree root hash.
