const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/palenight")

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "Interep Documentation",
    url: "https://docs.interep.link",
    baseUrl: "/",
    favicon: "/img/favicon.ico",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    organizationName: "interep",
    projectName: "docs",
    trailingSlash: false,

    presets: [
        [
            "@docusaurus/preset-classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl: "https://github.com/interep/docs/edit/main/",
                    routeBasePath: "/"
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css")
                }
            })
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: "Interep",
                items: [
                    {
                        href: "https://github.com/interep",
                        label: "GitHub",
                        position: "right"
                    }
                ]
            },
            footer: {
                style: "dark",
                links: [
                    {
                        title: "Docs",
                        items: [
                            {
                                label: "Introduction",
                                to: "/"
                            },
                            {
                                label: "Technical overview",
                                to: "/technical-overview/intro"
                            },
                            {
                                label: "API",
                                to: "/api"
                            },
                            {
                                label: "References",
                                to: "/references"
                            }
                        ]
                    },
                    {
                        title: "Community",
                        items: [
                            {
                                label: "Medium",
                                href: "https://medium.com/privacy-scaling-explorations"
                            },
                            {
                                label: "Twitter",
                                href: "https://twitter.com/PrivacyScaling"
                            },
                            {
                                label: "Telegram",
                                href: "https://t.me/interep"
                            }
                        ]
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "App",
                                href: "https://kovan.interep.link"
                            },
                            {
                                label: "GitHub",
                                href: "https://github.com/interep"
                            }
                        ]
                    }
                ],
                copyright: `Copyright © 2021 Interep`
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme
            }
        })
}
