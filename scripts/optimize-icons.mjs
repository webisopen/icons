import fs from "node:fs/promises";
import path from "node:path";
import { optimize } from "svgo";
import { ICONS_DIR, readSvgDirectory } from "./helpers.mjs";

const svgFiles = readSvgDirectory(ICONS_DIR);

const ps = [];

for (const svgFile of svgFiles) {
	const data = await fs.readFile(path.join(ICONS_DIR, svgFile), "utf-8");
	const result = optimize(data, {
		path: path.join(ICONS_DIR, svgFile),
		js2svg: { indent: 2, pretty: true },
		multipass: true,
		plugins: [
			{
				name: "preset-default",
				params: {
					overrides: {
						mergePaths: false,
						removeViewBox: false,
					},
				},
			},
			{
				name: "prefixIds",
				params: {
					// https://svgo.dev/docs/plugins/prefix-ids/
				},
			},
			// { name: 'removeXlink' },
			{
				name: "removeDimensions",
			},
		],
	});

	ps.push(fs.writeFile(path.join(ICONS_DIR, svgFile), result.data, "utf-8"));
}

await Promise.all(ps);
