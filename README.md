# Oxygen Project Generator

## Wat?
This package is used to generate base [Oxygen](https://github.com/PsichiX/Oxygen) game project structure, prepare and install its dependencies like Webpack and setup it for live development and production builds.

## Install
```bash
npm install -g oxygen-project-generator
```

## Usage
Usual:
```bash
mkdir path/to/your/project
cd path/to/your/project
oxy-gen -n project-name
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
