const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const { parseSizeToBytes } = require("./utils");

async function generateFile(
  size = "2MB",
  outputDir = ".",
  fileName = `output_${size}_${Date.now()}.bin`,
  chunkSize = "64KB",
  onProgress = () => {}
) {
  const bytes = parseSizeToBytes(size);
  const stream = fs.createWriteStream(path.join(outputDir, fileName));
  let activeBytes = 0;
  const defaultChunkBytes = parseSizeToBytes(chunkSize);
  const defaultChunk = crypto.randomBytes(defaultChunkBytes);
  stream.on("finish", () => {
    onProgress(activeBytes, bytes);
    process.exit(0);
  });
  // 递归写入（处理背压）
  async function writeChunks() {
    while (activeBytes < bytes) {
      const restBytes = bytes - activeBytes;
      let chunk = defaultChunk;
      if (restBytes < defaultChunkBytes) {
        chunk = crypto.randomBytes(restBytes);
      }
      // 写入并检查背压
      const canWrite = stream.write(chunk);
      activeBytes += chunk.length;
      onProgress(activeBytes, bytes);
      // 如果缓冲区已满，等待 drain 事件
      if (!canWrite) {
        await new Promise((resolve) => stream.once("drain", resolve));
      }
    }
    stream.end(); // 所有数据写入完成后关闭流
  }

  await writeChunks();
}

module.exports = {
  generateFile,
};
