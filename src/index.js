const { Command } = require("commander");
const { generateFile } = require("./core");
const path = require("path");
const { SIZE_REGEX, parseSizeToBytes } = require("./utils");
const cliProgress = require("cli-progress");

const program = new Command();

program
  .name("sizegen")
  .description(
    "Generate files with precise sizes using streaming chunks.\n" +
      "Use cases: Disk testing, benchmark simulations, or creating sample data files."
  )
  .version("1.0.0", "-v, --version", "Print version information");

program
  .argument(
    "<output>",
    "Output filename (must include extension, e.g. data.bin)"
  )
  .option(
    "-s, --size <size>",
    "Target file size with unit (B, KB, MB, GB, TB).\n" +
      "Examples: 10B, 512KB, 2MB, 3.5GB"
  )
  .option(
    "-c, --chunk <chunk>",
    "Chunk size for streaming write (affects performance).\n" +
      "Examples: 16KB, 1MB, 4MB\n" +
      "Default: 64KB (optimal for most HDD/SSD)",
    "64KB"
  )
  .action(async (output, options) => {
    // 校验 1: 输出文件必须包含后缀
    const outputExt = path.extname(output);
    if (!outputExt) {
      console.error(
        "[Error] Missing file extension in output name. Examples: data.bin"
      );
      process.exit(1);
    }

    // 校验 2: 文件大小格式必须符合正则
    if (!SIZE_REGEX.test(options.size)) {
      console.error(
        "[Error] Invalid size format. Valid examples: 2MB, 512KB, 3.5GB, 10B"
      );
      process.exit(1);
    }

    // 校验 3: chunk大小格式必须符合正则
    if (!SIZE_REGEX.test(options.chunk)) {
      console.error(
        "[Error] Invalid chunk format. Valid examples: 64KB, 1MB, 4MB, 16B"
      );
      process.exit(1);
    }
    const bar = new cliProgress.SingleBar(
      {
        format: " {bar} {progress}% | {output} | {value}/{total}",
      },
      cliProgress.Presets.shades_classic
    );
    bar.start(parseSizeToBytes(options.size), 0, { output, progress: 0 });
    await generateFile(
      options.size,
      process.cwd(),
      output,
      options.chunk,
      (s, t) => {
        bar.update(s, { output, progress: Math.floor((s / t) * 100) });
      }
    );
    bar.stop();
  });

program.parse(process.argv);
