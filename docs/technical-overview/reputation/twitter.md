# Twitter

## Parameters

-   **Followers**: number of the user's followers;
-   **Botometer overall score**: score obtained with [Botometer](https://botometer.osome.iu.edu/);
-   **Verified profile**: true if the user has a verifier profile, false otherwise.

## Levels

### Gold

```typescript
[
    {
        parameter: "verifiedProfile",
        value: true
    },
    {
        parameter: "followers",
        value: {
            min: 7000
        }
    },
    {
        parameter: "botometerOverallScore",
        value: {
            max: 1
        }
    }
]
```

### Silver

```typescript
[
    {
        parameter: "followers",
        value: {
            min: 2000
        }
    },
    {
        parameter: "botometerOverallScore",
        value: {
            max: 1.5
        }
    }
]
```

### Bronze

```typescript
[
    {
        parameter: "followers",
        value: {
            min: 500
        }
    },
    {
        parameter: "botometerOverallScore",
        value: {
            max: 2
        }
    }
]
```

---

#### Configuration file: [src/criteria/twitter.ts](https://github.com/InterRep/interep.js/blob/main/packages/reputation/src/criteria/twitter.ts)
