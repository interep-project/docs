---
sidebar_position: 2
---

# Reputation badges

By interacting with our web app, users are able to:

-   Link and unlink their Ethereum account with their Web2 account (e.g. Twitter, Github or Reddit);
-   Mint and burn a token representing this association.

InterRep uses OAuth to allow users to sign in with their Web2 account. The reputation service then fetches public data for that account and determines its reputation based on the criteria described [here](/technical-overview/reputation-criteria/intro).

:::note
"badge", "token" and "NFT" are used interchangeably here.
:::

## Linking accounts

Users are asked to sign a message linking together the unique id associated with their Web2 account and their Ethereum address. They also need to provide their public key which will be used by the server for encryption.

On the server, the validity of the signature is verified and some checks are performed to make sure that:

-   the Web2 account is connected,
-   the reputation is sufficient,
-   the account is not already linked to an Ethereum address.

The server then creates a message containing the user's Ethereum address and basic information about the user's Web2 account. That message is signed with the server's private key.

The signature, the message (together forming an attestation) and a salt is encrypted with the user's public key. The link between a Web2 account and an address is neither logged nor saved anywhere other than in the encrypted attestation. This means that only the user, with their private key, has the ability to reveal this association.

The result of this encryption is saved in the database in a Token with the status NOT_MINTED and a unique `tokenId`. The Web2 account in the database is marked as linked to an address.

The status of a Token can be any of the following: `NOT_MINTED`, `MINT_PENDING`, `MINTED`, `BURNED`, `REVOKED`.

## Minting a badge

If the status of the badge is `NOT_MINTED`, minting can be triggered which calls the smart contract for that badge and mints an ERC721 NFT. The id of that NFT is the `tokenId` mentioned above. At the moment only the server, with its private key, can mint tokens.

## Burning a badge

The owner of a badge can burn it by calling burnToken() on the smart contract, passing in the `tokenId`. This process is made simpler through our InterRep application as users just need to click on a button and approve a transaction. A badge can only be burned by its owner or an account approved by its owner.

## Unlinking accounts

Users might want to change which Ethereum address is associated with their Web2 account. For that, InterRep allows users to unlink their accounts. As a prerequisite, the badge representing the account association must be burned on-chain. The process is then similar to linking accounts but reversed.

Users select a token they own and decrypt the associated attestation. This decrypted attestation is sent to the server which checks its validity. The server also verifies that the user is signed in with a Web2 account linked to an address. The Web2 account is retrieved from the decrypted attestation and compared to the account the user is logged in with. The on-chain `tokenId` is retrieved and used to check that the token was indeed burned on-chain.

If all checks pass, the Web2 account in the database is marked as not being linked to an address. The token status is updated to `REVOKED`.
