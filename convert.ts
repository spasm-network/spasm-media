import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { execSync } from 'child_process';

const toConvertDir = path.join(__dirname, 'toConvert');
const publicDir = path.join(__dirname, 'public');
const convertedDir = path.join(__dirname, 'converted');

// Ensure directories exist
[toConvertDir, publicDir, convertedDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Read files from toConvert directory
fs.readdir(toConvertDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(toConvertDir, file);
    const stats = fs.statSync(filePath);

    if (file === 'test.txt') return

    if (stats.isFile()) {
      // Hash the file
      const hash = crypto.createHash('sha256');
      const fileStream = fs.createReadStream(filePath);
      fileStream.on('data', data => {
        hash.update(data);
      });
      fileStream.on('end', () => {
        const fileHash = hash.digest('hex');
        // const newFileName = `md01${fileHash}${path.extname(file)}`;
        const ext = path.extname(file);
        const newFileName = assignNewFileName(fileHash, ext);
        const newFilePath = path.join(publicDir, newFileName);

        // Copy and rename the file
        fs.copyFile(filePath, newFilePath, err => {
          if (err) {
            console.error('Error copying file:', err);
            return;
          }

          // TODO The same file can be uploaded multiple times
          // with different names, so to save space we should
          // only move from toConvert to converted if the file
          // has not been converted before. Thus, we should
          // simply delete a file if the same hash name already
          // exists in public.
          const convertedFilePath = path.join(convertedDir, file);
          // Move the original file to the converted directory
          fs.rename(filePath, convertedFilePath, err => {
            if (err) {
              console.error('Error moving file:', err);
              return;
            }
            console.log(`${file} -> ${newFileName}`);
          });
        });
      });
    }
  });
});

const assignNewFileName = (
  hash: string, ext: string
): string => {
  let prefix: string;

  // Determine the prefix based on the file extension
  switch (ext.toLowerCase()) {
    case '.mp4':
    case '.avi':
    case '.mov':
    case '.mkv':
    case '.flv':
      prefix = 'spasmvi01';
      break;
    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.gif':
    case '.bmp':
    case '.webp':
    case '.ico':
      prefix = 'spasmim01';
      break;
    case '.gif':
      prefix = 'spasmgf01';
      break;
    case '.mp3':
    case '.wav':
    case '.flac':
    case '.aac':
      prefix = 'spasmau01';
      break;
    case '.git':
      prefix = 'spasmgt01';
      break;
    default:
      prefix = 'spasmfl01';
      break;
  }

  // Combine the prefix, hash, and extension to form the new file name
  return `${prefix}${hash}${ext}`;
}
