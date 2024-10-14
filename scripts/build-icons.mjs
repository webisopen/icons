import fs from "node:fs/promises";
import path from "node:path";
import { transform as transformReact } from "@svgr/core";
import { stringify } from "svgson";
import { PACKAGES_DIR, readSvgs } from "./helpers.mjs";

/**
 * Build icons
 */
export const buildIcons = async ({
	name,
	componentTemplate,
	indexItemTemplate,
	key = true,
	pascalCase = false,
}) => {
	const DIST_DIR = path.resolve(PACKAGES_DIR, name);
	// clear all files in dist
	await Promise.all(
		(await fs.readdir(path.resolve(DIST_DIR, "src/icons")))
			.filter((f) => f !== ".gitkeep")
			.map((file) => fs.unlink(path.resolve(DIST_DIR, "src/icons", file))),
	);

	const svgFiles = readSvgs();

	const index = [];

	const ps = [];

	for (const svgFile of svgFiles) {
		const children = svgFile.obj.children
			.map(({ name, attributes }) => {
				if (key) {
					attributes.key = `svg-${name}`;
				}

				if (pascalCase) {
					for (const [key, value] of Object.entries(attributes)) {
						if (key.includes("-")) {
							delete attributes[key];
							attributes[key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] =
								value;
						}
					}
				}

				return { name, attributes };
			})
			.filter(({ attributes }) => {
				return !attributes.d || attributes.d !== "M0 0h24v24H0z";
			});

		// process.stdout.write(`Building ${i}/${svgFiles.length}: ${svgFile.name.padEnd(42)}\r`)

		const component = componentTemplate({
			name: svgFile.name,
			namePascal: svgFile.namePascal,
			children,
			stringify,
			svg: svgFile,
			attributes: svgFile.obj.attributes,
		});

		const filePath = path.resolve(
			DIST_DIR,
			"src/icons",
			`${svgFile.namePascal}.ts`,
		);

		ps.push(fs.writeFile(filePath, component, "utf-8"));

		index.push(
			indexItemTemplate({
				name: svgFile.name,
				namePascal: svgFile.namePascal,
			}),
		);
	}

	await Promise.all(ps);

	await fs.writeFile(
		path.resolve(DIST_DIR, "./src/icons.ts"),
		index.join("\n"),
		"utf-8",
	);
};
