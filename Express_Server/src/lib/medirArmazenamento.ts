import path from "path";
import fs from "fs/promises";

async function getDirectorySize(dirPath: string) {
  let totalSize = 0;
  const files = await fs.readdir(dirPath, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      totalSize += await getDirectorySize(fullPath);
    } else {
      const stats = await fs.stat(fullPath);
      totalSize += stats.size;
    }
  }

  return totalSize;
}

function formatSize(sizeInBytes: number): string {
  const MB = 1024 ** 2;
  const GB = 1024 ** 3;

  if (sizeInBytes >= GB) {
    return `${(sizeInBytes / GB).toFixed(2)} GB`;
  } else if (sizeInBytes >= MB) {
    return `${(sizeInBytes / MB).toFixed(2)} MB`;
  } else {
    return `${sizeInBytes} Bytes`;
  }
}

export default async function DirectorySize(dirPath: string) {
  try {
    const size = await getDirectorySize(dirPath);
    return formatSize(size);
  } catch (error) {
    console.error("Erro:", error);
    return false;
  }
}
