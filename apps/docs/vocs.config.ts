import { defineConfig } from 'vocs'

export default defineConfig({
	title: 'Web3 Icons',
	sidebar: [
		{
			text: 'Getting Started',
			link: '/getting-started',
		},
		{
			text: 'integrations',
			items: [
				{
					text: 'SVG',
					link: '/integrations/svg',
				},
				{
					text: 'React',
					link: '/integrations/react',
				},
				{
					text: 'Vue',
					link: '/integrations/vue',
				},
			],
		},
	],
})
