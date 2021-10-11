---
sidebar_position: 5
---

# API

### Providers

#### `/api/providers`

**GET** - Get all the InterRep supported providers.

```bash title="Shell"
curl https://kovan.interrep.link/api/providers
```

```json title="Response"
{ "data": ["twitter", "github", "reddit", "poap"] }
```

#### `/api/providers/:provider/:identityCommitment/check`

**GET** - Check whether an identity commitment belongs to any provider group:

```bash title="Shell"
curl https://kovan.interrep.link/api/providers/github/5389624958916554855745402699919973897274778066321592214684792070525465486554/check
```

```json title="Response"
{ "data": true }
```

### Semaphore groups

#### `/api/groups`

**GET** - Get all the InterRep groups.

```bash title="Shell"
curl https://kovan.interrep.link/api/groups
```

```json title="Response"
{
    "data": [
        { "name": "GOLD", "provider": "twitter", "size": 1230 },
        { "name": "SILVER", "provider": "twitter", "size": 1204 },
        { "name": "BRONZE", "provider": "twitter", "size": 123 },
        { "name": "NOT_SUFFICIENT", "provider": "twitter", "size": 9023 },
        { "name": "GOLD", "provider": "github", "size": 1230 },
        { "name": "SILVER", "provider": "github", "size": 2003 },
        { "name": "BRONZE", "provider": "github", "size": 100 },
        { "name": "NOT_SUFFICIENT", "provider": "github", "size": 8340 },
        { "name": "GOLD", "provider": "reddit", "size": 1400 },
        { "name": "SILVER", "provider": "reddit", "size": 3943 },
        { "name": "BRONZE", "provider": "reddit", "size": 3243 },
        { "name": "NOT_SUFFICIENT", "provider": "reddit", "size": 7342 },
        { "name": "DEVCON_3", "provider": "poap", "size": 23 },
        { "name": "DEVCON_4", "provider": "poap", "size": 34 },
        { "name": "DEVCON_5", "provider": "poap", "size": 49 }
    ]
}
```

#### `/api/groups/:provider/:name/:identityCommitment`

**POST** - Add an identity commitment to a group (or Merkle tree) and return the new root hash.

```bash title="Shell"
curl -X POST -H "Authorization: token OAUTH-TOKEN" \
    https://kovan.interrep.link/api/groups/github/GOLD/5389624958916554855745402699919973897274778066321592214684792070525465486554
```

```json title="Response"
{ "data": "14292921841668459321530999124084402502172700548060824366716414263194752155209" }
```

#### `/api/groups/:provider/:name/:identityCommitment/path`

**GET** - Get a Merkle tree path.

```bash title="Shell"
curl https://kovan.interrep.link/api/groups/github/GOLD/5389624958916554855745402699919973897274778066321592214684792070525465486554/path
```

```json title="Response"
{
    "data": {
        "pathElements": [
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
        "indices": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "root": "14292921841668459321530999124084402502172700548060824366716414263194752155209"
    }
}
```

#### `/api/groups/:provider/:name/:identityCommitment/check`

**GET** - Check whether an identity commitment belongs to a group.

```bash title="Shell"
curl https://kovan.interrep.link/api/groups/github/GOLD/5389624958916554855745402699919973897274778066321592214684792070525465486554/check
```

```json title="Response"
{ "data": true }
```

### Reputation

#### `/api/reputation/twitter/:username`

**GET** - Get Twitter reputation by username.

```bash title="Shell"
curl https://kovan.interrep.link/api/reputation/twitter/jack
```

```json title="Response"
{
    "data": {
        "parameters": {
            "followers": 5776282,
            "verifiedProfile": true,
            "botometerOverallScore": 1.1
        },
        "reputation": "GOLD"
    }
}
```