# Github

## Parameters

-   **Followers**: number of the user's followers;
-   **Received stars**: sum of the number of stars received in the user's repositories;
-   **Plan**: true if the user has subscribed to a pro plan, false otherwise.

## Levels

### Gold

```typescript
[
    {
        parameter: "followers",
        value: {
            min: 500
        }
    },
    {
        parameter: "receivedStars",
        value: {
            min: 200
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
            min: 100
        }
    },
    {
        parameter: "receivedStars",
        value: {
            min: 80
        }
    }
]
```

### Bronze

```typescript
[
    {
        parameter: "proPlan",
        value: true
    },
    {
        parameter: "followers",
        value: {
            min: 50
        }
    },
    {
        parameter: "receivedStars",
        value: {
            min: 40
        }
    }
]
```

---

#### Configuration file: [src/criteria/github.ts](https://github.com/InterRep/interep.js/blob/main/packages/reputation/src/criteria/github.ts)
