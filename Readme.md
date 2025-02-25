# sizegen

[![NPM Version](http://img.shields.io/npm/v/size-gen.svg?style=flat)](https://www.npmjs.com/package/size-gen)

Read this in other languages: [简体中文](./Readme_zh-CN.md) | English

---

With streaming write technology, precisely generate files of a specified size.

## Project Overview

**sizegen** is a command-line tool that uses streaming chunk writing to generate files of fixed sizes. It is ideal for disk testing, performance benchmarking, and generating sample data. The streaming method ensures that even large files can be generated efficiently while significantly reducing memory usage.

## Key Features

- **Efficient Streaming Generation**  
  Generates large files efficiently using chunked writing, ensuring minimal memory usage.
  
- **Customizable Chunk Size**  
  Allows users to specify the size of the chunks used during writing based on their requirements.

## Installation

Globally install **sizegen** using [npm](https://www.npmjs.com/):

```bash
npm install -g size-gen
```

Alternatively, you can use other package managers for global installation:

**pnpm:**

```bash
pnpm add -g size-gen
```

**yarn:**

```bash
yarn global add size-gen
```

> **Note:** Please ensure that [Node.js](https://nodejs.org/) is installed.

## Usage

The basic command format for running **sizegen** is as follows:

```bash
sizegen <output> --size <size> [--chunk <chunk>]
```

Where:
- `<output>`: The output file name (must include a file extension, e.g., `data.bin`).
- `--size <size>`: Specifies the target file size with a unit (e.g., `10B`, `512KB`, `2MB`, or `3.5GB`).
- `--chunk <chunk>`: (Optional) Specifies the chunk size used for writing, such as `16KB`, `1MB`, or `4MB`. The default is `64KB`.

### Examples

- **Generate a 10MB file using the default chunk size:**

  ```bash
  sizegen sample.bin --size 10MB
  ```

- **Generate a 2GB file using a 1MB chunk size:**

  ```bash
  sizegen large.dat --size 2GB --chunk 1MB
  ```

### Shortcuts

You can also use abbreviated options:
- Use `-s` in place of `--size`
- Use `-c` in place of `--chunk`

For example:

```bash
sizegen data.bin -s 10MB -c 64KB
```

## Contributing and Feedback

We welcome contributions, bug reports, and feature suggestions! Before submitting an issue, please check the [Issues page](https://github.com/lilchen96/size-gen/issues) to see if similar feedback has already been provided.

## License

This project is released under the [MIT License](https://opensource.org/licenses/MIT).

---