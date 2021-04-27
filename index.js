import { getInput, setFailed } from '@actions/core';
const { spawn } = require("child_process");

const run = (cmd, ...args) => {
    const c = spawn(cmd, args);
    c.stdout.on("data", data => { console.log(`[${c.pid}] stdout: ${data}`); });
    c.stderr.on("data", data => { console.log(`[${c.pid}] stderr: ${data}`); });
    c.on('error', (error) => { throw new Error(`[${c.pid}] err: ${error.message}`) });
}

const reBrackets = (new RegExp(`\[*\]*`)).compile();

try {
    const commands = getInput('commands');
    const cmds = commands.replace(reBrackets, "").split(",").map((s) => s.trim());
    for (const cmd of cmds) {
        const parts = cmd.split(" ").filter();
        if (cmd.length < 1) {
            continue
        }
        const c = parts[0];
        const args = parts.slice(1) || []
        run(c, args);
    }
} catch (error) {
    setFailed(error.message);
}
