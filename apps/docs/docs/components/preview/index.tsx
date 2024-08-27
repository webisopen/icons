import * as Icons from '@rss3/web3-icons-react'
import { IconModal } from './icon-modal'

const icons: string[] = []

for (const Icon in Icons) {
	if (Icon.startsWith('Icon')) {
		icons.push(Icon)
	}
}
icons.sort()

export function Preview() {
	return (
		<div
			className="grid gap-4 p-4"
			style={{
				gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
			}}
		>
			{icons.map((icon) => {
				// @ts-ignore
				const Component = Icons[icon]
				return (
					<IconModal
						key={icon}
						name={icon}
						component={
							<div className="flex flex-col items-center justify-center text-center rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700">
								<Component
									style={{
										width: '3rem',
										height: '3rem',
										color: '#ccc',
									}}
								/>
								<p className="text-xs mt-2">{icon.replace('Icon', '')}</p>
							</div>
						}
					/>
				)
			})}
		</div>
	)
}
