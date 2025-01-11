export default {
    server: {
      host: true, // Allow exposure to the network
      port: process.env.PORT || 3000, // Bind to Render's PORT or default to 3000
    },
  };
  