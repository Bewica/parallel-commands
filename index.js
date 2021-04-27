import { getInput, setFailed } from '@actions/core';
const { spawn } = require("child_process");

const run = (cmd) => {
    const c = spawn(cmd);
    c.stdout.on("data", data => { console.log(`[${c.pid}] stdout: ${data}`); });
    c.stderr.on("data", data => { console.log(`[${c.pid}] stderr: ${data}`); });
    c.on('error', (error) => { throw new Error(`[${c.pid}] err: ${error.message}`) });
}

// in case they pass commands "array-formatted": [c1, c2, ...]
const reBrackets = (new RegExp(`\[*\]*`)).compile();

try {
    const commands = getInput('commands');
    const cmds = commands.replace(reBrackets, "").split(",").map((s) => s.trim());
    for (const cmd of cmds) {
        run(cmd);
    }
} catch (error) {
    setFailed(error.message);
}
