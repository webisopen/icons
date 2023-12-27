import { useRouter } from 'next/router'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { LocaleSwitch, useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
	logo: <span className="logo">@rss3/web3-icons</span>,
	project: {
		link: 'https://github.com/rss3-network/web3-icons',
	},
	docsRepositoryBase: 'https://github.com/rss3-network/web3-icons/apps/docs',
	head: () => {
		const config = useConfig()
		const { route } = useRouter()

		const description =
			config.frontMatter.description || 'The Web3 Icons Collection'
		const title = `${config.title} - @rss3/web3-icons`

		return (
			<>
				<title>{title}</title>
				<meta property="og:title" content={title} />
				<meta name="description" content={description} />
				<meta property="og:description" content={description} />
			</>
		)
	},
	footer: {
		content: (
			<p className="_text-sm">© {new Date().getFullYear()} RSS3 Network</p>
		),
	},
	sidebar: {
		defaultMenuCollapseLevel: 2,
		toggleButton: true,
	},
	navbar: {
		extraContent: () => {
			return LocaleSwitch({ lite: true })
		},
	},
	toc: {
		backToTop: true,
	},
	// banner: {
	// 	key: '1.0-release',
	// 	content: (
	// 		<a
	// 			href="https://github.com/rss3-network/web3-icons/releases/tag/v1.0.0"
	// 			target="_blank"
	// 			rel="noreferrer"
	// 		>
	// 			🎉 Web3 Icons 1.0 is released. Read more →
	// 		</a>
	// 	),
	// },
}

export default config
