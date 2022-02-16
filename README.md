<p align="center">
    <h1 align="center">
        Interep docs
    </h1>
    <p align="center">Interep documentation website.</p>
</p>

<p align="center">
    <a href="https://github.com/interep" target="_blank">
        <img src="https://img.shields.io/badge/project-Interep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interep/docs/blob/main/LICENSE" target="_blank">
        <img alt="Github license" src="https://img.shields.io/github/license/interep/docs.svg?style=flat-square">
    </a>
    <a href="https://prettier.io/" target="_blank">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
    <img alt="Repository top language" src="https://img.shields.io/github/languages/top/interep/docs?style=flat-square">
</p>

<div align="center">
    <h4>
        <a href="https://docs.interep.link/contributing">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://docs.interep.link/code-of-conduct">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://t.me/interep">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

Our [documentation website](https://docs.interep.link) was generated with [Docusaurus](https://docusaurus.io/). Please, check https://docusaurus.io/docs for more information.

___

## 🛠 Install

Clone this repository and install the dependencies:

```bash
git clone https://github.com/interep/docs.git interep-docs
cd interep-docs && yarn
```

## 📜 Usage

### Local Development

```
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

**Notice**: You can find all the markdown documentation files in the `docs` folder.
