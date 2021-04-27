# Parallel commands javascript action

This action runs multiple commands (with arguments) and returns the first error encountered (if any).

## Inputs

### `commands`

**Required**  comma-separated list of commands (and their arguments).

## Example usage

uses: actions/parallel-commands@v0.1
with:
  commands: "echo hello, sleep 1; echo by"
