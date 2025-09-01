import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Start the server
const PORT = process.env.BACKEND_PORT || 5015;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
