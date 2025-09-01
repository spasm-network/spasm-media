require('dotenv').config();

module.exports = {
  apps: [
    {
      name: process.env.BACKEND_PM2_STAGE_NAME || 'spasm-media-st-5016',
      script: './dist/server.js',
      exec_mode: process.env.BACKEND_PM2_STAGE_EXEC_MODE || 'cluster',
      instances: process.env.BACKEND_PM2_STAGE_INSTANCES || '1',
      autorestart: true,
      watch: false,
      max_memory_restart: process.env.BACKEND_PM2_STAGE_MAX_MEMORY_RESTART || '256M',
      env: {
        NODE_ENV: "staging",
        BACKEND_PORT: parseInt(process.env.BACKEND_STAGE_PORT) || 5015,
      }
    }
  ]
}
