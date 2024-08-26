const axios = require('axios');

const API_KEY = '<your API Key>'; // Replace with your actual API key

const headers = {
  'X-Api-Key': API_KEY,
};

axios.get('https://api.getpostman.com/workspaces', { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error('Error fetching workspaces:', error.response ? error.response.data : error.message));
