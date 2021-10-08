---
sidebar_position: 1
---

# Overview

The heart of InterRep lies in the possibility to export reputation. However, calculating it is not an easy task. Some parameters are easier to fake and others do not offer an objective representation of the user's reputation. Our methods try to select the most suitable parameters and calculate a score that falls into one of the following categories (or reputation levels): `GOLD`, `SILVER`, `BRONZE`, `NOT_SUFFICIENT`. The criteria we use mainly concern Web2 social platforms, where parameters such as `followers`, `likes`, `stars` can be used to obtain a score that can best represent the authenticity of a user.

If you want to see how we calculate reputation or if you want to integrate our methods into your app, we have a dedicated [npm module](https://github.com/InterRep/interrep.js/tree/main/packages/reputation-criteria). The following paragraphs describe the criteria used by the platforms supported by InterRep.
