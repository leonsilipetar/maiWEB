const ApiConfig = {
    // Set the base URL conditionally
    baseUrl: process.env.NODE_ENV === 'production'
      ? ''
      : 'http://localhost:5000',
  };
  
  export default ApiConfig;