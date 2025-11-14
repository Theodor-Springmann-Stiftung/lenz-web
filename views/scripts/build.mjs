import { build, context } from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const args = new Set(process.argv.slice(2));
const isWatch = args.has("--watch");
const shouldMinify = args.has("--minify") || args.has("--mode=production");

const entryFile = path.join(projectRoot, "transform", "main.js");
const outFile = path.join(projectRoot, "assets", "scripts.js");

const buildOptions = {
	entryPoints: [entryFile],
	outfile: outFile,
	bundle: true,
	format: "esm",
	target: ["es2020"],
	platform: "browser",
	sourcemap: true,
	minify: shouldMinify,
	logLevel: "info",
};

async function run() {
	if (isWatch) {
		const ctx = await context(buildOptions);
		await ctx.watch();
		console.log("[esbuild] watching for changes...");
	} else {
		await build(buildOptions);
		console.log("[esbuild] build completed");
	}
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
