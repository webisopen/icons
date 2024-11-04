import { h } from "vue";
import type { FunctionalComponent, SVGAttributes } from "vue";

type IconNode = [elementName: string, attrs: Record<string, string>][];

export type IconProps = {
	color?: string;
	size?: number | string;
	title?: string;
	class?: string;
} & Partial<SVGAttributes>;

const createComponent =
	(iconNode: IconNode): FunctionalComponent<IconProps> =>
	(
		{
			color = "currentColor",
			size = 24,
			title,
			class: classes,
			...rest
		}: IconProps,
		{ attrs, slots },
	) => {
		let children = [
			...iconNode.map((child) => h(...child)),
			...(slots.default ? [slots.default()] : []),
		];
		if (title) children = [h("title", title), ...children];
		return h(
			"svg",
			{
				width: size,
				height: size,
				...attrs,
				...rest,
			},
			children,
		);
	};

export default createComponent;
