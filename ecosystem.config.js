module.exports = {
  apps: [
    {
      name: "API-VITRINE",
      script: "./dist/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      interpreter: "node",

      max_restarts: 50,
      min_uptime: 5000,
      max_memory_restart: "300M",

      env: {
        NODE_ENV: "production",
      },

      error_file: "logs/error.log",
      out_file: "logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
