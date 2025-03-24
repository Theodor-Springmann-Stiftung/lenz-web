import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import libAssetsPlugin from "@laynezh/vite-plugin-lib-assets";

export default defineConfig({
	mode: "development",
	plugins: [
		libAssetsPlugin({
			limit: 1024 * 1024,
		}),
	],
	css: {
		postcss: {
			plugins: [tailwindcss],
		},
	},
	build: {
		root: resolve(__dirname, ""),
		// These are dev options only:
		minify: false,
		emitAssets: true,
		assetsInlineLimit: 0,

		lib: {
			entry: "./transform/main.js",
			name: "PC-UI",
			fileName: "scripts",
			cssFileName: "style",
			formats: ["es"],
		},
		outDir: resolve(__dirname, "assets/"),
	},
});
