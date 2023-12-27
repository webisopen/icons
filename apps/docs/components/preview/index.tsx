import * as Icons from '@rss3/web3-icons-react'

const icons = []

for (const Icon in Icons) {
	if (Icon.startsWith('Icon')) {
		icons.push(Icon)
	}
}
icons.sort()

export function Preview() {
	return (
		<div
			className="_grid _gap-4 _p-4"
			style={{
				gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
			}}
		>
			{icons.map((icon) => {
				const Component = Icons[icon]
				return (
					<div
						key={icon}
						className="_flex _flex-col _items-center _justify-center _text-center bg-gray-100 _rounded-lg"
					>
						<Component
							style={{
								width: '3rem',
								height: '3rem',
								color: '#ccc',
							}}
						/>
						<p className="_text-xs _mt-2">{icon.replace('Icon', '')}</p>
					</div>
				)
			})}
		</div>
	)
}
