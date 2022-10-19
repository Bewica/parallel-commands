# parallel-commands

This action runs multiple commands (with arguments) in parallel and returns the first error encountered (if any).

## Usage

```yaml
jobs:
  job_id:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - id: 'Hello world'
      uses: 'bewica/parallel-commands@v1'
      with:
        commands: |
          echo hello;
          sleep 2;
          echo !!!

          sleep 1;
          echo world
```

## Inputs

- `commands`: (Required) List of commands (and their arguments) separated by empty line (`\n\n`).

- `working-directory`: (Optional) The directory where all commands will be executed.
