// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "Interep",
    tagline: "Anti-sybil as a service",
    url: "https://docs.interep.link",
    baseUrl: "/",
    favicon: "/img/favicon.ico",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    organizationName: "interep",
    projectName: "docs",

    presets: [
        [
            "@docusaurus/preset-classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl: "https://github.com/interep-project/docs/edit/main/",
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
            prism: {
                additionalLanguages: ["solidity"]
            },
            navbar: {
                logo: {
                    alt: "Interep icon",
                    src: "img/logo.svg"
                },
                items: [
                    {
                        label: "GitHub",
                        href: "https://github.com/interep-project",
                        position: "right",
                        className: "persistent"
                    }
                ]
            },
            footer: {
                links: [
                    {
                        title: "Docs",
                        items: [
                            {
                                label: "What Is Interep?",
                                to: "/"
                            },
                            {
                                label: "Technical Reference",
                                to: "/technical-reference/intro"
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
                                label: "Github",
                                href: "https://github.com/interep-project"
                            },
                            {
                                label: "Discord",
                                href: "https://discord.gg/Tp9He7qws4"
                            }
                        ]
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "Interep",
                                href: "https://interep.link"
                            },
                            {
                                label: "Semaphore",
                                href: "https://semaphore.appliedzkp.org/"
                            }
                        ]
                    }
                ],
                copyright: `Copyright © 2021 Interep`
            },
            colorMode: {
                defaultMode: "dark",
                // Should we use the prefers-color-scheme media-query,
                // using user system preferences, instead of the hardcoded defaultMode
                respectPrefersColorScheme: true
            }
        })
}
