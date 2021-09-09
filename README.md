<p align="center">
    <h1 align="center">
        InterRep docs
    </h1>
    <p align="center">InterRep documentation website.</p>
</p>

<p align="center">
    <a href="https://github.com/InterRep" target="_blank">
        <img src="https://img.shields.io/badge/project-InterRep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interrep/docs/blob/main/LICENSE" target="_blank">
        <img alt="Github license" src="https://img.shields.io/github/license/interrep/docs.svg?style=flat-square">
    </a>
    <a href="https://prettier.io/" target="_blank">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
    <img alt="Repository top language" src="https://img.shields.io/github/languages/top/InterRep/docs?style=flat-square">
</p>

Our [documentation website](https://docs.interrep.link) was generated with [Docusaurus](https://docusaurus.io/). Please, check https://docusaurus.io/docs for more information.

---

## Table of Contents

-   🛠 [Install](#install)
-   🕹 [Usage](#usage)
-   🔬 Development
    -   Rules
        -   [Commits](https://github.com/cedoor/cedoor/tree/main/git#commits-rules)
        -   [Branches](https://github.com/cedoor/cedoor/tree/main/git#branch-rules)
-   🧾 [MIT License](https://github.com/interrep/semethid/blob/master/LICENSE)
-   ☎️ [Contacts](#contacts)
    -   [Developers](#developers)

## Install

Clone this repository and install the dependencies:

```bash
$ git clone https://github.com/InterRep/docs.git interrep-docs
$ cd interrep-docs
$ yarn
```

## Usage

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

**Notice**: You can find all the markdown documentation files in the `docs` folder.

## Contacts

### Developers

#### cedoor

- E-mail : me@cedoor.dev
- Github : [@cedoor](https://github.com/cedoor)
- Website : https://cedoor.dev

#### glamperd

- Github : [@glamperd](https://github.com/glamperd)
