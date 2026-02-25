import * as fs from "fs";
import * as path from "path";
import translation from "../data/translationDict.json";

function preprocessHtml(htmlContent: string): string {
	return htmlContent;
}

function translateContent(
	content: string,
	translationDict: Record<string, string>,
	prefix?: string,
	important: boolean = false
): string {
	const parts = content.split(/(\s+)/);
	const translatedParts = parts.map((part) => {
		if (/^\s+$/.test(part)) return part;
		let translated = translationDict[part];
		if (translated) {
			if (prefix) {
				translated = translated
					.split(" ")
					.filter((t) => t.length > 0)
					.map((t) => `${prefix}:${t}`)
					.join(" ");
			}
			if (important) {
				translated = translated
					.split(" ")
					.filter((t) => t.length > 0)
					.map((t) => `${t}!`)
					.join(" ");
			}
			return translated;
		}
		return part;
	});
	return translatedParts.join("");
}

function directTranslateToTailwind(
	htmlContent: string,
	translationDict: Record<string, string>,
	prefix?: string,
	important: boolean = false
): string {
	const attributePattern =
		/((?:(?:\[|\:)?class(?:Name)?(?:\])?)\s*=\s*)(["'`])((?:\\\2|(?:(?!\2)).|[\r\n])*?)(\2)/g;

	const output = htmlContent.replace(
		attributePattern,
		(
			match: string,
			attributePart: string,
			quoteStart: string,
			content: string,
			quoteEnd: string
		) => {
			if (
				attributePart.startsWith(":") ||
				attributePart.startsWith("[") ||
				attributePart.startsWith("v-bind")
			) {
				// Bound attribute, translate strings inside
				const stringPattern = /(["'`])((?:\\\1|(?:(?!\1)).)*)(\1)/g;
				const newContent = content.replace(
					stringPattern,
					(innerMatch, qStart, innerContent, qEnd) => {
						return `${qStart}${translateContent(
							innerContent,
							translationDict,
							prefix,
							important
						)}${qEnd}`;
					}
				);
				return `${attributePart}${quoteStart}${newContent}${quoteEnd}`;
			} else {
				// Regular class attribute
				return `${attributePart}${quoteStart}${translateContent(
					content,
					translationDict,
					prefix,
					important
				)}${quoteEnd}`;
			}
		}
	);

	return output;
}

function processFolder(
	folderPath: string,
	translationDict: Record<string, string>,
	prefix?: string,
	recursive: boolean = true,
	important: boolean = false
) {
	if (
		folderPath.includes("node_modules") ||
		folderPath.includes(".git") ||
		folderPath.includes("dist")
	) {
		return;
	}

	fs.readdir(folderPath, { withFileTypes: true }, (err, entries) => {
		if (err) throw err;
		entries.forEach((entry) => {
			console.log(entry.name);
			if (entry.isDirectory()) {
				if (recursive) {
					processFolder(
						path.join(folderPath, entry.name),
						translationDict,
						prefix,
						recursive,
						important
					);
				}
			} else if (
				entry.name.endsWith(".vue") ||
				entry.name.endsWith(".js") ||
				entry.name.endsWith(".tsx") ||
				entry.name.endsWith(".jsx") ||
				entry.name.endsWith(".ts") ||
				entry.name.endsWith(".html")
			) {
				const filePath = path.join(folderPath, entry.name);
				fs.readFile(filePath, "utf8", (err, data) => {
					if (err) throw err;

					let vueContent = preprocessHtml(data);

					vueContent = directTranslateToTailwind(
						vueContent,
						translationDict,
						prefix,
						important
					);

					fs.writeFile(filePath, vueContent, "utf8", (err) => {
						if (err) throw err;
						console.log(`${filePath} has been processed.`);
					});
				});
			}
		});
	});
}

function loadTranslationDict(
	vueFolderPath: string,
	prefix?: string,
	recursive: boolean = true,
	important: boolean = false
) {
	processFolder(vueFolderPath, translation, prefix, recursive, important);
}

export function startTranslation(
	vueFolderPath: string,
	prefix?: string,
	recursive: boolean = true,
	important: boolean = false
) {
	try {
		loadTranslationDict(vueFolderPath, prefix, recursive, important);
		console.log("✅ Translation completed.");
	} catch (err) {
		console.error(err);
	}
}
