const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "InterRep Documentation",
    url: "https://docs.interrep.link",
    baseUrl: "/",
    favicon: "/img/favicon.ico",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    organizationName: "InterRep",
    projectName: "docs",
    trailingSlash: false,

    presets: [
        [
            "@docusaurus/preset-classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl: "https://github.com/InterRep/docs/edit/main/",
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
                title: "InterRep",
                items: [
                    {
                        href: "https://github.com/InterRep",
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
                                label: "Getting started",
                                to: "/getting-started"
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
                            }
                        ]
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "App",
                                href: "https://interrep.link"
                            },
                            {
                                label: "GitHub",
                                href: "https://github.com/InterRep"
                            }
                        ]
                    }
                ],
                copyright: `Copyright © ${new Date().getFullYear()} InterRep`
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme
            }
        })
}
