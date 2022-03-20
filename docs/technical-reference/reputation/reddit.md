# Reddit

## Parameters

-   **Premium subscription**: true if the user has subscribed to a premium plan, false otherwise;
-   **Karma**: amount of user's karma;
-   **Coins**: amount of user's coins;
-   **Linked identities**: number of identities linked to the account (e.g. Twitter, Google).

## Levels

### Gold

```typescript
[
    {
        parameter: "premiumSubscription",
        value: true
    },
    {
        parameter: "karma",
        value: {
            min: 10000
        }
    },
    {
        parameter: "coins",
        value: {
            min: 5000
        }
    },
    {
        parameter: "linkedIdentities",
        value: {
            min: 3
        }
    }
]
```

### Silver

```typescript
[
    {
        parameter: "karma",
        value: {
            min: 5000
        }
    },
    {
        parameter: "coins",
        value: {
            min: 2000
        }
    },
    {
        parameter: "linkedIdentities",
        value: {
            min: 2
        }
    }
]
```

### Bronze

```typescript
[
    {
        parameter: "karma",
        value: {
            min: 1000
        }
    },
    {
        parameter: "coins",
        value: {
            min: 500
        }
    }
]
```

---

#### Configuration file: [src/criteria/reddit.ts](https://github.com/interep-project/interep.js/blob/main/packages/reputation/src/criteria/reddit.ts)
