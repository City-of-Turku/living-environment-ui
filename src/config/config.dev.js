const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/v1",
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT,
      10) || 30000,
  },
  backendImages: {
    baseUrl: process.env.REACT_APP_BACKEND_IMAGES_BASE_URL || '',
  },
};

export default config;
