require('dotenv').config();

module.exports = {
  apps: [
    {
      name: process.env.BACKEND_PM2_PROD_NAME || 'spasm-media-5015',
      script: './dist/server.js',
      exec_mode: process.env.BACKEND_PM2_PROD_EXEC_MODE || 'cluster',
      instances: process.env.BACKEND_PM2_PROD_INSTANCES || '1',
      autorestart: true,
      watch: false,
      max_memory_restart: process.env.BACKEND_PM2_PROD_MAX_MEMORY_RESTART || '512M',
      env: {
        NODE_ENV: "production",
        BACKEND_PORT: parseInt(process.env.BACKEND_PROD_PORT) || 5015,
      }
    }
  ]
}
