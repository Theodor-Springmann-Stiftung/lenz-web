import { resolve } from "path";
import { defineConfig } from "vite";
import libAssetsPlugin from "@laynezh/vite-plugin-lib-assets";

export default defineConfig({
	mode: "production",
	plugins: [
		libAssetsPlugin({
			limit: 1024 * 1024,
		}),
	],
	build: {
		assetsInlineLimit: 0,
		root: resolve(__dirname, ""),
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
