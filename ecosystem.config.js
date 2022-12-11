module.exports = {
  apps: [
    {
      name: "fman",
      script: "./build/server.js",
      instance: "max",
      exec_mode: "cluster",
      autorestart: true,
    },
  ],
};
