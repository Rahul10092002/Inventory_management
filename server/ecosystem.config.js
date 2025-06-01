module.exports = {
  // ... other configurations ...
  apps: [
    {
      name: "inventory-mangement",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        ENV_VAR1: "environment variable 1",
      },
    },
  ],
};
