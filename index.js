const core = require('@actions/core');
const { spawn } = require("child_process");

const run = (cmd, cwd, onError) => {
    const c = spawn(cmd, { shell: true, cwd: cwd });
    c.stdout.on("data", data => { console.log(`[${c.pid}] stdout: ${data}`); });
    c.stderr.on("data", data => { console.log(`[${c.pid}] stderr: ${data}`); });
    c.on('error', (error) => { onError(`[${c.pid || "no pid"}] err: ${error.message}`) });
    c.on('exit', (code) => {
        if (!code) return
        onError(`[${c.pid || "no pid"}] exitted with code ${code}`)
    });
}

const commands = core.getInput('commands');
const cwd = core.getInput('working-directory') || undefined;
const cmds = commands
    .trim().replace(/^\[+/, "").replace(/\]+$/, "")
    .split(",")
    .map((s) => s.trim()).filter((s) => s)
for (const cmd of cmds) {
    run(cmd, cwd, core.setFailed);
}
