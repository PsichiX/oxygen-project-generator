# Oxygen Project Generator

## Wat?
This package is used to generate base [Oxygen Core](http://oxygencore.io)
game or plugin project structure, prepare and install its dependencies like Webpack
and setup it for live development and production builds.

## Install
```bash
npm install -g oxygen-project-generator
```

## Usage
Usual game project:
```bash
mkdir path/to/your/project
cd path/to/your/project
oxy-gen -n project-name
```
Usual library project:
```bash
mkdir path/to/your/project
cd path/to/your/project
oxy-gen -n plugin-name --lib
```
Print version:
```bash
oxy-gen -v
```
Print help:
```bash
oxy-gen -h
```

**Params:**
- `-v` | `--version`: Version.
- `-h` | `--help`: Help message.
- `-n` | `--name`: Project name (NPM compatible: `[a-zA-Z0-9-]+`).
- `-l` | `--lib`: Generate Oxygen compatible library (plugin).
- `-i` | `--do-not-install`: Do not install dependencies.
- `-b` | `--do-not-build`: Do not build project.
