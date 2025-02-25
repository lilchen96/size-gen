const SIZE_REGEX = /^\s*(\d+\.?\d*)\s*([KMGT]?B)\s*$/i;

function parseSizeToBytes(input) {
  // 匹配数值（允许小数）和单位（B、KB、MB、GB、TB，不区分大小写）
  const match = input.match(SIZE_REGEX);

  if (!match) throw new Error(`无效的格式: ${input}`);

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  // 单位到乘数的映射（二进制计算）
  const unitMultipliers = {
    B: Math.pow(1024, 0),
    KB: Math.pow(1024, 1),
    MB: Math.pow(1024, 2),
    GB: Math.pow(1024, 3),
    TB: Math.pow(1024, 4),
  };

  if (!unitMultipliers[unit]) throw new Error(`未知的单位: ${unit}`);

  return value * unitMultipliers[unit];
}

function formatBytesToSize(bytes) {
  if (bytes === 0) return "0B"; // 处理 0 字节的情况

  // 单位列表（从大到小排列）
  const units = [
    { unit: "TB", value: Math.pow(1024, 4) }, // 1 TB = 1024^4 B
    { unit: "GB", value: Math.pow(1024, 3) }, // 1 GB = 1024^3 B
    { unit: "MB", value: Math.pow(1024, 2) }, // 1 MB = 1024^2 B
    { unit: "KB", value: Math.pow(1024, 1) }, // 1 KB = 1024 B
    { unit: "B", value: Math.pow(1024, 0) }, // 1 B  = 1 B
  ];

  // 查找最合适的单位（确保数值 >= 1 且尽可能大）
  for (const { unit, value } of units) {
    const size = bytes / value;
    if (size >= 1) {
      // 保留最多两位小数（自动处理如 1.0 → 1, 2.5 → 2.5）
      const formattedSize = size % 1 === 0 ? size : size.toFixed(2);
      return `${formattedSize}${unit}`;
    }
  }

  // 如果字节数 < 1B（理论上不可能，但保留兜底逻辑）
  return `${bytes}B`;
}

module.exports = {
  SIZE_REGEX,
  parseSizeToBytes,
  formatBytesToSize,
};
