module.exports = {
  apps: [{
    name: "web-app",
    script: "npm",
    args: "start",
    interpreter: "none",
    env: {
      HOST: "0.0.0.0",                     // ← allow React to listen on all IPs
      PORT: 8000,                           // ← force port 8000
      REACT_APP_API_BASE_URL: "http://43.204.230.7:8080"  // ← your backend address (if needed by React)
    },
    output: "/home/ubuntu/web-app/logs/web-app-out.log",
    error: "/home/ubuntu/web-app/logs/web-app-error.log",
    log_date_format: "YYYY-MM-DD HH:mm Z"
  }]
};

