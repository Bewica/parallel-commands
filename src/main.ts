import * as core from '@actions/core'
import {spawn} from 'child_process'

const run = (
  cmd: string,
  cwd: string | undefined,
  onError: (message: string | Error) => void
): void => {
  const c = spawn(cmd, {shell: true, cwd})
  c.stdout.on('data', data => {
    console.log(`[${c.pid}] stdout: ${data}`)
  })
  c.stderr.on('data', data => {
    console.log(`[${c.pid}] stderr: ${data}`)
  })
  c.on('error', error => {
    onError(`[${c.pid || 'no pid'}] err: ${error.message}`)
  })
  c.on('exit', code => {
    if (!code) return
    onError(`[${c.pid || 'no pid'}] exited with code ${code}`)
  })
}

const commands: string = core.getInput('commands', {required: true})
const cwd = core.getInput('working-directory') || undefined
const cmds = commands
  .trim()
  .replace(/^\[+/, '')
  .replace(/\]+$/, '')
  .split('\n\n')
  .map(s => s.trim())
  .filter(s => s)

for (const cmd of cmds) {
  run(cmd, cwd, core.setFailed)
}
