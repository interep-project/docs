---
sidebar_position: 5
---

# API

### Providers

Providers are the services that allow Interep to obtain identities that meet certain criteria (e.g. group membership, social reputation, or ownership of tokens or emails).

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

Groups contain the identity commitments of users who decide to join them. You can add or delete an identity commitment from a group, and each group has a size (i.e. the number of active identity commitments) and the root hash of the group tree.

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
            "rootHash": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "size": 0
        },
        {
            "provider": "poap",
            "name": "devcon5",
            "rootHash": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "size": 0
        },
        {
            "provider": "telegram",
            "name": "-1001396261340",
            "rootHash": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
            "size": 0
        },
        {
            "provider": "email",
            "name": "hotmail",
            "rootHash": "19217088683336594659449020493828377907203207941212636669271704950158751593251",
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
        "rootHash": "3539596833905557328479676245499052267688962849195984401151716846778908697643",
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
curl https://kovan.interep.link/api/groups/github/gold/5389624958916554855745402699919973897274778066321592214684792070525465486554/proof
```

```json title="Response"
{
    "data": {
        "siblingNodes": [
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
            "15819538789928229930262697811477882737253464456578333862691129291651619515538"
        ],
        "path": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "root": "3539596833905557328479676245499052267688962849195984401151716846778908697643"
    }
}
```

### Trees

Merkle trees are used as a data structure for groups. Each group has a tree, which is created when the first identity commitment is added. Identity commitments are therefore the leaves of the Merkle trees.

#### `/api/trees/:rootHash`

**GET** - Returns the leaves of a tree.

```bash title="Shell"
curl https://kovan.interep.link/api/trees/3539596833905557328479676245499052267688962849195984401151716846778908697643?limit=2
```

```json title="Response"
{ "data": ["0", "15227719113467049976699670018631375748328892669189551254396131971022633202277"] }
```

#### `/api/trees/:rootHash/:leafHash`

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
            "rootHashes": ["14273848199791178467311820318933280591305571798471599149384455313172966875782"],
            "transaction": {
                "hash": "0x1dec16b1c76a0a1fc9b4c7c898ae0ba72f496868fb7d2fe447fefe5eeaf676c1",
                "blockNumber": 10
            }
        },
        {
            "group": { "provider": "github", "name": "gold" },
            "rootHashes": [
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

#### `/api/trees/batches/:rootHash`

**GET** - Returns the batch to which a root hash belongs.

```bash title="Shell"
curl https://kovan.interep.link/api/trees/batches/3539596833905557328479676245499052267688962849195984401151716846778908697643
```

```json title="Response"
{
    "data": {
        "group": { "provider": "github", "name": "gold" },
        "rootHashes": [
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
