const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3500' // development api
    : 'http://localhost:3500'; // production api

export {
    apiUrl
};