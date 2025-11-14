import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const processes = [];

function resolveBin(name) {
	const ext = process.platform === "win32" ? ".cmd" : "";
	return path.join(projectRoot, "node_modules", ".bin", name + ext);
}

function run(command, args) {
	const child = spawn(command, args, {
		cwd: projectRoot,
		stdio: "inherit",
	});
	processes.push(child);
	child.on("exit", (code) => {
		if (code !== 0) {
			console.error(`${command} exited with code ${code}`);
			process.exitCode = code;
		}
	});
}

run("node", [path.join("scripts", "build.mjs"), "--watch"]);
run(resolveBin("postcss"), ["transform/site.css", "-o", "assets/style.css", "--watch"]);

function shutdown() {
	for (const child of processes) {
		child.kill("SIGINT");
	}
}

process.on("SIGINT", () => {
	shutdown();
	process.exit();
});

process.on("SIGTERM", () => {
	shutdown();
	process.exit();
});
