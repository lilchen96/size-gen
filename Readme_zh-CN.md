# sizegen

[![NPM Version](http://img.shields.io/npm/v/size-gen.svg?style=flat)](https://www.npmjs.com/package/size-gen)

使用其他语言阅读: [English](./README.md) | 简体中文

---

通过流式写入技术，精确生成指定大小的文件。

## 项目简介

**sizegen** 是一款命令行工具，利用流式块写入技术生成固定大小的文件。它非常适用于磁盘测试、性能基准测试以及生成样例数据。采用流式写入方式，即使是大文件也能高效生成，同时大幅降低内存占用。

## 主要特性

- **高效流式生成**  
  采用分块写入方式，高效生成大文件，确保内存使用保持在较低水平。
  
- **可调节的分块大小**  
  用户可以根据需求自定义写入时使用的数据块大小。

## 安装

通过 [npm](https://www.npmjs.com/) 全局安装 **sizegen**：

```bash
npm install -g size-gen
```

另外，你也可以使用其他包管理工具进行全局安装：

**pnpm 安装：**

```bash
pnpm add -g size-gen
```

**yarn 安装：**

```bash
yarn global add size-gen
```

> **注意：** 请确保已安装 [Node.js](https://nodejs.org/)。

## 使用说明

运行 **sizegen** 的基本命令格式如下：

```bash
sizegen <output> --size <size> [--chunk <chunk>]
```

其中：
- `<output>`：输出文件名（必须包含文件扩展名，例如 `data.bin`）。
- `--size <size>`：以带单位的形式指定目标文件大小（例如 `10B`、`512KB`、`2MB` 或 `3.5GB`）。
- `--chunk <chunk>`：（可选）指定用于分块写入的块大小，如 `16KB`、`1MB` 或 `4MB`，默认为 `64KB`。

### 示例

- **使用默认块大小生成 10MB 文件：**

  ```bash
  sizegen sample.bin --size 10MB
  ```

- **使用 1MB 块大小生成 2GB 文件：**

  ```bash
  sizegen large.dat --size 2GB --chunk 1MB
  ```

### 快捷方式

你可以使用简写形式：
- 使用 `-s` 替代 `--size`
- 使用 `-c` 替代 `--chunk`

例如：

```bash
sizegen data.bin -s 10MB -c 64KB
```

## 贡献与反馈

欢迎大家提交代码、报告错误或提出功能建议！在提交 issue 前，请先查看 [问题页面](https://github.com/lilchen96/size-gen/issues) ，确认是否已有相关反馈。

## 许可

本项目采用 [MIT 许可证](https://opensource.org/licenses/MIT) 开源发布。

---
