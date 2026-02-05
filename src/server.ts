import express from 'express'
import path from 'path'
import cors from 'cors'

const app = express()

app.use(cors())

// Define a type for the file extensions
type FileExtension = '.mp4' | '.ogg' | '.avi' | '.mov' | '.mkv' | '.flv' | '.webm' | '.jpg' | '.jpeg' | '.png' | '.gif' | '.bmp' | '.webp' | '.ico' | '.mp3' | '.wav' | '.flac' | '.aac' | '.opus' | '.git'

// Map of file extensions to MIME types
const mimeTypes: Record<FileExtension, string> = {
  // Video
  '.mp4': 'video/mp4',
  // '.ogg': 'video/ogg',
  '.avi': 'video/x-msvideo',
  '.mov': 'video/quicktime',
  '.mkv': 'video/x-matroska',
  '.flv': 'video/x-flv',
  '.webm': 'video/webm',
  // Image
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.bmp': 'image/bmp',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
  // Audio
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.flac': 'audio/flac',
  '.aac': 'audio/aac',
  '.opus': 'audio/opus',
  // Other
  '.git': 'application/git' // Assuming this is a custom type for .git files
}

// Set MIME type and Content-Disposition for various file types
app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase() as FileExtension
  if (mimeTypes[ext]) {
    res.setHeader('Content-Type', mimeTypes[ext])
    res.setHeader('Content-Disposition', 'inline')
  }
  next()
})

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, '..', 'public')))

// A better way to serve static files with range request support
app.use(express.static(path.join(__dirname, '..', 'public'), {
  // This enables range requests out of the box
  setHeaders: (res, path, stat) => {
    res.set('Accept-Ranges', 'bytes');
  }
}));

// Start the server
const PORT = process.env.BACKEND_PORT || 5015
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
