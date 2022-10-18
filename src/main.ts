import * as core from '@actions/core'
import {spawn} from 'child_process'

const run = (
  cmd: string,
  cwd: string | undefined,
  onError: (message: string | Error) => void
): void => {
  const c = spawn(cmd, {shell: true, cwd})
  console.log(`cmd: ${cmd}`)
  c.stdout.on('data', data => {
    console.log(`[${c.pid}] stdout: ${data}`.trim())
  })
  c.stderr.on('data', data => {
    console.log(`[${c.pid}] stderr: ${data}`.trim())
  })
  c.on('error', error => {
    onError(`[${c.pid || 'no pid'}] err: ${error.message}`.trim())
  })
  c.on('exit', code => {
    if (!code) return
    onError(`[${c.pid || 'no pid'}] exitted with code ${code}`.trim())
  })
}

const commands: string[] = core.getMultilineInput('commands')

console.log(`commands: ${commands}`)

const cwd = core.getInput('working-directory') || undefined
const cmds = commands.map(s => s.trim()).filter(s => s.length > 0)

for (const cmd of cmds) {
  run(cmd, cwd, core.setFailed)
}
