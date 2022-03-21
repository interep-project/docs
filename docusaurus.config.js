// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "Interep",
    url: "https://docs.interep.link",
    baseUrl: "/",
    favicon: "/img/favicon.ico",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    organizationName: "interep-project",
    projectName: "docs",
    trailingSlash: false,

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
                    customCss: require.resolve("./src/css/custom.css"),
                    customCss2: require.resolve("./src/css/colors.css")
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
                title: "Interep",
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
                                label: "Medium",
                                href: "https://medium.com/privacy-scaling-explorations"
                            },
                            {
                                label: "Twitter",
                                href: "https://twitter.com/PrivacyScaling"
                            },
                            {
                                label: "Telegram",
                                href: "https://t.me/interrep"
                            }
                        ]
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "Interep App",
                                href: "https://kovan.interep.link"
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
                respectPrefersColorScheme: true,
                // Dark/light switch icon options
                switchConfig: {
                    // Icon for the switch while in dark mode
                    darkIcon: "\u{263D}",
                    // Unicode icons such as '\u2600' will work
                    // Unicode with 5 chars require brackets: '\u{1F602}'
                    lightIcon: "\u{263C}"
                }
            }
        })
}
